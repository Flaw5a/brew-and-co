import type { MenuItem } from "@/lib/types";

interface Props {
  item: MenuItem;
}

export default function MenuItemCard({ item }: Props) {
  return (
    <article
      className="product-card"
      aria-label={`${item.name} – £${item.price.toFixed(2)}`}
    >
      {/* Colour-block image placeholder */}
      <div
        className="product-card-image flex items-center justify-center"
        style={{ backgroundColor: "var(--brew-cream)" }}
      >
        <span style={{ fontSize: "3.5rem" }} aria-hidden="true">
          {categoryEmoji(item.category)}
        </span>
      </div>

      <div className="product-card-body">
        {item.badge && (
          <p className="product-card-eyebrow">{item.badge}</p>
        )}
        <h3 className="product-card-name">{item.name}</h3>
        <p className="product-card-notes">{item.description}</p>
      </div>

      <div className="product-card-footer">
        <span className="text-price" aria-label={`Price: £${item.price.toFixed(2)}`}>
          £{item.price.toFixed(2)}
        </span>
      </div>
    </article>
  );
}

function categoryEmoji(category: string): string {
  const map: Record<string, string> = {
    Espresso: "☕",
    Drinks: "🥛",
    "Cold Drinks": "🧊",
    Pastries: "🥐",
    Sandwiches: "🥪",
  };
  return map[category] ?? "☕";
}
