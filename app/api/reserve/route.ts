import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, partySize, date, time } = await request.json();

  if (!name || !partySize || !date || !time) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Brewing Coal <onboarding@resend.dev>",
    to: "andrew.flaws@city-holdings.co.uk",
    subject: `New reservation request — ${name}, party of ${partySize}`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; color: #1A1108;">
        <h2 style="color: #1D5C45; margin-bottom: 4px;">New Reservation Request</h2>
        <p style="color: #888; margin-top: 0;">Brewing Coal · Glasgow</p>
        <hr style="border: none; border-top: 1.5px solid #C07A2B; margin: 24px 0;" />
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #888; width: 120px;">Name</td>
            <td style="padding: 8px 0; font-weight: 600;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888;">Party size</td>
            <td style="padding: 8px 0; font-weight: 600;">${partySize} ${Number(partySize) === 1 ? "person" : "people"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888;">Date</td>
            <td style="padding: 8px 0; font-weight: 600;">${date}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888;">Time</td>
            <td style="padding: 8px 0; font-weight: 600;">${time}</td>
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
