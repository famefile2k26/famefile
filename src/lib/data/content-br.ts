/**
 * Brasil (29/09/2026): notícias recentes de sertanejo, pop, funk e creators + agenda de shows
 * (out/2026–jan/2027). Pesquisado com fontes; texto próprio. Dados em JSON para o robô poder atualizar.
 */
import type { Article, EntertainmentEvent } from './types';
import agenda from './br-agenda.json';
import news from './br-news.json';

export const brArticles = news as unknown as Article[];
export const brEvents = agenda as unknown as EntertainmentEvent[];
