import Image from "next/image";
import { upcomingEvents } from "@/lib/events-data";
import type { BrewEvent } from "@/lib/types";

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function EventCard({ event }: { event: BrewEvent }) {
  return (
    <article
      className="relative overflow-hidden"
      style={{
        borderRadius: "var(--brew-radius-lg)",
        backgroundColor: "var(--brew-white)",
        boxShadow: "var(--brew-shadow-sm)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Event image */}
      <div className="relative" style={{ aspectRatio: "16/9", overflow: "hidden" }}>
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
        {/* Event type badge */}
        <div
          className="absolute"
          style={{ top: "var(--brew-space-4)", left: "var(--brew-space-4)" }}
        >
          <span className={`badge ${event.type === "open-mic" ? "badge-forest" : "badge-amber"}`}>
            {event.type === "open-mic" ? "Open Mic" : "Coffee Tasting"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: "var(--brew-space-6)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--brew-space-3)",
          flex: 1,
        }}
      >
        <p className="text-eyebrow">{formatDate(event.date)} · {event.time}</p>
        <h3
          className="font-display"
          style={{ fontSize: "var(--brew-heading-md)", color: "var(--brew-espresso)" }}
        >
          {event.title}
        </h3>
        <p style={{ fontSize: "var(--brew-body-sm)", color: "rgba(26,17,8,0.65)", lineHeight: 1.6 }}>
          {event.description}
        </p>
      </div>
    </article>
  );
}

export default function EventsSection() {
  return (
    <section
      id="events"
      style={{
        paddingBlock: "var(--brew-space-20)",
        backgroundColor: "var(--brew-espresso)",
      }}
    >
      <div className="brew-container">
        <p
          className="text-eyebrow"
          style={{ marginBottom: "var(--brew-space-4)", color: "var(--brew-amber)" }}
        >
          What&apos;s On
        </p>
        <h2
          className="font-display"
          style={{
            fontSize: "var(--brew-display-md)",
            color: "var(--brew-white)",
            marginBottom: "var(--brew-space-10)",
          }}
        >
          Upcoming events
        </h2>

        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "var(--brew-space-6)",
          }}
        >
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
