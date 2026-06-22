import { createHmac } from "crypto";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import type { Reservation } from "@/lib/types";

const resend = new Resend(process.env.RESEND_API_KEY);

function sign(data: string): string {
  return createHmac("sha256", process.env.RESERVATION_SIGNING_SECRET ?? "")
    .update(data)
    .digest("hex")
    .slice(0, 16);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { action, data, message, sig } = body as {
    action: string;
    data: string;
    message: string;
    sig: string;
  };

  if (!action || !data || !message || !sig) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (action !== "accept" && action !== "reject") {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  if (sign(data) !== sig) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  let reservation: Reservation;
  try {
    reservation = JSON.parse(
      Buffer.from(data, "base64url").toString("utf-8")
    ) as Reservation;
  } catch {
    return NextResponse.json({ error: "Invalid reservation data" }, { status: 400 });
  }

  if (
    typeof reservation.email !== "string" || !reservation.email ||
    typeof reservation.name !== "string" || !reservation.name
  ) {
    return NextResponse.json({ error: "Invalid reservation data" }, { status: 400 });
  }

  const subject =
    action === "accept"
      ? "Your reservation at Brewing Coal is confirmed"
      : "Your reservation request at Brewing Coal";

  const safeMessage = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const { error } = await resend.emails.send({
    from: "Brewing Coal <onboarding@resend.dev>",
    to: "andys00@live.co.uk",
    subject,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; color: #1A1108;">
        <h2 style="color: #1D5C45; margin-bottom: 4px;">Brewing Coal · Glasgow</h2>
        <hr style="border: none; border-top: 1.5px solid #C07A2B; margin: 16px 0;" />
        <p style="white-space: pre-wrap; font-size: 15px; line-height: 1.6; margin: 0;">
          ${safeMessage}
        </p>
        <hr style="border: none; border-top: 1px solid #E2D9CC; margin: 24px 0;" />
        <p style="font-size: 13px; color: #aaa;">Brewing Coal, Glasgow</p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
