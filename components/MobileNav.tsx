"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "Our Story" },
  { href: "/#events", label: "Events" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        style={{ padding: "var(--brew-space-2)", color: "var(--brew-espresso)" }}
      >
        {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>

      {open && (
        <div
          className="absolute left-0 right-0"
          style={{
            top: "72px",
            backgroundColor: "var(--brew-cream)",
            borderBottom: "1px solid var(--brew-stone)",
            boxShadow: "var(--brew-shadow-md)",
            zIndex: 49,
          }}
        >
          <nav aria-label="Mobile navigation">
            <ul
              role="list"
              style={{
                margin: 0,
                padding: "var(--brew-space-4) var(--brew-space-6)",
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "var(--brew-space-1)",
              }}
            >
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="nav-link"
                    style={{ display: "block", padding: "var(--brew-space-3) 0", fontSize: "var(--brew-body-md)" }}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
