/**
 * Capas de álbuns e singles (Apple Music / iTunes Search API), resolvidas automaticamente
 * pelo workflow `.github/workflows/covers.yml` (scripts/covers.ts) e gravadas em covers.json.
 * O site só lê o JSON — não chama a API em tempo real.
 */
import type { ImageRef } from './types';
import data from './covers.json';

type CoverDb = {
  songs?: Record<string, string>;
  albums?: Record<string, string>;
  articles?: Record<string, { url: string; title: string }>;
  misses?: Record<string, string>;
};
const db = data as CoverDb;

export const norm = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\(.*?\)|\[.*?\]|- ao vivo|- live/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

/** Primeiro artista de "A, B & C feat. D". */
export const mainArtist = (artist: string) => artist.split(/,| & | feat\.? | ft\.? | x | with | e (?=[A-Z])/i)[0]!.trim();

export const songKey = (title: string, artist: string) => `${norm(title)}|${norm(mainArtist(artist))}`;

export function songCover(title: string, artist: string): string | undefined {
  return db.songs?.[songKey(title, artist)];
}
export function albumCover(title: string, artist: string): string | undefined {
  return db.albums?.[songKey(title, artist)];
}
export function articleCover(id: string, alt: string): ImageRef | undefined {
  const c = db.articles?.[id];
  return c ? { url: c.url, alt: `${alt} — capa de “${c.title}”`, credit: 'Capa: Apple Music' } : undefined;
}
export const coverImage = (url: string | undefined, alt: string): ImageRef | undefined => (url ? { url, alt } : undefined);
