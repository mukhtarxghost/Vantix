import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ success: false, error: "Not configured." }, { status: 501 });
}
