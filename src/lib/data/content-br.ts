/**
 * Brasil (29/09/2026): notícias recentes de sertanejo, pop, funk e creators + agenda de shows
 * (out/2026–jan/2027). Pesquisado com fontes; texto próprio. Dados em JSON para o robô poder atualizar.
 */
import type { Article, EntertainmentEvent } from './types';
import agenda from './br-agenda.json';
import news from './br-news.json';
import latest from './news-0929.json';
import live from './news-live.json';

/** news-live.json = pauta automática do robô editor (scripts/add_news.py). */
export const brArticles = [...(live as unknown as Article[]), ...(latest as unknown as Article[]), ...(news as unknown as Article[])];
export const brEvents = agenda as unknown as EntertainmentEvent[];
