import { popularItems } from "@/lib/menu-data";
import MenuItemCard from "@/components/MenuItemCard";
import Link from "next/link";

export default function PopularSection() {
  return (
    <section
      style={{
        paddingBlock: "var(--brew-space-20)",
        backgroundColor: "var(--brew-cream)",
      }}
    >
      <div className="brew-container">
        {/* Section header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "var(--brew-space-6)",
            marginBottom: "var(--brew-space-10)",
          }}
        >
          <div>
            <p className="text-eyebrow" style={{ marginBottom: "var(--brew-space-3)" }}>
              Most Loved
            </p>
            <h2
              className="font-display"
              style={{ fontSize: "var(--brew-display-md)", color: "var(--brew-espresso)" }}
            >
              Our favourites
            </h2>
          </div>
          <Link href="/menu" className="btn btn-secondary">
            Full Menu
          </Link>
        </div>

        <div
          className="pour-line"
          aria-hidden="true"
          style={{ marginBottom: "var(--brew-space-10)" }}
        />

        {/* Items grid — up to 6 popular items */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "var(--brew-space-6)",
          }}
        >
          {popularItems.slice(0, 6).map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
