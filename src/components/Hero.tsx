import Link from 'next/link';
import { brand } from '@/lib/brand';
import { getArticles } from '@/lib/data';
import type { Article } from '@/lib/data/types';
import { cssVars } from '@/lib/format';
import { articlePath, getDictionary, sectionAccent, type Locale } from '@/lib/i18n';
import { HeroMotion } from './HeroMotion';
import { Logo, Sparkle } from './Logo';
import { Poster } from './ui';

/**
 * Hero: só o celular rolando o feed do FAMEFILE (cada post é uma matéria real)
 * e, ao fundo, uma plateia erguendo iPhones para fotografar — com o flash disparando.
 * CSS puro; HeroMotion só pausa as animações quando o hero sai da tela.
 */

/* ─── Ícones do app (traço 2px, estilo iOS) ──────────────────── */
const I = {
  heart: <path d="M12 20.5s-7.8-4.7-9.6-9.6C1.2 7.6 3.4 4.5 6.8 4.5c2.1 0 3.8 1.2 5.2 3 1.4-1.8 3.1-3 5.2-3 3.4 0 5.6 3.1 4.4 6.4-1.8 4.9-9.6 9.6-9.6 9.6z" />,
  comment: <path d="M12 3.8c-4.9 0-8.8 3.4-8.8 7.6 0 2.2 1.1 4.2 2.9 5.6l-.6 3.4 3.6-1.8c.9.3 1.9.4 2.9.4 4.9 0 8.8-3.4 8.8-7.6S16.9 3.8 12 3.8z" />,
  bookmark: <path d="M6.5 3.5h11a1 1 0 0 1 1 1v16l-6.5-4.2-6.5 4.2v-16a1 1 0 0 1 1-1z" />,
  share: <path d="M13.5 4.5 21 11.6l-7.5 7v-4.1c-5.6 0-8.9 1.6-11 5 .6-5.7 3.9-9.8 11-10.6z" />,
  home: <path d="M3.5 10.6 12 3.8l8.5 6.8v9.1a.8.8 0 0 1-.8.8h-5.2v-5.8h-5v5.8H4.3a.8.8 0 0 1-.8-.8z" />,
  friends: (
    <>
      <circle cx="9" cy="8.5" r="3.4" />
      <path d="M2.8 19.5c.6-3.4 3.1-5.4 6.2-5.4s5.6 2 6.2 5.4" />
      <path d="M15.6 5.4a3.3 3.3 0 0 1 0 6.3M17.4 14.4c2 .6 3.4 2.4 3.8 5.1" />
    </>
  ),
  inbox: (
    <>
      <path d="M3.5 6.5h17v11h-17z" />
      <path d="m3.8 6.8 8.2 6.4 8.2-6.4" />
    </>
  ),
  profile: (
    <>
      <circle cx="12" cy="8.3" r="4" />
      <path d="M4.2 20.2c.8-4 3.9-6.3 7.8-6.3s7 2.3 7.8 6.3" />
    </>
  ),
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.3" />
      <path d="m15.5 15.5 4.5 4.5" />
    </>
  ),
};
const Ico = ({ name, filled = false }: { name: keyof typeof I; filled?: boolean }) => (
  <svg viewBox="0 0 24 24" className={filled ? 'ico ico-fill' : 'ico'} aria-hidden>
    {I[name]}
  </svg>
);

function Post({ article, locale }: { article: Article; locale: Locale }) {
  const d = getDictionary(locale);
  const t = article.t[locale];
  const label = article.breaking ? d.home.breaking : d.nav[article.section];
  return (
    <div className="clip">
      <Poster hue={article.hue} image={article.image} className="clip-bg" />
      <div className="clip-shade" />
      <div className="clip-story">
        <span className="slant-label px-2! py-0.5! text-[9px]!" style={article.breaking ? undefined : { background: sectionAccent[article.section] }}>
          {label} <Sparkle className="h-2 w-2 fill-white" />
        </span>
        <p className="clip-headline">{t.headline}</p>
      </div>
      <div className="clip-rail">
        <span className="clip-avatar">
          <span>F</span>
        </span>
        <span className="liked">
          <Ico name="heart" filled />
        </span>
        <Ico name="comment" filled />
        <Ico name="bookmark" filled />
        <Ico name="share" filled />
        <span className="clip-disc" />
      </div>
      <div className="clip-meta">
        <p className="clip-user">
          {brand.name.toLowerCase()} <span className="clip-verified">✓</span>
        </p>
        <p className="clip-caption">{t.summary}</p>
        <p className="clip-sound">
          <span>♫ som original — {brand.name} · som original — {brand.name}</span>
        </p>
      </div>
      <div className="clip-progress" />
    </div>
  );
}

/* ─── Plateia com iPhones erguidos ───────────────────────────── */

type Fan = { x: number; y: number; s: number; hand: -1 | 1; tilt: number; flash?: string };

/** Fileira de trás (menor, mais clara) e da frente (maior, quase preta). `flash` = "delay/duração". */
const back: Fan[] = [
  { x: 60, y: 0, s: 0.62, hand: 1, tilt: -6 },
  { x: 180, y: 10, s: 0.6, hand: -1, tilt: 8, flash: '2.6s/7.1s' },
  { x: 305, y: -4, s: 0.64, hand: 1, tilt: -3 },
  { x: 430, y: 8, s: 0.6, hand: 1, tilt: 5, flash: '5.1s/6.6s' },
  { x: 560, y: 2, s: 0.62, hand: -1, tilt: -4 },
  { x: 665, y: 10, s: 0.58, hand: 1, tilt: 6, flash: '6.3s/7.9s' },
  { x: 780, y: 0, s: 0.62, hand: -1, tilt: -7 },
  { x: 890, y: 8, s: 0.6, hand: 1, tilt: 3, flash: '1.9s/8.2s' },
  { x: 1020, y: 6, s: 0.6, hand: -1, tilt: -7, flash: '0.8s/7.4s' },
  { x: 1140, y: -2, s: 0.64, hand: 1, tilt: 4 },
  { x: 1265, y: 8, s: 0.6, hand: -1, tilt: -5, flash: '3.9s/6.9s' },
  { x: 1385, y: 2, s: 0.62, hand: 1, tilt: 6 },
];
const front: Fan[] = [
  { x: 40, y: 0, s: 1, hand: 1, tilt: 7, flash: '1.4s/6.2s' },
  { x: 230, y: 18, s: 0.94, hand: -1, tilt: -9 },
  { x: 410, y: 4, s: 1.02, hand: 1, tilt: 4, flash: '4.2s/7.3s' },
  { x: 600, y: 16, s: 0.92, hand: -1, tilt: -5, flash: '5.6s/8.1s' },
  { x: 840, y: 12, s: 0.95, hand: 1, tilt: 6 },
  { x: 1040, y: 10, s: 1, hand: -1, tilt: -5, flash: '0.3s/6.8s' },
  { x: 1220, y: 0, s: 0.96, hand: 1, tilt: 8 },
  { x: 1400, y: 14, s: 1.02, hand: -1, tilt: -6, flash: '3.1s/7.6s' },
];

/** Uma pessoa de costas erguendo o iPhone (vemos o verso: módulo de 3 câmeras + flash). */
function FanShape({ f, base, row }: { f: Fan; base: number; row: 'back' | 'front' }) {
  const s = f.s;
  const headY = base + f.y - 118 * s;
  const shoulderY = headY + 62 * s;
  const handX = f.x + f.hand * 50 * s;
  const handY = headY - 96 * s;
  const w = 42 * s;
  const h = 86 * s;
  const px = handX - w / 2;
  const py = handY - h * 0.72;
  const cam = 19 * s;
  const lens = 3.8 * s;
  const cx = px + w - cam - 3.5 * s; // módulo no canto (visto por trás)
  const cy = py + 3.5 * s;
  const fx = cx + cam - 4 * s;
  const fy = cy + cam - 4 * s;
  const [delay, dur] = (f.flash ?? '').split('/');
  return (
    <g className={`fan fan-${row}`}>
      {/* braço erguido (atrás do corpo) */}
      <path
        d={`M${f.x + f.hand * 36 * s} ${shoulderY} Q${f.x + f.hand * 66 * s} ${headY - 10 * s} ${handX} ${handY + 10 * s}`}
        className="fan-arm"
        style={{ strokeWidth: 19 * s }}
      />
      {/* corpo + cabeça */}
      <path
        className="fan-body"
        d={`M${f.x - 80 * s} ${base + 60}C${f.x - 78 * s} ${shoulderY + 30 * s} ${f.x - 60 * s} ${shoulderY} ${f.x} ${shoulderY}S${f.x + 78 * s} ${shoulderY + 30 * s} ${f.x + 80 * s} ${base + 60}z`}
      />
      <ellipse className="fan-body" cx={f.x} cy={headY} rx={30 * s} ry={35 * s} />
      {/* iPhone na mão */}
      <g transform={`rotate(${f.tilt} ${handX} ${handY})`}>
        <ellipse cx={handX} cy={py + h - 4 * s} rx={17 * s} ry={13 * s} className="fan-hand" />
        <rect x={px} y={py} width={w} height={h} rx={8 * s} className="fan-phone" />
        <rect x={cx} y={cy} width={cam} height={cam} rx={5.5 * s} className="fan-cam" />
        <circle cx={cx + 5.4 * s} cy={cy + 5.4 * s} r={lens} className="fan-lens" />
        <circle cx={cx + 5.4 * s} cy={cy + cam - 5.4 * s} r={lens} className="fan-lens" />
        <circle cx={cx + cam - 5.4 * s} cy={cy + cam / 2} r={lens} className="fan-lens" />
        <circle cx={fx} cy={fy} r={1.5 * s} className="fan-led" />
        <rect x={px - 3 * s} y={py + h * 0.55} width={7 * s} height={h * 0.3} rx={3.5 * s} className="fan-hand" />
        <rect x={px + w - 4 * s} y={py + h * 0.6} width={7 * s} height={h * 0.26} rx={3.5 * s} className="fan-hand" />
      </g>
      {f.flash && (
        <circle cx={fx} cy={fy} r={150 * s} className="fan-flash" style={cssVars({ '--d': delay ?? '0s', '--dur': dur ?? '7s' })} />
      )}
    </g>
  );
}

function Crowd() {
  return (
    <div className="crowd" aria-hidden>
      <svg viewBox="0 0 1440 520" preserveAspectRatio="xMidYMax slice">
        <defs>
          <radialGradient id="ff-flash">
            <stop offset="0" stopColor="#fff" />
            <stop offset="0.06" stopColor="#fff" stopOpacity="0.95" />
            <stop offset="0.2" stopColor="#ffe3ef" stopOpacity="0.35" />
            <stop offset="1" stopColor="#ffe3ef" stopOpacity="0" />
          </radialGradient>
        </defs>
        {back.map((f) => (
          <FanShape key={`b${f.x}`} f={f} base={430} row="back" />
        ))}
        {front.map((f) => (
          <FanShape key={`f${f.x}`} f={f} base={560} row="front" />
        ))}
      </svg>
    </div>
  );
}

export async function Hero({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const posts = await getArticles({ limit: 5 });
  const lead = posts[0];

  return (
    <HeroMotion labelledBy="hero-title">
      <h1 id="hero-title" className="sr-only">
        {brand.name}
      </h1>
      <div className="hero-bg" aria-hidden />
      <Crowd />

      <div className="hero-stage">
        <div className="phone-hand">
          <div className="phone">
            <span className="phone-btn phone-btn-l" aria-hidden />
            <span className="phone-btn phone-btn-r" aria-hidden />
            <div className="phone-screen">
              <div className="status" aria-hidden>
                <span className="status-time">9:41</span>
                <span className="island" />
                <span className="status-icons">
                  <i className="sig" />
                  <i className="wifi" />
                  <i className="bat" />
                </span>
              </div>
              <div className="feed-top" aria-hidden>
                <span className="feed-live">LIVE</span>
                <span>{d.hero.following}</span>
                <b>{d.hero.forYou}</b>
                <Ico name="search" />
              </div>
              <div className="clip-logo" aria-hidden>
                <Logo size="0.9rem" />
              </div>
              <div className="reel-track" aria-hidden>
                {[...posts, posts[0]!].map((a, i) => (
                  <Post key={`${a.id}-${i}`} article={a} locale={locale} />
                ))}
              </div>
              <span className="touch" aria-hidden />
              <nav className="feed-nav" aria-hidden>
                <span className="on">
                  <Ico name="home" filled />
                  <small>Home</small>
                </span>
                <span>
                  <Ico name="friends" />
                  <small>{d.hero.following}</small>
                </span>
                <span className="create">
                  <b />
                </span>
                <span>
                  <Ico name="inbox" />
                  <small>Inbox</small>
                </span>
                <span>
                  <Ico name="profile" />
                  <small>{d.hero.me}</small>
                </span>
              </nav>
              <span className="home-bar" aria-hidden />
            </div>
          </div>
        </div>
        {lead && (
          <Link href={articlePath(locale, lead.section, lead.t[locale].slug, lead.id)} className="sr-only">
            {lead.t[locale].headline}
          </Link>
        )}
      </div>
    </HeroMotion>
  );
}
