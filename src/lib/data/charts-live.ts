/**
 * Charts reais (via kworb.net, que espelha Spotify e Apple Music). Coletados em 28/09/2026; Apple Music BR/EUA atualizado em 02/10/2026.
 * Regra do site: o padrão exibido é sempre o GLOBAL; o leitor escolhe plataforma e país.
 * Gerado a partir da pesquisa — o robô vai substituir este arquivo a cada atualização.
 */
import type { Chart } from './types';

type Raw = { id: string; platform: 'spotify' | 'apple'; region: string; periodEnd: string; kind: 'weekly' | 'daily'; sourceUrl: string; entries: Chart['entries'] };

const raw: Raw[] = [
 {
  "id": "spotify-global",
  "platform": "spotify",
  "region": "GLOBAL",
  "periodEnd": "2026-09-24",
  "kind": "weekly",
  "sourceUrl": "https://kworb.net/spotify/country/global_weekly.html",
  "entries": [
   {
    "position": 1,
    "lastPosition": 1,
    "title": "BbY WOW",
    "artistName": "KAROL G, Judeline, rusowsky",
    "hue": 0,
    "artistId": "karol-g"
   },
   {
    "position": 2,
    "lastPosition": 16,
    "title": "Nicole Kidman",
    "artistName": "ADÉLA",
    "hue": 29
   },
   {
    "position": 3,
    "lastPosition": 5,
    "title": "Ain't In LA",
    "artistName": "ADÉLA",
    "hue": 58
   },
   {
    "position": 4,
    "lastPosition": 2,
    "title": "Earrings",
    "artistName": "Malcolm Todd",
    "hue": 87
   },
   {
    "position": 5,
    "lastPosition": 3,
    "title": "Beauty And A Beat",
    "artistName": "Justin Bieber, Nicki Minaj",
    "hue": 116,
    "artistId": "justin-bieber"
   },
   {
    "position": 6,
    "lastPosition": 7,
    "title": "Self Aware",
    "artistName": "Temper City",
    "hue": 145
   },
   {
    "position": 7,
    "lastPosition": 4,
    "title": "The One That Got Away",
    "artistName": "Katy Perry",
    "hue": 174,
    "artistId": "katy-perry"
   },
   {
    "position": 8,
    "lastPosition": 8,
    "title": "the cure",
    "artistName": "Olivia Rodrigo",
    "hue": 203,
    "artistId": "olivia-rodrigo"
   },
   {
    "position": 9,
    "lastPosition": 10,
    "title": "Iris",
    "artistName": "The Goo Goo Dolls",
    "hue": 232
   },
   {
    "position": 10,
    "lastPosition": 6,
    "title": "Loser",
    "artistName": "Tame Impala",
    "hue": 261
   }
  ]
 },
 {
  "id": "spotify-br",
  "platform": "spotify",
  "region": "BR",
  "periodEnd": "2026-09-24",
  "kind": "weekly",
  "sourceUrl": "https://kworb.net/spotify/country/br_weekly.html",
  "entries": [
   {
    "position": 1,
    "lastPosition": 2,
    "title": "Postinho de Gasolina",
    "artistName": "João Gustavo e Murilo, Grelo",
    "hue": 0
   },
   {
    "position": 2,
    "lastPosition": 1,
    "title": "Cadeira Cativa - Ao Vivo",
    "artistName": "Zé Neto & Cristiano",
    "artistId": "ze-neto-e-cristiano",
    "hue": 29
   },
   {
    "position": 3,
    "lastPosition": 3,
    "title": "Cuida do Pet",
    "artistName": "Oldilla, Mc Iguinho Ct, MC Willian, Aaron Modesto, Mc Negão Original, DU'L, Dj Aladin GDB",
    "hue": 58
   },
   {
    "position": 4,
    "lastPosition": 4,
    "title": "Ta Pedindo Toma",
    "artistName": "MC Leozinho ZS, MC Murilo MT, Mc DR, DJ JHOW BEATS, MC RN do Capão, Mc Pelourinho",
    "hue": 87
   },
   {
    "position": 5,
    "lastPosition": 5,
    "title": "Peão Todo Tatuado",
    "artistName": "Jeninho, Mariana Fagundes",
    "hue": 116
   },
   {
    "position": 6,
    "lastPosition": 8,
    "title": "Eu Te Seguro - Ao Vivo",
    "artistName": "Panda, MJ Records",
    "hue": 145
   },
   {
    "position": 7,
    "lastPosition": 6,
    "title": "Um Peão Desse",
    "artistName": "CountryBeat, Mari Fernandez",
    "hue": 174
   },
   {
    "position": 8,
    "lastPosition": 9,
    "title": "Pau Pra Toda Obra",
    "artistName": "Mc Jacaré, MC Ryan SP, Mc Lele JP, Mc IG",
    "hue": 203
   },
   {
    "position": 9,
    "lastPosition": 10,
    "title": "EXAGERADO",
    "artistName": "MC Jvila, MC Meno K, Mc Rodrigo do CN, DJ Glenner",
    "hue": 232
   },
   {
    "position": 10,
    "lastPosition": 7,
    "title": "Puxa o Lança",
    "artistName": "MC Jvila, KayBlack, Veigh, Vulgo FK, Honaiser, Nagalli, Stick, Toledo",
    "hue": 261
   }
  ]
 },
 {
  "id": "spotify-us",
  "platform": "spotify",
  "region": "US",
  "periodEnd": "2026-09-24",
  "kind": "weekly",
  "sourceUrl": "https://kworb.net/spotify/country/us_weekly.html",
  "entries": [
   {
    "position": 1,
    "lastPosition": 1,
    "title": "Choosin' Texas",
    "artistName": "Ella Langley",
    "hue": 0,
    "artistId": "ella-langley"
   },
   {
    "position": 2,
    "lastPosition": 4,
    "title": "Nicole Kidman",
    "artistName": "ADÉLA",
    "hue": 29
   },
   {
    "position": 3,
    "lastPosition": 2,
    "title": "BbY WOW",
    "artistName": "KAROL G, Judeline, rusowsky",
    "hue": 58,
    "artistId": "karol-g"
   },
   {
    "position": 4,
    "lastPosition": 3,
    "title": "Earrings",
    "artistName": "Malcolm Todd",
    "hue": 87
   },
   {
    "position": 5,
    "lastPosition": 6,
    "title": "Mr. Brightside",
    "artistName": "The Killers",
    "hue": 116
   },
   {
    "position": 6,
    "lastPosition": 5,
    "title": "stupid song",
    "artistName": "Olivia Rodrigo",
    "hue": 145,
    "artistId": "olivia-rodrigo"
   },
   {
    "position": 7,
    "lastPosition": 7,
    "title": "the cure",
    "artistName": "Olivia Rodrigo",
    "hue": 174,
    "artistId": "olivia-rodrigo"
   },
   {
    "position": 8,
    "lastPosition": 14,
    "title": "Ain't In LA",
    "artistName": "ADÉLA",
    "hue": 203
   },
   {
    "position": 9,
    "lastPosition": null,
    "title": "Last Thing You Need (from GTAVI: The Album)",
    "artistName": "Morgan Wallen, Grand Theft Auto VI",
    "hue": 232,
    "artistId": "morgan-wallen"
   },
   {
    "position": 10,
    "lastPosition": 10,
    "title": "Cinderella",
    "artistName": "Mac Miller, Ty Dolla $ign",
    "hue": 261
   }
  ]
 },
 {
  "id": "apple-global",
  "platform": "apple",
  "region": "GLOBAL",
  "periodEnd": "2026-09-27",
  "kind": "daily",
  "sourceUrl": "https://kworb.net/apple_songs/",
  "entries": [
   {
    "position": 1,
    "lastPosition": 1,
    "title": "Patient Zero",
    "artistName": "Taylor Swift",
    "hue": 180,
    "artistId": "taylor-swift"
   },
   {
    "position": 2,
    "lastPosition": 2,
    "title": "Cleveland",
    "artistName": "Taylor Swift",
    "hue": 209,
    "artistId": "taylor-swift"
   },
   {
    "position": 3,
    "lastPosition": 3,
    "title": "Pink Clouding",
    "artistName": "Taylor Swift",
    "hue": 238,
    "artistId": "taylor-swift"
   },
   {
    "position": 4,
    "lastPosition": 4,
    "title": "Babylon",
    "artistName": "Taylor Swift",
    "hue": 267,
    "artistId": "taylor-swift"
   },
   {
    "position": 5,
    "lastPosition": 6,
    "title": "Nicole Kidman",
    "artistName": "ADÉLA",
    "hue": 296
   },
   {
    "position": 6,
    "lastPosition": 5,
    "title": "The Fate of Ophelia",
    "artistName": "Taylor Swift",
    "hue": 325,
    "artistId": "taylor-swift"
   },
   {
    "position": 7,
    "lastPosition": 7,
    "title": "Movin' To The Sun",
    "artistName": "HUGEL, Imael Angel & Ultra Naté",
    "hue": 354
   },
   {
    "position": 8,
    "lastPosition": 10,
    "title": "stupid song",
    "artistName": "Olivia Rodrigo",
    "hue": 23,
    "artistId": "olivia-rodrigo"
   },
   {
    "position": 9,
    "lastPosition": 12,
    "title": "the cure",
    "artistName": "Olivia Rodrigo",
    "hue": 52,
    "artistId": "olivia-rodrigo"
   },
   {
    "position": 10,
    "lastPosition": 9,
    "title": "Ain't In LA",
    "artistName": "ADÉLA",
    "hue": 81
   }
  ]
 },
 {
  "id": "apple-br",
  "platform": "apple",
  "region": "BR",
  "periodEnd": "2026-10-01",
  "kind": "daily",
  "sourceUrl": "https://kworb.net/charts/apple_s/br.html",
  "entries": [
   {
    "position": 1,
    "lastPosition": 1,
    "title": "Patient Zero",
    "artistName": "Taylor Swift",
    "hue": 180,
    "artistId": "taylor-swift"
   },
   {
    "position": 2,
    "lastPosition": 3,
    "title": "Nicole Kidman",
    "artistName": "ADÉLA",
    "hue": 209
   },
   {
    "position": 3,
    "lastPosition": 2,
    "title": "Pink Clouding",
    "artistName": "Taylor Swift",
    "hue": 238,
    "artistId": "taylor-swift"
   },
   {
    "position": 4,
    "lastPosition": 4,
    "title": "Babylon",
    "artistName": "Taylor Swift",
    "hue": 267,
    "artistId": "taylor-swift"
   },
   {
    "position": 5,
    "lastPosition": 6,
    "title": "The Fate of Ophelia",
    "artistName": "Taylor Swift",
    "hue": 296,
    "artistId": "taylor-swift"
   },
   {
    "position": 6,
    "lastPosition": 7,
    "title": "Ain't In LA",
    "artistName": "ADÉLA",
    "hue": 325
   },
   {
    "position": 7,
    "lastPosition": 5,
    "title": "Cleveland!",
    "artistName": "Taylor Swift",
    "hue": 354,
    "artistId": "taylor-swift"
   },
   {
    "position": 8,
    "lastPosition": 8,
    "title": "the cure",
    "artistName": "Olivia Rodrigo",
    "hue": 23,
    "artistId": "olivia-rodrigo"
   },
   {
    "position": 9,
    "lastPosition": 9,
    "title": "Cuida do Pet (feat. Mc Negão Original, DU'L & Dj Aladin GDB)",
    "artistName": "Oldilla, Mc Iguinho Ct, MC Willian & Aaron Modesto",
    "hue": 52
   },
   {
    "position": 10,
    "lastPosition": 17,
    "title": "Melatonin",
    "artistName": "Tinashe",
    "hue": 81
   }
  ]
 },
 {
  "id": "apple-us",
  "platform": "apple",
  "region": "US",
  "periodEnd": "2026-10-02",
  "kind": "daily",
  "sourceUrl": "https://kworb.net/charts/apple_s/us.html",
  "entries": [
   {
    "position": 1,
    "lastPosition": 1,
    "title": "Patient Zero",
    "artistName": "Taylor Swift",
    "hue": 180,
    "artistId": "taylor-swift"
   },
   {
    "position": 2,
    "lastPosition": 2,
    "title": "Choosin' Texas",
    "artistName": "Ella Langley",
    "hue": 209,
    "artistId": "ella-langley"
   },
   {
    "position": 3,
    "lastPosition": 3,
    "title": "BbY WOW",
    "artistName": "KAROL G, Judeline & rusowsky",
    "hue": 238,
    "artistId": "karol-g"
   },
   {
    "position": 4,
    "lastPosition": 5,
    "title": "Last Thing You Need (from GTAVI: The Album)",
    "artistName": "Morgan Wallen",
    "hue": 267,
    "artistId": "morgan-wallen"
   },
   {
    "position": 5,
    "lastPosition": null,
    "title": "Babylon",
    "artistName": "Taylor Swift",
    "hue": 296,
    "artistId": "taylor-swift"
   },
   {
    "position": 6,
    "lastPosition": 6,
    "title": "Pink Clouding",
    "artistName": "Taylor Swift",
    "hue": 325,
    "artistId": "taylor-swift"
   },
   {
    "position": 7,
    "lastPosition": 8,
    "title": "Been By Now",
    "artistName": "Morgan Wallen",
    "hue": 354,
    "artistId": "morgan-wallen"
   },
   {
    "position": 8,
    "lastPosition": 9,
    "title": "Janice STFU",
    "artistName": "Drake",
    "hue": 23,
    "artistId": "drake"
   },
   {
    "position": 9,
    "lastPosition": null,
    "title": "Cleveland!",
    "artistName": "Taylor Swift",
    "hue": 52,
    "artistId": "taylor-swift"
   },
   {
    "position": 10,
    "lastPosition": 10,
    "title": "Nicole Kidman",
    "artistName": "ADÉLA",
    "hue": 81
   }
  ]
 }
];

const provider = { spotify: 'Spotify', apple: 'Apple Music' } as const;

export const liveCharts: Chart[] = raw.map((c) => ({
  id: c.id,
  platform: c.platform,
  kind: c.kind,
  title: { pt: provider[c.platform], en: provider[c.platform], es: provider[c.platform] },
  region: c.region,
  periodEnd: c.periodEnd,
  provenance: { provider: `${provider[c.platform]} ${c.kind === 'weekly' ? 'Weekly' : 'Daily'} (via kworb.net)`, sourceUrl: c.sourceUrl, retrievedAt: '2026-10-02T12:00:00Z' },
  entries: c.entries,
}));
