/**
 * Branding central. Tudo que exibe marca (UI, metadata, OG, JSON-LD) lê daqui.
 * O logo divide o nome em duas partes: "FAME" (texto) + "FILE" (pasta em gradiente).
 */
const name = process.env.NEXT_PUBLIC_BRAND_NAME?.trim() || 'FAMEFILE';

export const brand = {
  name,
  logoParts: [name.slice(0, 4), name.slice(4)] as const,
  slogan: 'Entertainment lives here',
  xHandle: process.env.NEXT_PUBLIC_BRAND_X_HANDLE?.trim() || undefined,
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, ''),
} as const;
