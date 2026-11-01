
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: {
        active: true,
      },
      include: {
        category: {
          select: {
            id: true,
            nameEn: true,
            nameBn: true,
            description: true,
            icon: true,
            active: true,
            sortOrder: true,
          },
        },
      },
      orderBy: {
        nameEn: 'asc',
      },
    });

    return NextResponse.json(
      {
        success: true,
        services,
        total: services.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('========== SERVICES API ERROR ==========');
    console.error('Error name:', error?.name);
    console.error('Error code:', error?.code);
    console.error('Error message:', error?.message);
    console.error('Error metadata:', error?.meta);
    console.error('=========================================');

    return NextResponse.json(
      {
        success: false,
        error: 'সার্ভিস লোড করা যায়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন।',
        services: [],
      },
      { status: 500 }
    );
  }
}
