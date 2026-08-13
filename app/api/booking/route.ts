import { NextResponse } from "next/server";
import { createSubmission } from "@/lib/db";

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

    const submission = await createSubmission({
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
    });

    console.log("[vantix/booking] saved:", submission.id);

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