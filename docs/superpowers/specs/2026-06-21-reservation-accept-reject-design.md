# Reservation Accept / Reject Email Flow

**Date:** 2026-06-21  
**Status:** Approved

---

## Overview

When a customer submits a reservation request, the owner receives an email notification. This design adds Accept and Reject buttons to that email. Clicking either button opens a response page where the owner can customise a pre-filled message before sending it to the customer.

---

## Changes to the Reservation Form

Add an **email** field to `ReserveModal.tsx` and the `Reservation` type in `lib/types.ts`. This is required so the system knows where to send the accept/reject reply.

- Field: email address, required, type="email"
- Positioned after the name field
- Validated client-side by the browser's native email input validation

---

## Data Flow

```
Customer submits form
  → POST /api/reserve
    → Sends owner notification email (with Accept / Reject buttons)
    → Links encode reservation data as base64 JSON in the URL query string

Owner clicks Accept or Reject
  → Browser opens /reservations/respond?action=accept|reject&data=<base64>
    → Page pre-fills a default message
    → Owner optionally edits the message
    → Owner clicks Send

  → POST /api/reserve/respond { action, data, message }
    → Decodes reservation from data param
    → Sends email to customer's email address
    → Returns { success: true }

Response page shows confirmation ("Email sent")
```

---

## URL Encoding

Reservation data is encoded as `base64(JSON.stringify(reservation))` and passed as the `data` query param. The payload is small (~100 bytes unencoded), so URL length is not a concern.

No signing or HMAC is required — links are sent only to the owner's private email inbox.

---

## Components

### `lib/types.ts`
Add `email: string` to the `Reservation` type.

### `components/ReserveModal.tsx`
- Add `email` field to form state (initial value `""`)
- Add email input after the name field
- Include `email` in the POST body to `/api/reserve`

### `app/api/reserve/route.ts`
Update the owner notification email to include two call-to-action buttons:

- **Accept** → `https://<host>/reservations/respond?action=accept&data=<base64>`
- **Reject** → `https://<host>/reservations/respond?action=reject&data=<base64>`

The host is read from the `NEXT_PUBLIC_SITE_URL` environment variable (fallback: `http://localhost:3000`).

### `app/reservations/respond/page.tsx`
New Next.js page. Reads `action` and `data` from the URL search params.

- Decodes reservation from `data`
- Shows a summary of the booking (name, date, time, party size)
- Pre-fills a textarea with the default message for that action (see below)
- Owner can edit the message
- Submit button POSTs to `/api/reserve/respond`
- On success: shows "Email sent" confirmation inline (no redirect)

### `app/api/reserve/respond/route.ts`
New API route. Accepts POST with body `{ action: "accept" | "reject", data: string, message: string }`.

- Decodes reservation from `data`
- Sends email to `reservation.email` via Resend
- Subject line:
  - Accept: `Your reservation at Brewing Coal is confirmed`
  - Reject: `Your reservation request at Brewing Coal`
- Returns `{ success: true }` or `{ error: string }` with appropriate status

---

## Default Email Messages

**Accept (pre-filled, editable):**
> Hi [name], great news — your table for [partySize] on [date] at [time] is confirmed. We look forward to seeing you at Brewing Coal. If anything changes, just reply to this email.

**Reject (pre-filled, editable):**
> Hi [name], thank you for your reservation request. Unfortunately we're unable to accommodate your party of [partySize] on [date] at [time]. We hope to see you another time — feel free to get in touch if you'd like to try a different date.

---

## Environment Variables

Add to `.env.local`:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

In production this should be set to the live domain (e.g. `https://brewingcoal.co.uk`).

---

## Error Handling

- If `data` param is missing or malformed on the respond page: show a simple "Invalid link" message.
- If the Resend API call fails: show an inline error on the respond page with a retry button.
- Form validation: email field is `required` and `type="email"` — browser handles basic validation.

---

## Resend Sandbox Note

The Resend account is currently in sandbox mode — outbound emails can only go to the account owner's address (`andys00@live.co.uk`). To send accept/reject emails to real customers, the domain `city-holdings.co.uk` (or a dedicated sending domain) must be verified at resend.com/domains. This is a Resend account configuration step, not a code change.

---

## Out of Scope

- Authentication on the respond page (owner-only access). The link security relies on it being sent to a private email inbox.
- Storing reservation history or status.
- SMS notifications.
- A customer-facing booking confirmation page.
