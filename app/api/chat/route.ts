import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

export async function POST(req: Request) {
  try {
    const { history } = await req.json();
    
    // history is an array of { role: 'user'|'model', text: '...' }
    if (!history || !Array.isArray(history) || history.length === 0) {
      return NextResponse.json({ error: 'Invalid history' }, { status: 400 });
    }

    if (genAI) {
      const vehicles = await prisma.vehicle.findMany();
      const inventoryContext = vehicles.map(v => `${v.name} (Type: ${v.type}, Price: ₹${v.price}) - ${v.specs}`).join('\n');

      const model = genAI.getGenerativeModel({ 
        model: "gemini-flash-latest",
        systemInstruction: `You are 'Ashoka', the highly enthusiastic and expert AI Sales Assistant for Ashoka Motors (a premium Yamaha dealership in Hyderabad). 
        You have a friendly, passionate, and slightly conversational tone (feel free to use an emoji or two, but don't overdo it).
        You must NEVER sound like a robotic customer service agent. You are a motorcycle enthusiast.
        Use the following LIVE INVENTORY DATA to accurately answer the user's question. 
        Do not hallucinate prices or models not listed here. If they ask about a bike we don't have, politely mention we only carry the Yamaha models listed.
        
        LIVE INVENTORY DATA:
        ${inventoryContext}`
      });
      
      // We need to format the history for Gemini startChat
      // Extract all but the LAST message to use as history
      const previousMessages = history.slice(0, -1).map((msg: any) => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));
      
      const lastMessage = history[history.length - 1].text;

      const chat = model.startChat({
        history: previousMessages,
        generationConfig: {
          maxOutputTokens: 200, // Keep responses concise
        }
      });
      
      const result = await chat.sendMessage(lastMessage);
      const response = await result.response;
      return NextResponse.json({ reply: response.text() });
    }

    // Fallback Mock Logic
    return NextResponse.json({ reply: "I'd love to help! Please add your GEMINI_API_KEY to the .env file to enable my AI brain! 🧠" });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
