import Image from "next/image";
import ReserveModal from "@/components/ReserveModal";
import Link from "next/link";

const HERO_IMAGE =
  "https://images.pexels.com/photos/930402/pexels-photo-930402.jpeg?auto=compress&cs=tinysrgb&w=1920";

export default function Hero() {
  return (
    <section
      className="relative flex items-end"
      style={{ minHeight: "100svh" }}
      aria-label="Welcome to Brewing Coal"
    >
      {/* Background image */}
      <Image
        src={HERO_IMAGE}
        alt="The warm interior of Brewing Coal coffee shop in Glasgow"
        fill
        priority
        quality={85}
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(13,59,43,0.92) 0%, rgba(13,59,43,0.5) 50%, rgba(13,59,43,0.15) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="brew-container relative" style={{ paddingBottom: "var(--brew-space-20)" }}>
        <div style={{ maxWidth: "640px", display: "flex", flexDirection: "column", gap: "var(--brew-space-6)" }}>
          <p className="text-eyebrow" style={{ color: "var(--brew-amber)" }}>
            Glasgow, Scotland · Est. 2018
          </p>

          <h1
            className="font-display"
            style={{
              fontSize: "var(--brew-display-xl)",
              color: "var(--brew-white)",
              lineHeight: 1.05,
            }}
          >
            Where every cup tells a story
          </h1>

          <p
            style={{
              fontSize: "var(--brew-body-lg)",
              color: "rgba(245,239,230,0.8)",
              maxWidth: "50ch",
              lineHeight: 1.6,
            }}
          >
            Craft coffee, fresh pastries, and light lunches in the heart of Glasgow.
            Open mic nights every Friday. Coffee tastings every Saturday morning.
          </p>

          <div className="flex items-center flex-wrap" style={{ gap: "var(--brew-space-4)" }}>
            <ReserveModal />
            <Link
              href="/menu"
              className="btn btn-ghost"
              style={{ color: "rgba(245,239,230,0.8)", paddingLeft: 0 }}
            >
              Browse our menu →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
