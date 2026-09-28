import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AdminShell, Field, StatusPill, param, type SearchParams } from '@/components/admin/AdminShell';
import { initialsOf, Poster } from '@/components/ui';
import { savePerson } from '@/lib/admin/actions';
import { getAdminStore, type ContentStatus } from '@/lib/data/store';
import type { Person, PersonKind, Platform } from '@/lib/data/types';
import { localeMeta, locales, personPath } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

const emptyPerson = (): Person => ({
  id: '',
  slug: '',
  publicName: '',
  aliases: [],
  kinds: ['singer'],
  country: 'BR',
  market: 'brazil',
  hue: 330,
  socials: {},
  t: {
    pt: { role: '', bio: '', highlights: [] },
    en: { role: '', bio: '', highlights: [] },
    es: { role: '', bio: '', highlights: [] },
  },
});

const kindLabel: Record<PersonKind, string> = { singer: 'Cantor(a)/Artista', actor: 'Ator/Atriz', creator: 'Creator/Influencer', streamer: 'Streamer', athlete: 'Atleta' };
const platformLabel: Record<Platform, string> = { instagram: 'Instagram', tiktok: 'TikTok', youtube: 'YouTube', x: 'X', twitch: 'Twitch', kick: 'Kick', spotify: 'Spotify (nome do artista)' };

export default async function PersonEditor({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: SearchParams }) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const s = await getAdminStore();
  const isNew = slug === 'novo';
  const item = isNew ? undefined : s.people.find((p) => p.id === slug);
  if (!isNew && !item) notFound();
  const p = item?.data ?? emptyPerson();
  const status: ContentStatus = item?.status ?? 'draft';
  const extra = JSON.stringify({ fameScore: p.fameScore, trend7d: p.trend7d });

  return (
    <AdminShell
      active="people"
      title={isNew ? 'Novo famoso' : p.publicName}
      writable={s.writable}
      notice={{ ok: param(sp, 'ok'), erro: param(sp, 'erro') }}
      actions={
        !isNew && (
          <Link href={personPath('pt', p.slug)} className="ff-btn">
            Ver perfil ↗
          </Link>
        )
      }
    >
      <form action={savePerson} className="grid gap-6 xl:grid-cols-[20rem_1fr]">
        <input type="hidden" name="slug" value={p.slug} />
        <input type="hidden" name="hue" value={p.hue} />
        <input type="hidden" name="extraJson" value={extra} />

        <aside className="space-y-4">
          <section className="ff-card space-y-4">
            <h2 className="ff-head text-lg">Foto</h2>
            <Poster hue={p.hue} image={p.image} initials={initialsOf(p.publicName || '?')} className="aspect-[4/5] rounded-2xl" />
            <Field label="Enviar arquivo" hint="JPG ou PNG, vertical de preferência.">
              <input id="imageFile" name="imageFile" type="file" accept="image/*" className="ff-input text-xs" />
            </Field>
            <Field label="…ou URL da imagem">
              <input id="imageUrl" name="imageUrl" defaultValue={p.image?.url ?? ''} placeholder="https://" className="ff-input text-xs" />
            </Field>
            <Field label="Crédito">
              <input id="imageCredit" name="imageCredit" defaultValue={p.image?.credit ?? ''} placeholder="Foto: Agência / Fotógrafo" className="ff-input" />
            </Field>
            <Field label="Descrição (acessibilidade)">
              <input id="imageAlt" name="imageAlt" defaultValue={p.image?.alt ?? p.publicName} className="ff-input" />
            </Field>
          </section>

          <section className="ff-card space-y-4">
            <h2 className="ff-head text-lg">Redes</h2>
            {(Object.keys(platformLabel) as Platform[]).map((pl) => (
              <Field key={pl} label={platformLabel[pl]}>
                <input id={`social-${pl}`} name={`social.${pl}`} defaultValue={p.socials[pl]?.handle ?? ''} placeholder="@usuario" className="ff-input" />
              </Field>
            ))}
          </section>

          <div className="ff-card grid gap-2">
            {!isNew && (
              <p className="mb-1 flex items-center gap-2 text-sm text-muted">
                Status: <StatusPill status={status} />
              </p>
            )}
            <input type="hidden" name="status" value={status} />
            <button type="submit" name="intent" value="publish" className="ff-btn ff-btn-primary">
              Salvar e publicar
            </button>
            <button type="submit" name="intent" value="save" className="ff-btn">
              Salvar rascunho
            </button>
          </div>
        </aside>

        <div className="min-w-0 space-y-4">
          <section className="ff-card grid gap-4 sm:grid-cols-2">
            <Field label="Nome público">
              <input id="publicName" name="publicName" defaultValue={p.publicName} required className="ff-input text-base font-bold" />
            </Field>
            <Field label="Nome completo">
              <input id="legalName" name="legalName" defaultValue={p.legalName ?? ''} className="ff-input" />
            </Field>
            <Field label="Também conhecido como" hint="Separe por vírgula. Usado para linkar o nome nas matérias.">
              <input id="aliases" name="aliases" defaultValue={p.aliases.join(', ')} className="ff-input" />
            </Field>
            <Field label="Mercado">
              <select id="market" name="market" defaultValue={p.market ?? ''} className="ff-input">
                <option value="brazil">Brasil</option>
                <option value="latin">Latino</option>
                <option value="global">Global</option>
              </select>
            </Field>
            <Field label="Nascimento" hint="AAAA-MM-DD">
              <input id="birthDate" name="birthDate" defaultValue={p.birthDate ?? ''} placeholder="1993-03-30" className="ff-input" />
            </Field>
            <Field label="Falecimento" hint="Só se aplicável">
              <input id="deathDate" name="deathDate" defaultValue={p.deathDate ?? ''} className="ff-input" />
            </Field>
            <Field label="Local de nascimento">
              <input id="birthPlace" name="birthPlace" defaultValue={p.birthPlace ?? ''} className="ff-input" />
            </Field>
            <Field label="País (código ISO)" hint="BR, US, CO, PR…">
              <input id="country" name="country" defaultValue={p.country} maxLength={2} className="ff-input uppercase" />
            </Field>
            <Field label="Em atividade desde">
              <input id="activeSince" name="activeSince" type="number" defaultValue={p.activeSince ?? ''} className="ff-input" />
            </Field>
            <Field label="Estilos / áreas" hint="Separe por vírgula">
              <input id="genres" name="genres" defaultValue={(p.genres ?? []).join(', ')} className="ff-input" />
            </Field>
            <fieldset className="sm:col-span-2">
              <legend className="ff-label">Tipo de perfil</legend>
              <div className="flex flex-wrap gap-3">
                {(Object.keys(kindLabel) as PersonKind[]).map((k) => (
                  <label key={k} className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm font-bold">
                    <input type="checkbox" name="kinds" value={k} defaultChecked={p.kinds.includes(k)} className="accent-fame" /> {kindLabel[k]}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="sm:col-span-2">
              <Field label="Trabalhos principais (um por linha: Título | ano | tipo)" hint="Tipos: album, single, ep, film, series, tour, project, club">
                <textarea
                  id="works"
                  name="works"
                  defaultValue={(p.works ?? []).map((w) => `${w.title} | ${w.year} | ${w.kind}`).join('\n')}
                  rows={5}
                  className="ff-input"
                />
              </Field>
            </div>
          </section>

          {locales.map((l) => {
            const t = p.t[l];
            return (
              <details key={l} className="lang-tab ff-card" open={l === 'pt'}>
                <summary className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 font-display text-lg font-black uppercase italic">
                    <span aria-hidden>{localeMeta[l].flag}</span> {localeMeta[l].label}
                  </span>
                  <span className="text-xs font-bold text-muted">{t.bio ? 'preenchido' : 'vazio'} ▾</span>
                </summary>
                <div className="mt-4 grid gap-4">
                  <Field label="Ocupação">
                    <input id={`${l}-role`} name={`${l}.role`} defaultValue={t.role} className="ff-input" />
                  </Field>
                  <Field label="Bio">
                    <textarea id={`${l}-bio`} name={`${l}.bio`} defaultValue={t.bio} rows={4} className="ff-input" />
                  </Field>
                  <Field label="Por que está em alta agora (opcional)">
                    <input id={`${l}-now`} name={`${l}.now`} defaultValue={t.now ?? ''} className="ff-input" />
                  </Field>
                  <Field label="Carreira em destaque (um por linha)">
                    <textarea id={`${l}-highlights`} name={`${l}.highlights`} defaultValue={(t.highlights ?? []).join('\n')} rows={4} className="ff-input" />
                  </Field>
                </div>
              </details>
            );
          })}
        </div>
      </form>
    </AdminShell>
  );
}
