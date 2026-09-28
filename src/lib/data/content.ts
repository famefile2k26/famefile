/**
 * CONTEÚDO REAL — pesquisado em 28/09/2026.
 * Matérias são texto próprio (fatos extraídos das fontes, reescritos e localizados); fontes creditadas.
 * Charts: Spotify Weekly (semana encerrada em 24/09/2026), via kworb.net.
 * Esta é a camada que a automação vai reescrever a cada ciclo (depois: tabelas no Supabase).
 */
import type { Article, Chart, ChartEntry, EntertainmentEvent, Release } from './types';

/* ─── Matérias ──────────────────────────────────────────────── */

export const articles: Article[] = [
  {
    id: '2001', section: 'news', confidence: 'confirmed', risk: 'green', breaking: true,
    publishedAt: '2026-09-28T04:10:00Z', hue: 330,
    personIds: ['taylor-swift', 'madonna', 'bts', 'lisa', 'sabrina-carpenter', 'charli-xcx'],
    sources: [
      { name: 'Billboard Brasil', url: 'https://billboard.com.br/vma-2026-vencedores-premiacao/' },
      { name: 'Variety', url: 'https://variety.com/2026/music/news/vmas-winners-list-mtv-awards-2026-show-1236876862/' },
      { name: 'Deadline', url: 'https://deadline.com/2026/09/mtv-vmas-2026-winners-list-1237115040/' },
    ],
    factBox: {
      pt: { known: ['Clipe do Ano: Taylor Swift, “The Fate of Ophelia”', 'Artista do Ano: Madonna, que levou 7 troféus', 'Música do Ano: BTS, “Swim”', 'Artista Revelação: Sienna Spiro'], unknown: [] },
      en: { known: ['Video of the Year: Taylor Swift, “The Fate of Ophelia”', 'Artist of the Year: Madonna, who took home 7 trophies', 'Song of the Year: BTS, “Swim”', 'Best New Artist: Sienna Spiro'], unknown: [] },
      es: { known: ['Video del Año: Taylor Swift, “The Fate of Ophelia”', 'Artista del Año: Madonna, que se llevó 7 trofeos', 'Canción del Año: BTS, “Swim”', 'Artista Revelación: Sienna Spiro'], unknown: [] },
    },
    t: {
      pt: {
        slug: 'vma-2026-vencedores-taylor-swift-madonna',
        headline: 'VMA 2026: Taylor Swift leva Clipe do Ano e Madonna sai com sete troféus',
        summary: 'Na noite de domingo em Los Angeles, Madonna foi eleita Artista do Ano e o BTS venceu Música do Ano com “Swim”.',
        body: [
          'O MTV Video Music Awards 2026 aconteceu no domingo (27), em Los Angeles, e teve Taylor Swift como vencedora de Clipe do Ano com “The Fate of Ophelia”. Ela também levou Melhor Direção por “Opalite”.',
          'A grande campeã da noite, porém, foi Madonna. Com 11 indicações, o maior número da carreira, ela conquistou sete prêmios, incluindo Artista do Ano e Melhor Colaboração com Sabrina Carpenter por “Bring Your Love”. A cantora abriu a cerimônia ao lado de Charli xcx e Sabrina, em sua primeira apresentação no VMA em 23 anos.',
          'O BTS venceu Música do Ano e Melhor K-pop com “Swim”, Lisa ganhou Melhor Pop com “Dream” e Sienna Spiro foi eleita Artista Revelação. O Nirvana recebeu o prêmio Video Vanguard.',
        ],
      },
      en: {
        slug: 'vmas-2026-winners-taylor-swift-madonna',
        headline: 'VMAs 2026: Taylor Swift wins Video of the Year as Madonna takes home seven trophies',
        summary: 'At Sunday’s show in Los Angeles, Madonna was named Artist of the Year and BTS won Song of the Year with “Swim”.',
        body: [
          'The 2026 MTV Video Music Awards took place Sunday in Los Angeles, with Taylor Swift winning Video of the Year for “The Fate of Ophelia”. She also picked up Best Direction for “Opalite”.',
          'The night belonged to Madonna. With 11 nominations, the most of her career, she won seven awards, including Artist of the Year and Best Collaboration with Sabrina Carpenter for “Bring Your Love”. She opened the show alongside Charli xcx and Carpenter in her first VMAs performance in 23 years.',
          'BTS won Song of the Year and Best K-Pop for “Swim”, Lisa took Best Pop for “Dream” and Sienna Spiro was named Best New Artist. Nirvana received the Video Vanguard Award.',
        ],
      },
      es: {
        slug: 'vma-2026-ganadores-taylor-swift-madonna',
        headline: 'VMA 2026: Taylor Swift gana Video del Año y Madonna se lleva siete trofeos',
        summary: 'En la gala del domingo en Los Ángeles, Madonna fue elegida Artista del Año y BTS ganó Canción del Año con “Swim”.',
        body: [
          'Los MTV Video Music Awards 2026 se celebraron el domingo en Los Ángeles, con Taylor Swift ganando Video del Año por “The Fate of Ophelia”. También se llevó Mejor Dirección por “Opalite”.',
          'La gran ganadora, sin embargo, fue Madonna. Con 11 nominaciones, su máximo histórico, obtuvo siete premios, entre ellos Artista del Año y Mejor Colaboración con Sabrina Carpenter por “Bring Your Love”. Abrió la gala junto a Charli xcx y Sabrina, en su primera actuación en los VMA en 23 años.',
          'BTS ganó Canción del Año y Mejor K-pop con “Swim”, Lisa se llevó Mejor Pop con “Dream” y Sienna Spiro fue elegida Artista Revelación. Nirvana recibió el premio Video Vanguard.',
        ],
      },
    },
  },
  {
    id: '2002', section: 'music', confidence: 'confirmed', risk: 'green',
    publishedAt: '2026-09-28T05:30:00Z', hue: 340,
    personIds: ['anitta', 'bad-bunny', 'j-balvin', 'shakira'],
    sources: [
      { name: 'POPline', url: 'https://portalpopline.com.br/anitta-perde-vma-bad-bunny-mantem-recorde/' },
      { name: 'CNN Brasil', url: 'https://www.cnnbrasil.com.br/pop/musica/vma-2026-anitta-perde-premio-de-melhor-latino-para-bad-bunny/' },
      { name: 'Exame', url: 'https://exame.com/pop/anitta-no-vma-2026-choka-choka-disputa-melhor-musica-latina-com-bad-bunny-karol-g-e-rosalia/' },
    ],
    t: {
      pt: {
        slug: 'anitta-perde-vma-melhor-latino-bad-bunny',
        headline: 'Anitta perde Melhor Latino no VMA para Bad Bunny, mas segue empatada no recorde da categoria',
        summary: 'Com “Choka Choka”, parceria com Shakira, a brasileira concorria ao quarto troféu; Bad Bunny venceu com “NUEVAYoL”.',
        body: [
          'Anitta não levou o prêmio de Melhor Clipe Latino no VMA 2026. A categoria ficou com Bad Bunny, por “NUEVAYoL”. A brasileira concorria com “Choka Choka”, sua primeira parceria com Shakira, lançada em abril.',
          'Foi a primeira derrota de Anitta na categoria, que ela havia vencido em 2022, 2023 e 2024. Com os três troféus, ela continua empatada com J Balvin como maior vencedora de Melhor Latino na história da premiação.',
          'A cantora não esteve na cerimônia em Los Angeles. Segundo o POPline, ela viajou para a Europa depois de encerrar compromissos com a TV Globo.',
        ],
      },
      en: {
        slug: 'anitta-loses-vma-best-latin-bad-bunny',
        headline: 'Anitta loses Best Latin at the VMAs to Bad Bunny but keeps a share of the category record',
        summary: 'The Brazilian star was up for a fourth win with “Choka Choka”, her collab with Shakira; Bad Bunny won with “NUEVAYoL”.',
        body: [
          'Anitta did not win Best Latin at the 2026 VMAs. The award went to Bad Bunny for “NUEVAYoL”. Anitta was nominated for “Choka Choka”, her first collaboration with Shakira, released in April.',
          'It was her first loss in the category, which she won in 2022, 2023 and 2024. With three trophies, she remains tied with J Balvin as the most awarded artist in Best Latin history.',
          'She did not attend the ceremony in Los Angeles. According to POPline, she traveled to Europe after wrapping commitments with TV Globo.',
        ],
      },
      es: {
        slug: 'anitta-pierde-vma-mejor-latino-bad-bunny',
        headline: 'Anitta pierde Mejor Latino en los VMA ante Bad Bunny, pero sigue empatada en el récord de la categoría',
        summary: 'La brasileña buscaba su cuarto trofeo con “Choka Choka”, junto a Shakira; Bad Bunny ganó con “NUEVAYoL”.',
        body: [
          'Anitta no ganó Mejor Video Latino en los VMA 2026. El premio fue para Bad Bunny por “NUEVAYoL”. La brasileña competía con “Choka Choka”, su primera colaboración con Shakira, lanzada en abril.',
          'Fue su primera derrota en la categoría, que había ganado en 2022, 2023 y 2024. Con tres trofeos, sigue empatada con J Balvin como la artista más premiada de Mejor Latino.',
          'No asistió a la gala en Los Ángeles. Según POPline, viajó a Europa tras terminar sus compromisos con TV Globo.',
        ],
      },
    },
  },
  {
    id: '2003', section: 'charts', confidence: 'confirmed', risk: 'green',
    publishedAt: '2026-09-23T15:00:00Z', hue: 25,
    personIds: ['ella-langley'],
    sources: [
      { name: 'Billboard', url: 'https://www.billboard.com/lists/ella-langley-choosin-texas-hot-100-number-one-chart-record/' },
      { name: 'NBC Palm Springs / CNN Newsource', url: 'https://www.nbcpalmsprings.com/entertainment-report/2026/09/23/ella-langley-sets-billboard-record-as-choosin-texas-reaches-23-weeks-at-no-1' },
    ],
    t: {
      pt: {
        slug: 'ella-langley-choosin-texas-recorde-23-semanas-hot-100',
        headline: '“Choosin’ Texas”, de Ella Langley, bate o recorde de semanas em 1º na Billboard Hot 100',
        summary: 'A música country chegou à 23ª semana no topo e superou a marca histórica da parada americana.',
        body: [
          'Ella Langley fez história na Billboard Hot 100: “Choosin’ Texas” completou 23 semanas em 1º lugar, o maior número da história da parada, segundo a Billboard.',
          'Lançada em outubro de 2025, a faixa ultrapassou o público tradicional do country. Até meados de agosto, somava mais de 911 milhões de streams nos EUA e 1,26 bilhão no mundo, de acordo com a CNN Newsource.',
          'A música segue no topo também do Spotify americano na semana encerrada em 24 de setembro.',
        ],
      },
      en: {
        slug: 'ella-langley-choosin-texas-23-weeks-hot-100-record',
        headline: 'Ella Langley’s “Choosin’ Texas” sets the all-time record for weeks at No. 1 on the Hot 100',
        summary: 'The country hit reached its 23rd week on top, the most in the chart’s history.',
        body: [
          'Ella Langley made Billboard Hot 100 history as “Choosin’ Texas” logged its 23rd week at No. 1, the most ever, according to Billboard.',
          'Released in October 2025, the song crossed well beyond country radio. By mid-August it had more than 911 million on-demand U.S. streams and 1.26 billion worldwide, per CNN Newsource.',
          'It is also No. 1 on Spotify’s U.S. weekly chart for the week ending September 24.',
        ],
      },
      es: {
        slug: 'ella-langley-choosin-texas-record-23-semanas-hot-100',
        headline: '“Choosin’ Texas”, de Ella Langley, rompe el récord de semanas en el #1 del Billboard Hot 100',
        summary: 'El éxito country llegó a su semana 23 en la cima, la mayor cifra en la historia de la lista.',
        body: [
          'Ella Langley hizo historia en el Billboard Hot 100: “Choosin’ Texas” sumó 23 semanas en el #1, la mayor cantidad de la historia, según Billboard.',
          'Lanzada en octubre de 2025, la canción superó el público tradicional del country. A mediados de agosto acumulaba más de 911 millones de streams en EE. UU. y 1.260 millones en el mundo, según CNN Newsource.',
          'También es #1 en la lista semanal de Spotify en EE. UU. en la semana que terminó el 24 de septiembre.',
        ],
      },
    },
  },
  {
    id: '2004', section: 'charts', confidence: 'confirmed', risk: 'green',
    publishedAt: '2026-09-25T13:00:00Z', hue: 150,
    personIds: ['karol-g'],
    sources: [
      { name: 'Billboard', url: 'https://www.billboard.com/music/chart-beat/karol-g-judeline-rusowsky-bby-wow-no-1-1236323969/' },
      { name: 'Wikipedia — Bby Wow', url: 'https://en.wikipedia.org/wiki/Bby_Wow' },
      { name: 'Spotify Weekly Global (kworb)', url: 'https://kworb.net/spotify/country/global_weekly.html' },
    ],
    t: {
      pt: {
        slug: 'karol-g-bby-wow-numero-1-spotify-global',
        headline: '“BbY WOW”, de Karol G com Judeline e rusowsky, segue como a música mais ouvida do mundo no Spotify',
        summary: 'A faixa lidera de novo o ranking semanal global e já chegou ao topo da Billboard Global 200.',
        body: [
          'Karol G mantém “BbY WOW”, parceria com os espanhóis Judeline e rusowsky, em 1º lugar no ranking semanal global do Spotify, na semana encerrada em 24 de setembro.',
          'Lançada em 7 de agosto, a música faz parte de “No Me Arrepiento de Sentir Tanto”, sexto álbum de estúdio da colombiana. Ela também alcançou o topo da Billboard Global 200 e deu a Judeline e rusowsky o primeiro 1º lugar na Hot Latin Songs.',
          'A produção é assinada pelos três artistas, com Tainy e Omer Fedi.',
        ],
      },
      en: {
        slug: 'karol-g-bby-wow-number-one-spotify-global',
        headline: 'Karol G’s “BbY WOW” with Judeline and rusowsky stays the world’s most-streamed song on Spotify',
        summary: 'The track tops the global weekly chart again and has already hit No. 1 on the Billboard Global 200.',
        body: [
          'Karol G’s “BbY WOW”, a collaboration with Spanish artists Judeline and rusowsky, holds No. 1 on Spotify’s global weekly chart for the week ending September 24.',
          'Released August 7, the song is from “No Me Arrepiento de Sentir Tanto”, the Colombian star’s sixth studio album. It also reached No. 1 on the Billboard Global 200 and gave Judeline and rusowsky their first Hot Latin Songs No. 1.',
          'It was produced by the three artists with Tainy and Omer Fedi.',
        ],
      },
      es: {
        slug: 'karol-g-bby-wow-numero-1-spotify-global',
        headline: '“BbY WOW”, de Karol G con Judeline y rusowsky, sigue siendo la canción más escuchada del mundo en Spotify',
        summary: 'El tema lidera otra vez la lista semanal global y ya llegó al #1 del Billboard Global 200.',
        body: [
          'Karol G mantiene “BbY WOW”, colaboración con los españoles Judeline y rusowsky, en el #1 de la lista semanal global de Spotify en la semana que terminó el 24 de septiembre.',
          'Lanzada el 7 de agosto, forma parte de “No Me Arrepiento de Sentir Tanto”, sexto álbum de estudio de la colombiana. También alcanzó el #1 del Billboard Global 200 y dio a Judeline y rusowsky su primer #1 en Hot Latin Songs.',
          'La producción es de los tres artistas junto a Tainy y Omer Fedi.',
        ],
      },
    },
  },
  {
    id: '2005', section: 'music', confidence: 'confirmed', risk: 'green',
    publishedAt: '2026-09-25T14:00:00Z', hue: 20,
    personIds: ['taylor-swift'],
    sources: [
      { name: 'ABC News', url: 'https://abcnews.com/GMA/Culture/taylor-swift-announces-new-single-patient-zero/story?id=136657611' },
      { name: 'Billboard', url: 'https://www.billboard.com/music/music-news/taylor-swift-life-showgirl-encore-listen-1236346593/' },
    ],
    t: {
      pt: {
        slug: 'taylor-swift-the-life-of-a-showgirl-the-encore-patient-zero',
        headline: 'Taylor Swift lança “The Encore” com quatro músicas inéditas e o single “Patient Zero”',
        summary: 'As faixas extras chegam quase um ano depois de “The Life of a Showgirl”, que vendeu mais de 4 milhões de unidades na estreia.',
        body: [
          'Taylor Swift lançou na sexta-feira (25) “The Life of a Showgirl: The Encore”, edição com quatro músicas novas: “Patient Zero”, “Babylon”, “Cleveland!” e “Pink Clouding”.',
          '“Patient Zero” é o single de trabalho, e o clipe estreou no VMA. As novas faixas foram produzidas com Max Martin e Shellback, a mesma dupla do álbum original.',
          '“The Life of a Showgirl” saiu em 3 de outubro de 2025 e bateu recorde ao passar de 4 milhões de unidades equivalentes vendidas na primeira semana.',
        ],
      },
      en: {
        slug: 'taylor-swift-the-life-of-a-showgirl-the-encore-patient-zero',
        headline: 'Taylor Swift releases “The Encore” with four new songs, led by “Patient Zero”',
        summary: 'The bonus tracks arrive almost a year after “The Life of a Showgirl”, which moved over 4 million units in its first week.',
        body: [
          'Taylor Swift released “The Life of a Showgirl: The Encore” on Friday, adding four new songs: “Patient Zero”, “Babylon”, “Cleveland!” and “Pink Clouding”.',
          '“Patient Zero” is the single, and its video premiered at the VMAs. The new tracks were produced with Max Martin and Shellback, the team behind the original album.',
          '“The Life of a Showgirl” came out on October 3, 2025, and set a record with more than 4 million equivalent units in its first week.',
        ],
      },
      es: {
        slug: 'taylor-swift-the-life-of-a-showgirl-the-encore-patient-zero',
        headline: 'Taylor Swift lanza “The Encore” con cuatro canciones inéditas y el sencillo “Patient Zero”',
        summary: 'Los temas extra llegan casi un año después de “The Life of a Showgirl”, que superó los 4 millones de unidades en su debut.',
        body: [
          'Taylor Swift lanzó el viernes “The Life of a Showgirl: The Encore”, con cuatro canciones nuevas: “Patient Zero”, “Babylon”, “Cleveland!” y “Pink Clouding”.',
          '“Patient Zero” es el sencillo, y su video se estrenó en los VMA. Los temas se produjeron con Max Martin y Shellback, el mismo equipo del álbum original.',
          '“The Life of a Showgirl” salió el 3 de octubre de 2025 y marcó un récord con más de 4 millones de unidades equivalentes en su primera semana.',
        ],
      },
    },
  },
  {
    id: '2006', section: 'creators', confidence: 'confirmed', risk: 'green',
    publishedAt: '2026-09-21T16:00:00Z', hue: 190,
    personIds: ['travis-scott', 'morgan-wallen', 'rauw-alejandro', 'ca7riel-paco-amoroso'],
    sources: [
      { name: 'Consequence', url: 'https://consequence.net/2026/09/grand-theft-auto-vi-announces-soundtrack-album/' },
      { name: 'Vibe', url: 'https://www.vibe.com/music/music-news/grand-theft-auto-vi-album-travis-scott-morgan-wallen-1235188682/' },
    ],
    t: {
      pt: {
        slug: 'gta-vi-the-album-trilha-travis-scott-morgan-wallen',
        headline: 'GTA VI terá álbum com 34 músicas inéditas de Travis Scott, Morgan Wallen, Rauw Alejandro e mais',
        summary: '“Grand Theft Auto VI: The Album” sai em 19 de novembro, junto com o jogo.',
        body: [
          'A Rockstar Games anunciou “Grand Theft Auto VI: The Album”, com 34 músicas originais. Seis já foram lançadas e as outras 28 chegam em 19 de novembro, mesmo dia do lançamento do jogo.',
          'Entre os primeiros nomes estão Travis Scott, Morgan Wallen, Keith Richards, Future, Metro Boomin, PinkPantheress, Fred again.., Rauw Alejandro e a dupla argentina CA7RIEL & Paco Amoroso. A faixa de Travis Scott, “RHYNO”, tem produção de Guy-Manuel de Homem-Christo, ex-Daft Punk.',
          'A pré-venda em vinil e CD abriu em 17 de setembro. “Last Thing You Need”, de Morgan Wallen, estreou no top 10 do Spotify americano.',
        ],
      },
      en: {
        slug: 'gta-vi-the-album-soundtrack-travis-scott-morgan-wallen',
        headline: 'GTA VI gets a 34-song original album featuring Travis Scott, Morgan Wallen, Rauw Alejandro and more',
        summary: '“Grand Theft Auto VI: The Album” arrives November 19, alongside the game.',
        body: [
          'Rockstar Games announced “Grand Theft Auto VI: The Album”, with 34 original songs. Six are already out and the remaining 28 arrive on November 19, the game’s release date.',
          'Early names include Travis Scott, Morgan Wallen, Keith Richards, Future, Metro Boomin, PinkPantheress, Fred again.., Rauw Alejandro and Argentine duo CA7RIEL & Paco Amoroso. Travis Scott’s “RHYNO” is produced by former Daft Punk member Guy-Manuel de Homem-Christo.',
          'Vinyl and CD pre-orders opened September 17. Morgan Wallen’s “Last Thing You Need” debuted in the top 10 of Spotify’s U.S. chart.',
        ],
      },
      es: {
        slug: 'gta-vi-the-album-banda-sonora-travis-scott-morgan-wallen',
        headline: 'GTA VI tendrá un álbum de 34 canciones inéditas con Travis Scott, Morgan Wallen, Rauw Alejandro y más',
        summary: '“Grand Theft Auto VI: The Album” sale el 19 de noviembre, junto con el juego.',
        body: [
          'Rockstar Games anunció “Grand Theft Auto VI: The Album”, con 34 canciones originales. Seis ya salieron y las otras 28 llegan el 19 de noviembre, el día del lanzamiento del juego.',
          'Entre los primeros nombres están Travis Scott, Morgan Wallen, Keith Richards, Future, Metro Boomin, PinkPantheress, Fred again.., Rauw Alejandro y el dúo argentino CA7RIEL & Paco Amoroso. “RHYNO”, de Travis Scott, tiene producción de Guy-Manuel de Homem-Christo, ex Daft Punk.',
          'La preventa en vinilo y CD abrió el 17 de septiembre. “Last Thing You Need”, de Morgan Wallen, debutó en el top 10 de Spotify en EE. UU.',
        ],
      },
    },
  },
  {
    id: '2007', section: 'music', confidence: 'confirmed', risk: 'green',
    publishedAt: '2026-09-26T12:00:00Z', hue: 270,
    personIds: ['bts'],
    sources: [
      { name: 'The Rio Times', url: 'https://www.riotimesonline.com/bts-sao-paulo-brazil-concerts-october-28-30-31-2026-morumbis-arirang-tour/' },
      { name: 'Ticketmaster Brasil', url: 'https://www.ticketmaster.com.br/event/bts-world-tour-arirang' },
    ],
    t: {
      pt: {
        slug: 'bts-sao-paulo-morumbis-arirang-datas',
        headline: 'BTS volta ao Brasil depois de sete anos com três shows no MorumBIS',
        summary: 'A turnê “Arirang”, primeira do grupo completo após o serviço militar, passa por São Paulo em 28, 30 e 31 de outubro.',
        body: [
          'O BTS se apresenta no MorumBIS, em São Paulo, nos dias 28, 30 e 31 de outubro. É a primeira passagem do grupo pelo Brasil em sete anos.',
          'Os shows fazem parte da “BTS World Tour Arirang”, a primeira turnê com os sete integrantes depois do serviço militar. Antes do Brasil, o grupo toca em Bogotá, na Colômbia, em 2 e 3 de outubro.',
          'Os ingressos são vendidos pela Ticketmaster Brasil, com cadastro de CPF obrigatório.',
        ],
      },
      en: {
        slug: 'bts-sao-paulo-morumbis-arirang-dates',
        headline: 'BTS return to Brazil after seven years with three shows at MorumBIS',
        summary: 'The Arirang tour, the group’s first full-lineup trek since military service, hits São Paulo on October 28, 30 and 31.',
        body: [
          'BTS will play MorumBIS stadium in São Paulo on October 28, 30 and 31, the group’s first shows in Brazil in seven years.',
          'The dates are part of the BTS World Tour Arirang, the first tour with all seven members since their military service. Before Brazil, they play Bogotá, Colombia, on October 2 and 3.',
          'Tickets are sold through Ticketmaster Brasil, and buyers must register a Brazilian CPF.',
        ],
      },
      es: {
        slug: 'bts-sao-paulo-morumbis-arirang-fechas',
        headline: 'BTS vuelve a Brasil tras siete años con tres shows en el MorumBIS',
        summary: 'La gira “Arirang”, la primera del grupo completo tras el servicio militar, pasa por São Paulo el 28, 30 y 31 de octubre.',
        body: [
          'BTS se presentará en el estadio MorumBIS de São Paulo el 28, 30 y 31 de octubre, sus primeros shows en Brasil en siete años.',
          'Las fechas son parte de la BTS World Tour Arirang, la primera gira con los siete integrantes tras el servicio militar. Antes de Brasil tocan en Bogotá, Colombia, el 2 y 3 de octubre.',
          'Las entradas se venden por Ticketmaster Brasil, con registro obligatorio de CPF.',
        ],
      },
    },
  },
  {
    id: '2008', section: 'music', confidence: 'confirmed', risk: 'green',
    publishedAt: '2026-09-27T12:00:00Z', hue: 200,
    personIds: ['zayn', 'robbie-williams', 'bts', 'hayley-williams', 'ca7riel-paco-amoroso', 'ed-sheeran', 'anitta'],
    sources: [{ name: 'Exame', url: 'https://exame.com/pop/veja-o-calendario-de-shows-internacionais-no-brasil-ate-o-final-de-2026/' }],
    t: {
      pt: {
        slug: 'agenda-shows-internacionais-brasil-fim-de-2026',
        headline: 'De ZAYN a Ed Sheeran: os shows internacionais que ainda passam pelo Brasil em 2026',
        summary: 'Outubro abre com ZAYN e Robbie Williams; BTS, Hayley Williams e CA7RIEL & Paco Amoroso vêm em seguida, e Ed Sheeran fecha o ano.',
        body: [
          'O último trimestre de 2026 tem agenda cheia de shows internacionais. ZAYN abre a sequência em 10 de outubro, no Nubank Parque, em São Paulo, e Robbie Williams toca no mesmo local em 13 de outubro, sua volta ao país depois de cerca de 20 anos.',
          'O BTS faz três noites no MorumBIS (28, 30 e 31/10). Em novembro, M.I.A. toca no Audio (1º/11), Hayley Williams passa pelo Rio (9/11) e por São Paulo (12 e 13/11), e CA7RIEL & Paco Amoroso fazem São Paulo (18/11) e Rio (20/11).',
          'Em dezembro, Ed Sheeran leva a “Loop Tour” ao Nubank Parque (5 e 6/12), com FINNEAS na abertura. No mesmo fim de semana acontece o Primavera Sound São Paulo, em Interlagos.',
        ],
      },
      en: {
        slug: 'international-concerts-brazil-late-2026',
        headline: 'From ZAYN to Ed Sheeran: the international acts still coming to Brazil in 2026',
        summary: 'October opens with ZAYN and Robbie Williams; BTS, Hayley Williams and CA7RIEL & Paco Amoroso follow, and Ed Sheeran closes the year.',
        body: [
          'The last quarter of 2026 is packed with international concerts in Brazil. ZAYN kicks things off on October 10 at Nubank Parque in São Paulo, and Robbie Williams plays the same venue on October 13, his return after about 20 years.',
          'BTS play three nights at MorumBIS (Oct 28, 30 and 31). In November, M.I.A. plays Audio (Nov 1), Hayley Williams stops in Rio (Nov 9) and São Paulo (Nov 12–13), and CA7RIEL & Paco Amoroso play São Paulo (Nov 18) and Rio (Nov 20).',
          'In December, Ed Sheeran brings the Loop Tour to Nubank Parque (Dec 5–6), with FINNEAS opening. Primavera Sound São Paulo takes place the same weekend at Interlagos.',
        ],
      },
      es: {
        slug: 'agenda-conciertos-internacionales-brasil-fin-de-2026',
        headline: 'De ZAYN a Ed Sheeran: los shows internacionales que todavía llegan a Brasil en 2026',
        summary: 'Octubre abre con ZAYN y Robbie Williams; luego vienen BTS, Hayley Williams y CA7RIEL & Paco Amoroso, y Ed Sheeran cierra el año.',
        body: [
          'El último trimestre de 2026 llega cargado de conciertos internacionales en Brasil. ZAYN abre el 10 de octubre en el Nubank Parque de São Paulo, y Robbie Williams toca en el mismo lugar el 13 de octubre, su regreso tras unos 20 años.',
          'BTS hará tres noches en el MorumBIS (28, 30 y 31/10). En noviembre, M.I.A. toca en Audio (1/11), Hayley Williams pasa por Río (9/11) y São Paulo (12 y 13/11), y CA7RIEL & Paco Amoroso tocan en São Paulo (18/11) y Río (20/11).',
          'En diciembre, Ed Sheeran lleva el Loop Tour al Nubank Parque (5 y 6/12), con FINNEAS como telonero. Ese mismo fin de semana se celebra el Primavera Sound São Paulo, en Interlagos.',
        ],
      },
    },
  },
  {
    id: '2009', section: 'music', confidence: 'confirmed', risk: 'green',
    publishedAt: '2026-09-24T12:00:00Z', hue: 165,
    personIds: [],
    sources: [{ name: 'Showmetech', url: 'https://www.showmetech.com.br/confira-lineup-do-primavera-sound-sao-paulo-2026/' }],
    t: {
      pt: {
        slug: 'primavera-sound-sao-paulo-2026-line-up',
        headline: 'Primavera Sound São Paulo 2026 tem The Strokes, Gorillaz, FKA twigs e Lily Allen',
        summary: 'O festival volta a Interlagos nos dias 5 e 6 de dezembro, após dois anos de pausa.',
        body: [
          'O Primavera Sound São Paulo confirmou sua terceira edição para 5 e 6 de dezembro, no Autódromo de Interlagos. O festival estava parado desde 2023.',
          'The Strokes, Gorillaz, FKA twigs e Lily Allen lideram o line-up de 37 atrações, que também tem Courtney Barnett, Yung Lean e Nation of Language.',
          'Do Brasil, estão confirmados Ana Frango Elétrico, Gaby Amarantos, Johnny Hooker, Duquesa, Ebony e Josyara.',
        ],
      },
      en: {
        slug: 'primavera-sound-sao-paulo-2026-lineup',
        headline: 'Primavera Sound São Paulo 2026 brings The Strokes, Gorillaz, FKA twigs and Lily Allen',
        summary: 'The festival returns to Interlagos on December 5–6 after a two-year break.',
        body: [
          'Primavera Sound São Paulo confirmed its third edition for December 5–6 at the Interlagos racetrack. The festival had been on hold since 2023.',
          'The Strokes, Gorillaz, FKA twigs and Lily Allen top a 37-act lineup that also includes Courtney Barnett, Yung Lean and Nation of Language.',
          'Brazilian acts include Ana Frango Elétrico, Gaby Amarantos, Johnny Hooker, Duquesa, Ebony and Josyara.',
        ],
      },
      es: {
        slug: 'primavera-sound-sao-paulo-2026-cartel',
        headline: 'Primavera Sound São Paulo 2026 trae a The Strokes, Gorillaz, FKA twigs y Lily Allen',
        summary: 'El festival vuelve a Interlagos el 5 y 6 de diciembre tras dos años de pausa.',
        body: [
          'Primavera Sound São Paulo confirmó su tercera edición para el 5 y 6 de diciembre en el Autódromo de Interlagos. El festival estaba en pausa desde 2023.',
          'The Strokes, Gorillaz, FKA twigs y Lily Allen encabezan un cartel de 37 artistas que también incluye a Courtney Barnett, Yung Lean y Nation of Language.',
          'De Brasil están confirmados Ana Frango Elétrico, Gaby Amarantos, Johnny Hooker, Duquesa, Ebony y Josyara.',
        ],
      },
    },
  },
  {
    id: '2010', section: 'movies-tv', confidence: 'confirmed', risk: 'green',
    publishedAt: '2026-09-27T18:00:00Z', hue: 0,
    personIds: [],
    sources: [{ name: 'Metrópoles', url: 'https://www.metropoles.com/entretenimento/netflix-divulga-lancamentos-de-outubro-veja-a-lista-completa' }],
    t: {
      pt: {
        slug: 'netflix-lancamentos-outubro-2026',
        headline: 'Netflix em outubro: “A Leste do Éden”, nova parte de “Lupin” e maratona de terror',
        summary: 'O mês tem série com Florence Pugh, “Pecadores”, “Anora” e um documentário sobre Matthew Perry.',
        body: [
          'A Netflix abre outubro com “A Leste do Éden”, série original estrelada por Florence Pugh, que estreia no dia 1º. No dia 23 chega a quarta parte de “Lupin”, com Assane recomeçando a vida após quatro anos preso.',
          'Entre os filmes, os destaques são “Pecadores”, com Michael B. Jordan (4/10), e “Anora” (23/10). Para o Halloween, o catálogo recebe “Nosferatu” (2/10), os filmes da franquia “Pânico” (9/10) e “Um Lugar Silencioso” 1 e 2 (15/10).',
          'No dia 27 estreia um documentário sobre a vida de Matthew Perry.',
        ],
      },
      en: {
        slug: 'netflix-new-releases-october-2026',
        headline: 'Netflix in October: “East of Eden”, a new “Lupin” part and a horror lineup',
        summary: 'The month brings a Florence Pugh series, “Sinners”, “Anora” and a documentary about Matthew Perry.',
        body: [
          'Netflix opens October with “East of Eden”, an original series starring Florence Pugh, on the 1st. Part 4 of “Lupin” arrives on the 23rd, with Assane starting over after four years in prison.',
          'On the film side, highlights include “Sinners” with Michael B. Jordan (Oct 4) and “Anora” (Oct 23). For Halloween, the catalog adds “Nosferatu” (Oct 2), the “Scream” films (Oct 9) and “A Quiet Place” parts 1 and 2 (Oct 15).',
          'A documentary about Matthew Perry’s life premieres on October 27.',
        ],
      },
      es: {
        slug: 'netflix-estrenos-octubre-2026',
        headline: 'Netflix en octubre: “Al este del Edén”, nueva parte de “Lupin” y maratón de terror',
        summary: 'El mes trae una serie con Florence Pugh, “Pecadores”, “Anora” y un documental sobre Matthew Perry.',
        body: [
          'Netflix abre octubre con “Al este del Edén”, serie original protagonizada por Florence Pugh, el día 1. El 23 llega la cuarta parte de “Lupin”, con Assane empezando de cero tras cuatro años preso.',
          'En cine destacan “Pecadores”, con Michael B. Jordan (4/10), y “Anora” (23/10). Para Halloween llegan “Nosferatu” (2/10), las películas de “Scream” (9/10) y “Un lugar en silencio” 1 y 2 (15/10).',
          'El 27 se estrena un documental sobre la vida de Matthew Perry.',
        ],
      },
    },
  },
  {
    id: '2011', section: 'music', confidence: 'confirmed', risk: 'green',
    publishedAt: '2026-09-25T10:00:00Z', hue: 285,
    personIds: ['taylor-swift', 'madonna', 'charli-xcx'],
    sources: [
      { name: 'DK Network — New Music Friday', url: 'https://dknetwork.draftkings.com/2026/09/24/new-music-friday-release-radar-for-september-25-2026-top-albums-song-releases/' },
      { name: 'Paste', url: 'https://www.pastemagazine.com/music/best-new-albums/best-new-albums-september-25-2026' },
    ],
    t: {
      pt: {
        slug: 'lancamentos-da-semana-25-setembro-2026',
        headline: 'Lançamentos da semana: Taylor Swift, Madonna com Charli xcx, Tinashe e Linkin Park ao vivo em SP',
        summary: 'A sexta-feira (25) trouxe edição especial de Taylor, single novo de Madonna e álbum de Tinashe.',
        body: [
          'O destaque da sexta-feira foi Taylor Swift, com “The Life of a Showgirl: The Encore” e o single “Patient Zero”. Madonna e Charli xcx lançaram juntas “Danceteria”, dias antes de dividirem o palco no VMA.',
          'Tinashe apresentou o álbum “Poster”, e o Linkin Park lançou a trilha ao vivo “Unshatter”, gravada em São Paulo.',
          'Nos singles, saíram ainda “Fireflies”, de John Legend com Pharrell Williams, “On Video”, de Phoebe Bridgers, e “Roses”, do Chvrches.',
        ],
      },
      en: {
        slug: 'new-music-friday-september-25-2026',
        headline: 'New this week: Taylor Swift, Madonna with Charli xcx, Tinashe and Linkin Park live in São Paulo',
        summary: 'Friday brought Taylor’s special edition, a new Madonna single and Tinashe’s album.',
        body: [
          'Friday’s headliner was Taylor Swift, with “The Life of a Showgirl: The Encore” and the single “Patient Zero”. Madonna and Charli xcx released “Danceteria” together, days before sharing the VMAs stage.',
          'Tinashe dropped her album “Poster”, and Linkin Park released the live soundtrack “Unshatter”, recorded in São Paulo.',
          'Other singles included John Legend and Pharrell Williams’ “Fireflies”, Phoebe Bridgers’ “On Video” and Chvrches’ “Roses”.',
        ],
      },
      es: {
        slug: 'estrenos-de-la-semana-25-septiembre-2026',
        headline: 'Estrenos de la semana: Taylor Swift, Madonna con Charli xcx, Tinashe y Linkin Park en vivo en São Paulo',
        summary: 'El viernes llegó la edición especial de Taylor, un sencillo nuevo de Madonna y el álbum de Tinashe.',
        body: [
          'La protagonista del viernes fue Taylor Swift, con “The Life of a Showgirl: The Encore” y el sencillo “Patient Zero”. Madonna y Charli xcx lanzaron juntas “Danceteria”, días antes de compartir escenario en los VMA.',
          'Tinashe presentó el álbum “Poster” y Linkin Park lanzó la banda sonora en vivo “Unshatter”, grabada en São Paulo.',
          'En sencillos también salieron “Fireflies”, de John Legend con Pharrell Williams, “On Video”, de Phoebe Bridgers, y “Roses”, de Chvrches.',
        ],
      },
    },
  },
  {
    id: '2012', section: 'music', confidence: 'confirmed', risk: 'green',
    publishedAt: '2026-09-26T15:00:00Z', hue: 320,
    personIds: ['anitta'],
    sources: [{ name: 'POPline', url: 'https://portalpopline.com.br/anitta-agenda-shows-2026/' }],
    t: {
      pt: {
        slug: 'anitta-agenda-shows-meli-music-ensaios-2027',
        headline: 'Anitta toca no Pacaembu em outubro e já tem datas dos Ensaios de 2027',
        summary: 'Depois do Meli Music, a cantora passa pelo Rock the Mountain e abre em janeiro a temporada de Ensaios em oito cidades.',
        body: [
          'Anitta se apresenta em 17 de outubro no Meli Music, na Mercado Livre Arena Pacaembu, em São Paulo. Em novembro, ela está no line-up do Rock the Mountain, em Petrópolis (RJ).',
          'Em janeiro de 2027 começa a nova temporada dos Ensaios da Anitta, com datas em Belém, Recife, Belo Horizonte, Brasília, Campinas, Rio de Janeiro, Curitiba e São Paulo. As apresentações em Recife e Curitiba já estão esgotadas, segundo o POPline.',
          'A cantora mantém dois formatos de show: os Ensaios e a “EQUILIBRIVM Tour”, mais intimista e focada no álbum mais recente.',
        ],
      },
      en: {
        slug: 'anitta-tour-dates-meli-music-ensaios-2027',
        headline: 'Anitta plays Pacaembu in October and has already set her 2027 “Ensaios” dates',
        summary: 'After Meli Music, she plays Rock the Mountain and opens her “Ensaios” season in eight cities in January.',
        body: [
          'Anitta performs on October 17 at Meli Music, at the Mercado Livre Arena Pacaembu in São Paulo. In November she is on the Rock the Mountain lineup in Petrópolis, Rio de Janeiro state.',
          'In January 2027 her new “Ensaios da Anitta” season begins, with dates in Belém, Recife, Belo Horizonte, Brasília, Campinas, Rio de Janeiro, Curitiba and São Paulo. The Recife and Curitiba shows are already sold out, per POPline.',
          'She keeps two show formats: the “Ensaios” and the more intimate EQUILIBRIVM Tour, focused on her latest album.',
        ],
      },
      es: {
        slug: 'anitta-agenda-shows-meli-music-ensaios-2027',
        headline: 'Anitta toca en el Pacaembu en octubre y ya tiene fechas de los “Ensaios” 2027',
        summary: 'Tras el Meli Music, pasa por Rock the Mountain y en enero abre la temporada de “Ensaios” en ocho ciudades.',
        body: [
          'Anitta se presenta el 17 de octubre en el Meli Music, en el Mercado Livre Arena Pacaembu de São Paulo. En noviembre está en el cartel de Rock the Mountain, en Petrópolis (RJ).',
          'En enero de 2027 empieza la nueva temporada de los “Ensaios da Anitta”, con fechas en Belém, Recife, Belo Horizonte, Brasilia, Campinas, Río de Janeiro, Curitiba y São Paulo. Los shows de Recife y Curitiba ya están agotados, según POPline.',
          'La cantante mantiene dos formatos: los “Ensaios” y el EQUILIBRIVM Tour, más íntimo y centrado en su último álbum.',
        ],
      },
    },
  },
];

/* ─── Charts (Spotify Weekly, semana até 24/09/2026) ────────── */

type Row = [title: string, artist: string, change: string, artistId?: string];

function toEntries(rows: Row[], hueBase: number): ChartEntry[] {
  return rows.map(([title, artistName, change, artistId], i) => {
    const position = i + 1;
    const delta = change === '=' ? 0 : change === 'NEW' ? null : Number(change);
    return {
      position,
      lastPosition: delta === null ? null : position + delta,
      title,
      artistName,
      artistId,
      hue: (hueBase + i * 29) % 360,
    };
  });
}

const spotifyWeek = { provider: 'Spotify Weekly (via kworb.net)', retrievedAt: '2026-09-28T12:00:00Z' };

export const charts: Chart[] = [
  {
    id: 'spotify-br-weekly',
    title: { pt: 'Spotify Brasil', en: 'Spotify Brazil', es: 'Spotify Brasil' },
    region: 'BR',
    periodEnd: '2026-09-24',
    provenance: { ...spotifyWeek, sourceUrl: 'https://kworb.net/spotify/country/br_weekly.html' },
    entries: toEntries(
      [
        ['Postinho de Gasolina', 'João Gustavo e Murilo, Grelo', '+1'],
        ['Cadeira Cativa (Ao Vivo)', 'Zé Neto & Cristiano', '-1', 'ze-neto-e-cristiano'],
        ['Cuida do Pet', 'Oldilla', '='],
        ['Ta Pedindo Toma', 'MC Leozinho ZS', '='],
        ['Peão Todo Tatuado', 'Jeninho, Mariana Fagundes', '='],
        ['Eu Te Seguro (Ao Vivo)', 'Panda, MJ Records', '+2'],
        ['Um Peão Desse', 'CountryBeat, Mari Fernandez', '-1'],
        ['Pau Pra Toda Obra', 'Mc Jacaré', '+1'],
        ['EXAGERADO', 'MC Jvila', '+1'],
        ['Puxa o Lança', 'MC Jvila', '-3'],
      ],
      30,
    ),
  },
  {
    id: 'spotify-global-weekly',
    title: { pt: 'Spotify Global', en: 'Spotify Global', es: 'Spotify Global' },
    region: 'GLOBAL',
    periodEnd: '2026-09-24',
    provenance: { ...spotifyWeek, sourceUrl: 'https://kworb.net/spotify/country/global_weekly.html' },
    entries: toEntries(
      [
        ['BbY WOW', 'KAROL G, Judeline, rusowsky', '=', 'karol-g'],
        ['Nicole Kidman', 'ADÉLA', '+14'],
        ["Ain't In LA", 'ADÉLA', '+3'],
        ['Earrings', 'Malcolm Todd', '-2'],
        ['Beauty And A Beat', 'Justin Bieber, Nicki Minaj', '-2', 'justin-bieber'],
        ['Self Aware', 'Temper City', '+1'],
        ['The One That Got Away', 'Katy Perry', '-3', 'katy-perry'],
        ['the cure', 'Olivia Rodrigo', '=', 'olivia-rodrigo'],
        ['Iris', 'The Goo Goo Dolls', '+1'],
        ['Loser', 'Tame Impala', '-4'],
      ],
      300,
    ),
  },
  {
    id: 'spotify-us-weekly',
    title: { pt: 'Spotify EUA', en: 'Spotify US', es: 'Spotify EE. UU.' },
    region: 'US',
    periodEnd: '2026-09-24',
    provenance: { ...spotifyWeek, sourceUrl: 'https://kworb.net/spotify/country/us_weekly.html' },
    entries: toEntries(
      [
        ["Choosin' Texas", 'Ella Langley', '=', 'ella-langley'],
        ['Nicole Kidman', 'ADÉLA', '+2'],
        ['BbY WOW', 'KAROL G, Judeline, rusowsky', '-1', 'karol-g'],
        ['Earrings', 'Malcolm Todd', '-1'],
        ['Mr. Brightside', 'The Killers', '+1'],
        ['stupid song', 'Olivia Rodrigo', '-1', 'olivia-rodrigo'],
        ['the cure', 'Olivia Rodrigo', '=', 'olivia-rodrigo'],
        ["Ain't In LA", 'ADÉLA', '+6'],
        ['Last Thing You Need (GTA VI)', 'Morgan Wallen', 'NEW', 'morgan-wallen'],
        ['Cinderella', 'Mac Miller, Ty Dolla $ign', '='],
      ],
      200,
    ),
  },
];

/* ─── Lançamentos da semana (sexta 25/09/2026) ──────────────── */

export const releases: Release[] = [
  { id: 'r1', title: 'The Life of a Showgirl: The Encore', artistName: 'Taylor Swift', artistId: 'taylor-swift', type: 'album', genre: 'Pop', releaseDate: '2026-09-25', hue: 20 },
  { id: 'r2', title: 'Danceteria', artistName: 'Madonna & Charli xcx', artistId: 'madonna', type: 'single', genre: 'Dance', releaseDate: '2026-09-25', hue: 310 },
  { id: 'r3', title: 'Poster', artistName: 'Tinashe', type: 'album', genre: 'R&B', releaseDate: '2026-09-25', hue: 280 },
  { id: 'r4', title: 'Unshatter (Live in São Paulo)', artistName: 'Linkin Park', type: 'album', genre: 'Rock', releaseDate: '2026-09-25', hue: 210 },
  { id: 'r5', title: 'Fireflies', artistName: 'John Legend & Pharrell Williams', type: 'single', genre: 'Soul', releaseDate: '2026-09-25', hue: 50 },
  { id: 'r6', title: 'On Video', artistName: 'Phoebe Bridgers', type: 'single', genre: 'Indie', releaseDate: '2026-09-25', hue: 240 },
];

/* ─── Agenda (shows e datas confirmadas) ────────────────────── */

const exame = 'https://exame.com/pop/veja-o-calendario-de-shows-internacionais-no-brasil-ate-o-final-de-2026/';
const ev = (
  id: string,
  kind: EntertainmentEvent['kind'],
  startsAt: string,
  personIds: string[],
  hue: number,
  title: [string, string, string],
  place: [string, string, string],
  sourceUrl = exame,
): EntertainmentEvent => ({
  id,
  kind,
  startsAt,
  personIds,
  hue,
  sourceUrl,
  t: {
    pt: { title: title[0], place: place[0] },
    en: { title: title[1], place: place[1] },
    es: { title: title[2], place: place[2] },
  },
});

export const events: EntertainmentEvent[] = [
  ev('e1', 'show', '2026-10-10T23:00:00Z', ['zayn'], 20, ['ZAYN', 'ZAYN', 'ZAYN'], ['Nubank Parque, São Paulo', 'Nubank Parque, São Paulo', 'Nubank Parque, São Paulo']),
  ev('e2', 'show', '2026-10-13T23:30:00Z', ['robbie-williams'], 40, ['Robbie Williams', 'Robbie Williams', 'Robbie Williams'], ['Nubank Parque, São Paulo', 'Nubank Parque, São Paulo', 'Nubank Parque, São Paulo']),
  ev('e3', 'show', '2026-10-17T23:00:00Z', ['anitta'], 330, ['Anitta no Meli Music', 'Anitta at Meli Music', 'Anitta en el Meli Music'], ['Mercado Livre Arena Pacaembu, São Paulo', 'Mercado Livre Arena Pacaembu, São Paulo', 'Mercado Livre Arena Pacaembu, São Paulo'], 'https://portalpopline.com.br/anitta-agenda-shows-2026/'),
  ev('e4', 'show', '2026-10-28T23:00:00Z', ['bts'], 270, ['BTS — World Tour Arirang', 'BTS — World Tour Arirang', 'BTS — World Tour Arirang'], ['MorumBIS, São Paulo (também 30 e 31/10)', 'MorumBIS, São Paulo (also Oct 30 & 31)', 'MorumBIS, São Paulo (también 30 y 31/10)'], 'https://www.riotimesonline.com/bts-sao-paulo-brazil-concerts-october-28-30-31-2026-morumbis-arirang-tour/'),
  ev('e5', 'show', '2026-11-01T23:00:00Z', [], 90, ['M.I.A.', 'M.I.A.', 'M.I.A.'], ['Audio, São Paulo', 'Audio, São Paulo', 'Audio, São Paulo']),
  ev('e6', 'show', '2026-11-09T23:00:00Z', ['hayley-williams'], 150, ['Hayley Williams', 'Hayley Williams', 'Hayley Williams'], ['Qualistage, Rio de Janeiro', 'Qualistage, Rio de Janeiro', 'Qualistage, Río de Janeiro']),
  ev('e7', 'show', '2026-11-12T23:00:00Z', ['hayley-williams'], 160, ['Hayley Williams', 'Hayley Williams', 'Hayley Williams'], ['Espaço Unimed, São Paulo (também 13/11)', 'Espaço Unimed, São Paulo (also Nov 13)', 'Espaço Unimed, São Paulo (también 13/11)']),
  ev('e8', 'show', '2026-11-18T23:00:00Z', ['ca7riel-paco-amoroso'], 110, ['CA7RIEL & Paco Amoroso — Free Spirits World Tour', 'CA7RIEL & Paco Amoroso — Free Spirits World Tour', 'CA7RIEL & Paco Amoroso — Free Spirits World Tour'], ['Espaço Unimed, São Paulo', 'Espaço Unimed, São Paulo', 'Espaço Unimed, São Paulo']),
  ev('e9', 'release', '2026-11-19T05:00:00Z', ['travis-scott', 'morgan-wallen', 'rauw-alejandro'], 190, ['Grand Theft Auto VI: The Album', 'Grand Theft Auto VI: The Album', 'Grand Theft Auto VI: The Album'], ['Todas as plataformas', 'All platforms', 'Todas las plataformas'], 'https://consequence.net/2026/09/grand-theft-auto-vi-announces-soundtrack-album/'),
  ev('e10', 'show', '2026-11-20T23:00:00Z', ['ca7riel-paco-amoroso'], 120, ['CA7RIEL & Paco Amoroso', 'CA7RIEL & Paco Amoroso', 'CA7RIEL & Paco Amoroso'], ['Vivo Rio, Rio de Janeiro', 'Vivo Rio, Rio de Janeiro', 'Vivo Rio, Río de Janeiro']),
  ev('e11', 'show', '2026-12-05T22:00:00Z', ['ed-sheeran'], 30, ['Ed Sheeran — Loop Tour', 'Ed Sheeran — Loop Tour', 'Ed Sheeran — Loop Tour'], ['Nubank Parque, São Paulo (também 6/12)', 'Nubank Parque, São Paulo (also Dec 6)', 'Nubank Parque, São Paulo (también 6/12)']),
  ev('e12', 'show', '2026-12-05T17:00:00Z', [], 165, ['Primavera Sound São Paulo', 'Primavera Sound São Paulo', 'Primavera Sound São Paulo'], ['Autódromo de Interlagos (5 e 6/12)', 'Interlagos racetrack (Dec 5–6)', 'Autódromo de Interlagos (5 y 6/12)'], 'https://www.showmetech.com.br/confira-lineup-do-primavera-sound-sao-paulo-2026/'),
  ev('e13', 'show', '2027-01-09T23:00:00Z', ['anitta'], 340, ['Ensaios da Anitta 2027 (estreia)', 'Ensaios da Anitta 2027 (opening)', 'Ensaios da Anitta 2027 (estreno)'], ['Mangueirão, Belém', 'Mangueirão, Belém', 'Mangueirão, Belém'], 'https://portalpopline.com.br/anitta-agenda-shows-2026/'),
];
