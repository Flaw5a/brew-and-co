import type { Metadata } from "next";
import Link from "next/link";
import { menuItems, categories, categoryImages } from "@/lib/menu-data";
import MenuCategorySection from "@/components/MenuCategorySection";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse the full Brewing Coal menu — espresso drinks, cold drinks, fresh pastries, and light lunches in Glasgow.",
};

export default function MenuPage() {
  return (
    <div style={{ backgroundColor: "var(--brew-cream)" }}>
      {/* Page header */}
      <div
        style={{
          paddingBlock: "var(--brew-space-16)",
          backgroundColor: "var(--brew-forest)",
        }}
      >
        <div className="brew-container">
          <p className="text-eyebrow" style={{ marginBottom: "var(--brew-space-4)" }}>
            Brewing Coal
          </p>
          <h1
            className="font-display"
            style={{ fontSize: "var(--brew-display-lg)", color: "var(--brew-white)" }}
          >
            The Menu
          </h1>
          <p
            style={{
              fontSize: "var(--brew-body-lg)",
              color: "rgba(245,239,230,0.75)",
              marginTop: "var(--brew-space-4)",
              maxWidth: "52ch",
              lineHeight: 1.6,
            }}
          >
            Everything made with care. The menu is short because we mean every item on it.
          </p>
        </div>
      </div>

      {/* Sticky category navigation */}
      <nav
        aria-label="Menu categories"
        style={{
          position: "sticky",
          top: "72px",
          zIndex: 40,
          backgroundColor: "var(--brew-white)",
          borderBottom: "1px solid var(--brew-stone)",
          boxShadow: "var(--brew-shadow-sm)",
          overflowX: "auto",
        }}
      >
        <div
          className="brew-container"
          style={{
            display: "flex",
            gap: "var(--brew-space-1)",
            paddingBlock: "var(--brew-space-3)",
            whiteSpace: "nowrap",
          }}
        >
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`#category-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className="btn btn-ghost"
              style={{
                fontSize: "var(--brew-label)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "0.4rem 0.75rem",
              }}
            >
              {cat}
            </Link>
          ))}
        </div>
      </nav>

      <div className="pour-line" aria-hidden="true" />

      {/* Category sections */}
      <div style={{ paddingTop: "var(--brew-space-12)" }}>
        {categories.map((category) => {
          const items = menuItems.filter((item) => item.category === category);
          const imageUrl = categoryImages[category];
          return (
            <MenuCategorySection
              key={category}
              category={category}
              items={items}
              imageUrl={imageUrl}
            />
          );
        })}
      </div>
    </div>
  );
}
