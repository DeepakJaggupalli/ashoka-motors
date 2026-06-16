import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    if (genAI) {
      const vehicles = await prisma.vehicle.findMany();
      const inventoryContext = vehicles.map(v => `${v.name} (Type: ${v.type}, Price: ₹${v.price}) - ${v.specs}`).join('\n');

      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
      const prompt = `You are the AI Sales Assistant for Ashoka Motors, a Yamaha dealership in Hyderabad. 
      Use the following LIVE INVENTORY DATA to accurately answer the user's question. 
      Do not hallucinate prices or models not listed here.
      
      LIVE INVENTORY DATA:
      ${inventoryContext}
      
      User Query: ${message}
      
      Answer professionally, enthusiastically, and concisely (under 3 sentences).`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return NextResponse.json({ reply: response.text() });
    }

    // Fallback Mock Logic if no API key
    let reply = "I can definitely help with that. Are you looking for a sports bike or a commuter? (Note: Add GEMINI_API_KEY to .env to enable real AI responses)";
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('sports') || lowerMessage.includes('r15')) {
      reply = "The Yamaha R15 V4 is our top-selling sports bike! It features a 155cc liquid-cooled engine and an aerodynamic design.";
    } else if (lowerMessage.includes('mt') || lowerMessage.includes('mt-15')) {
      reply = "The MT-15 V2 is an amazing naked streetfighter bike with great torque. Perfect for city commutes!";
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
