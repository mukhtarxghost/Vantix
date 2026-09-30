import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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

    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        console.log("[vantix/webhook] sending to n8n...");
        const webhookRes = await fetch(webhookUrl, {
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
        });
        console.log("[vantix/webhook] status:", webhookRes.status);
        if (!webhookRes.ok) {
          const text = await webhookRes.text();
          console.error("[vantix/webhook] error response:", text);
        }
      } catch (webhookErr) {
        console.error("[vantix/webhook] fetch failed:", webhookErr);
      }
    } else {
      console.warn("[vantix/webhook] N8N_WEBHOOK_URL is not set");
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