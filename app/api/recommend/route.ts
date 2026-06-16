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
      return NextResponse.json({
        recommendedBike: vehicles[0].name,
        confidenceScore: 85,
        justification: "This is a fallback recommendation. Please add GEMINI_API_KEY to see the actual AI output.",
        logicSteps: ["Analyzed height", "Checked budget", "Used fallback logic"],
        budgetOptions: ["Yamaha FZ-X"],
        vehicleImage: vehicles[0].imageUrl
      });
    }

    const inventoryContext = vehicles.map(v => `${v.name} (Type: ${v.type}, Price: ₹${v.price}) - ${v.specs}`).join('\n');

    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const prompt = `You are the lead AI Motorcycle Matchmaker at Ashoka Motors.
    Analyze the user's profile and choose the absolute best Yamaha bike from our LIVE INVENTORY that fits their budget.
    
    USER METRICS:
    - Height: ${height}
    - Experience Level: ${experience}
    - Primary Use: ${commute}
    - Budget Limit: ₹${budget}
    
    LIVE INVENTORY:
    ${inventoryContext}
    
    CRITICAL RULES:
    1. The recommendedBike MUST be exactly exactly exactly the name of a bike in the inventory.
    2. The price of the recommendedBike MUST be less than or equal to the Budget Limit. If no bike is under budget, choose the absolute cheapest bike we have and explain the compromise.
    
    Output a JSON object with EXACTLY this schema:
    {
      "recommendedBike": "String (Exact name from inventory)",
      "confidenceScore": "Number (1-100)",
      "justification": "String (A passionate, highly engaging paragraph explaining why this bike is the perfect match for their specific height, experience, and commute)",
      "logicSteps": ["String", "String", "String"] (Array of 3 short bullet points explaining your thought process step-by-step),
      "budgetOptions": ["String", "String"] (Array of 1-2 alternative cheaper bikes from the inventory, or empty array if none)
    }`;
    
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
    console.error("Recommend API Error:", error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
