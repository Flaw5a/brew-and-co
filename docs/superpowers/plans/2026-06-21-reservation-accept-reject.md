# Reservation Accept / Reject Email Flow — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let the café owner accept or reject reservation requests via email buttons, sending a customisable confirmation or decline email back to the customer.

**Architecture:** The reservation form gains an email field. The owner notification email gains Accept/Reject links that encode the reservation as base64url in the URL. Clicking a link opens `/reservations/respond`, a Next.js page where the owner edits a pre-filled message and submits it — triggering a new API route that emails the customer via Resend.

**Tech Stack:** Next.js 16 App Router, TypeScript, Resend SDK, Tailwind (inline styles on new pages to stay consistent with existing components)

## Global Constraints

- Next.js 16: `searchParams` in server component pages is a **Promise** — must be `await`ed
- No database — reservation data travels base64url-encoded in the URL
- Resend sandbox: outgoing emails can only reach `andys00@live.co.uk` until a domain is verified
- Follow existing file naming: `route.ts` for API routes, `page.tsx` for pages
- No new dependencies — `resend` and `Buffer` (Node built-in) cover everything

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `lib/types.ts` | Modify | Add `email: string` to `Reservation` |
| `components/ReserveModal.tsx` | Modify | Add email input field |
| `app/api/reserve/route.ts` | Modify | Add Accept/Reject buttons to owner email |
| `components/RespondForm.tsx` | Create | Client component — editable message form |
| `app/reservations/respond/page.tsx` | Create | Server page — decodes URL params, renders RespondForm |
| `app/api/reserve/respond/route.ts` | Create | API route — sends accept/reject email to customer |

---

## Task 1: Add email field to Reservation type and booking form

**Files:**
- Modify: `lib/types.ts`
- Modify: `components/ReserveModal.tsx`

**Interfaces:**
- Produces: `Reservation` type with `email: string` — used by all subsequent tasks

---

- [ ] **Step 1: Add `email` to Reservation type**

Open `lib/types.ts`. Replace the `Reservation` interface:

```ts
export interface Reservation {
  name: string;
  email: string;
  partySize: number;
  date: string;
  time: string;
}
```

- [ ] **Step 2: Add email to form initial state in ReserveModal**

In `components/ReserveModal.tsx`, find the `useState<Reservation>` call (line ~12) and add `email: ""`:

```ts
const [form, setForm] = useState<Reservation>({
  name: "",
  email: "",
  partySize: 2,
  date: "",
  time: "",
});
```

Also update the `close()` function reset (line ~29):

```ts
setForm({ name: "", email: "", partySize: 2, date: "", time: "" });
```

- [ ] **Step 3: Add the email input field to the form**

In `ReserveModal.tsx`, after the closing `</div>` of the Name field block (around line 233), insert the Email field:

```tsx
{/* Email */}
<div style={{ display: "flex", flexDirection: "column", gap: "var(--brew-space-2)" }}>
  <label
    htmlFor="reserve-email"
    style={{ fontSize: "var(--brew-body-sm)", fontWeight: 500, color: "var(--brew-espresso)" }}
  >
    Email address
  </label>
  <input
    id="reserve-email"
    name="email"
    type="email"
    required
    autoComplete="email"
    className="brew-input"
    placeholder="you@example.com"
    value={form.email}
    onChange={handleChange}
  />
</div>
```

`handleChange` already handles all named inputs via `[name]: value` — no further changes needed there.

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors. Fix any type errors before continuing.

- [ ] **Step 5: Manual test — email field appears and submits**

With the dev server running (`npm run dev`), open http://localhost:3000, click **Reserve a Table**, confirm the email field appears between Name and Party Size, fill it in, and submit. Check the owner inbox — the notification email should now include the customer's email in the table.

- [ ] **Step 6: Commit**

```bash
git add lib/types.ts components/ReserveModal.tsx
git commit -m "feat: add email field to reservation form and type"
```

---

## Task 2: Add Accept / Reject buttons to the owner notification email

**Files:**
- Modify: `app/api/reserve/route.ts`

**Interfaces:**
- Consumes: `Reservation` with `email: string` (from Task 1)
- Produces: owner email containing Accept/Reject links encoding `base64url(JSON.stringify(reservation))`

---

- [ ] **Step 1: Update the POST handler to encode reservation data and build action URLs**

Replace the entire `app/api/reserve/route.ts` with:

```ts
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, partySize, date, time } = await request.json();

  if (!name || !email || !partySize || !date || !time) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const origin = new URL(request.url).origin;
  const encodedData = Buffer.from(
    JSON.stringify({ name, email, partySize, date, time })
  ).toString("base64url");

  const acceptUrl = `${origin}/reservations/respond?action=accept&data=${encodedData}`;
  const rejectUrl = `${origin}/reservations/respond?action=reject&data=${encodedData}`;

  const btnBase = "display:inline-block;padding:10px 24px;border-radius:8px;font-weight:600;text-decoration:none;font-size:15px;";

  const { error } = await resend.emails.send({
    from: "Brewing Coal <onboarding@resend.dev>",
    to: "andys00@live.co.uk",
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
            <td style="padding: 8px 0; color: #888;">Email</td>
            <td style="padding: 8px 0; font-weight: 600;">${email}</td>
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
```

- [ ] **Step 2: Manual test — submit a reservation and verify the email**

Submit a reservation via the form (use `09:00` as the time — stays within the `07:00–17:30` max). Check `andys00@live.co.uk`. Confirm:
- The email now includes the customer's email address in the table
- Two buttons (Accept / Reject) are visible
- Hovering over the buttons shows URLs containing `/reservations/respond?action=accept|reject&data=...`

- [ ] **Step 3: Commit**

```bash
git add app/api/reserve/route.ts
git commit -m "feat: add accept/reject buttons to owner reservation email"
```

---

## Task 3: Create the respond page and form component

**Files:**
- Create: `components/RespondForm.tsx`
- Create: `app/reservations/respond/page.tsx`

**Interfaces:**
- Consumes: `action: "accept" | "reject"`, `data: string` (base64url), `reservation: Reservation`
- Produces: a page at `/reservations/respond?action=...&data=...` with an editable form; POSTs to `/api/reserve/respond`

---

- [ ] **Step 1: Create the RespondForm client component**

Create `components/RespondForm.tsx`:

```tsx
"use client";

import { useState } from "react";
import type { Reservation } from "@/lib/types";

type Action = "accept" | "reject";

function defaultMessage(action: Action, r: Reservation): string {
  if (action === "accept") {
    return `Hi ${r.name}, great news — your table for ${r.partySize} on ${r.date} at ${r.time} is confirmed. We look forward to seeing you at Brewing Coal. If anything changes, just reply to this email.`;
  }
  return `Hi ${r.name}, thank you for your reservation request. Unfortunately we're unable to accommodate your party of ${r.partySize} on ${r.date} at ${r.time}. We hope to see you another time — feel free to get in touch if you'd like to try a different date.`;
}

export default function RespondForm({
  action,
  data,
  reservation,
}: {
  action: Action;
  data: string;
  reservation: Reservation;
}) {
  const [message, setMessage] = useState(() => defaultMessage(action, reservation));
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/reserve/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, data, message }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const accentColor = action === "accept" ? "#1D5C45" : "#c0392b";

  if (status === "sent") {
    return (
      <main style={{ padding: "2rem", maxWidth: "480px", margin: "4rem auto", fontFamily: "sans-serif" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          {action === "accept" ? "✓" : "✗"}
        </div>
        <h1 style={{ color: accentColor, marginBottom: "0.5rem" }}>Email sent</h1>
        <p style={{ color: "#555" }}>
          {action === "accept" ? "Confirmation" : "Decline"} sent to{" "}
          <strong>{reservation.email}</strong>.
        </p>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "520px", margin: "4rem auto", fontFamily: "sans-serif" }}>
      <h1 style={{ color: accentColor, marginBottom: "0.25rem" }}>
        {action === "accept" ? "Accept" : "Decline"} reservation
      </h1>
      <p style={{ color: "#666", marginTop: 0, marginBottom: "1.5rem", fontSize: "0.95rem" }}>
        {reservation.name} · {reservation.partySize}{" "}
        {reservation.partySize === 1 ? "person" : "people"} · {reservation.date} at {reservation.time}
      </p>

      <form onSubmit={handleSubmit}>
        <label
          htmlFor="respond-message"
          style={{ display: "block", fontWeight: 600, marginBottom: "0.5rem", fontSize: "0.9rem" }}
        >
          Message to {reservation.name}
        </label>
        <textarea
          id="respond-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={7}
          style={{
            width: "100%",
            padding: "0.75rem",
            fontSize: "0.95rem",
            lineHeight: 1.6,
            borderRadius: "8px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
            resize: "vertical",
          }}
        />

        {status === "error" && (
          <p style={{ color: "#c0392b", marginTop: "0.5rem", fontSize: "0.9rem" }}>
            Something went wrong — please try again.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          style={{
            marginTop: "1rem",
            padding: "0.75rem 1.75rem",
            background: accentColor,
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: status === "sending" ? "not-allowed" : "pointer",
            opacity: status === "sending" ? 0.7 : 1,
          }}
        >
          {status === "sending"
            ? "Sending…"
            : action === "accept"
            ? "Send confirmation"
            : "Send decline"}
        </button>
      </form>
    </main>
  );
}
```

- [ ] **Step 2: Create the respond page (server component)**

Create `app/reservations/respond/page.tsx`:

```tsx
import RespondForm from "@/components/RespondForm";
import type { Reservation } from "@/lib/types";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ action?: string; data?: string }>;
}) {
  const { action, data } = await searchParams;

  if (!action || !data || (action !== "accept" && action !== "reject")) {
    return (
      <main style={{ padding: "2rem", maxWidth: "480px", margin: "4rem auto", fontFamily: "sans-serif" }}>
        <h1>Invalid link</h1>
        <p style={{ color: "#666" }}>This reservation link is missing or has expired.</p>
      </main>
    );
  }

  let reservation: Reservation;
  try {
    reservation = JSON.parse(
      Buffer.from(data, "base64url").toString("utf-8")
    ) as Reservation;
  } catch {
    return (
      <main style={{ padding: "2rem", maxWidth: "480px", margin: "4rem auto", fontFamily: "sans-serif" }}>
        <h1>Invalid link</h1>
        <p style={{ color: "#666" }}>This reservation link is missing or has expired.</p>
      </main>
    );
  }

  return (
    <RespondForm
      action={action as "accept" | "reject"}
      data={data}
      reservation={reservation}
    />
  );
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Manual test — navigate to respond page with a test URL**

In Node.js, generate a test URL:

```bash
node -e "const d = Buffer.from(JSON.stringify({name:'Andrew',email:'andys00@live.co.uk',partySize:2,date:'2026-06-28',time:'09:00'})).toString('base64url'); console.log('http://localhost:3000/reservations/respond?action=accept&data=' + d)"
```

Copy the printed URL and open it in the browser. Confirm:
- Page loads with the heading "Accept reservation"
- Shows the booking summary (Andrew, 2 people, 2026-06-28 at 09:00)
- Textarea is pre-filled with the default confirmation message
- Test the reject URL too: change `action=accept` to `action=reject` and confirm the red styling and decline default message appear
- Test the invalid link: visit `/reservations/respond` with no params — confirm "Invalid link" message appears

- [ ] **Step 5: Commit**

```bash
git add components/RespondForm.tsx app/reservations/respond/page.tsx
git commit -m "feat: add reservation respond page and form component"
```

---

## Task 4: Create the respond API route

**Files:**
- Create: `app/api/reserve/respond/route.ts`

**Interfaces:**
- Consumes: POST body `{ action: "accept" | "reject", data: string, message: string }`
- `data` is base64url-encoded `Reservation` JSON (same encoding as Task 2)
- Produces: sends email to `reservation.email` via Resend; returns `{ success: true }` or `{ error: string }`

---

- [ ] **Step 1: Create the respond API route**

Create `app/api/reserve/respond/route.ts`:

```ts
import { Resend } from "resend";
import { NextResponse } from "next/server";
import type { Reservation } from "@/lib/types";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const { action, data, message } = body as {
    action: string;
    data: string;
    message: string;
  };

  if (!action || !data || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (action !== "accept" && action !== "reject") {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  let reservation: Reservation;
  try {
    reservation = JSON.parse(
      Buffer.from(data, "base64url").toString("utf-8")
    ) as Reservation;
  } catch {
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
    to: reservation.email,
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Manual test — POST to the respond route**

Generate a test payload in PowerShell:

```powershell
$data = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes('{"name":"Andrew","email":"andys00@live.co.uk","partySize":2,"date":"2026-06-28","time":"09:00"}')) -replace '\+','-' -replace '/','_' -replace '=',''
$body = "{`"action`":`"accept`",`"data`":`"$data`",`"message`":`"Hi Andrew, your table is confirmed!`"}"
Invoke-WebRequest -Uri http://localhost:3000/api/reserve/respond -Method POST -Body $body -ContentType "application/json" -UseBasicParsing | Select-Object StatusCode, Content
```

Expected: `StatusCode: 200`, `Content: {"success":true}`

Check `andys00@live.co.uk` for the confirmation email.

- [ ] **Step 4: End-to-end test — full flow**

1. Open http://localhost:3000, click **Reserve a Table**
2. Fill in: name, email (`andys00@live.co.uk`), party size, a date, time `09:00`
3. Submit — check `andys00@live.co.uk` for the owner notification with Accept/Reject buttons
4. Click **Accept** — confirm the respond page opens with correct booking summary and pre-filled message
5. Edit the message slightly, click **Send confirmation**
6. Confirm "Email sent" screen appears
7. Check `andys00@live.co.uk` again for the confirmation email sent to the customer
8. Repeat from step 1, this time click **Reject** and verify the decline flow works

- [ ] **Step 5: Commit**

```bash
git add app/api/reserve/respond/route.ts
git commit -m "feat: add reservation respond API route for accept/reject emails"
```
