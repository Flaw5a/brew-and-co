"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { Reservation } from "@/lib/types";

type FormState = "idle" | "submitting" | "success";

export default function ReserveModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState<Reservation>({
    name: "",
    partySize: 2,
    date: "",
    time: "",
  });

  function open() {
    setIsOpen(true);
    setFormState("idle");
  }

  function close() {
    setIsOpen(false);
    setForm({ name: "", partySize: 2, date: "", time: "" });
    setFormState("idle");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "partySize" ? parseInt(value, 10) : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("submitting");
    // Simulate async submission (no backend)
    setTimeout(() => setFormState("success"), 800);
  }

  return (
    <>
      {/* Trigger button */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={open}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        Reserve a Table
      </button>

      {/* Modal overlay */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reserve-modal-title"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(26, 17, 8, 0.6)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            className="relative w-full"
            style={{
              maxWidth: "480px",
              backgroundColor: "var(--brew-cream)",
              borderRadius: "var(--brew-radius-xl)",
              padding: "var(--brew-space-10)",
              boxShadow: "var(--brew-shadow-lg)",
            }}
          >
            {/* Close button */}
            <button
              type="button"
              className="btn btn-ghost absolute"
              style={{ top: "var(--brew-space-4)", right: "var(--brew-space-4)", padding: "var(--brew-space-2)" }}
              onClick={close}
              aria-label="Close reservation form"
            >
              <X size={20} aria-hidden="true" />
            </button>

            {formState === "success" ? (
              /* Success state */
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "var(--brew-space-6)",
                  paddingBlock: "var(--brew-space-6)",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(29,92,69,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                  }}
                >
                  ☕
                </div>
                <h2
                  id="reserve-modal-title"
                  className="font-display"
                  style={{ fontSize: "var(--brew-heading-lg)", color: "var(--brew-espresso)" }}
                >
                  We&apos;ll keep a seat warm
                </h2>
                <p style={{ fontSize: "var(--brew-body-md)", color: "rgba(26,17,8,0.65)", maxWidth: "32ch" }}>
                  Thanks, {form.name}. Your reservation request for {form.partySize}{" "}
                  {form.partySize === 1 ? "person" : "people"} on {form.date} at {form.time} is
                  noted. We&apos;ll be in touch to confirm.
                </p>
                <button type="button" className="btn btn-primary" onClick={close}>
                  Close
                </button>
              </div>
            ) : (
              /* Form state */
              <>
                <p className="text-eyebrow" style={{ marginBottom: "var(--brew-space-3)" }}>
                  Brewing Coal · Glasgow
                </p>
                <h2
                  id="reserve-modal-title"
                  className="font-display"
                  style={{
                    fontSize: "var(--brew-heading-lg)",
                    color: "var(--brew-espresso)",
                    marginBottom: "var(--brew-space-6)",
                  }}
                >
                  Reserve a Table
                </h2>

                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "var(--brew-space-5)" }}
                >
                  {/* Name */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--brew-space-2)" }}>
                    <label
                      htmlFor="reserve-name"
                      style={{ fontSize: "var(--brew-body-sm)", fontWeight: 500, color: "var(--brew-espresso)" }}
                    >
                      Your name
                    </label>
                    <input
                      id="reserve-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className="brew-input"
                      placeholder="First and last name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Party size */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--brew-space-2)" }}>
                    <label
                      htmlFor="reserve-party"
                      style={{ fontSize: "var(--brew-body-sm)", fontWeight: 500, color: "var(--brew-espresso)" }}
                    >
                      Party size
                    </label>
                    <select
                      id="reserve-party"
                      name="partySize"
                      required
                      className="brew-input"
                      value={form.partySize}
                      onChange={handleChange}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "person" : "people"}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date + Time row */}
                  <div
                    className="grid"
                    style={{ gridTemplateColumns: "1fr 1fr", gap: "var(--brew-space-4)" }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--brew-space-2)" }}>
                      <label
                        htmlFor="reserve-date"
                        style={{ fontSize: "var(--brew-body-sm)", fontWeight: 500, color: "var(--brew-espresso)" }}
                      >
                        Date
                      </label>
                      <input
                        id="reserve-date"
                        name="date"
                        type="date"
                        required
                        className="brew-input"
                        value={form.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--brew-space-2)" }}>
                      <label
                        htmlFor="reserve-time"
                        style={{ fontSize: "var(--brew-body-sm)", fontWeight: 500, color: "var(--brew-espresso)" }}
                      >
                        Preferred time
                      </label>
                      <input
                        id="reserve-time"
                        name="time"
                        type="time"
                        required
                        className="brew-input"
                        value={form.time}
                        onChange={handleChange}
                        min="07:00"
                        max="17:30"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ marginTop: "var(--brew-space-2)", width: "100%" }}
                    disabled={formState === "submitting"}
                  >
                    {formState === "submitting" ? "Sending…" : "Request Reservation"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
