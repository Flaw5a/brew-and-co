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
