/**
 * COBERTURA VMA 2026 (27/09/2026, Los Angeles) — pesquisada em 28/09/2026.
 * Texto próprio a partir dos fatos das fontes; cada matéria credita as fontes usadas.
 */
import type { Article, Localized } from './types';
import type { SectionKey } from '@/lib/i18n/routes';

type Lang = { slug: string; headline: string; summary: string; body: string[] };

function art(
  id: string,
  section: SectionKey,
  publishedAt: string,
  hue: number,
  personIds: string[],
  sources: { name: string; url: string }[],
  t: Localized<Lang>,
  extra: Partial<Article> = {},
): Article {
  return { id, section, confidence: 'confirmed', risk: 'green', publishedAt, hue, personIds, sources, t, ...extra };
}

const W = {
  pt: [
    'Clipe do Ano: Taylor Swift — “The Fate of Ophelia”',
    'Artista do Ano: Madonna',
    'Música do Ano: BTS — “Swim”',
    'Artista Revelação: Sienna Spiro',
    'Melhor Colaboração: Madonna & Sabrina Carpenter — “Bring Your Love”',
    'Melhor Pop: LISA feat. Kentaro Sakaguchi — “Dream”',
    'Melhor Hip-Hop: Cardi B feat. Kehlani — “Safe”',
    'Melhor R&B: Bruno Mars — “I Just Might”',
    'Melhor Alternativo: Olivia Rodrigo — “The Cure”',
    'Melhor Dance: Madonna — “Confessions II — The Film”',
    'Melhor Latino: Bad Bunny — “NUEVAYoL”',
    'Melhor K-pop: BTS — “Swim”',
    'Melhor Country: Ella Langley — “Choosin’ Texas”',
    'Melhor Grupo: BTS',
    'Melhor Álbum: Madonna — “Confessions II”',
    'Música do Verão: Ariana Grande — “Hate That I Made You Love Me”',
    'Melhor Direção: Taylor Swift — “Opalite”',
    'Melhor Direção de Arte: PinkPantheress & Zara Larsson — “Stateside”',
    'Melhor Fotografia: Madonna — “Confessions II — The Film”',
    'Melhor Edição: Sabrina Carpenter — “House Tour”',
    'Melhor Coreografia: Madonna — “Confessions II — The Film”',
    'Melhores Efeitos Visuais: Ariana Grande — “Hate That I Made You Love Me”',
    'Melhor Vídeo Longo: Madonna — “Confessions II — The Film”',
    'Video Vanguard: Nirvana',
    'Artist Director Honors (novo): Taylor Swift',
  ],
  en: [
    'Video of the Year: Taylor Swift — “The Fate of Ophelia”',
    'Artist of the Year: Madonna',
    'Song of the Year: BTS — “Swim”',
    'Best New Artist: Sienna Spiro',
    'Best Collaboration: Madonna & Sabrina Carpenter — “Bring Your Love”',
    'Best Pop: LISA feat. Kentaro Sakaguchi — “Dream”',
    'Best Hip-Hop: Cardi B feat. Kehlani — “Safe”',
    'Best R&B: Bruno Mars — “I Just Might”',
    'Best Alternative: Olivia Rodrigo — “The Cure”',
    'Best Dance: Madonna — “Confessions II — The Film”',
    'Best Latin: Bad Bunny — “NUEVAYoL”',
    'Best K-Pop: BTS — “Swim”',
    'Best Country: Ella Langley — “Choosin’ Texas”',
    'Best Group: BTS',
    'Best Album: Madonna — “Confessions II”',
    'Song of the Summer: Ariana Grande — “Hate That I Made You Love Me”',
    'Best Direction: Taylor Swift — “Opalite”',
    'Best Art Direction: PinkPantheress & Zara Larsson — “Stateside”',
    'Best Cinematography: Madonna — “Confessions II — The Film”',
    'Best Editing: Sabrina Carpenter — “House Tour”',
    'Best Choreography: Madonna — “Confessions II — The Film”',
    'Best Visual Effects: Ariana Grande — “Hate That I Made You Love Me”',
    'Best Long Form Video: Madonna — “Confessions II — The Film”',
    'Video Vanguard: Nirvana',
    'Artist Director Honors (new): Taylor Swift',
  ],
  es: [
    'Video del Año: Taylor Swift — “The Fate of Ophelia”',
    'Artista del Año: Madonna',
    'Canción del Año: BTS — “Swim”',
    'Artista Revelación: Sienna Spiro',
    'Mejor Colaboración: Madonna & Sabrina Carpenter — “Bring Your Love”',
    'Mejor Pop: LISA feat. Kentaro Sakaguchi — “Dream”',
    'Mejor Hip-Hop: Cardi B feat. Kehlani — “Safe”',
    'Mejor R&B: Bruno Mars — “I Just Might”',
    'Mejor Alternativo: Olivia Rodrigo — “The Cure”',
    'Mejor Dance: Madonna — “Confessions II — The Film”',
    'Mejor Latino: Bad Bunny — “NUEVAYoL”',
    'Mejor K-pop: BTS — “Swim”',
    'Mejor Country: Ella Langley — “Choosin’ Texas”',
    'Mejor Grupo: BTS',
    'Mejor Álbum: Madonna — “Confessions II”',
    'Canción del Verano: Ariana Grande — “Hate That I Made You Love Me”',
    'Mejor Dirección: Taylor Swift — “Opalite”',
    'Mejor Dirección de Arte: PinkPantheress & Zara Larsson — “Stateside”',
    'Mejor Fotografía: Madonna — “Confessions II — The Film”',
    'Mejor Edición: Sabrina Carpenter — “House Tour”',
    'Mejor Coreografía: Madonna — “Confessions II — The Film”',
    'Mejores Efectos Visuales: Ariana Grande — “Hate That I Made You Love Me”',
    'Mejor Video Largo: Madonna — “Confessions II — The Film”',
    'Video Vanguard: Nirvana',
    'Artist Director Honors (nuevo): Taylor Swift',
  ],
};

const SRC = {
  rsca: { name: 'Rolling Stone Canada', url: 'https://ca.rollingstone.com/music/2026-vmas-winners-list/' },
  wiki: { name: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/2026_MTV_Video_Music_Awards' },
  nbc: { name: 'NBC Los Angeles', url: 'https://www.nbclosangeles.com/entertainment/entertainment-news/2026-mtv-video-music-awards-nominations-full-list/3946741/' },
  haute: { name: 'Haute Living', url: 'https://hauteliving.com/2026/09/2026-vmas-winners-madonna-seven-wins/797436/' },
  aw: { name: 'Awards Watch', url: 'https://awardswatch.com/2026-mtv-video-music-awards-madonna-dominates-with-seven-wins-including-artist-of-the-year/' },
  hl: { name: 'HollywoodLife', url: 'https://hollywoodlife.com/feature/vmas-winners-2026-list-5563081/' },
  mt: { name: 'Music Times', url: 'https://www.musictimes.com/articles/112907/20260928/bts-sweeps-2026-mtv-vmas-historic-song-year-win-awards-happened-off-screen.htm' },
  cbs: { name: 'CBS News', url: 'https://www.cbsnews.com/news/2026-vmas-highlights-madonna-taylor-swift/' },
  gma: { name: 'Good Morning America', url: 'https://www.goodmorningamerica.com/culture/story/taylor-swift-makes-history-1st-vmas-artist-director-136811470' },
  wion: { name: 'WION', url: 'https://www.wionews.com/entertainment/hollywood/vmas-2026-taylor-swift-becomes-most-awarded-artist-in-mtv-history-honours-dolly-parton-1790580294762' },
  stereoN: { name: 'Stereogum', url: 'https://stereogum.com/2512683/vmas-2026-nirvana-receive-the-video-vanguard-award/news' },
  bbN: { name: 'Billboard', url: 'https://www.billboard.com/music/awards/nirvana-wins-vmas-video-vanguard-award-2026-1236348713/' },
  globe: { name: 'Boston Globe', url: 'https://www.bostonglobe.com/2026/09/28/arts/mtv-vmas-best-moments/' },
  gulf: { name: 'Gulf News', url: 'https://gulfnews.com/entertainment/vmas-2026-blackpinks-lisa-wins-best-pop-beats-taylor-swift-all-those-late-night-dreams-brought-me-here-1.500690075' },
  tbs: { name: 'TBS News', url: 'https://www.tbsnews.net/splash/vmas-2026-delayed-start-madonnas-bad-lip-sync-and-bruno-mars-pre-recorded-performance-anger' },
  jj: { name: 'Just Jared', url: 'https://www.justjared.com/2026/09/27/why-bruno-mars-didnt-perform-live-2026-mtv-vmas-colorado-concert/' },
  jjRed: { name: 'Just Jared', url: 'https://www.justjared.com/2026/09/27/best-dressed-at-mtv-vmas-2026-top-10-red-carpet-looks-at-musics-most-fun-night/' },
  wmag: { name: 'W Magazine', url: 'https://www.wmagazine.com/fashion/mtv-vmas-2026-red-carpet-fashion-dresses-photos' },
  abc: { name: 'ABC News', url: 'https://abcnews.com/GMA/Culture/madonna-makes-epic-vmas-return-sabrina-carpenter-charli/story?id=136808704' },
  forbes: { name: 'Forbes', url: 'https://www.forbes.com/sites/jeffbenjamin/2026/09/27/2026-vmas-madonna-lisa-tyla-lead-full-performer-presenter-list/' },
  skip: { name: 'Magic 107.9', url: 'https://magic1079.iheart.com/content/2026-09-28-2026-mtv-vmas-see-the-list-celebs-who-skipped-the-show/' },
  snoop: { name: 'Billboard', url: 'https://www.billboard.com/music/awards/snoop-dogg-host-vmas-monologue-1236348609/' },
  spiro: { name: 'iHeart', url: 'https://1015theriver.iheart.com/content/2026-09-27-sienna-spiro-gives-emotional-speech-after-winning-at-2026-vmas/' },
  daily: { name: 'Daily Planet DC', url: 'https://dailyplanetdc.com/2026/09/28/vmas-2026-madonna-swift/' },
  beast: { name: 'The Daily Beast', url: 'https://www.thedailybeast.com/obsessed/madonna-68-embarrasses-pop-star-sabrina-carpenter-on-stage-in-cringe-vmas-speech/' },
};

export const vmaArticles: Article[] = [
  /* ─── Lista completa ─────────────────────────────────────── */
  art(
    '2031', 'music', '2026-09-28T05:30:00Z', 300,
    ['madonna', 'taylor-swift', 'bts', 'lisa', 'bad-bunny', 'ariana-grande', 'sabrina-carpenter', 'bruno-mars', 'olivia-rodrigo', 'ella-langley'],
    [SRC.rsca, SRC.wiki, SRC.nbc, SRC.hl],
    {
      pt: {
        slug: 'vma-2026-lista-completa-vencedores-indicados',
        headline: 'VMA 2026: a lista completa de vencedores — e quem saiu de mãos vazias',
        summary: 'Todas as 23 categorias, os prêmios especiais e os indicados que perderam em cada disputa.',
        body: [
          'O 43º MTV Video Music Awards aconteceu no domingo (27), no Peacock Theater, em Los Angeles, com apresentação de Snoop Dogg. Só seis prêmios foram entregues ao vivo na TV; os outros 17 saíram fora da transmissão. A lista de vencedores está no quadro ao lado.',
          'Clipe do Ano: Taylor Swift venceu com “The Fate of Ophelia” e deixou para trás Ariana Grande (“Hate That I Made You Love Me”), Bruno Mars (“I Just Might”), Gener8ion (“Storm”, com Yung Lean), Madonna (“Confessions II — The Film”) e Sabrina Carpenter (“Tears”).',
          'Artista do Ano: Madonna superou Ariana Grande, Bruno Mars, Morgan Wallen, Sabrina Carpenter e Taylor Swift. Em Música do Ano, “Swim”, do BTS, bateu “Choosin’ Texas” (Ella Langley), “Golden” (Huntr/X), “Bring Your Love” (Madonna & Sabrina), “Man I Need” (Olivia Dean), “Stateside” (PinkPantheress e Zara Larsson) e “Where Is My Husband!” (Raye).',
          'Melhor Pop foi para LISA com “Dream”, contra Ariana Grande, Charli xcx, Olivia Rodrigo, Sabrina Carpenter, Tate McRae e Taylor Swift. Em Melhor Latino, Bad Bunny venceu com “NUEVAYoL” e superou Anitta com Shakira (“Choka Choka”), Fuerza Regida, Karol G (“Papasito”), Rosalía (“La Perla”), Ryan Castro e Shakira com Burna Boy (“Dai Dai”).',
          'Em Melhor Hip-Hop, Cardi B e Kehlani (“Safe”) derrotaram Don Toliver, Drake (“Janice STFU”), Megan Thee Stallion, Travis Scott (“Dumbo”) e Tyler, the Creator. Bruno Mars levou Melhor R&B contra Chris Brown, Dave & Tems, Justin Bieber (“Yukon”), Kehlani e Mariah the Scientist com Kali Uchis.',
          'Olivia Rodrigo ganhou Melhor Alternativo com “The Cure”, à frente de Geese, MGK & Fred Durst, Noah Kahan, Sombr, Tame Impala e Twenty One Pilots. Ella Langley levou Melhor Country, superando Kacey Musgraves, Lainey Wilson, Luke Combs, Shaboozey, Stella Lefty e Tucker Wetmore.',
          'O BTS venceu Melhor K-pop contra BLACKPINK (“Jump”), Cortis, Katseye, Le Sserafim com J-Hope e LISA, e também Melhor Grupo, contra BLACKPINK, Cortis, Fuerza Regida, Geese, Katseye e Twenty One Pilots. Sienna Spiro foi Artista Revelação, à frente de Bella Kay, Cortis, Magnus Ferrell, Malcolm Todd, Myles Smith e Stella Lefty.',
          'Madonna levou ainda Melhor Álbum (“Confessions II”), contra Drake, Olivia Dean, Olivia Rodrigo, Sabrina Carpenter e Taylor Swift (“The Life of a Showgirl”), além de Melhor Dance, Fotografia, Coreografia e Vídeo Longo. Ariana Grande ficou com Música do Verão e Efeitos Visuais; Sabrina Carpenter, com Edição; PinkPantheress e Zara Larsson, com Direção de Arte.',
        ],
      },
      en: {
        slug: 'vmas-2026-full-winners-nominees-list',
        headline: 'VMAs 2026: the complete winners list — and who went home empty-handed',
        summary: 'All 23 categories, the special honors and the nominees who lost in each race.',
        body: [
          'The 43rd MTV Video Music Awards took place Sunday at the Peacock Theater in Los Angeles, hosted by Snoop Dogg. Only six awards were handed out on air; the other 17 were presented off-camera. The full list of winners is in the box.',
          'Video of the Year: Taylor Swift won for “The Fate of Ophelia” over Ariana Grande (“Hate That I Made You Love Me”), Bruno Mars (“I Just Might”), Gener8ion (“Storm”, starring Yung Lean), Madonna (“Confessions II — The Film”) and Sabrina Carpenter (“Tears”).',
          'Artist of the Year: Madonna beat Ariana Grande, Bruno Mars, Morgan Wallen, Sabrina Carpenter and Taylor Swift. For Song of the Year, BTS’s “Swim” topped “Choosin’ Texas” (Ella Langley), “Golden” (Huntr/X), “Bring Your Love” (Madonna & Sabrina), “Man I Need” (Olivia Dean), “Stateside” (PinkPantheress and Zara Larsson) and “Where Is My Husband!” (Raye).',
          'Best Pop went to LISA for “Dream”, against Ariana Grande, Charli xcx, Olivia Rodrigo, Sabrina Carpenter, Tate McRae and Taylor Swift. In Best Latin, Bad Bunny won with “NUEVAYoL” over Anitta with Shakira (“Choka Choka”), Fuerza Regida, Karol G (“Papasito”), Rosalía (“La Perla”), Ryan Castro and Shakira with Burna Boy (“Dai Dai”).',
          'In Best Hip-Hop, Cardi B and Kehlani (“Safe”) beat Don Toliver, Drake (“Janice STFU”), Megan Thee Stallion, Travis Scott (“Dumbo”) and Tyler, the Creator. Bruno Mars took Best R&B over Chris Brown, Dave & Tems, Justin Bieber (“Yukon”), Kehlani and Mariah the Scientist with Kali Uchis.',
          'Olivia Rodrigo won Best Alternative for “The Cure”, ahead of Geese, MGK & Fred Durst, Noah Kahan, Sombr, Tame Impala and Twenty One Pilots. Ella Langley took Best Country over Kacey Musgraves, Lainey Wilson, Luke Combs, Shaboozey, Stella Lefty and Tucker Wetmore.',
          'BTS won Best K-Pop against BLACKPINK (“Jump”), Cortis, Katseye, Le Sserafim with J-Hope and LISA, plus Best Group over BLACKPINK, Cortis, Fuerza Regida, Geese, Katseye and Twenty One Pilots. Sienna Spiro was Best New Artist, ahead of Bella Kay, Cortis, Magnus Ferrell, Malcolm Todd, Myles Smith and Stella Lefty.',
          'Madonna also won Best Album (“Confessions II”) over Drake, Olivia Dean, Olivia Rodrigo, Sabrina Carpenter and Taylor Swift (“The Life of a Showgirl”), plus Best Dance, Cinematography, Choreography and Long Form Video. Ariana Grande took Song of the Summer and Visual Effects; Sabrina Carpenter, Editing; PinkPantheress and Zara Larsson, Art Direction.',
        ],
      },
      es: {
        slug: 'vma-2026-lista-completa-ganadores-nominados',
        headline: 'VMA 2026: la lista completa de ganadores — y quién se fue con las manos vacías',
        summary: 'Las 23 categorías, los premios especiales y los nominados que perdieron en cada una.',
        body: [
          'La 43ª edición de los MTV Video Music Awards se celebró el domingo en el Peacock Theater de Los Ángeles, con Snoop Dogg como presentador. Solo seis premios se entregaron en directo; los otros 17, fuera de cámara. La lista de ganadores está en el recuadro.',
          'Video del Año: Taylor Swift ganó con “The Fate of Ophelia” frente a Ariana Grande (“Hate That I Made You Love Me”), Bruno Mars (“I Just Might”), Gener8ion (“Storm”, con Yung Lean), Madonna (“Confessions II — The Film”) y Sabrina Carpenter (“Tears”).',
          'Artista del Año: Madonna superó a Ariana Grande, Bruno Mars, Morgan Wallen, Sabrina Carpenter y Taylor Swift. En Canción del Año, “Swim” de BTS venció a “Choosin’ Texas” (Ella Langley), “Golden” (Huntr/X), “Bring Your Love” (Madonna & Sabrina), “Man I Need” (Olivia Dean), “Stateside” (PinkPantheress y Zara Larsson) y “Where Is My Husband!” (Raye).',
          'Mejor Pop fue para LISA con “Dream”, frente a Ariana Grande, Charli xcx, Olivia Rodrigo, Sabrina Carpenter, Tate McRae y Taylor Swift. En Mejor Latino, Bad Bunny ganó con “NUEVAYoL” y superó a Anitta con Shakira (“Choka Choka”), Fuerza Regida, Karol G (“Papasito”), Rosalía (“La Perla”), Ryan Castro y Shakira con Burna Boy (“Dai Dai”).',
          'En Mejor Hip-Hop, Cardi B y Kehlani (“Safe”) vencieron a Don Toliver, Drake (“Janice STFU”), Megan Thee Stallion, Travis Scott (“Dumbo”) y Tyler, the Creator. Bruno Mars se llevó Mejor R&B frente a Chris Brown, Dave & Tems, Justin Bieber (“Yukon”), Kehlani y Mariah the Scientist con Kali Uchis.',
          'Olivia Rodrigo ganó Mejor Alternativo con “The Cure”, por delante de Geese, MGK & Fred Durst, Noah Kahan, Sombr, Tame Impala y Twenty One Pilots. Ella Langley se llevó Mejor Country, superando a Kacey Musgraves, Lainey Wilson, Luke Combs, Shaboozey, Stella Lefty y Tucker Wetmore.',
          'BTS ganó Mejor K-pop frente a BLACKPINK (“Jump”), Cortis, Katseye, Le Sserafim con J-Hope y LISA, y también Mejor Grupo, frente a BLACKPINK, Cortis, Fuerza Regida, Geese, Katseye y Twenty One Pilots. Sienna Spiro fue Artista Revelación, por delante de Bella Kay, Cortis, Magnus Ferrell, Malcolm Todd, Myles Smith y Stella Lefty.',
          'Madonna también ganó Mejor Álbum (“Confessions II”) frente a Drake, Olivia Dean, Olivia Rodrigo, Sabrina Carpenter y Taylor Swift (“The Life of a Showgirl”), además de Mejor Dance, Fotografía, Coreografía y Video Largo. Ariana Grande se quedó con Canción del Verano y Efectos Visuales; Sabrina Carpenter, con Edición; PinkPantheress y Zara Larsson, con Dirección de Arte.',
        ],
      },
    },
    { factBox: { pt: { known: W.pt, unknown: [] }, en: { known: W.en, unknown: [] }, es: { known: W.es, unknown: [] } } },
  ),

  /* ─── Madonna ────────────────────────────────────────────── */
  art(
    '2032', 'music', '2026-09-28T06:20:00Z', 320, ['madonna', 'sabrina-carpenter', 'charli-xcx'],
    [SRC.haute, SRC.aw, SRC.abc, SRC.beast],
    {
      pt: {
        slug: 'madonna-7-premios-vma-2026-maior-noite-da-carreira',
        headline: 'Madonna leva 7 prêmios no VMA 2026 e tem a maior noite da carreira na premiação',
        summary: 'Artista do Ano, Melhor Álbum e mais cinco troféus: a cantora superou o recorde de “Ray of Light”, de 1998.',
        body: [
          'Madonna saiu do VMA 2026 com sete troféus: Artista do Ano, Melhor Colaboração (com Sabrina Carpenter, por “Bring Your Love”), Melhor Dance, Melhor Fotografia, Melhor Coreografia, Melhor Vídeo Longo e Melhor Álbum, por “Confessions II”.',
          'É a melhor noite dela na história da premiação: o recorde anterior eram os seis prêmios de “Ray of Light”, em 1998. Ela não vencia um VMA desde 1999 e chegou à cerimônia com 11 indicações, que viraram 13 com as categorias anunciadas depois.',
          'A cantora abriu o show ao lado de Sabrina Carpenter e Charli xcx, na sua primeira apresentação no VMA em 23 anos. No discurso de Melhor Dance, disse que “todo mundo é igual na pista”. Ao receber Melhor Colaboração, contou que mandou mensagem direta para Sabrina depois de passar cinco dias sem resposta da equipe dela — história que parte da imprensa americana tratou como constrangedora para a colega.',
        ],
      },
      en: {
        slug: 'madonna-7-vmas-2026-biggest-night-career',
        headline: 'Madonna wins 7 VMAs in 2026, the biggest night of her career at the show',
        summary: 'Artist of the Year, Best Album and five more trophies: she beat the record set by “Ray of Light” in 1998.',
        body: [
          'Madonna left the 2026 VMAs with seven trophies: Artist of the Year, Best Collaboration (with Sabrina Carpenter, for “Bring Your Love”), Best Dance, Best Cinematography, Best Choreography, Best Long Form Video and Best Album for “Confessions II”.',
          'It is her best night in the show’s history: the previous record was six wins for “Ray of Light” in 1998. She hadn’t won a VMA since 1999 and came in with 11 nominations, which grew to 13 when more categories were announced.',
          'She opened the show with Sabrina Carpenter and Charli xcx, her first VMAs performance in 23 years. Accepting Best Dance, she said “we’re all equal on the dance floor”. Accepting Best Collaboration, she recounted DM’ing Carpenter after five days without hearing back from her team — a story some US outlets framed as awkward for her collaborator.',
        ],
      },
      es: {
        slug: 'madonna-7-premios-vma-2026-mejor-noche-carrera',
        headline: 'Madonna gana 7 premios en los VMA 2026 y vive la mejor noche de su carrera en la gala',
        summary: 'Artista del Año, Mejor Álbum y cinco trofeos más: superó el récord de “Ray of Light”, de 1998.',
        body: [
          'Madonna se fue de los VMA 2026 con siete trofeos: Artista del Año, Mejor Colaboración (con Sabrina Carpenter, por “Bring Your Love”), Mejor Dance, Mejor Fotografía, Mejor Coreografía, Mejor Video Largo y Mejor Álbum por “Confessions II”.',
          'Es su mejor noche en la historia de los premios: el récord anterior eran los seis de “Ray of Light”, en 1998. No ganaba un VMA desde 1999 y llegó con 11 nominaciones, que pasaron a 13 con las categorías anunciadas después.',
          'Abrió la gala con Sabrina Carpenter y Charli xcx, en su primera actuación en los VMA en 23 años. Al recibir Mejor Dance dijo que “todos somos iguales en la pista”. Al recoger Mejor Colaboración contó que le escribió por mensaje directo a Sabrina tras cinco días sin respuesta de su equipo, algo que parte de la prensa estadounidense vio como incómodo para su compañera.',
        ],
      },
    },
  ),

  /* ─── Taylor Swift ───────────────────────────────────────── */
  art(
    '2033', 'music', '2026-09-28T07:00:00Z', 280, ['taylor-swift', 'beyonce'],
    [SRC.wion, SRC.gma, SRC.cbs, SRC.daily],
    {
      pt: {
        slug: 'taylor-swift-passa-beyonce-maior-vencedora-historia-vma',
        headline: 'Taylor Swift passa Beyoncé e vira a artista mais premiada da história do VMA',
        summary: 'Ela levou Clipe do Ano, Melhor Direção e o novo prêmio Artist Director Honors — e dedicou a noite a Dolly Parton.',
        body: [
          'Taylor Swift venceu Clipe do Ano com “The Fate of Ophelia” e Melhor Direção com “Opalite”, e ainda recebeu o Artist Director Honors, prêmio criado neste ano para diretores de clipes. Com isso, passou Beyoncé como a artista com mais VMAs na história: a maioria dos veículos fala em 33 troféus, contra 30 de Beyoncé (alguns contaram 31 durante o show).',
          'Foi o sexto Clipe do Ano da carreira dela. Ao receber o prêmio, Taylor homenageou Dolly Parton, morta em agosto, e a chamou de “a showgirl definitiva”. Kacey Musgraves cantou “I Will Always Love You” em tributo à cantora.',
          'Entregue por Dakota Johnson, o Artist Director Honors lembrou que Taylor já fez cerca de 60 clipes em 20 anos, 18 deles escritos e dirigidos por ela. Na transmissão, ela estreou o clipe de “Patient Zero”, que também dirigiu, com Dakota Johnson e Colin Farrell no elenco.',
        ],
      },
      en: {
        slug: 'taylor-swift-passes-beyonce-most-awarded-vmas-history',
        headline: 'Taylor Swift passes Beyoncé as the most-awarded artist in VMAs history',
        summary: 'She won Video of the Year, Best Direction and the new Artist Director Honors — and dedicated the night to Dolly Parton.',
        body: [
          'Taylor Swift won Video of the Year for “The Fate of Ophelia” and Best Direction for “Opalite”, and received the Artist Director Honors, a prize created this year for music video directors. That moved her past Beyoncé as the artist with the most VMAs ever: most outlets put her total at 33 against Beyoncé’s 30 (some counted 31 mid-show).',
          'It was her sixth Video of the Year. Accepting it, she paid tribute to Dolly Parton, who died in August, calling her “the ultimate showgirl”. Kacey Musgraves sang “I Will Always Love You” in Parton’s honor.',
          'Presented by Dakota Johnson, the Artist Director Honors noted that Swift has made around 60 videos in 20 years, 18 of which she wrote and directed. During the broadcast she premiered the video for “Patient Zero”, which she also directed, starring Dakota Johnson and Colin Farrell.',
        ],
      },
      es: {
        slug: 'taylor-swift-supera-beyonce-mas-premiada-historia-vma',
        headline: 'Taylor Swift supera a Beyoncé y es la artista más premiada en la historia de los VMA',
        summary: 'Se llevó Video del Año, Mejor Dirección y el nuevo Artist Director Honors, y dedicó la noche a Dolly Parton.',
        body: [
          'Taylor Swift ganó Video del Año con “The Fate of Ophelia” y Mejor Dirección con “Opalite”, y recibió el Artist Director Honors, un premio creado este año para directores de videoclips. Así superó a Beyoncé como la artista con más VMA de la historia: la mayoría de medios habla de 33 trofeos, frente a 30 de Beyoncé (algunos contaron 31 durante la gala).',
          'Fue su sexto Video del Año. Al recibirlo homenajeó a Dolly Parton, fallecida en agosto, y la llamó “la showgirl definitiva”. Kacey Musgraves cantó “I Will Always Love You” en su honor.',
          'Entregado por Dakota Johnson, el Artist Director Honors recordó que Taylor ha hecho unos 60 videoclips en 20 años, 18 escritos y dirigidos por ella. En la transmisión estrenó el video de “Patient Zero”, que también dirigió, con Dakota Johnson y Colin Farrell.',
        ],
      },
    },
  ),

  /* ─── BTS ────────────────────────────────────────────────── */
  art(
    '2034', 'music', '2026-09-28T08:10:00Z', 265, ['bts'],
    [SRC.mt, SRC.rsca],
    {
      pt: {
        slug: 'bts-vma-2026-musica-do-ano-swim-tres-premios',
        headline: 'BTS ganha Música do Ano com “Swim” e leva três VMAs sem ir à cerimônia',
        summary: 'O grupo também venceu Melhor K-pop e Melhor Grupo — tudo fora da transmissão ao vivo.',
        body: [
          'O BTS venceu três categorias no VMA 2026: Música do Ano e Melhor K-pop, com “Swim”, e Melhor Grupo. É a primeira vez que um grupo de K-pop leva Música do Ano.',
          'Com o resultado, o BTS chega ao quinto troféu de Melhor Grupo, um recorde, e ao quarto de Melhor K-pop, passando os três de LISA. “Swim” faz parte do álbum “Arirang”, lançado em março.',
          'O grupo não foi a Los Angeles, e as três categorias estavam entre as 17 entregues fora da transmissão da TV — decisão da MTV que irritou fãs nas redes. Em outubro, o BTS faz três shows no MorumBIS, em São Paulo.',
        ],
      },
      en: {
        slug: 'bts-vmas-2026-song-of-the-year-swim-three-awards',
        headline: 'BTS win Song of the Year for “Swim” and take three VMAs without attending',
        summary: 'The group also won Best K-Pop and Best Group — all off the live broadcast.',
        body: [
          'BTS won three categories at the 2026 VMAs: Song of the Year and Best K-Pop for “Swim”, plus Best Group. It is the first time a K-pop group has won Song of the Year.',
          'That gives BTS a record fifth Best Group trophy and a fourth Best K-Pop, passing LISA’s three. “Swim” is from the album “Arirang”, released in March.',
          'The group didn’t travel to Los Angeles, and all three categories were among the 17 handed out off the TV broadcast — an MTV decision that angered fans online. In October, BTS play three shows at MorumBIS in São Paulo.',
        ],
      },
      es: {
        slug: 'bts-vma-2026-cancion-del-ano-swim-tres-premios',
        headline: 'BTS gana Canción del Año con “Swim” y se lleva tres VMA sin ir a la gala',
        summary: 'El grupo también ganó Mejor K-pop y Mejor Grupo, todo fuera de la transmisión en vivo.',
        body: [
          'BTS ganó tres categorías en los VMA 2026: Canción del Año y Mejor K-pop con “Swim”, y Mejor Grupo. Es la primera vez que un grupo de K-pop gana Canción del Año.',
          'Con esto, BTS suma un récord de cinco trofeos de Mejor Grupo y el cuarto de Mejor K-pop, superando los tres de LISA. “Swim” es parte del álbum “Arirang”, lanzado en marzo.',
          'El grupo no viajó a Los Ángeles, y las tres categorías estuvieron entre las 17 entregadas fuera de la transmisión, una decisión de MTV que molestó a los fans en redes. En octubre, BTS da tres conciertos en el MorumBIS de São Paulo.',
        ],
      },
    },
  ),

  /* ─── LISA ───────────────────────────────────────────────── */
  art(
    '2035', 'music', '2026-09-28T09:00:00Z', 350, ['lisa', 'taylor-swift', 'ariana-grande', 'sabrina-carpenter'],
    [SRC.gulf, SRC.aw, SRC.cbs],
    {
      pt: {
        slug: 'lisa-vence-melhor-pop-vma-2026-dream',
        headline: 'LISA vence Melhor Pop no VMA 2026 e deixa Taylor, Ariana e Sabrina para trás',
        summary: '“Dream”, com o ator japonês Kentaro Sakaguchi, levou a categoria; ela ainda estreou “SaWaDiKa” na TV.',
        body: [
          'LISA ganhou Melhor Pop no VMA 2026 com “Dream”, parceria com o ator japonês Kentaro Sakaguchi. Na disputa estavam Taylor Swift, Ariana Grande, Sabrina Carpenter, Olivia Rodrigo, Charli xcx e Tate McRae. Segundo o Awards Watch, ela é a primeira artista solo de K-pop a vencer a categoria.',
          '“Todos aqueles sonhos de madrugada me trouxeram até aqui”, disse ao receber o prêmio, entregue por Teyana Taylor.',
          'Na mesma noite, LISA fez a primeira apresentação na TV de “SaWaDiKa”, com cenário de ringue de boxe e boate e direito a entrada de tuk-tuk. A música abre o EP “Press Play”, previsto para 23 de outubro.',
        ],
      },
      en: {
        slug: 'lisa-wins-best-pop-vmas-2026-dream',
        headline: 'LISA wins Best Pop at the 2026 VMAs over Taylor, Ariana and Sabrina',
        summary: '“Dream”, with Japanese actor Kentaro Sakaguchi, took the category; she also debuted “SaWaDiKa” on TV.',
        body: [
          'LISA won Best Pop at the 2026 VMAs for “Dream”, a collaboration with Japanese actor Kentaro Sakaguchi. Also in the race were Taylor Swift, Ariana Grande, Sabrina Carpenter, Olivia Rodrigo, Charli xcx and Tate McRae. According to Awards Watch, she is the first K-pop solo artist to win the category.',
          '“All those late-night dreams brought me here today,” she said, accepting the award from Teyana Taylor.',
          'The same night, LISA gave the first TV performance of “SaWaDiKa”, on a boxing-ring-meets-nightclub set, arriving by tuk-tuk. The song leads her EP “Press Play”, due October 23.',
        ],
      },
      es: {
        slug: 'lisa-gana-mejor-pop-vma-2026-dream',
        headline: 'LISA gana Mejor Pop en los VMA 2026 por delante de Taylor, Ariana y Sabrina',
        summary: '“Dream”, con el actor japonés Kentaro Sakaguchi, se llevó la categoría; además estrenó “SaWaDiKa” en TV.',
        body: [
          'LISA ganó Mejor Pop en los VMA 2026 con “Dream”, junto al actor japonés Kentaro Sakaguchi. En la categoría estaban Taylor Swift, Ariana Grande, Sabrina Carpenter, Olivia Rodrigo, Charli xcx y Tate McRae. Según Awards Watch, es la primera solista de K-pop en ganarla.',
          '“Todos esos sueños de madrugada me trajeron hasta aquí”, dijo al recibir el premio de manos de Teyana Taylor.',
          'Esa misma noche, LISA hizo la primera actuación televisada de “SaWaDiKa”, con escenario de ring de boxeo y discoteca y entrada en tuk-tuk. El tema abre su EP “Press Play”, previsto para el 23 de octubre.',
        ],
      },
    },
  ),

  /* ─── Perdedores ─────────────────────────────────────────── */
  art(
    '2036', 'news', '2026-09-28T10:30:00Z', 15,
    ['sabrina-carpenter', 'ariana-grande', 'bruno-mars', 'harry-styles', 'charli-xcx', 'anitta'],
    [SRC.rsca, SRC.hl, SRC.haute],
    {
      pt: {
        slug: 'vma-2026-grandes-perdedores-sabrina-ariana-bruno',
        headline: 'Os perdedores do VMA 2026: Sabrina, Ariana e Bruno Mars saem com pouco',
        summary: 'Entre os mais indicados, quase todos ficaram bem abaixo do esperado; Harry Styles e Charli xcx saíram zerados.',
        body: [
          'Com sete indicações ou mais, Sabrina Carpenter levou só Melhor Edição (“House Tour”) e dividiu Melhor Colaboração com Madonna. Perdeu Clipe do Ano, Artista do Ano, Melhor Pop, Melhor Direção e Melhor Álbum.',
          'Ariana Grande também tinha sete indicações e ficou com Melhores Efeitos Visuais e Música do Verão, ambos por “Hate That I Made You Love Me”. Ela nem foi à cerimônia: está de pausa desde o fim da turnê, em 1º de setembro. Bruno Mars, com cinco a sete indicações, dependendo da contagem, ganhou apenas Melhor R&B.',
          'PinkPantheress e Zara Larsson, com cinco indicações cada, ficaram só com Direção de Arte. Gener8ion, indicado a Clipe do Ano, saiu sem nada — assim como Harry Styles, Katseye, Charli xcx e Tate McRae. Anitta perdeu Melhor Latino pela primeira vez na carreira.',
        ],
      },
      en: {
        slug: 'vmas-2026-biggest-losers-sabrina-ariana-bruno',
        headline: 'The VMAs 2026 losers: Sabrina, Ariana and Bruno Mars leave with little',
        summary: 'Most of the top nominees fell well short; Harry Styles and Charli xcx went home with nothing.',
        body: [
          'With seven or more nominations, Sabrina Carpenter won only Best Editing (“House Tour”) and shared Best Collaboration with Madonna. She lost Video of the Year, Artist of the Year, Best Pop, Best Direction and Best Album.',
          'Ariana Grande also had seven nominations and took Best Visual Effects and Song of the Summer, both for “Hate That I Made You Love Me”. She skipped the ceremony, taking a break since her tour ended on September 1. Bruno Mars, with five to seven nominations depending on the count, won only Best R&B.',
          'PinkPantheress and Zara Larsson, with five nominations each, won only Art Direction. Gener8ion, up for Video of the Year, left empty-handed — as did Harry Styles, Katseye, Charli xcx and Tate McRae. Anitta lost Best Latin for the first time in her career.',
        ],
      },
      es: {
        slug: 'vma-2026-grandes-perdedores-sabrina-ariana-bruno',
        headline: 'Los perdedores de los VMA 2026: Sabrina, Ariana y Bruno Mars se van con poco',
        summary: 'La mayoría de los más nominados quedó muy por debajo de lo esperado; Harry Styles y Charli xcx se fueron en blanco.',
        body: [
          'Con siete nominaciones o más, Sabrina Carpenter solo ganó Mejor Edición (“House Tour”) y compartió Mejor Colaboración con Madonna. Perdió Video del Año, Artista del Año, Mejor Pop, Mejor Dirección y Mejor Álbum.',
          'Ariana Grande también tenía siete nominaciones y se quedó con Mejores Efectos Visuales y Canción del Verano, ambos por “Hate That I Made You Love Me”. No fue a la gala: está en pausa desde que terminó su gira, el 1 de septiembre. Bruno Mars, con cinco a siete nominaciones según el conteo, solo ganó Mejor R&B.',
          'PinkPantheress y Zara Larsson, con cinco nominaciones cada una, solo ganaron Dirección de Arte. Gener8ion, nominado a Video del Año, se fue sin nada, igual que Harry Styles, Katseye, Charli xcx y Tate McRae. Anitta perdió Mejor Latino por primera vez en su carrera.',
        ],
      },
    },
  ),

  /* ─── Nirvana ────────────────────────────────────────────── */
  art(
    '2037', 'music', '2026-09-28T11:15:00Z', 210, [],
    [SRC.stereoN, SRC.bbN, SRC.globe],
    {
      pt: {
        slug: 'nirvana-recebe-video-vanguard-vma-2026',
        headline: 'Nirvana recebe o Video Vanguard no VMA 2026: “as pessoas ainda têm fome de autenticidade”',
        summary: 'Dave Grohl, Krist Novoselic e Pat Smear subiram ao palco; é o primeiro grupo homenageado desde o Duran Duran, em 2003.',
        body: [
          'O Nirvana recebeu o prêmio Michael Jackson Video Vanguard, a principal homenagem de carreira do VMA. Chuck D, do Public Enemy, entregou o troféu a Dave Grohl, Krist Novoselic e Pat Smear.',
          'Quem falou foi Novoselic: disse que a banda continua relevante porque “as pessoas ainda têm fome de autenticidade” e chamou Kurt Cobain de “um dos maiores artistas de todos os tempos”. Grohl ficou em silêncio, e Smear acendeu um cigarro no palco.',
          'Uma montagem relembrou “Smells Like Teen Spirit”, “In Bloom”, “Come As You Are”, “Heart-Shaped Box” e “All Apologies”, do Acústico MTV. É o primeiro grupo a receber o Vanguard desde o Duran Duran, em 2003 — no mesmo ano em que a MTV tirou as categorias de rock da premiação.',
        ],
      },
      en: {
        slug: 'nirvana-receives-video-vanguard-vmas-2026',
        headline: 'Nirvana receive the Video Vanguard at the 2026 VMAs: “people are still hungry for authenticity”',
        summary: 'Dave Grohl, Krist Novoselic and Pat Smear took the stage; the first group honored since Duran Duran in 2003.',
        body: [
          'Nirvana received the Michael Jackson Video Vanguard Award, the VMAs’ top career honor. Public Enemy’s Chuck D presented the trophy to Dave Grohl, Krist Novoselic and Pat Smear.',
          'Novoselic did the talking, saying the band still resonates because “people are still hungry for authenticity” and calling Kurt Cobain “one of the greatest artists of all time”. Grohl stayed silent, and Smear lit a cigarette on stage.',
          'A montage revisited “Smells Like Teen Spirit”, “In Bloom”, “Come As You Are”, “Heart-Shaped Box” and the Unplugged “All Apologies”. They are the first group to get the Vanguard since Duran Duran in 2003 — in the same year MTV dropped its rock categories.',
        ],
      },
      es: {
        slug: 'nirvana-recibe-video-vanguard-vma-2026',
        headline: 'Nirvana recibe el Video Vanguard en los VMA 2026: “la gente todavía tiene hambre de autenticidad”',
        summary: 'Dave Grohl, Krist Novoselic y Pat Smear subieron al escenario; es el primer grupo homenajeado desde Duran Duran, en 2003.',
        body: [
          'Nirvana recibió el premio Michael Jackson Video Vanguard, el mayor homenaje de carrera de los VMA. Chuck D, de Public Enemy, entregó el trofeo a Dave Grohl, Krist Novoselic y Pat Smear.',
          'Habló Novoselic: dijo que la banda sigue vigente porque “la gente todavía tiene hambre de autenticidad” y llamó a Kurt Cobain “uno de los mejores artistas de todos los tiempos”. Grohl se quedó en silencio y Smear encendió un cigarrillo en el escenario.',
          'Un montaje repasó “Smells Like Teen Spirit”, “In Bloom”, “Come As You Are”, “Heart-Shaped Box” y “All Apologies” del Unplugged. Es el primer grupo en recibir el Vanguard desde Duran Duran, en 2003, el mismo año en que MTV eliminó las categorías de rock.',
        ],
      },
    },
  ),

  /* ─── Polêmicas ──────────────────────────────────────────── */
  art(
    '2038', 'news', '2026-09-28T12:40:00Z', 5, ['madonna', 'bruno-mars', 'bts'],
    [SRC.tbs, SRC.jj, SRC.mt],
    {
      pt: {
        slug: 'vma-2026-polemicas-playback-madonna-bruno-mars-gravado',
        headline: 'Atraso, acusação de playback e show gravado: as polêmicas do VMA 2026',
        summary: 'Fãs reclamaram da apresentação pré-gravada de Bruno Mars e dos 17 prêmios cortados da TV.',
        body: [
          'O VMA 2026 começou cerca de 20 minutos atrasado por causa do jogo da NFL entre Ravens e Cowboys, transmitido antes pela CBS.',
          'Durante a abertura, parte do público nas redes acusou Madonna de dublar. Bruno Mars também virou alvo: a apresentação de “Dance With Me” foi gravada num show da turnê em Colorado Springs, e não ao vivo em Los Angeles, o que irritou fãs.',
          'Outra reclamação foi o formato: só seis prêmios foram entregues na TV. Os outros 17, incluindo Música do Ano e Melhor Álbum, saíram fora da transmissão — o que deixou de fora da tela as três vitórias do BTS.',
        ],
      },
      en: {
        slug: 'vmas-2026-controversies-lip-sync-madonna-bruno-mars-pretaped',
        headline: 'A delay, lip-sync claims and a pre-taped set: the VMAs 2026 controversies',
        summary: 'Fans complained about Bruno Mars’ pre-recorded performance and the 17 awards cut from TV.',
        body: [
          'The 2026 VMAs started about 20 minutes late because of the Ravens–Cowboys NFL game that aired before it on CBS.',
          'During the opening, some viewers online accused Madonna of lip-syncing. Bruno Mars also drew fire: his “Dance With Me” performance was filmed at a tour stop in Colorado Springs rather than live in Los Angeles, angering fans.',
          'The format was another complaint: only six awards were presented on TV. The other 17, including Song of the Year and Best Album, were handed out off-air — leaving all three of BTS’s wins off screen.',
        ],
      },
      es: {
        slug: 'vma-2026-polemicas-playback-madonna-bruno-mars-grabado',
        headline: 'Retraso, acusaciones de playback y un show grabado: las polémicas de los VMA 2026',
        summary: 'Los fans se quejaron de la actuación pregrabada de Bruno Mars y de los 17 premios fuera de la TV.',
        body: [
          'Los VMA 2026 empezaron con unos 20 minutos de retraso por el partido de la NFL entre Ravens y Cowboys, emitido antes por CBS.',
          'Durante la apertura, parte del público en redes acusó a Madonna de hacer playback. Bruno Mars también fue blanco de críticas: su actuación de “Dance With Me” se grabó en un concierto de su gira en Colorado Springs, no en vivo en Los Ángeles, lo que molestó a los fans.',
          'Otra queja fue el formato: solo seis premios se entregaron en TV. Los otros 17, entre ellos Canción del Año y Mejor Álbum, se dieron fuera de la transmisión, y las tres victorias de BTS quedaron fuera de pantalla.',
        ],
      },
    },
    { confidence: 'reported', risk: 'yellow' },
  ),

  /* ─── Performances ───────────────────────────────────────── */
  art(
    '2039', 'music', '2026-09-28T13:20:00Z', 190, ['madonna', 'sabrina-carpenter', 'charli-xcx', 'lisa'],
    [SRC.abc, SRC.forbes, SRC.globe, SRC.wion],
    {
      pt: {
        slug: 'vma-2026-melhores-apresentacoes-madonna-tributo-george-michael',
        headline: 'Da abertura de Madonna ao tributo a George Michael: as apresentações do VMA 2026',
        summary: 'Madonna voltou ao palco do VMA depois de 23 anos; Kacey Musgraves homenageou Dolly Parton e Raye estreou na premiação.',
        body: [
          'Madonna abriu a noite com “Bring Your Love” e um remix de “Danceteria”, ao lado de Sabrina Carpenter e Charli xcx. Foi a primeira apresentação dela no VMA em 23 anos e a quinta vez que abriu a premiação, um recorde. Julia Garner, Sombr e Seth Rogen fizeram participações.',
          'O tributo a George Michael reuniu Sombr (“Faith” e “Father Figure”), Raye (“I Knew You Were Waiting”), Teddy Swims (“Careless Whisper”) e, de surpresa, Adam Lambert, que fechou com “Freedom! ’90”. Kacey Musgraves cantou “I Will Always Love You” em homenagem a Dolly Parton.',
          'LISA estreou “SaWaDiKa” na TV, Raye fez sua primeira apresentação no VMA, Shaboozey dividiu o palco com Gunna e Sienna Spiro cantou na noite em que venceu Artista Revelação. Gener8ion e Yung Lean encerraram o show. Bruno Mars apareceu em imagens gravadas de um show da turnê.',
        ],
      },
      en: {
        slug: 'vmas-2026-best-performances-madonna-george-michael-tribute',
        headline: 'From Madonna’s opener to the George Michael tribute: the VMAs 2026 performances',
        summary: 'Madonna returned to the VMAs stage after 23 years; Kacey Musgraves honored Dolly Parton and Raye made her VMAs debut.',
        body: [
          'Madonna opened the night with “Bring Your Love” and a “Danceteria” remix alongside Sabrina Carpenter and Charli xcx. It was her first VMAs performance in 23 years and a record fifth time opening the show. Julia Garner, Sombr and Seth Rogen made cameos.',
          'The George Michael tribute brought together Sombr (“Faith” and “Father Figure”), Raye (“I Knew You Were Waiting”), Teddy Swims (“Careless Whisper”) and a surprise Adam Lambert, who closed with “Freedom! ’90”. Kacey Musgraves sang “I Will Always Love You” for Dolly Parton.',
          'LISA debuted “SaWaDiKa” on TV, Raye made her VMAs performance debut, Shaboozey shared the stage with Gunna and Sienna Spiro sang on the night she won Best New Artist. Gener8ion and Yung Lean closed the show. Bruno Mars appeared in footage filmed at a tour stop.',
        ],
      },
      es: {
        slug: 'vma-2026-mejores-actuaciones-madonna-tributo-george-michael',
        headline: 'De la apertura de Madonna al tributo a George Michael: las actuaciones de los VMA 2026',
        summary: 'Madonna volvió al escenario de los VMA tras 23 años; Kacey Musgraves homenajeó a Dolly Parton y Raye debutó en la gala.',
        body: [
          'Madonna abrió la noche con “Bring Your Love” y un remix de “Danceteria”, junto a Sabrina Carpenter y Charli xcx. Fue su primera actuación en los VMA en 23 años y la quinta vez que abrió la gala, un récord. Julia Garner, Sombr y Seth Rogen hicieron cameos.',
          'El tributo a George Michael reunió a Sombr (“Faith” y “Father Figure”), Raye (“I Knew You Were Waiting”), Teddy Swims (“Careless Whisper”) y, por sorpresa, a Adam Lambert, que cerró con “Freedom! ’90”. Kacey Musgraves cantó “I Will Always Love You” en honor a Dolly Parton.',
          'LISA estrenó “SaWaDiKa” en TV, Raye debutó en el escenario de los VMA, Shaboozey compartió escenario con Gunna y Sienna Spiro cantó la noche en que ganó Artista Revelación. Gener8ion y Yung Lean cerraron la gala. Bruno Mars apareció en imágenes grabadas en un concierto de su gira.',
        ],
      },
    },
  ),

  /* ─── Sienna Spiro ───────────────────────────────────────── */
  art(
    '2040', 'music', '2026-09-28T14:00:00Z', 40, [],
    [SRC.daily, SRC.spiro, SRC.wmag],
    {
      pt: {
        slug: 'sienna-spiro-artista-revelacao-vma-2026',
        headline: 'Quem é Sienna Spiro, a Artista Revelação do VMA 2026',
        summary: 'A cantora inglesa é a primeira artista do país a vencer a categoria desde o One Direction, em 2012.',
        body: [
          'A inglesa Sienna Spiro venceu Artista Revelação no VMA 2026, à frente de Bella Kay, Cortis, Magnus Ferrell, Malcolm Todd, Myles Smith e Stella Lefty.',
          'Ela é a primeira artista inglesa a ganhar a categoria desde o One Direction, em 2012. “Eu não achei que isso ia acontecer. Ainda não consigo acreditar”, disse no discurso.',
          'Na mesma noite, cantou “Great Expectation” no palco do Peacock Theater. No tapete vermelho, usou Valentino com joias Chopard.',
        ],
      },
      en: {
        slug: 'sienna-spiro-best-new-artist-vmas-2026',
        headline: 'Who is Sienna Spiro, the VMAs 2026 Best New Artist',
        summary: 'The English singer is the first artist from England to win the category since One Direction in 2012.',
        body: [
          'English singer Sienna Spiro won Best New Artist at the 2026 VMAs, ahead of Bella Kay, Cortis, Magnus Ferrell, Malcolm Todd, Myles Smith and Stella Lefty.',
          'She is the first English act to win the category since One Direction in 2012. “I didn’t think this would happen. I actually can’t believe this,” she said in her speech.',
          'The same night she performed “Great Expectation” at the Peacock Theater. On the red carpet she wore Valentino with Chopard jewelry.',
        ],
      },
      es: {
        slug: 'sienna-spiro-artista-revelacion-vma-2026',
        headline: 'Quién es Sienna Spiro, la Artista Revelación de los VMA 2026',
        summary: 'La cantante inglesa es la primera artista de Inglaterra en ganar la categoría desde One Direction, en 2012.',
        body: [
          'La inglesa Sienna Spiro ganó Artista Revelación en los VMA 2026, por delante de Bella Kay, Cortis, Magnus Ferrell, Malcolm Todd, Myles Smith y Stella Lefty.',
          'Es la primera artista inglesa en ganar la categoría desde One Direction, en 2012. “No pensé que esto iba a pasar. Todavía no lo puedo creer”, dijo en su discurso.',
          'Esa misma noche cantó “Great Expectation” en el Peacock Theater. En la alfombra roja vistió Valentino con joyas Chopard.',
        ],
      },
    },
  ),

  /* ─── Ausências ──────────────────────────────────────────── */
  art(
    '2041', 'news', '2026-09-28T15:10:00Z', 55,
    ['ariana-grande', 'harry-styles', 'shakira', 'bts', 'travis-kelce', 'taylor-swift'],
    [SRC.skip, SRC.mt],
    {
      pt: {
        slug: 'vma-2026-quem-faltou-ariana-harry-shakira-bts',
        headline: 'Quem faltou ao VMA 2026 — e por quê',
        summary: 'Ariana está de pausa, Harry tinha folga da residência em Nova York e Travis Kelce estava em campo.',
        body: [
          'Vários indicados não apareceram no Peacock Theater. Ariana Grande, com sete indicações, está de pausa desde o fim da turnê, em 1º de setembro. O BTS também não foi e venceu três categorias à distância.',
          'Harry Styles estava numa noite de folga da residência de 30 shows no Madison Square Garden, em Nova York. Shakira está no meio de uma temporada de 12 noites em Madri, e Zara Larsson tocava no festival Portola, em São Francisco. O Katseye tinha se apresentado na estreia da 52ª temporada do “Saturday Night Live” na noite anterior.',
          'Travis Kelce não acompanhou Taylor Swift: no mesmo dia, o Kansas City Chiefs venceu o Miami por 24 a 10.',
        ],
      },
      en: {
        slug: 'vmas-2026-who-skipped-ariana-harry-shakira-bts',
        headline: 'Who skipped the 2026 VMAs — and why',
        summary: 'Ariana is on a break, Harry had a night off from his New York residency and Travis Kelce was on the field.',
        body: [
          'Several nominees didn’t show up at the Peacock Theater. Ariana Grande, with seven nominations, has been on a break since her tour ended on September 1. BTS were absent too and won three categories remotely.',
          'Harry Styles was on a night off from his 30-show Madison Square Garden residency in New York. Shakira is in the middle of a 12-night run in Madrid, and Zara Larsson was playing Portola festival in San Francisco. Katseye had performed on the “Saturday Night Live” season 52 premiere the night before.',
          'Travis Kelce didn’t join Taylor Swift: the same day, the Kansas City Chiefs beat Miami 24–10.',
        ],
      },
      es: {
        slug: 'vma-2026-quien-falto-ariana-harry-shakira-bts',
        headline: 'Quién faltó a los VMA 2026 y por qué',
        summary: 'Ariana está en pausa, Harry tenía la noche libre de su residencia en Nueva York y Travis Kelce estaba jugando.',
        body: [
          'Varios nominados no aparecieron en el Peacock Theater. Ariana Grande, con siete nominaciones, está en pausa desde que terminó su gira, el 1 de septiembre. BTS tampoco fue y ganó tres categorías a distancia.',
          'Harry Styles tenía la noche libre de su residencia de 30 conciertos en el Madison Square Garden de Nueva York. Shakira está en medio de 12 noches en Madrid, y Zara Larsson tocaba en el festival Portola, en San Francisco. Katseye había actuado en el estreno de la temporada 52 de “Saturday Night Live” la noche anterior.',
          'Travis Kelce no acompañó a Taylor Swift: ese mismo día, los Kansas City Chiefs le ganaron 24-10 a Miami.',
        ],
      },
    },
  ),

  /* ─── Tapete vermelho ────────────────────────────────────── */
  art(
    '2042', 'news', '2026-09-28T16:00:00Z', 340, ['taylor-swift', 'charli-xcx', 'lisa'],
    [SRC.jjRed, SRC.wmag],
    {
      pt: {
        slug: 'vma-2026-tapete-vermelho-looks-taylor-charli-lisa',
        headline: 'Tapete vermelho do VMA 2026: os looks de Taylor Swift, Charli xcx, LISA e Tyla',
        summary: 'Alta-costura, Saint Laurent e estilistas independentes dominaram a chegada ao Peacock Theater.',
        body: [
          'Taylor Swift chegou de Tamara Ralph Couture, e Charli xcx apostou em Saint Laurent. LISA usou peças de Quine Li e The Attico, e Tyla vestiu Mowalola.',
          'Teyana Taylor foi de Zuhair Murad, Normani de Robert Wun e PinkPantheress de Nina Ricci. Entre os homens, Sombr usou EDL, Troye Sivan escolheu Erdem e Shaboozey foi de Chrome Hearts.',
          'A revelação Sienna Spiro vestiu Valentino com joias Chopard, Stella Lefty usou Claire Pettibone e Blu DeTiger foi de Dolce & Gabbana.',
        ],
      },
      en: {
        slug: 'vmas-2026-red-carpet-looks-taylor-charli-lisa',
        headline: 'VMAs 2026 red carpet: the looks from Taylor Swift, Charli xcx, LISA and Tyla',
        summary: 'Couture, Saint Laurent and independent designers ruled the arrivals at the Peacock Theater.',
        body: [
          'Taylor Swift arrived in Tamara Ralph Couture, and Charli xcx went with Saint Laurent. LISA wore Quine Li and The Attico, and Tyla chose Mowalola.',
          'Teyana Taylor wore Zuhair Murad, Normani wore Robert Wun and PinkPantheress wore Nina Ricci. Among the men, Sombr wore EDL, Troye Sivan chose Erdem and Shaboozey went with Chrome Hearts.',
          'Best New Artist Sienna Spiro wore Valentino with Chopard jewelry, Stella Lefty wore Claire Pettibone and Blu DeTiger wore Dolce & Gabbana.',
        ],
      },
      es: {
        slug: 'vma-2026-alfombra-roja-looks-taylor-charli-lisa',
        headline: 'Alfombra roja de los VMA 2026: los looks de Taylor Swift, Charli xcx, LISA y Tyla',
        summary: 'Alta costura, Saint Laurent y diseñadores independientes dominaron las llegadas al Peacock Theater.',
        body: [
          'Taylor Swift llegó con Tamara Ralph Couture, y Charli xcx apostó por Saint Laurent. LISA vistió Quine Li y The Attico, y Tyla eligió Mowalola.',
          'Teyana Taylor fue de Zuhair Murad, Normani de Robert Wun y PinkPantheress de Nina Ricci. Entre los hombres, Sombr vistió EDL, Troye Sivan eligió Erdem y Shaboozey fue de Chrome Hearts.',
          'La revelación Sienna Spiro vistió Valentino con joyas Chopard, Stella Lefty llevó Claire Pettibone y Blu DeTiger, Dolce & Gabbana.',
        ],
      },
    },
  ),

  /* ─── Snoop Dogg ─────────────────────────────────────────── */
  art(
    '2043', 'news', '2026-09-28T17:00:00Z', 120, ['madonna'],
    [SRC.snoop, SRC.forbes],
    {
      pt: {
        slug: 'snoop-dogg-apresentador-vma-2026-piada-madonna',
        headline: 'Snoop Dogg comanda o VMA 2026, leva a festa de volta a L.A. e brinca com Madonna',
        summary: 'O rapper disse que só aceitou apresentar porque a premiação voltou à Costa Oeste.',
        body: [
          'Snoop Dogg foi o apresentador do VMA 2026, o primeiro na Costa Oeste em quase uma década. No monólogo, contou que, quando o convidaram, perguntou se seria em Los Angeles: “Não? Então estou ocupado.”',
          'Ele prometeu “a maior festa que o VMA já viu” e fez piada com Madonna, dizendo que ela “não é mais virgem”, em referência a “Like a Virgin”.',
          'A primeira vez de Snoop no palco do VMA foi como atração musical, em 1993.',
        ],
      },
      en: {
        slug: 'snoop-dogg-host-vmas-2026-madonna-joke',
        headline: 'Snoop Dogg hosts the 2026 VMAs, brings the party back to L.A. and teases Madonna',
        summary: 'The rapper said he only agreed to host because the show returned to the West Coast.',
        body: [
          'Snoop Dogg hosted the 2026 VMAs, the first on the West Coast in nearly a decade. In his monologue he said that when he was asked, he wanted to know if it would be in Los Angeles: “No? Well, I’m busy.”',
          'He promised “the biggest party the VMAs has ever seen” and joked that Madonna “ain’t a virgin no more”, a nod to “Like a Virgin”.',
          'Snoop’s first time on the VMAs stage was as a performer, in 1993.',
        ],
      },
      es: {
        slug: 'snoop-dogg-presentador-vma-2026-broma-madonna',
        headline: 'Snoop Dogg presenta los VMA 2026, lleva la fiesta de vuelta a L.A. y bromea con Madonna',
        summary: 'El rapero dijo que solo aceptó porque la gala volvió a la Costa Oeste.',
        body: [
          'Snoop Dogg fue el presentador de los VMA 2026, los primeros en la Costa Oeste en casi una década. En su monólogo contó que, cuando lo invitaron, preguntó si sería en Los Ángeles: “¿No? Entonces estoy ocupado”.',
          'Prometió “la fiesta más grande que han visto los VMA” y bromeó con que Madonna “ya no es virgen”, en referencia a “Like a Virgin”.',
          'La primera vez de Snoop en el escenario de los VMA fue como artista invitado, en 1993.',
        ],
      },
    },
  ),
];
