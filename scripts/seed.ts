/**
 * Gera supabase/seed.sql a partir do conteúdo local atual (matérias, perfis, agenda, charts, lançamentos).
 * Uso: npm run seed:sql   →   depois cole o arquivo no SQL Editor do Supabase.
 */
import fs from 'node:fs';
import path from 'node:path';
import { localStore } from '../src/lib/data/store';

const s = localStore();
const q = (v: string) => `'${v.replace(/'/g, "''")}'`;
const rows: string[] = [];
const add = (kind: string, id: string, data: unknown) =>
  rows.push(`(${q(kind)}, ${q(id)}, 'published', ${q(JSON.stringify(data))}::jsonb)`);

s.articles.forEach((a) => add('article', a.id, a));
s.people.forEach((p) => add('person', p.id, p));
s.events.forEach((e) => add('event', e.id, e));
s.charts.forEach((c) => add('chart', c.id, c));
s.releases.forEach((r) => add('release', r.id, r));

const sql = `-- Gerado por scripts/seed.ts em ${new Date().toISOString()}
insert into content (kind, id, status, data) values
${rows.join(',\n')}
on conflict (kind, id) do update set data = excluded.data, status = excluded.status, updated_at = now();
`;

const out = path.join(process.cwd(), 'supabase', 'seed.sql');
fs.writeFileSync(out, sql);
console.log(`${rows.length} documentos → ${out}`);
