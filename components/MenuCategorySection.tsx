import Image from "next/image";
import type { MenuItem } from "@/lib/types";
import MenuItemCard from "@/components/MenuItemCard";

interface Props {
  category: string;
  items: MenuItem[];
  imageUrl: string;
}

export default function MenuCategorySection({ category, items, imageUrl }: Props) {
  return (
    <section
      id={`category-${category.toLowerCase().replace(/\s+/g, "-")}`}
      style={{
        paddingBottom: "var(--brew-space-16)",
      }}
    >
      {/* Category banner */}
      <div
        className="relative"
        style={{
          height: "200px",
          overflow: "hidden",
          marginBottom: "var(--brew-space-8)",
        }}
      >
        <Image
          src={imageUrl}
          alt={`${category} — Brewing Coal`}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 flex items-end"
          style={{
            background:
              "linear-gradient(to top, rgba(13,59,43,0.88) 0%, rgba(13,59,43,0.2) 60%, transparent 100%)",
            padding: "var(--brew-space-8)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute brew-container"
          style={{ bottom: "var(--brew-space-6)", left: "50%", transform: "translateX(-50%)", width: "100%" }}
        >
          <h2
            className="font-display"
            style={{ fontSize: "var(--brew-display-md)", color: "var(--brew-white)" }}
          >
            {category}
          </h2>
        </div>
      </div>

      {/* Items grid */}
      <div className="brew-container">
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "var(--brew-space-6)",
          }}
        >
          {items.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
