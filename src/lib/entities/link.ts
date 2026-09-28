import type { Person } from '@/lib/data/types';

export interface Segment {
  text: string;
  person?: Person;
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Entity linking: transforma nomes/aliases de pessoas do banco em segmentos linkáveis.
 * - aliases apontam para a mesma entidade (Bruno Mars = Peter Hernandez);
 * - nomes mais longos têm prioridade ("Theo Kane" antes de "Theo");
 * - por padrão linka a primeira menção de cada pessoa no texto (`seen` é compartilhado
 *   entre parágrafos da mesma matéria), evitando poluição visual.
 * Hoje roda em tempo de render sobre o mock; na Fase 2 o resultado vai para article_entities.
 */
export function linkEntities(text: string, people: Person[], seen = new Set<string>()): Segment[] {
  const names = new Map<string, Person>();
  for (const p of people) {
    for (const name of [p.publicName, ...p.aliases]) {
      if (name.length >= 3) names.set(name.toLocaleLowerCase(), p);
    }
  }
  if (names.size === 0) return [{ text }];

  const pattern = [...names.keys()].sort((a, b) => b.length - a.length).map(escapeRe).join('|');
  const re = new RegExp(`(?<![\\p{L}\\p{N}])(?:${pattern})(?![\\p{L}\\p{N}])`, 'giu');

  const out: Segment[] = [];
  let last = 0;
  for (const match of text.matchAll(re)) {
    const person = names.get(match[0].toLocaleLowerCase());
    const index = match.index ?? 0;
    if (!person || seen.has(person.id)) continue;
    seen.add(person.id);
    if (index > last) out.push({ text: text.slice(last, index) });
    out.push({ text: match[0], person });
    last = index + match[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last) });
  return out;
}
