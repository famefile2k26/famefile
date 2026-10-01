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

/**
 * Temas fora da linha editorial (decisão do dono, 01/10/2026): apostas/bets.
 * Checado no título/resumo em pt e es (em inglês "bets on" é verbo comum e daria falso positivo).
 */
export const blockedTopics = /\b(bets?|betting|apostas|casas? de apostas?|blaze|tigrinho|cassino online|casino online|apuestas)\b/i;

/** Bloqueia a matéria se citar pessoa bloqueada (em qualquer parte) ou tratar de tema bloqueado (título/resumo). */
export function isBlockedArticle(a: Article): boolean {
  if (a.personIds.some((id) => ids.has(id))) return true;
  if (Object.values(a.t).some((t) => pattern.test(`${t.headline} ${t.summary} ${t.body.join(' ')}`))) return true;
  return [a.t.pt, a.t.es].some((t) => t && blockedTopics.test(`${t.headline} ${t.summary}`));
}
