/**
 * Regras editoriais permanentes do FAMEFILE.
 * Pessoas bloqueadas: o site nunca publica notícias sobre elas nem mantém perfil delas.
 * Vale para conteúdo do código, do admin e do robô (filtro aplicado no store).
 */
import type { Article, Person } from '@/lib/data/types';

export const blockedPeople: { id: string; names: string[] }[] = [
  { id: 'felipe-neto', names: ['Felipe Neto'] },
  { id: 'ana-paula-renault', names: ['Ana Paula Renault'] },
];

const ids = new Set(blockedPeople.map((p) => p.id));
const pattern = new RegExp(blockedPeople.flatMap((p) => p.names).map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'i');

export const isBlockedPerson = (p: Pick<Person, 'id'>) => ids.has(p.id);

/** Bloqueia a matéria se citar a pessoa em qualquer idioma (título, resumo ou texto) ou marcá-la. */
export function isBlockedArticle(a: Article): boolean {
  if (a.personIds.some((id) => ids.has(id))) return true;
  return Object.values(a.t).some((t) => pattern.test(`${t.headline} ${t.summary} ${t.body.join(' ')}`));
}
