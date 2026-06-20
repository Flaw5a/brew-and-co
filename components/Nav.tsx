import Link from "next/link";
import ReserveModal from "@/components/ReserveModal";
import MobileNav from "@/components/MobileNav";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "Our Story" },
  { href: "/#events", label: "Events" },
];

export default function Nav() {
  return (
    <header
      className="sticky top-0 z-50 bg-cream border-b"
      style={{ borderColor: "var(--brew-stone)", boxShadow: "var(--brew-shadow-sm)" }}
    >
      <div className="brew-container">
        <nav
          className="flex items-center justify-between"
          style={{ height: "72px" }}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-espresso"
            style={{ fontSize: "1.4rem", letterSpacing: "-0.02em" }}
            aria-label="Brewing Coal home"
          >
            Brewing Coal
          </Link>

          {/* Desktop links */}
          <ul
            className="hidden lg:flex items-center list-none m-0 p-0"
            style={{ gap: "var(--brew-space-8)" }}
            role="list"
          >
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="nav-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Reserve CTA + Mobile menu toggle */}
          <div className="flex items-center" style={{ gap: "var(--brew-space-3)" }}>
            <ReserveModal />
            <MobileNav />
          </div>
        </nav>
      </div>
    </header>
  );
}
