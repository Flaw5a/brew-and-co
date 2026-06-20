import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "How Catriona MacAllister and Fraser Docherty opened Brewing Coal in Glasgow after falling in love with specialty coffee in their twenties.",
};

const FOUNDERS_IMAGE =
  "https://images.pexels.com/photos/3182759/pexels-photo-3182759.jpeg?auto=compress&cs=tinysrgb&w=1200";

const ROASTING_IMAGE =
  "https://images.pexels.com/photos/3907506/pexels-photo-3907506.jpeg?auto=compress&cs=tinysrgb&w=1200";

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "var(--brew-cream)" }}>
      {/* Page hero */}
      <section
        style={{
          paddingBlock: "var(--brew-space-20)",
          backgroundColor: "var(--brew-forest)",
        }}
      >
        <div className="brew-container">
          <p className="text-eyebrow" style={{ marginBottom: "var(--brew-space-4)" }}>
            Our Story
          </p>
          <h1
            className="font-display"
            style={{
              fontSize: "var(--brew-display-lg)",
              color: "var(--brew-white)",
              maxWidth: "16ch",
              lineHeight: 1.1,
            }}
          >
            Built on caffeine, stubbornness, and love
          </h1>
        </div>
      </section>

      <div className="pour-line" aria-hidden="true" />

      {/* Main story */}
      <section style={{ paddingBlock: "var(--brew-space-20)" }}>
        <div
          className="brew-container grid"
          style={{
            gridTemplateColumns: "1fr",
            gap: "var(--brew-space-16)",
          }}
        >
          {/* Founders image + intro */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: "1fr",
              gap: "var(--brew-space-10)",
              alignItems: "center",
            }}
          >
            <div
              className="relative"
              style={{
                aspectRatio: "4/3",
                borderRadius: "var(--brew-radius-xl)",
                overflow: "hidden",
              }}
            >
              <Image
                src={FOUNDERS_IMAGE}
                alt="Catriona MacAllister and Fraser Docherty at the Brewing Coal counter"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--brew-space-6)" }}>
              <p className="text-eyebrow">The Founders</p>
              <h2
                className="font-display"
                style={{ fontSize: "var(--brew-display-md)", color: "var(--brew-espresso)" }}
              >
                Catriona &amp; Fraser
              </h2>
              <p
                style={{
                  fontSize: "var(--brew-body-lg)",
                  color: "rgba(26,17,8,0.75)",
                  maxWidth: "60ch",
                  lineHeight: 1.7,
                }}
              >
                Brewing Coal started as an argument. Catriona MacAllister and Fraser Docherty
                had been flatmates at Glasgow University in 2010, and the argument — conducted
                over instant coffee at 2am — was whether a well-made espresso could ever beat
                a pot of builder&apos;s brew.
              </p>
              <p
                style={{
                  fontSize: "var(--brew-body-md)",
                  color: "rgba(26,17,8,0.65)",
                  maxWidth: "60ch",
                  lineHeight: 1.7,
                }}
              >
                Catriona won, mostly because she made Fraser try his first proper cortado at
                a tiny café in Barcelona the following summer. Something clicked. They spent
                the next eight years working in hospitality — Catriona managing a restaurant
                in Edinburgh, Fraser roasting for a specialty importer in London — quietly
                building toward a place they&apos;d want to spend their own mornings.
              </p>
            </div>
          </div>

          {/* Story continuation */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: "1fr",
              gap: "var(--brew-space-10)",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--brew-space-6)" }}>
              <p className="text-eyebrow">The Name</p>
              <h2
                className="font-display"
                style={{ fontSize: "var(--brew-heading-lg)", color: "var(--brew-espresso)" }}
              >
                Why Brewing Coal?
              </h2>
              <p
                style={{
                  fontSize: "var(--brew-body-md)",
                  color: "rgba(26,17,8,0.65)",
                  maxWidth: "60ch",
                  lineHeight: 1.7,
                }}
              >
                Fraser found the unit in the Merchant City in 2018. It had been a coal
                merchant&apos;s yard in a former life — whitewashed walls, worn stone floors,
                and a single south-facing window that threw light across the room at exactly
                the right angle each morning. They kept the name because it felt honest.
                Glasgow was built on industry; their coffee deserved to be built the same way.
              </p>
              <p
                style={{
                  fontSize: "var(--brew-body-md)",
                  color: "rgba(26,17,8,0.65)",
                  maxWidth: "60ch",
                  lineHeight: 1.7,
                }}
              >
                They opened on a Tuesday in October, served thirty-two people, and sold out
                of banana bread by half nine. Eight years later, Catriona still bakes the
                loaves herself on weekend mornings. Fraser runs the Saturday tasting sessions
                and hasn&apos;t stopped arguing about coffee since.
              </p>
            </div>

            <div
              className="relative"
              style={{
                aspectRatio: "4/3",
                borderRadius: "var(--brew-radius-xl)",
                overflow: "hidden",
              }}
            >
              <Image
                src={ROASTING_IMAGE}
                alt="Fraser roasting coffee at Brewing Coal"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values strip */}
      <section
        style={{
          paddingBlock: "var(--brew-space-16)",
          backgroundColor: "var(--brew-stone)",
        }}
      >
        <div
          className="brew-container grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "var(--brew-space-8)",
          }}
        >
          {[
            { label: "Origin-focused", body: "Every bean is traceable. We only buy from farms we've vetted." },
            { label: "Roasted here", body: "Fraser roasts small batches in the back of the shop, twice a week." },
            { label: "Neighbourhood first", body: "Our regulars get their order started when they walk through the door." },
            { label: "No faff", body: "The menu is short. Everything on it is excellent. That's the deal." },
          ].map((value) => (
            <div key={value.label} style={{ display: "flex", flexDirection: "column", gap: "var(--brew-space-3)" }}>
              <h3
                className="font-display"
                style={{ fontSize: "var(--brew-heading-sm)", color: "var(--brew-espresso)" }}
              >
                {value.label}
              </h3>
              <p style={{ fontSize: "var(--brew-body-sm)", color: "rgba(26,17,8,0.65)", lineHeight: 1.6 }}>
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
