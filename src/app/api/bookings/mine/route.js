
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check user session
    const user = await getSession();

    if (!user || !user.id) {
      return NextResponse.json(
        {
          success: false,
          error: 'প্রথমে লগইন করুন।',
          bookings: [],
        },
        { status: 401 }
      );
    }

    // Customer sees own bookings.
    // Technician sees assigned bookings.
    const where =
      user.role === 'TECHNICIAN'
        ? {
            BookingAssignment: {
              some: {
                staffId: user.id,
              },
            },
          }
        : {
            customerId: user.id,
          };

    // Fetch bookings
    const bookings = await prisma.booking.findMany({
      where,
      include: {
        Service: {
          select: {
            nameEn: true,
            nameBn: true,
          },
        },
        BookingAssignment: {
          include: {
            User: {
              select: {
                name: true,
                phone: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 100,
    });

    return NextResponse.json({
      success: true,
      bookings,
      total: bookings.length,
    });
  } catch (error) {
    console.error('My bookings API failed:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'বুকিংয়ের তথ্য লোড করা যায়নি।',
        bookings: [],
      },
      { status: 500 }
    );
  }
}
