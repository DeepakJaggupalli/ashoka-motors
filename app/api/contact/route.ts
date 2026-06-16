import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/generative-ai';

const prisma = new PrismaClient();
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    
    let sentiment = "NEUTRAL";

    if (genAI) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
        const prompt = `
          Analyze the sentiment and intent of the following message sent to a Yamaha motorcycle dealership.
          Respond with EXACTLY ONE WORD from the following list: [URGENT, COMPLAINT, POSITIVE, SALES, NEUTRAL].
          Message: "${message}"
        `;
        const result = await model.generateContent(prompt);
        const text = result.response.text().trim().toUpperCase();
        if (["URGENT", "COMPLAINT", "POSITIVE", "SALES", "NEUTRAL"].includes(text)) {
          sentiment = text;
        }
      } catch (e) {
        console.error("Sentiment analysis failed:", e);
      }
    }

    await prisma.contactMessage.create({
      data: { name, email, message, sentiment }
    });

    return NextResponse.json({ success: true, message: 'Message saved successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 500 });
  }
}
