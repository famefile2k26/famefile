import Link from 'next/link';
import type { ReactNode } from 'react';
import { brand } from '@/lib/brand';
import { getArticles, getTopSongsChart } from '@/lib/data';
import type { Article, ChartEntry } from '@/lib/data/types';
import { cssVars } from '@/lib/format';
import { articlePath, getDictionary, sectionAccent, type Locale } from '@/lib/i18n';
import { HeroMotion } from './HeroMotion';
import { Logo, Sparkle } from './Logo';
import { Poster } from './ui';

/**
 * Hero: uma mesa de "telas" do FAMEFILE — MacBook com o canal de vídeo, celular principal
 * rolando o feed vertical, um celular com o feed de posts e outro com o Top Global —
 * tudo com matérias e charts reais. Ao fundo, só os flashes dos paparazzi.
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

/* ─── Moldura de iPhone reaproveitada pelos três celulares ───── */
function PhoneFrame({ className, children }: { className: string; children: ReactNode }) {
  return (
    <div className={`phone ${className}`} aria-hidden>
      <span className="phone-btn phone-btn-l" />
      <span className="phone-btn phone-btn-r" />
      <div className="phone-screen">
        <div className="status">
          <span className="status-time">9:41</span>
          <span className="island" />
          <span className="status-icons">
            <i className="sig" />
            <i className="wifi" />
            <i className="bat" />
          </span>
        </div>
        {children}
        <span className="home-bar" />
      </div>
    </div>
  );
}

/** Celular principal: feed vertical estilo TikTok. */
function ReelPhone({ posts, locale }: { posts: Article[]; locale: Locale }) {
  const d = getDictionary(locale);
  return (
    <PhoneFrame className="dev-reel">
      <div className="feed-top">
        <span className="feed-live">LIVE</span>
        <span>{d.hero.following}</span>
        <b>{d.hero.forYou}</b>
        <Ico name="search" />
      </div>
      <div className="clip-logo">
        <Logo size="0.9rem" />
      </div>
      <div className="reel-track">
        {[...posts, posts[0]!].map((a, i) => (
          <Post key={`${a.id}-${i}`} article={a} locale={locale} />
        ))}
      </div>
      <span className="touch" />
      <nav className="feed-nav">
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
    </PhoneFrame>
  );
}

/** Celular da esquerda: feed de posts (quadrados) rolando sem parar. */
function PostsPhone({ posts, locale }: { posts: Article[]; locale: Locale }) {
  const d = getDictionary(locale);
  const list = posts.map((a) => (
    <div key={a.id} className="ig-post">
      <div className="ig-head">
        <span className="ig-av">F</span>
        <b>{brand.name.toLowerCase()}</b>
        <span className="clip-verified">✓</span>
        <i className="ig-more">•••</i>
      </div>
      <div className="ig-img">
        <Poster hue={a.hue} image={a.image} className="fill-abs" />
        <div className="ig-img-shade" />
        <span className="ig-tag" style={{ background: sectionAccent[a.section] }}>
          {d.nav[a.section]}
        </span>
        <p className="ig-title">{a.t[locale].headline}</p>
      </div>
      <div className="ig-actions">
        <Ico name="heart" />
        <Ico name="comment" />
        <Ico name="share" />
        <span className="ig-save">
          <Ico name="bookmark" />
        </span>
      </div>
      <p className="ig-cap">
        <b>{brand.name.toLowerCase()}</b> {a.t[locale].summary}
      </p>
    </div>
  ));
  return (
    <PhoneFrame className="dev-posts">
      <div className="ig-bar">
        <Logo size="0.8rem" />
        <span className="ig-bar-icons">
          <Ico name="heart" />
          <Ico name="inbox" />
        </span>
      </div>
      <div className="ig-scroll">
        <div className="ig-track">
          {list}
          {list}
        </div>
      </div>
    </PhoneFrame>
  );
}

/** Celular da direita: Top Global de música, rolando. */
function ChartPhone({ entries, title, locale }: { entries: ChartEntry[]; title: string; locale: Locale }) {
  const d = getDictionary(locale);
  const rows = entries.map((e) => (
    <li key={e.position} className="tc-row">
      <span className="tc-pos">{e.position}</span>
      <span
        className="tc-art"
        style={cssVars({
          background: e.cover
            ? `center / cover url(${e.cover})`
            : `linear-gradient(135deg, hsl(${e.hue} 85% 55%), hsl(${(e.hue + 50) % 360} 85% 40%))`,
        })}
      />
      <span className="tc-txt">
        <b>{e.title}</b>
        <small>{e.artistName}</small>
      </span>
      <span className={`tc-mv ${e.lastPosition === null ? 'new' : e.lastPosition > e.position ? 'up' : e.lastPosition < e.position ? 'down' : ''}`}>
        {e.lastPosition === null ? 'NEW' : e.lastPosition > e.position ? '▲' : e.lastPosition < e.position ? '▼' : '–'}
      </span>
    </li>
  ));
  return (
    <PhoneFrame className="dev-chart">
      <div className="tc-head">
        <small>{d.home.charts}</small>
        <b>{title}</b>
        <span className="tc-play">▶</span>
      </div>
      <div className="tc-scroll">
        <ol className="tc-track">
          {rows}
          {rows}
        </ol>
      </div>
      <div className="tc-now">
        <span className="tc-art" style={cssVars({ background: entries[0]?.cover ? `center / cover url(${entries[0].cover})` : 'var(--fame-gradient)' })} />
        <span className="tc-txt">
          <b>{entries[0]?.title}</b>
          <small>{entries[0]?.artistName}</small>
        </span>
        <span className="tc-bars">
          <i />
          <i />
          <i />
        </span>
      </div>
    </PhoneFrame>
  );
}

/** MacBook com o canal de vídeo do FAMEFILE. */
function Laptop({ posts, locale }: { posts: Article[]; locale: Locale }) {
  const d = getDictionary(locale);
  const [main, ...next] = posts;
  if (!main) return null;
  return (
    <div className="dev-laptop" aria-hidden>
      <div className="mb-lid">
        <span className="mb-notch" />
        <div className="mb-screen">
          <div className="yt-top">
            <span className="yt-menu">
              <i />
              <i />
              <i />
            </span>
            <span className="yt-brand">
              <span className="yt-play">▶</span>
              <Logo size="0.62rem" />
              <small>TV</small>
            </span>
            <span className="yt-search">
              {d.hero.search}
              <Ico name="search" />
            </span>
            <span className="yt-av">F</span>
          </div>
          <div className="yt-body">
            <div className="yt-main">
              <div className="yt-player">
                <Poster hue={main.hue} image={main.image} className="yt-poster" />
                <div className="yt-shade" />
                <span className="slant-label yt-label" style={{ background: sectionAccent[main.section] }}>
                  {d.nav[main.section]} <Sparkle className="h-2 w-2 fill-white" />
                </span>
                <p className="yt-over">{main.t[locale].headline}</p>
                <div className="yt-ctrl">
                  <span className="yt-prog">
                    <i />
                  </span>
                  <span className="yt-btns">
                    <b>❚❚</b>
                    <b>⏭</b>
                    <b>🔊</b>
                    <em>4:12 / 9:58</em>
                    <span className="yt-right">
                      <b>CC</b>
                      <b>⚙</b>
                      <b>⛶</b>
                    </span>
                  </span>
                </div>
              </div>
              <p className="yt-title">{main.t[locale].headline}</p>
              <div className="yt-chan">
                <span className="yt-av">F</span>
                <span className="yt-chan-name">
                  <b>
                    {brand.name} <span className="clip-verified">✓</span>
                  </b>
                  <small>{d.hero.channelSub}</small>
                </span>
                <span className="yt-sub">{d.hero.subscribe}</span>
                <span className="yt-pill">👍 {d.hero.like}</span>
                <span className="yt-pill">↗ {d.hero.share}</span>
              </div>
            </div>
            <div className="yt-side">
              <p className="yt-next">{d.hero.upNext}</p>
              {next.slice(0, 5).map((a, i) => (
                <div key={a.id} className="yt-item">
                  <span className="yt-thumb">
                    <Poster hue={a.hue} image={a.image} className="fill-abs" />
                    <em>{['8:41', '12:03', '6:27', '15:10', '4:55'][i]}</em>
                  </span>
                  <span className="yt-item-txt">
                    <b>{a.t[locale].headline}</b>
                    <small>
                      {brand.name} · {d.nav[a.section]}
                    </small>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-base">
        <span />
      </div>
    </div>
  );
}

/** Flashes de paparazzi espalhados pelo fundo (≈1/s no total; WCAG 2.3.1). Sem câmeras visíveis. */
const flashes = [
  { x: 6, y: 18, d: '0.4s', t: '6.8s' },
  { x: 18, y: 62, d: '2.2s', t: '7.4s' },
  { x: 29, y: 8, d: '4.9s', t: '6.3s' },
  { x: 41, y: 80, d: '1.3s', t: '8.1s' },
  { x: 57, y: 12, d: '3.6s', t: '7.0s' },
  { x: 69, y: 70, d: '5.8s', t: '6.6s' },
  { x: 81, y: 22, d: '0.9s', t: '7.7s' },
  { x: 93, y: 58, d: '3.1s', t: '6.9s' },
  { x: 12, y: 88, d: '6.4s', t: '8.4s' },
  { x: 88, y: 90, d: '2.7s', t: '7.9s' },
];

export async function Hero({ locale, country }: { locale: Locale; country: string }) {
  const [posts, chart] = await Promise.all([getArticles({ limit: 12, country }), getTopSongsChart()]);
  const lead = posts[0];
  const regionLabel = chart.region === 'GLOBAL' ? 'Top Global' : `Top ${chart.region}`;

  return (
    <HeroMotion labelledBy="hero-title">
      <h1 id="hero-title" className="sr-only">
        {brand.name}
      </h1>
      <div className="hero-bg" aria-hidden />
      {flashes.map((f, i) => (
        <span
          key={i}
          className="pap-flash"
          aria-hidden
          style={cssVars({ left: `${f.x}%`, top: `${f.y}%`, '--d': f.d, '--dur': f.t })}
        />
      ))}

      <div className="dev-stage">
        <Laptop posts={posts.slice(1, 7)} locale={locale} />
        <PostsPhone posts={posts.slice(5, 11)} locale={locale} />
        <ChartPhone entries={chart.entries.slice(0, 10)} title={`${regionLabel} · ${chart.title[locale]}`} locale={locale} />
        <ReelPhone posts={posts.slice(0, 5)} locale={locale} />
      </div>

      {lead && (
        <Link href={articlePath(locale, lead.section, lead.t[locale].slug, lead.id)} className="sr-only">
          {lead.t[locale].headline}
        </Link>
      )}
    </HeroMotion>
  );
}
