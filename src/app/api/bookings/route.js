
import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

const schema = z.object({
  serviceId: z.string().min(1),

  customerName: z.string().trim().min(2).max(100),

  customerPhone: z
    .string()
    .trim()
    .regex(/^(?:\+?88)?01[3-9]\d{8}$/, 'Invalid Bangladesh phone number'),

  area: z.string().trim().min(2).max(120),

  addressText: z.string().trim().min(5).max(1000),

  problemDescription: z.string().trim().min(5).max(2000),

  scheduledAt: z.string().datetime({ offset: true }).or(z.string().min(10)),
});

export async function POST(req) {
  try {
    // 1. Validate request
    const parsed = schema.safeParse(await req.json());

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'সব তথ্য সঠিকভাবে পূরণ করুন।',
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // 2. Normalize phone number
    const phone = data.customerPhone.replace(/^\+?88/, '');

    // 3. Validate booking date
    const scheduledAt = new Date(data.scheduledAt);

    if (
      Number.isNaN(scheduledAt.getTime()) ||
      scheduledAt.getTime() < Date.now() + 30 * 60 * 1000
    ) {
      return NextResponse.json(
        { error: 'কমপক্ষে ৩০ মিনিট পরের সময় নির্বাচন করুন।' },
        { status: 400 }
      );
    }

    // 4. Find active service
    const service = await prisma.service.findFirst({
      where: {
        id: data.serviceId,
        active: true,
      },
    });

    if (!service) {
      return NextResponse.json(
        { error: 'সার্ভিসটি পাওয়া যায়নি বা বর্তমানে বন্ধ।' },
        { status: 400 }
      );
    }

    // 5. Get customer session
    const session = await getSession();

    let customerId = session?.id;

    // 6. Find or create customer
    if (!customerId) {
      let user = await prisma.user.findUnique({
        where: { phone },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            name: data.customerName,
            phone,
            passwordHash: '',
          },
        });
      }

      customerId = user.id;
    }

    // 7. Generate booking reference
    const reference = `SG-${Date.now()
      .toString(36)
      .toUpperCase()}-${randomUUID().slice(0, 6).toUpperCase()}`;

    // 8. Save booking and history together
    const booking = await prisma.$transaction(async (tx) => {
      const newBooking = await tx.booking.create({
        data: {
          id: randomUUID(),
          reference,

          customerId,
          serviceId: service.id,

          customerName: data.customerName,
          customerPhone: phone,

          area: data.area,
          addressText: data.addressText,
          problemDescription: data.problemDescription,

          scheduledAt,

          status: 'PENDING',

          estimatedPricePaisa: service.pricePaisa,

          updatedAt: new Date(),
        },

        include: {
          Service: {
            select: {
              nameEn: true,
              nameBn: true,
            },
          },
        },
      });

      await tx.bookingStatusHistory.create({
        data: {
          id: randomUUID(),
          bookingId: newBooking.id,
          toStatus: 'PENDING',
          note: 'Booking request created',
          changedBy: customerId,
        },
      });

      return newBooking;
    });

    // 9. Return successful response
    return NextResponse.json(
      {
        success: true,
        message: 'আপনার বুকিং সফলভাবে সংরক্ষণ করা হয়েছে।',
        booking,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('========== BOOKING API ERROR ==========');
    console.error('Error name:', error.name);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Error details:', error.meta);
    console.error('========================================');

    return NextResponse.json(
      {
        error: 'বুকিং সংরক্ষণ করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।',
      },
      { status: 500 }
    );
  }
}
