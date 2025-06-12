import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: دریافت همه بانک‌ها
export async function GET() {
  try {
    const banks = await prisma.bank.findMany();
    return NextResponse.json({ success: true, data: banks });
  } catch (error) {
    console.error("خطا در دریافت بانک‌ها:", error);
    return NextResponse.json(
      { success: false, message: "خطا در دریافت بانک‌ها" },
      { status: 500 }
    );
  }
}

// POST: افزودن بانک جدید
export async function POST(req: NextRequest) {
  try {
    const { bin, logoUrl, color } = await req.json();

    if (!bin || !logoUrl || !color) {
      return NextResponse.json(
        { success: false, message: "همه فیلدها الزامی هستند" },
        { status: 400 }
      );
    }

    const newBank = await prisma.bank.create({
      data: {
        bin,
        logoUrl,
        color,
      },
    });

    return NextResponse.json({ success: true, data: newBank }, { status: 201 });
  } catch (error: any) {
    console.error("خطا در افزودن بانک:", error);

    return NextResponse.json(
      { success: false, message: "خطا در افزودن بانک" },
      { status: 500 }
    );
  }
}
