import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    // Mock response logic
    let reply = "I can definitely help with that. Are you looking for a sports bike or a commuter?";
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('sports') || lowerMessage.includes('r15')) {
      reply = "The Yamaha R15 V4 is our top-selling sports bike! It features a 155cc liquid-cooled engine and an aerodynamic design. Would you like to know its on-road price?";
    } else if (lowerMessage.includes('mt') || lowerMessage.includes('mt-15')) {
      reply = "The MT-15 V2 is an amazing naked streetfighter bike with great torque. Perfect for city commutes!";
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
