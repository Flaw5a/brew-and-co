# Brew & Co — Component Specifications

All component CSS classes are defined in `tokens.css`. This document specifies structure, variants, states, and accessibility requirements for each component.

---

## Button

### Variants

| Class | Use |
|---|---|
| `.btn.btn-primary` | Primary actions — "Shop Now", "Add to Cart", "Order" |
| `.btn.btn-secondary` | Secondary actions — "Learn More", "View Menu" |
| `.btn.btn-ghost` | Tertiary nav actions — "See All", inline text actions |
| `.btn.btn-primary-inverted` | Primary on dark/forest backgrounds |

### Structure

```html
<!-- Primary -->
<button type="button" class="btn btn-primary">
  Shop Now
</button>

<!-- With icon (Lucide React — use as SVG/component) -->
<button type="button" class="btn btn-primary">
  <svg ...aria-hidden="true" /> <!-- icon -->
  Add to Cart
</button>

<!-- As link -->
<a href="/menu" class="btn btn-secondary">
  View Menu
</a>
```

### States

| State | Visual |
|---|---|
| Default | Forest background, white text |
| Hover | Sage background |
| Active | Canopy background |
| Focus | 2px amber outline, 3px offset |
| Disabled | `opacity: 0.4`, `cursor: not-allowed`, `pointer-events: none` |

### Rules

- Always uppercase, tracked text — handled by `.btn` base class.
- Pill shape (full border radius) on all variants.
- Minimum touch target: 44×44px — ensure padding is sufficient.
- `type="button"` on non-submit buttons to prevent accidental form submission.
- Never disable a button without an explanation nearby for why it's disabled.

---

## Navigation

### Structure

```html
<header class="brew-nav" aria-label="Main navigation">
  <div class="brew-container">
    <nav class="brew-nav-inner">
      <!-- Logo -->
      <a href="/" class="brew-logo" aria-label="Brew & Co home">
        <!-- SVG logo or wordmark -->
        Brew & Co
      </a>

      <!-- Desktop links -->
      <ul class="brew-nav-links" role="list">
        <li><a href="/" class="nav-link" aria-current="page">Home</a></li>
        <li><a href="/menu" class="nav-link">Menu</a></li>
        <li><a href="/beans" class="nav-link">Whole Beans</a></li>
        <li><a href="/story" class="nav-link">Our Story</a></li>
        <li><a href="/wholesale" class="nav-link">Wholesale</a></li>
      </ul>

      <!-- Actions -->
      <div class="brew-nav-actions">
        <button class="btn btn-ghost" aria-label="Search">
          <!-- Search icon -->
        </button>
        <a href="/cart" class="btn btn-ghost" aria-label="Cart, 2 items">
          <!-- Cart icon -->
        </a>
        <a href="/menu" class="btn btn-primary">Order Now</a>
      </div>

      <!-- Mobile menu trigger -->
      <button
        class="brew-nav-hamburger btn btn-ghost"
        aria-controls="mobile-menu"
        aria-expanded="false"
        aria-label="Open menu"
      >
        <!-- Menu icon -->
      </button>
    </nav>
  </div>
</header>
```

### Layout (CSS)

```css
.brew-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--brew-cream);
  border-bottom: var(--brew-border-thin) solid var(--brew-stone);
  transition: box-shadow var(--brew-duration-fast) var(--brew-ease-default);
}

.brew-nav.scrolled {
  box-shadow: var(--brew-shadow-lg);
}

.brew-nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  gap: var(--brew-space-8);
}

.brew-nav-links {
  display: none;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: var(--brew-space-8);
}

@media (min-width: 1024px) {
  .brew-nav-links { display: flex; }
  .brew-nav-hamburger { display: none; }
}
```

### States

- Default: cream background, espresso text.
- Scrolled: adds `shadow-lg` via JS adding `.scrolled` class.
- Active route: `.nav-link[aria-current="page"]` — underline always visible.
- Mobile open: hamburger becomes close icon, `aria-expanded="true"`.

### Mobile Menu

```html
<div
  id="mobile-menu"
  role="dialog"
  aria-modal="true"
  aria-label="Navigation menu"
  class="brew-mobile-menu"
  hidden
>
  <nav>
    <ul role="list">
      <li><a href="/" class="nav-link">Home</a></li>
      <!-- ... -->
    </ul>
  </nav>
  <a href="/menu" class="btn btn-primary">Order Now</a>
</div>
```

Mobile menu slides in from the right. Remove `hidden` and set `aria-expanded="true"` on trigger when open. Trap focus inside the menu while open. Close on Escape key or backdrop click.

---

## Hero — Split Canvas

The signature hero layout. Two equal halves, colour-blocked, no background images.

### Structure

```html
<section class="hero-split" aria-label="Welcome to Brew & Co">
  <!-- Left: Text panel (forest green) -->
  <div class="hero-split-left">
    <div class="hero-split-left-inner">
      <p class="text-eyebrow">Specialty Coffee</p>
      <h1 class="font-display brew-display-xl">
        Craft in<br />every cup
      </h1>
      <p class="hero-tagline">
        We roast to order. No batches sitting on a shelf —
        just fresh coffee shipped within 48 hours of roast.
      </p>
      <div class="hero-cta-group">
        <a href="/menu" class="btn btn-primary-inverted">Shop Now</a>
        <a href="/story" class="btn btn-ghost nav-link-inverted">Our Story</a>
      </div>
    </div>
  </div>

  <!-- Right: Product panel (cream) -->
  <div class="hero-split-right">
    <div class="hero-product-float">
      <!-- next/image of featured product -->
      <div class="hero-product-badge">
        <span class="text-eyebrow">Featured</span>
        <span class="hero-product-name font-display">
          Ethiopia Yirgacheffe
        </span>
      </div>
    </div>

    <!-- Social proof -->
    <div class="hero-social-proof">
      <!-- Avatar stack + count -->
      <span class="hero-proof-text">1M+ happy customers</span>
    </div>
  </div>
</section>
```

### Layout (CSS)

```css
.hero-split {
  min-height: 100svh;
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .hero-split {
    grid-template-columns: 1fr 1fr;
  }
}

.hero-split-left {
  background-color: var(--brew-forest);
  color: var(--brew-white);
  display: flex;
  align-items: center;
  padding: var(--brew-space-24) var(--brew-gutter-desktop);
}

.hero-split-right {
  background-color: var(--brew-cream);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--brew-space-16) var(--brew-gutter-desktop);
  position: relative;
}

.hero-split-left-inner {
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: var(--brew-space-8);
}

.hero-tagline {
  font-size: var(--brew-body-lg);
  color: rgba(245, 239, 230, 0.8);
  max-width: 45ch;
  line-height: 1.6;
}

.hero-cta-group {
  display: flex;
  align-items: center;
  gap: var(--brew-space-4);
  flex-wrap: wrap;
}
```

### Motion (entrance)

On page load:
1. Left panel slides in from left: `translateX(-100%)` → `translateX(0)`, 400ms ease-out.
2. Right panel fades in: `opacity: 0` → `opacity: 1`, 400ms ease-default, delay 200ms.
3. Headline words reveal one by one: each word wrapped in `<span>`, staggered by 60ms, `translateY(20px) opacity 0` → default.

All animations respect `prefers-reduced-motion`.

---

## Product Card

### Structure

```html
<article class="product-card" aria-label="Ethiopia Yirgacheffe – Washed, £18.00">
  <!-- Image area -->
  <div class="product-card-image">
    <img
      src="/images/products/ethiopia-yirgacheffe.jpg"
      alt="Ethiopia Yirgacheffe coffee bag, 250g"
      width="400"
      height="400"
    />
  </div>

  <!-- Body -->
  <div class="product-card-body">
    <p class="text-eyebrow">Ethiopia · Washed</p>
    <h3 class="product-card-name">Yirgacheffe</h3>
    <p class="product-card-notes">Jasmine, bergamot, lemon zest</p>
  </div>

  <!-- Footer -->
  <div class="product-card-footer">
    <span class="text-price" aria-label="Price: eighteen pounds">£18.00</span>
    <button type="button" class="btn btn-primary">Add to Cart</button>
  </div>
</article>
```

### Variants

| Context | Variant |
|---|---|
| Standard grid | Default (above) |
| Featured / large | Increase image area, larger card-name size |
| Horizontal (list view) | Image 40% width, content 60% in a flex row |

### Rules

- `<article>` element with a descriptive `aria-label` (name + key detail + price).
- Product notes are 2–3 flavour descriptors only. No marketing language.
- Price always amber-coloured, tabular numerals.
- Card hover lifts 4px with shadow-md. No colour change on hover.

---

## Stats Strip

### Structure

```html
<section class="stats-strip" aria-label="Brew & Co by numbers">
  <div class="brew-container">
    <div class="stats-strip-grid">
      <div class="stat-item">
        <p class="stat-value" aria-label="46 years">46</p>
        <p class="stat-label">Years of experience</p>
      </div>
      <div class="stat-item">
        <p class="stat-value" aria-label="one million plus">1M+</p>
        <p class="stat-label">Happy customers</p>
      </div>
      <div class="stat-item">
        <p class="stat-value" aria-label="84">84</p>
        <p class="stat-label">Countries served</p>
      </div>
      <div class="stat-item">
        <p class="stat-value" aria-label="one thousand plus">1K+</p>
        <p class="stat-label">Products available</p>
      </div>
    </div>
  </div>
</section>
```

### Rules

- The section is `role="region"` implicitly via `<section aria-label="">`.
- Each stat number has an `aria-label` with the full spoken form.
- Stats strip always appears on forest green background — no cream variant.
- The pour-line appears immediately above this section.

---

## Section Header

Used as the opening of any major page section.

### Structure

```html
<header class="section-header">
  <p class="text-eyebrow">New Arrivals</p>
  <h2 class="font-display brew-display-md section-title">
    What's in the roaster
  </h2>
  <p class="section-description">
    All roasted to order this week. Ships within 48 hours.
  </p>
</header>
```

### CSS

```css
.section-header {
  display: flex;
  flex-direction: column;
  gap: var(--brew-space-4);
  max-width: 640px;
}

.section-title {
  font-size: var(--brew-display-md);
  color: var(--brew-espresso);
}

.section-description {
  font-size: var(--brew-body-lg);
  color: rgba(26, 17, 8, 0.65);
  max-width: 55ch;
  line-height: 1.6;
}
```

### Variants

| Context | Change |
|---|---|
| On forest background | All text white/cream, `text-eyebrow` stays amber |
| Centred layout | Add `text-align: center; align-items: center` |

---

## Accordion (Product Specs)

Used on product detail pages for Description, Ingredients, Brew Guide, and Tasting Notes panels.

### Structure

```html
<div class="accordion" role="list">
  <div class="accordion-item" role="listitem">
    <h3>
      <button
        class="accordion-trigger"
        aria-expanded="false"
        aria-controls="acc-description"
        id="acc-description-btn"
      >
        Description
        <svg class="accordion-icon" aria-hidden="true" ...><!-- ChevronDown --></svg>
      </button>
    </h3>
    <div
      id="acc-description"
      role="region"
      aria-labelledby="acc-description-btn"
      class="accordion-content"
      hidden
    >
      <div class="accordion-content-inner">
        <p>
          Sourced from the Gedeo Zone in southern Ethiopia,
          this washed-process coffee is light-roasted to preserve its
          naturally floral and citrus character.
        </p>
      </div>
    </div>
  </div>
  <!-- Repeat pattern for each item -->
</div>
```

### Behaviour

- Only one panel open at a time (accordion pattern), or multiple (disclosure pattern) — choose per page context. Product specs use accordion (one at a time).
- Toggle `hidden` attribute and `aria-expanded` via JavaScript.
- Animate height using CSS `grid-template-rows: 0fr` → `1fr` trick with a transition.
- Chevron rotates 180° when expanded (handled by `.accordion-trigger[aria-expanded="true"] .accordion-icon`).

---

## Size Selector

Used on drinks product pages to select cup size.

### Structure

```html
<fieldset class="size-selector-group">
  <legend class="text-eyebrow" style="margin-bottom: var(--brew-space-3);">
    Choose size
  </legend>
  <div class="size-selector" role="group">
    <button
      type="button"
      class="size-option"
      aria-pressed="false"
      aria-label="Tall, 12 oz"
    >
      <!-- Size icon (small cup SVG) -->
      <span>Tall</span>
    </button>
    <button type="button" class="size-option" aria-pressed="true" aria-label="Grande, 16 oz">
      <!-- Size icon (medium cup SVG) -->
      <span>Grande</span>
    </button>
    <button type="button" class="size-option" aria-pressed="false" aria-label="Venti, 20 oz">
      <!-- Size icon (large cup SVG) -->
      <span>Venti</span>
    </button>
  </div>
</fieldset>
```

### Rules

- Use `aria-pressed` toggle buttons, not radio inputs, since they look like buttons.
- Selected state: forest border + light forest fill.
- `<fieldset>` + `<legend>` gives the group a proper accessible name.

---

## Badge / Tag

### Structure

```html
<!-- Origin tag -->
<span class="badge badge-forest">Ethiopia</span>

<!-- Price / featured -->
<span class="badge badge-amber">New Arrival</span>

<!-- Neutral -->
<span class="badge badge-stone">Washed Process</span>
```

### Rules

- Sentence case (not all-caps) for product attribute badges.
- All-caps only for the eyebrow pattern (`text-eyebrow`), which is a separate utility.
- Never use amber badges in high-density contexts — one per component at most.

---

## Pour Line (Signature Divider)

```html
<!-- Place between major page sections -->
<div class="pour-line" aria-hidden="true"></div>
```

JavaScript to trigger animation on scroll:

```javascript
// Observe pour-line elements and add 'in-view' class
const lines = document.querySelectorAll('.pour-line');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
lines.forEach((line) => observer.observe(line));
```

In React/Next.js, use a `useEffect` hook or a custom `usePourLine` hook on the component.

---

## Page Layout Patterns

### Product Grid

```
[Section Header — left aligned]
[Pour Line]

[3-col grid on desktop, 2-col on tablet, 1-col on mobile]
[ Card ] [ Card ] [ Card ]
[ Card ] [ Card ] [ Card ]

[See All → button, centred]
```

```css
.product-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--brew-space-6);
}

@media (min-width: 640px) {
  .product-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .product-grid { grid-template-columns: repeat(3, 1fr); }
}
```

### Full-bleed Story Section

```
[Full-width forest-green panel]
  [Large display text, cream]
  [2-col image + story text grid]
[Pour Line]
```

### Product Detail

```
[2-col layout: image left, details right on desktop]
[Stacked on mobile]

Left:  1:1 product image
Right: eyebrow → name → price → size selector → add to cart
       [pour-line]
       accordion (Description / Ingredients / Brew Guide)
```

---

## Accessibility Checklist

- All interactive elements reachable by keyboard in DOM order.
- Focus indicators: 2px amber outline, never removed with `outline: none` without a replacement.
- All images have `alt` text (empty `alt=""` only for purely decorative images).
- Form inputs have visible `<label>` elements (no `placeholder` as label).
- Colour is never the only means of conveying information.
- Motion animations are gated on `prefers-reduced-motion: no-preference`.
- Font sizes never below `0.875rem` (14px) in any context.
- Touch targets minimum 44×44px.
- ARIA roles used only when a semantic HTML element doesn't exist for the job.
