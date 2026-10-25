
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/auth';

const schema = z.object({
  name: z.string().trim().min(2).max(100),

  phone: z
    .string()
    .trim()
    .regex(
      /^(?:\+?88)?01[3-9]\d{8}$/,
      'সঠিক বাংলাদেশি মোবাইল নম্বর দিন।'
    ),

  email: z.string().trim().email().optional().or(z.literal('')),

  password: z.string().min(8).max(100),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            'নাম, সঠিক বাংলাদেশি মোবাইল নম্বর এবং কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড দিন।',
        },
        { status: 400 }
      );
    }

    const { name, phone, email, password } = parsed.data;

    // Normalize phone number to 01XXXXXXXXX format.
    const normalizedPhone = phone
      .replace(/^\+?88/, '');

    const normalizedEmail = email
      ? email.trim().toLowerCase()
      : null;

    // Check for an existing phone number or email.
    const conditions = [{ phone: normalizedPhone }];

    if (normalizedEmail) {
      conditions.push({ email: normalizedEmail });
    }

    const exists = await prisma.user.findFirst({
      where: {
        OR: conditions,
      },
    });

    if (exists) {
      return NextResponse.json(
        {
          error: 'এই মোবাইল নম্বর বা ইমেইল আগে ব্যবহার করা হয়েছে।',
        },
        { status: 409 }
      );
    }

    // Hash the password before saving it.
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        phone: normalizedPhone,
        email: normalizedEmail,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        role: true,
      },
    });

    await createSession(user);

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error('Registration API error:', error);

    return NextResponse.json(
      {
        error: 'রেজিস্ট্রেশন সম্পন্ন করা যায়নি। আবার চেষ্টা করুন।',
      },
      { status: 500 }
    );
  }
}
