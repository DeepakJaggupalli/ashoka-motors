import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    
    await prisma.contactMessage.create({
      data: { name, email, message }
    });

    return NextResponse.json({ success: true, message: 'Message saved successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 500 });
  }
}
