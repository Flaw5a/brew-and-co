# Brew & Co — Design Style Guide

## Brand Identity

**Brand**: Brew & Co  
**Position**: Independent specialty coffee — craft-roasted, origin-focused, neighborhood-rooted.  
**Audience**: Coffee-curious people aged 22–45 who care about what they're drinking and where it came from. They've been to Starbucks and want more.  
**Page's single job**: Turn a first visit into an order — in-store or online.

**Voice**: Direct and warm. Knowledgeable without being precious. We know our coffee; we don't need to prove it. A label reads "Washed Ethiopian Yirgacheffe" not "Our award-winning hand-selected single-origin micro-lot."

**Aesthetic risk**: The Split Canvas hero — the viewport splits exactly 50/50 between deep forest green (text side) and warm cream (product side). No hero photography backgrounds. No gradients. Just two rectangles and deliberate typography. It reads like a modernist poster and communicates independence instantly.

---

## Color System

All colors are defined in `tokens.css` and available as Tailwind utilities.

| Token | Hex | Usage |
|---|---|---|
| `forest` | `#1D5C45` | Primary brand, buttons, active states |
| `sage` | `#3A7D5E` | Hover states, secondary interactions |
| `canopy` | `#0D3B2B` | Nav background (scrolled), footer, dark sections |
| `cream` | `#F5EFE6` | Page background, light section backgrounds |
| `stone` | `#E2D9CC` | Borders, dividers, input strokes |
| `espresso` | `#1A1108` | Primary text — warm near-black, never pure #000 |
| `amber` | `#C07A2B` | Accent: prices, the pour-line divider, star ratings |
| `white` | `#FFFFFF` | Card backgrounds, text on dark backgrounds |

### Usage rules

- **Forest** is the brand color. It appears on primary buttons, key headings on light backgrounds, and fills the left side of the split-canvas hero.
- **Amber** is the accent. It touches one element per section maximum — a price, a label, or the pour-line. Never use amber as a background.
- **Espresso** replaces black for all body text. The warmth prevents the page from feeling cold or clinical.
- **Stone** replaces grey for all borders and strokes. It harmonises with cream backgrounds.
- Never use the Tailwind default colour palette on this project — use only named brand tokens.

### Contrast

- Forest on cream: 7.2:1 ✓ AAA
- White on forest: 8.1:1 ✓ AAA
- Espresso on cream: 14.6:1 ✓ AAA
- Amber on canopy: 5.3:1 ✓ AA (large text)

---

## Typography

### Typefaces

**Display: Cormorant Garamond**  
An elegant optical-size serif. Used for all headings, hero text, and section titles. It gives Brew & Co editorial authority without the corporate weight of condensed grotesques. Load via `next/font/google` with `subsets: ['latin']`.

Weight used: 600 (SemiBold) for display, 500 (Medium) for large body headings.

**Body: DM Sans**  
A humanist sans-serif — warm, legible, and unpretentious. Used for body copy, UI labels, navigation, and captions. Load via `next/font/google`.

Weights used: 400 (Regular), 500 (Medium), 600 (SemiBold).

**Numbers & Data: DM Sans with tabular-nums**  
No separate font for stats. Use `font-variant-numeric: tabular-nums` on DM Sans for prices, stat numbers, and quantities. Keeps the stack light.

### Type Scale

All sizes are defined as CSS custom properties in `tokens.css`.

| Token | Value | Usage |
|---|---|---|
| `--text-display-xl` | `clamp(4rem, 8vw, 7rem)` | Hero headline |
| `--text-display-lg` | `clamp(2.5rem, 5vw, 4.5rem)` | Section title on dark background |
| `--text-display-md` | `clamp(1.75rem, 3.5vw, 3rem)` | Major section headings |
| `--text-heading-lg` | `2rem` | Sub-section headings |
| `--text-heading-md` | `1.5rem` | Card headings, drawer titles |
| `--text-heading-sm` | `1.125rem` | List headings, sidebar titles |
| `--text-body-lg` | `1.125rem` | Lead paragraph text |
| `--text-body-md` | `1rem` | Default body copy |
| `--text-body-sm` | `0.875rem` | Captions, helper text |
| `--text-label` | `0.75rem` | Eyebrows, badges, tags — always uppercase, tracked |
| `--text-stat` | `clamp(2.5rem, 4vw, 3.5rem)` | Stats strip numbers |

### Typography Rules

- **Cormorant Garamond** at display sizes: always `letter-spacing: -0.02em`, `line-height: 1.1`.
- **Eyebrows** (labels above headings): DM Sans, `text-label` size, `letter-spacing: 0.1em`, uppercase, color `amber`.
- **Body copy**: `line-height: 1.6`, `max-width: 65ch` to prevent line lengths above 80 characters.
- **Price text**: DM Sans Medium, `font-variant-numeric: tabular-nums`, color `amber`.
- Never italicise body copy for emphasis. Use DM Sans SemiBold instead.

---

## Spacing

The scale uses an 8px base unit (0.5rem). Half-steps at 4px exist for tight UI only.

| Token | Value | Use |
|---|---|---|
| `--space-1` | `0.25rem / 4px` | Icon gaps, tight badge padding |
| `--space-2` | `0.5rem / 8px` | Inline element gaps |
| `--space-3` | `0.75rem / 12px` | Button padding (vertical) |
| `--space-4` | `1rem / 16px` | Default component padding |
| `--space-5` | `1.25rem / 20px` | Card internal padding (mobile) |
| `--space-6` | `1.5rem / 24px` | Card internal padding (desktop) |
| `--space-8` | `2rem / 32px` | Stack gap between body elements |
| `--space-10` | `2.5rem / 40px` | Section sub-division gap |
| `--space-12` | `3rem / 48px` | Component-to-component spacing |
| `--space-16` | `4rem / 64px` | Section padding (mobile) |
| `--space-20` | `5rem / 80px` | Section padding (desktop) |
| `--space-24` | `6rem / 96px` | Hero vertical padding |
| `--space-32` | `8rem / 128px` | Large section top/bottom |

**Layout grid**: 12-column grid, 24px gutters on desktop, 16px on tablet, full-width with 20px side padding on mobile.

**Max content width**: `1280px` (container class `.brew-container`).

---

## Borders & Radius

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | `0.25rem / 4px` | Tags, badges |
| `--radius-md` | `0.5rem / 8px` | Input fields |
| `--radius-lg` | `1rem / 16px` | Cards |
| `--radius-xl` | `1.5rem / 24px` | Large cards, modal |
| `--radius-full` | `9999px` | Pills, avatar, circular buttons |
| `--border-thin` | `1px` | Default strokes |
| `--border-mid` | `1.5px` | Pour-line divider (amber) |

---

## Shadows

Shadows use warm tones (not cold grey) to stay in harmony with the cream/espresso palette.

| Token | Value | Use |
|---|---|---|
| `--shadow-sm` | `0 1px 3px rgba(26, 17, 8, 0.06)` | Default card shadow |
| `--shadow-md` | `0 4px 16px rgba(26, 17, 8, 0.10)` | Elevated card, hover state |
| `--shadow-lg` | `0 12px 40px rgba(26, 17, 8, 0.15)` | Modal, drawer, sticky nav |

---

## Motion

Animations respect `prefers-reduced-motion`. All transitions use `@media (prefers-reduced-motion: no-preference)` guards in CSS.

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | `120ms` | Micro-interactions (hover colour change) |
| `--duration-mid` | `250ms` | Component transitions (button press, menu open) |
| `--duration-slow` | `400ms` | Page-level reveals, hero entrance |
| `--ease-default` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Most transitions |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Scale-up reveals, card hover lift |
| `--ease-out` | `cubic-bezier(0, 0, 0.3, 1)` | Drawer slide, modal enter |

**Animation principles:**
- The hero split canvas loads in sequence: left panel slides in from the left, right panel fades in, then the headline reveals word-by-word.
- Product cards lift on hover (translateY -4px + shadow-md). Duration: 250ms ease-spring.
- Navigation links underline from left to right on hover. Duration: 200ms ease-default.
- The pour-line animates width from 0 to 100% on scroll entry. Duration: 600ms ease-out.
- Never animate layout (avoid animating width/height, use transform + opacity).

---

## The Signature Element: Pour Line

A 1.5px horizontal rule in `--color-amber` used as a section transition marker. Rules:
- Used a maximum of **3 times** per full page.
- Placed where sections shift register — between the hero and the first content section, and before the footer.
- Never used as a decorative border around components.
- Animates width from 0 → 100% on scroll entry (respects reduced motion).
- Full markup: `<div class="pour-line" aria-hidden="true" />`

---

## Iconography

Use [Lucide React](https://lucide.dev) — it's tree-shakeable and matches the clean sans aesthetic.

- Stroke width: `1.5px` at 20px size, `1.25px` at 24px+.
- Always paired with a text label or `aria-label`. Never icon-only in interactive elements.
- Color: inherit from parent text color. Never apply explicit amber/forest colors to icons unless specifically decorative.

---

## Images

- Product images: square aspect ratio (1:1), white background, centered subject.
- Story/editorial images: 4:3 or 3:2, desaturated slightly (85% saturation) to harmonise with the color system.
- Always provide `alt` text describing the image content.
- Use `next/image` for all images — automatic WebP conversion and lazy loading.
- Avoid circular crops on product images. Square with rounded corners (`radius-lg`) is the standard.

---

## Responsive Breakpoints

| Name | Min-width | Tailwind prefix |
|---|---|---|
| `sm` | `640px` | `sm:` |
| `md` | `768px` | `md:` |
| `lg` | `1024px` | `lg:` |
| `xl` | `1280px` | `xl:` |

The layout shifts at `md` (tablet) and `lg` (desktop). Mobile-first always.
