
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: {
        active: true,
      },
      include: {
        category: true,
      },
      orderBy: {
        nameEn: 'asc',
      },
    });

    return NextResponse.json({ services });
  } catch (error) {
    console.error('Failed to load services:', error);

    return NextResponse.json(
      {
        error: 'সার্ভিস লোড করা যায়নি। Database connection পরীক্ষা করুন।',
        services: [],
      },
      { status: 500 }
    );
  }
}
