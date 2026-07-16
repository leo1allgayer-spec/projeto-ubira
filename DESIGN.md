---
name: Sovereign Equity
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#38393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#c4c6ce'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#8e9198'
  outline-variant: '#43474d'
  surface-tint: '#b1c8e9'
  primary: '#b1c8e9'
  on-primary: '#1a324c'
  primary-container: '#001a33'
  on-primary-container: '#6d84a2'
  inverse-primary: '#4a607c'
  secondary: '#e9c176'
  on-secondary: '#412d00'
  secondary-container: '#604403'
  on-secondary-container: '#dab36a'
  tertiary: '#e6c188'
  on-tertiary: '#422c02'
  tertiary-container: '#241600'
  on-tertiary-container: '#9c7d4a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d2e4ff'
  primary-fixed-dim: '#b1c8e9'
  on-primary-fixed: '#021c36'
  on-primary-fixed-variant: '#324863'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#ffdead'
  tertiary-fixed-dim: '#e6c188'
  on-tertiary-fixed: '#281900'
  on-tertiary-fixed-variant: '#5b4215'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.15em
  stats-number:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  margin-edge: 4rem
  gutter-grid: 2rem
  section-gap: 8rem
  container-max: 1280px
---

## Brand & Style
The brand personality is authoritative, discreet, and exceptionally prestigious. It targets High-Net-Worth Individuals (HNWIs) and institutional investors who value substance, heritage, and the meticulousness of a private family office. The UI should evoke a feeling of entering an exclusive "members-only" digital vault—secure, calm, and intellectually rewarding.

The design style is **Modern Corporate with Editorial Luxury**. It draws from the aesthetics of high-end financial memoranda and legal documents, utilizing high-contrast typography and a restrained but rich color palette. Visual interest is generated through the precision of the layout rather than decorative elements, ensuring that "Digital Investment Memorandum" feel.

- **Emotional Response:** Trust, exclusivity, analytical clarity, and enduring value.
- **Visual Metaphor:** A confidential investment dossier bound in leather and gold-leaf.

## Colors
The palette is rooted in the "Navy & Gold" tradition of private banking.

- **Primary (#001A33):** A deep, nocturnal navy used for the primary background and structural blocks. It provides a more sophisticated alternative to pure black.
- **Secondary (#C5A059):** A muted, brushed gold. Used strictly for accents, high-level headings, and "Action" triggers. It should feel like metallic foil, not yellow.
- **Tertiary (#8C6E3D):** A darker, bronze-tone gold for secondary details, borders, and hovered states to maintain depth.
- **Neutral (#F5F5F5):** An off-white "parchment" tone used for body text and contrast elements to avoid the harshness of pure white.

**Usage Note:** Backgrounds should primarily use the `primary_color_hex` or `background_paper`. Use gradients sparingly, opting for a very subtle radial glow of Navy to imply depth.

## Typography
The typography strategy creates a tension between the classic editorial feel of **Playfair Display** and the modern, technical precision of **Manrope**.

- **Headlines:** Use Playfair Display. This conveys history and prestige. For major titles, use "Gold" as the text color.
- **Body Text:** Use Manrope. It provides high legibility for long-form investment theses and financial data. Use the Neutral (#F5F5F5) color at 85-90% opacity for optimal reading comfort.
- **Labels & Metadata:** Use Hanken Grotesk in All-Caps with generous letter spacing to denote sections, similar to a legal document's header.
- **Numbers/Metrics:** Financial figures should be rendered in Playfair Display to emphasize the "wealth" aspect of the data.

## Layout & Spacing
The layout follows a **Fixed Grid** model with generous margins to mimic the layout of an expensive printed book or prospectus.

- **Grid Model:** 12-column grid for desktop. Use asymmetry where appropriate (e.g., text spanning 5 columns, images spanning 7) to create an editorial feel.
- **Whitespace:** Use aggressive whitespace (`section-gap`) to allow the high-value content to breathe. Avoid crowding elements; every chart or paragraph is a high-priority asset.
- **Reflow:** On mobile, margins reduce to 1.5rem and the grid collapses to 1 column. High-impact stats should be pulled into "carousel" cards to maintain vertical compactness.
- **Borders:** Use thin (1px) borders in the Tertiary gold or subtle Navy-light to define sections, rather than heavy background color changes.

## Elevation & Depth
Depth is conveyed through **Tonal Layers and Low-Contrast Outlines**. Avoid heavy, drop-shadow-heavy neomorphism.

- **Surface Strategy:** The base layer is the deepest Navy. Secondary containers (like investment cards) should be only 2-3% lighter than the background.
- **Shadows:** If used, they should be "Ambient Shadows"—extremely soft, blurred (40px+), and tinted with the Navy color rather than black.
- **Outlines:** Use 1px solid or semi-transparent gold borders to define the most important call-outs. This mimics the "gilding" of high-end stationery.
- **Glassmorphism:** Use very subtle backdrop blurs (10px) on navigation bars or modal overlays to maintain a sense of the technical environment.

## Shapes
The shape language is **Soft (0.25rem)**. 

Sharp corners feel too aggressive/industrial, while pill-shapes feel too casual/social. The subtle rounding suggests modern precision while maintaining a classic architectural structural feel. 

- **Primary Buttons:** Slightly more rounded (0.5rem) to make them feel "touchable."
- **Data Containers:** Strictly `rounded-sm` (0.25rem) to maintain the "memorandum" aesthetic.
- **Media/Images:** Keep corners sharp or very minimally rounded to preserve the "professional photography" look.

## Components
- **Buttons:** Primary buttons use a Gold background with Primary Navy text. Use a "Ghost" style for secondary actions with a thin Gold border and Gold text. Hover states should involve a subtle inner glow.
- **Investment Chips:** Small, All-Caps labels with a Navy-light background and Gold text. Used for status like "OPORTUNIDADE ATIVA" or "RENTABILIDADE ALTA."
- **Cards:** Use the "Tonal Layer" approach. A card should have a 1px border in a muted gold. The header of the card should use Playfair Display.
- **Input Fields:** Dark backgrounds (darker than the page) with 1px bottom-borders only, creating a "formal form" look. Labels stay above the field in Hanken Grotesk.
- **Charts & Graphs:** Use the Gold palette for data lines. Use Navy-light for grid lines. The aesthetic should be "Bloomberg-terminal-meets-Vogue."
- **Icons:** Use thin-stroke (Light) icons in Gold. Avoid filled or chunky icons.
