import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

export async function POST(req: Request) {
  try {
    const { height, experience, commute, budget } = await req.json();

    const vehicles = await prisma.vehicle.findMany();
    
    if (!genAI) {
      // Fallback if no API key
      return NextResponse.json({
        recommendedBike: vehicles[0].name,
        confidenceScore: 85,
        justification: "This is a fallback recommendation. Please add GEMINI_API_KEY to see the actual AI output.",
        vehicleImage: vehicles[0].imageUrl
      });
    }

    const inventoryContext = vehicles.map(v => `${v.name} (Type: ${v.type}, Price: ₹${v.price}) - ${v.specs}`).join('\n');

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-lite"
    });

    const prompt = `You are an expert motorcycle recommendation AI. 
    Based on the following user metrics, choose the absolute best Yamaha bike from our LIVE INVENTORY.
    
    USER METRICS:
    - Height: ${height}
    - Experience Level: ${experience}
    - Primary Use: ${commute}
    - Budget: ₹${budget}
    
    LIVE INVENTORY:
    ${inventoryContext}
    
    Output a JSON object with these exact keys:
    - "recommendedBike" (string): The exact name of the bike from the inventory.
    - "confidenceScore" (number): 1-100 score of how well it matches.
    - "justification" (string): A short, enthusiastic paragraph explaining why it's the perfect match.
    `;
    
    const result = await model.generateContent(prompt);
    let text = result.response.text();
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(text);

    // Find the vehicle image
    const recommendedVehicle = vehicles.find(v => v.name === data.recommendedBike) || vehicles[0];
    
    return NextResponse.json({
      ...data,
      vehicleImage: recommendedVehicle.imageUrl
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
