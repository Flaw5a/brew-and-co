import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--brew-canopy)",
        color: "rgba(245,239,230,0.8)",
        paddingBlock: "var(--brew-space-12)",
      }}
    >
      <div className="brew-container">
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "var(--brew-space-10)",
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--brew-space-4)" }}>
            <span
              className="font-display"
              style={{ fontSize: "1.5rem", color: "var(--brew-white)" }}
            >
              Brewing Coal
            </span>
            <p style={{ fontSize: "var(--brew-body-sm)", lineHeight: 1.6, maxWidth: "32ch" }}>
              A cosy neighbourhood coffee shop in the heart of Glasgow. Come as you are.
            </p>
          </div>

          {/* Visit */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--brew-space-3)" }}>
            <h3 className="text-eyebrow" style={{ color: "var(--brew-amber)" }}>Visit Us</h3>
            <address
              style={{
                fontStyle: "normal",
                fontSize: "var(--brew-body-sm)",
                lineHeight: 1.8,
              }}
            >
              42 Argyle Street<br />
              Glasgow, G2 8AH<br />
              Scotland
            </address>
          </div>

          {/* Hours */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--brew-space-3)" }}>
            <h3 className="text-eyebrow" style={{ color: "var(--brew-amber)" }}>Hours</h3>
            <dl style={{ fontSize: "var(--brew-body-sm)", lineHeight: 2 }}>
              <div className="flex justify-between" style={{ gap: "var(--brew-space-6)" }}>
                <dt>Mon – Fri</dt><dd>7:00 – 18:00</dd>
              </div>
              <div className="flex justify-between" style={{ gap: "var(--brew-space-6)" }}>
                <dt>Saturday</dt><dd>8:00 – 17:00</dd>
              </div>
              <div className="flex justify-between" style={{ gap: "var(--brew-space-6)" }}>
                <dt>Sunday</dt><dd>9:00 – 15:00</dd>
              </div>
            </dl>
          </div>

          {/* Nav */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--brew-space-3)" }}>
            <h3 className="text-eyebrow" style={{ color: "var(--brew-amber)" }}>Explore</h3>
            <ul
              role="list"
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "var(--brew-space-2)",
                fontSize: "var(--brew-body-sm)",
              }}
            >
              <li><Link href="/menu" className="nav-link-inverted" style={{ fontSize: "inherit" }}>Menu</Link></li>
              <li><Link href="/about" className="nav-link-inverted" style={{ fontSize: "inherit" }}>Our Story</Link></li>
              <li><Link href="/#events" className="nav-link-inverted" style={{ fontSize: "inherit" }}>Events</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(245,239,230,0.1)",
            marginTop: "var(--brew-space-10)",
            paddingTop: "var(--brew-space-6)",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "var(--brew-space-4)",
            fontSize: "var(--brew-label)",
            letterSpacing: "0.04em",
            color: "rgba(245,239,230,0.4)",
          }}
        >
          <span>© 2026 Brewing Coal. All rights reserved.</span>
          <span>Glasgow, Scotland</span>
        </div>
      </div>
    </footer>
  );
}
