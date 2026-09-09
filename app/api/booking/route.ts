import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      businessType,
      name,
      email,
      phone,
      company,
      website,
      volume,
      budget,
      message,
      formType = "BOOKING",
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        {
          success: false,
          error: "Name and email are required.",
        },
        { status: 400 }
      );
    }

    const submission = await prisma.submission.create({
      data: {
        formType,
        businessType: businessType ?? null,
        name,
        email,
        phone: phone ?? null,
        company: company ?? null,
        website: website ?? null,
        volume: volume ?? null,
        budget: budget ?? null,
        message: message ?? null,
      },
    });

    console.log("[vantix/booking] saved:", submission.id);

    if (WEBHOOK_URL) {
      fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessType: businessType ?? null,
          fullName: name,
          email,
          phone: phone ?? null,
          company: company ?? null,
          website: website ?? null,
          revenue: volume ?? budget ?? null,
          message: message ?? null,
        }),
      }).catch((err) =>
        console.error("[vantix/booking] webhook failed:", err)
      );
    }

    return NextResponse.json({
      success: true,
      id: submission.id,
    });
  } catch (error) {
    console.error("[vantix/booking] error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to save submission.",
      },
      { status: 500 }
    );
  }
}