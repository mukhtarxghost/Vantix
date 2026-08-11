import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { businessType, name, email, phone, company, website, volume, message } =
      body;

    if (!businessType || !name || !email) {
      return NextResponse.json(
        { success: false, error: "Business type, name, and email are required." },
        { status: 400 }
      );
    }

    // Ready for email/CRM integration — log in dev for now
    console.log("[vantix/booking]", {
      businessType,
      name,
      email,
      phone,
      company,
      website,
      volume,
      message,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request." },
      { status: 400 }
    );
  }
}
