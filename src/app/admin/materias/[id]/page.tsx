import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AdminShell, Field, StatusPill, param, type SearchParams } from '@/components/admin/AdminShell';
import { Poster } from '@/components/ui';
import { saveArticle, setArticleVisibility } from '@/lib/admin/actions';
import { getAdminStore, type ContentStatus } from '@/lib/data/store';
import type { Article } from '@/lib/data/types';
import { articlePath, getDictionary, localeMeta, locales, sectionKeys } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

const emptyArticle = (): Article => ({
  id: '',
  section: 'news',
  confidence: 'confirmed',
  risk: 'green',
  publishedAt: new Date().toISOString(),
  personIds: [],
  hue: 330,
  t: {
    pt: { slug: '', headline: '', summary: '', body: [] },
    en: { slug: '', headline: '', summary: '', body: [] },
    es: { slug: '', headline: '', summary: '', body: [] },
  },
});

const confidenceLabel = { confirmed: 'Confirmado', reported: 'Apurado', rumor: 'Rumor', unverified: 'Não confirmado' };
const riskLabel = {
  green: 'Verde — lançamento, evento, chart, info oficial',
  yellow: 'Amarelo — namoro, término, briga, rumor',
  red: 'Vermelho — morte, crime, doença, acusação (revisão obrigatória)',
};

export default async function ArticleEditor({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: SearchParams }) {
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  const s = await getAdminStore();
  const isNew = id === 'nova';
  const item = isNew ? undefined : s.articles.find((a) => a.id === id);
  if (!isNew && !item) notFound();
  const a = item?.data ?? emptyArticle();
  const status: ContentStatus = item?.status ?? 'draft';
  const d = getDictionary('pt');
  const { receipts, ...rest } = a;
  const extra = JSON.stringify({ receipts, updatedAt: rest.updatedAt });

  return (
    <AdminShell
      active="articles"
      title={isNew ? 'Nova matéria' : 'Editar matéria'}
      writable={s.writable}
      notice={{ ok: param(sp, 'ok'), erro: param(sp, 'erro') }}
      actions={
        !isNew && (
          <Link href={articlePath('pt', a.section, a.t.pt.slug, a.id)} className="ff-btn">
            Ver no site ↗
          </Link>
        )
      }
    >
      <form action={saveArticle} className="grid gap-6 xl:grid-cols-[1fr_22rem]">
        <input type="hidden" name="id" value={a.id} />
        <input type="hidden" name="hue" value={a.hue} />
        <input type="hidden" name="extraJson" value={extra} />

        <div className="min-w-0 space-y-4">
          {!isNew && (
            <p className="flex items-center gap-2 text-sm text-muted">
              Status atual: <StatusPill status={status} /> · ID {a.id}
            </p>
          )}
          {locales.map((l) => {
            const t = a.t[l];
            const facts = a.factBox?.[l];
            return (
              <details key={l} className="lang-tab ff-card" open={l === 'pt'}>
                <summary className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 font-display text-lg font-black uppercase italic">
                    <span aria-hidden>{localeMeta[l].flag}</span> {localeMeta[l].label}
                  </span>
                  <span className="text-xs font-bold text-muted">
                    {t.headline ? `${t.body.length} parágrafos` : 'vazio'} ▾
                  </span>
                </summary>
                <div className="mt-4 grid gap-4">
                  <Field label="Título">
                    <input id={`${l}-headline`} name={`${l}.headline`} defaultValue={t.headline} required={l === 'pt'} className="ff-input text-base font-bold" />
                  </Field>
                  <Field label="Slug (URL)" hint="Deixe vazio para gerar a partir do título.">
                    <input id={`${l}-slug`} name={`${l}.slug`} defaultValue={t.slug} className="ff-input font-mono text-xs" />
                  </Field>
                  <Field label="Resumo / linha fina">
                    <textarea id={`${l}-summary`} name={`${l}.summary`} defaultValue={t.summary} rows={2} className="ff-input min-h-0!" />
                  </Field>
                  <Field label="Texto" hint="Separe os parágrafos com uma linha em branco. Nomes de famosos cadastrados viram link automaticamente.">
                    <textarea id={`${l}-body`} name={`${l}.body`} defaultValue={t.body.join('\n\n')} rows={10} className="ff-input" />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="O que sabemos (1 por linha)">
                      <textarea id={`${l}-known`} name={`${l}.known`} defaultValue={facts?.known.join('\n') ?? ''} rows={4} className="ff-input" />
                    </Field>
                    <Field label="O que ainda não sabemos">
                      <textarea id={`${l}-unknown`} name={`${l}.unknown`} defaultValue={facts?.unknown.join('\n') ?? ''} rows={4} className="ff-input" />
                    </Field>
                  </div>
                </div>
              </details>
            );
          })}
        </div>

        <aside className="space-y-4">
          <section className="ff-card space-y-4">
            <h2 className="ff-head text-lg">Publicação</h2>
            <Field label="Status">
              <select id="status" name="status" defaultValue={status} className="ff-input">
                <option value="draft">Rascunho</option>
                <option value="review">Em revisão</option>
                <option value="published">Publicado</option>
                <option value="rejected">Rejeitado</option>
              </select>
            </Field>
            <Field label="Seção">
              <select id="section" name="section" defaultValue={a.section} className="ff-input">
                {sectionKeys.map((k) => (
                  <option key={k} value={k}>
                    {d.nav[k]}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Confiança">
              <select id="confidence" name="confidence" defaultValue={a.confidence} className="ff-input">
                {Object.entries(confidenceLabel).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Risco editorial">
              <select id="risk" name="risk" defaultValue={a.risk} className="ff-input">
                {Object.entries(riskLabel).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </Field>
            <label className="flex items-center gap-2 text-sm font-bold">
              <input id="breaking" name="breaking" type="checkbox" defaultChecked={a.breaking} className="h-4 w-4 accent-fame" /> Breaking (destaque “Agora”)
            </label>
            <Field label="Data de publicação" hint="Formato ISO, ex.: 2026-09-28T12:00:00Z">
              <input id="publishedAt" name="publishedAt" defaultValue={a.publishedAt} className="ff-input font-mono text-xs" />
            </Field>
          </section>

          <section className="ff-card space-y-4">
            <h2 className="ff-head text-lg">Foto</h2>
            <Poster hue={a.hue} image={a.image} className="aspect-[16/10] rounded-2xl" />
            <Field label="Enviar arquivo">
              <input id="imageFile" name="imageFile" type="file" accept="image/*" className="ff-input text-xs" />
            </Field>
            <Field label="…ou URL da imagem">
              <input id="imageUrl" name="imageUrl" defaultValue={a.image?.url ?? ''} placeholder="https://" className="ff-input text-xs" />
            </Field>
            <Field label="Crédito">
              <input id="imageCredit" name="imageCredit" defaultValue={a.image?.credit ?? ''} placeholder="Foto: Agência / Fotógrafo" className="ff-input" />
            </Field>
            <Field label="Descrição (acessibilidade)">
              <input id="imageAlt" name="imageAlt" defaultValue={a.image?.alt ?? ''} className="ff-input" />
            </Field>
          </section>

          <section className="ff-card space-y-4">
            <h2 className="ff-head text-lg">Pessoas e fontes</h2>
            <Field label="Famosos citados (slugs, separados por vírgula)" hint="Ex.: anitta, bad-bunny. Eles aparecem em “Continue acompanhando”.">
              <input id="personIds" name="personIds" list="people-slugs" defaultValue={a.personIds.join(', ')} className="ff-input text-xs" />
              <datalist id="people-slugs">
                {s.people.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.data.publicName}
                  </option>
                ))}
              </datalist>
            </Field>
            <Field label="Fontes (uma por linha: Nome | URL)">
              <textarea
                id="sources"
                name="sources"
                defaultValue={(a.sources ?? []).map((x) => `${x.name} | ${x.url}`).join('\n')}
                rows={4}
                className="ff-input text-xs"
              />
            </Field>
          </section>

          <div className="ff-card grid gap-2">
            <button type="submit" name="intent" value="publish" className="ff-btn ff-btn-primary">
              Publicar
            </button>
            <button type="submit" name="intent" value="save" className="ff-btn">
              Salvar
            </button>
            <button type="submit" name="intent" value="review" className="ff-btn">
              Enviar para revisão
            </button>
            {!isNew && (
              <button type="submit" name="intent" value="reject" className="ff-btn text-movies">
                Rejeitar / despublicar
              </button>
            )}
          </div>
          {!isNew && (
            <div className="ff-card grid gap-2">
              <p className="ff-label">Visibilidade</p>
              <input type="hidden" name="back" value={`/admin/materias/${a.id}`} />
              <button type="submit" formAction={setArticleVisibility} name="mode" value="hide" className="ff-btn">
                Ocultar do site
              </button>
              <details>
                <summary className="ff-btn cursor-pointer list-none text-center text-movies">Excluir matéria</summary>
                <div className="mt-2 grid gap-2 rounded-2xl border border-movies/40 p-3 text-xs">
                  <p className="text-fg/80">A matéria sai do site e vai para a lixeira (dá para restaurar).</p>
                  <button type="submit" formAction={setArticleVisibility} name="mode" value="delete" className="ff-btn bg-movies! text-white!">
                    Confirmar exclusão
                  </button>
                </div>
              </details>
            </div>
          )}
        </aside>
      </form>
    </AdminShell>
  );
}
