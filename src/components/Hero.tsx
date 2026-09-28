import Link from 'next/link';
import { brand } from '@/lib/brand';
import { getArticles, getChart, getPeople } from '@/lib/data';
import type { Article } from '@/lib/data/types';
import { cssVars } from '@/lib/format';
import { articlePath, getDictionary, sectionAccent, sectionPath, type Locale, type SectionKey } from '@/lib/i18n';
import { HeroMotion } from './HeroMotion';
import { Logo, Sparkle } from './Logo';
import { Poster } from './ui';

/**
 * Hero: um celular rolando o feed de vídeos do FAMEFILE — cada "post" é uma matéria real do portal —
 * enquanto os flashes dos paparazzi disparam ao fundo. CSS puro; HeroMotion só pausa fora da tela.
 */

const icons = {
  heart: 'M12 21s-7.5-4.6-10-9.2C.3 8.4 2.2 4 6.3 4c2.3 0 4 1.3 5.7 3.4C13.7 5.3 15.4 4 17.7 4 21.8 4 23.7 8.4 22 11.8 19.5 16.4 12 21 12 21z',
  comment: 'M12 3C6.5 3 2 6.9 2 11.7c0 2.6 1.3 4.9 3.4 6.5L4.5 22l4.3-2.2c1 .3 2.1.4 3.2.4 5.5 0 10-3.9 10-8.7S17.5 3 12 3z',
  share: 'M14 4l8 7.5-8 7.5v-4.6C8 14.4 4.5 16.3 2 20c.8-6.3 4.3-11 12-12V4z',
};
const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24">
    <path d={d} />
  </svg>
);

/** Números de engajamento só decorativos da UI do app (determinísticos por matéria). */
const short = (n: number) => (n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : `${Math.round(n / 1000)}K`);

function fakeStats(id: string) {
  const n = Number(id) || 1;
  return { likes: 120_000 + ((n * 7919) % 880_000), comments: 2_000 + ((n * 104_729) % 38_000), shares: 1_000 + ((n * 1_299_709) % 60_000) };
}

function Post({ article, locale }: { article: Article; locale: Locale }) {
  const d = getDictionary(locale);
  const t = article.t[locale];
  const s = fakeStats(article.id);
  const label = article.breaking ? d.home.breaking : d.nav[article.section];
  return (
    <div className="clip">
      <Poster hue={article.hue} image={article.image} className="clip-bg" />
      <div className="clip-shade" />
      <div className="clip-brand">
        <Logo size="0.95rem" />
      </div>
      <div className="clip-story">
        <span className="slant-label px-2! py-0.5! text-[9px]!" style={article.breaking ? undefined : { background: sectionAccent[article.section] }}>
          {label} <Sparkle className="h-2 w-2 fill-white" />
        </span>
        <p className="clip-headline">{t.headline}</p>
      </div>
      <div className="clip-rail">
        <span className="clip-avatar">F</span>
        <span className="liked grid justify-items-center">
          <Icon d={icons.heart} />
          {short(s.likes)}
        </span>
        <span className="grid justify-items-center">
          <Icon d={icons.comment} />
          {short(s.comments)}
        </span>
        <span className="grid justify-items-center">
          <Icon d={icons.share} />
          {short(s.shares)}
        </span>
        <span className="clip-disc" />
      </div>
      <div className="clip-ui">
        <div className="clip-meta">
          <p className="clip-user">@famefile ✓</p>
          <p className="clip-caption">{t.summary}</p>
          <p className="clip-sound">
            ♫ <span>som original — {brand.name} · som original — {brand.name}</span>
          </p>
        </div>
      </div>
      <div className="clip-progress" />
    </div>
  );
}

/** Fotógrafos em silhueta; os flashes saem das câmeras. */
const photographers = [
  { x: 70, cam: -18, up: 0 },
  { x: 215, cam: 14, up: 1 },
  { x: 370, cam: -10, up: 0 },
  { x: 520, cam: 16, up: 1 },
  { x: 690, cam: -14, up: 0 },
  { x: 840, cam: 10, up: 1 },
  { x: 990, cam: -16, up: 0 },
  { x: 1135, cam: 12, up: 1 },
];
const flashTiming = ['0.4s/6.4s', '2.1s/7.2s', '1.3s/5.8s', '3.6s/6.9s', '0.9s/7.7s', '4.4s/6.1s', '2.8s/7.4s', '5.2s/6.6s'];

function PaparazziPit() {
  return (
    <>
      <div className="pap-pit" aria-hidden>
        <svg viewBox="0 0 1200 170" preserveAspectRatio="xMidYMax slice">
          {photographers.map((p) => {
            const camY = p.up ? 20 : 48;
            return (
              <g key={p.x}>
                <path d={`M${p.x - 62} 170c4-44 22-64 62-64s58 20 62 64z`} />
                <circle cx={p.x} cy={92} r={24} />
                <rect x={p.x + p.cam - 32} y={camY} width={64} height={40} rx={7} />
                <circle cx={p.x + p.cam} cy={camY + 20} r={15} fill="#16121c" />
                <rect x={p.x + p.cam - 22} y={camY - 10} width={22} height={12} rx={3} />
              </g>
            );
          })}
        </svg>
      </div>
      {photographers.map((p, i) => {
        const [delay, dur] = (flashTiming[i] ?? '0s/6s').split('/');
        const camY = p.up ? 40 : 68;
        return (
          <span
            key={p.x}
            className="pap-flash"
            aria-hidden
            style={cssVars({
              left: `${((p.x + p.cam - 11) / 1200) * 100}%`,
              bottom: `calc(clamp(90px, 16vw, 170px) * ${((170 - camY + 30) / 170).toFixed(2)})`,
              translate: '-50% 50%',
              '--d': delay ?? '0s',
              '--dur': dur ?? '6s',
            })}
          />
        );
      })}
    </>
  );
}

export async function Hero({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const [posts, global, people] = await Promise.all([getArticles({ limit: 5 }), getChart('spotify-global-weekly'), getPeople()]);
  const top = global?.entries[0];
  const lead = posts[0];
  const quick: SectionKey[] = ['gossip', 'music', 'creators'];

  return (
    <HeroMotion labelledBy="hero-title">
      <div className="hero-bg" aria-hidden />
      <PaparazziPit />

      <div className="hero-copy">
        <p className="rise text-[11px] font-extrabold uppercase tracking-[0.3em] text-fame" style={cssVars({ '--d': '0.1s' })}>
          {d.hero.kicker}
        </p>
        <h1 id="hero-title" aria-label={brand.name}>
          <Logo className="hero-logo" tagline />
        </h1>
        <p className="rise ff-head text-3xl sm:text-5xl" style={cssVars({ '--d': '0.35s' })}>
          {d.hero.headline[0]} <span className="text-fame-gradient pr-1">{d.hero.headline[1]}</span>
        </p>
        <p className="rise max-w-md text-base text-fg/75 sm:text-lg" style={cssVars({ '--d': '0.5s' })}>
          {d.hero.tagline}
        </p>
        <div className="rise flex flex-wrap items-center justify-center gap-2 lg:justify-start" style={cssVars({ '--d': '0.65s' })}>
          <a
            href="#feed"
            className="bg-fame-gradient inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-extrabold uppercase tracking-[0.1em] text-white shadow-lg shadow-fame/30 transition hover:scale-[1.03]"
          >
            {d.hero.cta} <span aria-hidden>→</span>
          </a>
          {quick.map((k) => (
            <Link
              key={k}
              href={sectionPath(locale, k)}
              style={cssVars({ '--v': sectionAccent[k] })}
              className="rounded-full border border-line bg-black/30 px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.1em] transition hover:border-(--v)"
            >
              {d.nav[k]}
            </Link>
          ))}
        </div>
      </div>

      <div className="hero-stage">
        <div className="phone-hand" aria-hidden>
          <div className="phone">
            <div className="phone-screen">
              <span className="phone-notch" />
              <div className="feed-top">
                <span>{d.hero.following}</span>
                <b>{d.hero.forYou}</b>
              </div>
              <div className="reel-track">
                {[...posts, posts[0]!].map((a, i) => (
                  <Post key={`${a.id}-${i}`} article={a} locale={locale} />
                ))}
              </div>
              <span className="touch" />
              <div className="feed-nav">
                <i />
                <i />
                <i className="plus" />
                <i />
                <i />
              </div>
            </div>
          </div>
        </div>

        {lead && (
          <Link
            href={articlePath(locale, lead.section, lead.t[locale].slug, lead.id)}
            className="hero-chip left-0 top-[6%] sm:left-[2%]"
            style={cssVars({ '--d': '0.7s' })}
          >
            <span className="live-dot" /> {d.home.breaking}: {lead.t[locale].headline}
          </Link>
        )}
        {top && (
          <Link href={sectionPath(locale, 'charts')} className="hero-chip right-0 top-[28%] sm:right-[2%]" style={cssVars({ '--d': '0.95s' })}>
            <span className="text-charts">#1</span> {top.title}
          </Link>
        )}
        <Link href={`/${locale}/p`} className="hero-chip bottom-[26%] left-0 sm:left-[4%]" style={cssVars({ '--d': '1.2s' })}>
          <Sparkle className="h-3 w-3 fill-fame" /> {people.length} {d.nav.people}
        </Link>
      </div>
    </HeroMotion>
  );
}
