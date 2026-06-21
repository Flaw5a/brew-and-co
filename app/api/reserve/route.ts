import { createHmac } from "crypto";
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

function sign(data: string): string {
  return createHmac("sha256", process.env.RESERVATION_SIGNING_SECRET ?? "")
    .update(data)
    .digest("hex")
    .slice(0, 16);
}

function esc(s: string): string {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  const { name, email, partySize, date, time } = await request.json();

  if (!name || !email || !partySize || !date || !time) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const origin = new URL(request.url).origin;
  const encodedData = Buffer.from(
    JSON.stringify({ name, email, partySize, date, time })
  ).toString("base64url");

  const sig = sign(encodedData);
  const acceptUrl = `${origin}/reservations/respond?action=accept&data=${encodedData}&sig=${sig}`;
  const rejectUrl = `${origin}/reservations/respond?action=reject&data=${encodedData}&sig=${sig}`;

  const btnBase = "display:inline-block;padding:10px 24px;border-radius:8px;font-weight:600;text-decoration:none;font-size:15px;";

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "Brewing Coal <onboarding@resend.dev>",
    to: "andys00@live.co.uk",
    subject: `New reservation request — ${esc(name)}, party of ${esc(partySize)}`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; color: #1A1108;">
        <h2 style="color: #1D5C45; margin-bottom: 4px;">New Reservation Request</h2>
        <p style="color: #888; margin-top: 0;">Brewing Coal · Glasgow</p>
        <hr style="border: none; border-top: 1.5px solid #C07A2B; margin: 24px 0;" />
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #888; width: 120px;">Name</td>
            <td style="padding: 8px 0; font-weight: 600;">${esc(name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888;">Email</td>
            <td style="padding: 8px 0; font-weight: 600;">${esc(email)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888;">Party size</td>
            <td style="padding: 8px 0; font-weight: 600;">${esc(partySize)} ${Number(partySize) === 1 ? "person" : "people"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888;">Date</td>
            <td style="padding: 8px 0; font-weight: 600;">${esc(date)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888;">Time</td>
            <td style="padding: 8px 0; font-weight: 600;">${esc(time)}</td>
          </tr>
        </table>
        <hr style="border: none; border-top: 1px solid #E2D9CC; margin: 24px 0;" />
        <table style="border-collapse: collapse;">
          <tr>
            <td style="padding-right: 12px;">
              <a href="${acceptUrl}" style="${btnBase}background:#1D5C45;color:#fff;">
                ✓ Accept
              </a>
            </td>
            <td>
              <a href="${rejectUrl}" style="${btnBase}background:#c0392b;color:#fff;">
                ✗ Reject
              </a>
            </td>
          </tr>
        </table>
        <hr style="border: none; border-top: 1px solid #E2D9CC; margin: 24px 0;" />
        <p style="font-size: 13px; color: #aaa;">Sent from the Brewing Coal website reservation form.</p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
