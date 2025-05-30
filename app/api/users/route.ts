// app/api/users/route.ts

import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

// GET: همه‌ی کاربران
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      omit: {
        shabaNumber: true,
      },
    });

    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "خطا در دریافت کاربران" },
      { status: 500 }
    );
  }
}

// POST: ایجاد کاربر جدید
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { firstName, lastName, phoneNumber, email, cardNumber, shabaNumber } =
      body;

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        phoneNumber,
        email,
        cardNumber,
        shabaNumber,
      },
    });

    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    console.error("خطا در ایجاد کاربر:", error);

    return NextResponse.json(
      { success: false, message: "خطا در ایجاد کاربر" },
      { status: 500 }
    );
  }
}
