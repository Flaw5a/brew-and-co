import RespondForm from "@/components/RespondForm";
import type { Reservation } from "@/lib/types";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ action?: string; data?: string; sig?: string }>;
}) {
  const { action, data, sig } = await searchParams;

  if (!action || !data || !sig || (action !== "accept" && action !== "reject")) {
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
      sig={sig}
      reservation={reservation}
    />
  );
}
