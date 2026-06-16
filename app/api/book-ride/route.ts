import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, phone, date, vehicleName } = await req.json();
    
    await prisma.testRideBooking.create({
      data: { name, phone, date, vehicleName }
    });

    return NextResponse.json({ success: true, message: 'Test ride booked successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 500 });
  }
}
