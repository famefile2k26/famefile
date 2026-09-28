/**
 * ARQUIVO DE MATÉRIAS (jan–set/2026) — pesquisado em 28/09/2026.
 * Texto próprio a partir dos fatos das fontes; datas de publicação = quando o fato aconteceu.
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

export const archive: Article[] = [
  /* ─── Rock in Rio 2026 ─────────────────────────────────── */
  art(
    '2013', 'music', '2026-09-14T13:00:00Z', 30,
    ['elton-john', 'stray-kids', 'ivete-sangalo', 'gilberto-gil'],
    [
      { name: 'GMC Online', url: 'https://gmconline.com.br/entretenimento/rock-in-rio-2026-reune-700-mil-pessoas-em-sete-dias-edicao-2028-esta-confirmada/' },
      { name: 'The Rio Times', url: 'https://www.riotimesonline.com/rock-in-rio-2026-brazil-september-4-13-elton-john-stray-kids-lineup/' },
    ],
    {
      pt: {
        slug: 'rock-in-rio-2026-balanco-700-mil-pessoas-2028-confirmado',
        headline: 'Rock in Rio 2026 termina com 700 mil pessoas e edição de 2028 já confirmada',
        summary: 'Os sete dias de festival tiveram chuva quase todo dia, despedida de Elton John e o primeiro headliner de K-pop do Palco Mundo.',
        body: [
          'O Rock in Rio 2026 reuniu 700 mil pessoas em sete dias na Cidade do Rock, segundo a organização. Metade do público veio de fora do estado do Rio, e o festival contou visitantes de 89 países.',
          'A chuva caiu em todos os dias, menos na abertura, e virou parte da história desta edição. No palco, os destaques foram a despedida de Elton John do Brasil, o encontro dele com Gilberto Gil nos bastidores e o Stray Kids, primeiro grupo de K-pop a fechar uma noite no Palco Mundo.',
          'A organização estimou impacto de R$ 3,36 bilhões na economia e já confirmou a próxima edição para setembro de 2028. O The Town, festival irmão em São Paulo, volta em setembro de 2027.',
        ],
      },
      en: {
        slug: 'rock-in-rio-2026-recap-700000-fans-2028-confirmed',
        headline: 'Rock in Rio 2026 wraps with 700,000 fans and a 2028 edition already confirmed',
        summary: 'Seven days marked by near-daily rain, Elton John’s farewell to Brazil and the Palco Mundo’s first K-pop headliner.',
        body: [
          'Rock in Rio 2026 drew 700,000 people over seven days at the Cidade do Rock, according to organizers. Half the crowd came from outside Rio de Janeiro state, with visitors from 89 countries.',
          'Rain fell every day except opening night and became part of this edition’s story. On stage, the highlights were Elton John’s farewell to Brazil, his backstage meeting with Gilberto Gil and Stray Kids, the first K-pop group to headline the Palco Mundo.',
          'Organizers estimated an economic impact of R$3.36 billion and confirmed the next edition for September 2028. Sister festival The Town returns to São Paulo in September 2027.',
        ],
      },
      es: {
        slug: 'rock-in-rio-2026-balance-700-mil-personas-2028-confirmado',
        headline: 'Rock in Rio 2026 cierra con 700 mil personas y la edición 2028 ya confirmada',
        summary: 'Siete días con lluvia casi diaria, la despedida de Elton John de Brasil y el primer headliner de K-pop del Palco Mundo.',
        body: [
          'Rock in Rio 2026 reunió a 700 mil personas en siete días en la Cidade do Rock, según la organización. La mitad del público llegó de fuera del estado de Río, con visitantes de 89 países.',
          'Llovió todos los días menos en la apertura, y eso marcó esta edición. En el escenario destacaron la despedida de Elton John de Brasil, su encuentro con Gilberto Gil tras bastidores y Stray Kids, el primer grupo de K-pop en cerrar una noche en el Palco Mundo.',
          'La organización estimó un impacto de R$ 3.360 millones en la economía y ya confirmó la próxima edición para septiembre de 2028. The Town, su festival hermano en São Paulo, vuelve en septiembre de 2027.',
        ],
      },
    },
    {
      factBox: {
        pt: { known: ['Público total: 700 mil pessoas em 7 dias', 'Visitantes de 89 países', 'Próxima edição: setembro de 2028', 'The Town volta em setembro de 2027'], unknown: [] },
        en: { known: ['Total attendance: 700,000 over 7 days', 'Visitors from 89 countries', 'Next edition: September 2028', 'The Town returns in September 2027'], unknown: [] },
        es: { known: ['Público total: 700 mil personas en 7 días', 'Visitantes de 89 países', 'Próxima edición: septiembre de 2028', 'The Town vuelve en septiembre de 2027'], unknown: [] },
      },
    },
  ),
  art(
    '2014', 'music', '2026-09-08T12:00:00Z', 45,
    ['elton-john', 'gilberto-gil'],
    [
      { name: 'Rolling Stone Brasil', url: 'https://rollingstone.com.br/musica/elton-john-enaltece-show-no-rock-in-rio-2026-pais-lindo-e-povo-maravilhoso/' },
      { name: 'Billboard', url: 'https://www.billboard.com/music/music-news/elton-john-2026-rock-in-rio-recap-1236336050/' },
    ],
    {
      pt: {
        slug: 'elton-john-despedida-brasil-rock-in-rio-2026',
        headline: 'Elton John se despede do Brasil no Rock in Rio: “país lindo e povo maravilhoso”',
        summary: 'Aos 79 anos, o cantor fez seu primeiro show no país em nove anos e disse que não pretende voltar a fazer turnês.',
        body: [
          'Elton John fechou o Palco Mundo na segunda-feira, 7 de setembro, com um show de 24 músicas que a crítica chamou de histórico. Foi a primeira apresentação dele no Brasil em nove anos.',
          'No dia seguinte, o cantor agradeceu ao público nas redes e disse que a noite tinha sido incrível. Ele lamentou não ter incluído a América do Sul na turnê de despedida encerrada em 2023 e tratou o show como uma forma de acertar essa dívida com os fãs brasileiros.',
          'Elton confirmou que não planeja novas turnês nem shows solo, por causa de questões de saúde. Nos bastidores, ele se encontrou com Gilberto Gil, que também se apresentou no festival.',
        ],
      },
      en: {
        slug: 'elton-john-farewell-brazil-rock-in-rio-2026',
        headline: 'Elton John says goodbye to Brazil at Rock in Rio: “a beautiful country, wonderful people”',
        summary: 'At 79, he played his first show in the country in nine years and said he has no plans to tour again.',
        body: [
          'Elton John closed the Palco Mundo on Monday, September 7, with a 24-song set critics called historic. It was his first show in Brazil in nine years.',
          'The next day he thanked fans online, calling the night incredible. He said he regretted leaving South America out of the farewell tour that ended in 2023 and framed the show as settling that debt with Brazilian fans.',
          'He confirmed he has no plans for new tours or solo shows due to health issues. Backstage, he met Gilberto Gil, who also played the festival.',
        ],
      },
      es: {
        slug: 'elton-john-despedida-brasil-rock-in-rio-2026',
        headline: 'Elton John se despide de Brasil en Rock in Rio: “un país hermoso y un pueblo maravilloso”',
        summary: 'A los 79 años hizo su primer show en el país en nueve años y dijo que no planea volver a salir de gira.',
        body: [
          'Elton John cerró el Palco Mundo el lunes 7 de septiembre con un show de 24 canciones que la crítica calificó de histórico. Fue su primera presentación en Brasil en nueve años.',
          'Al día siguiente agradeció al público en redes y dijo que la noche había sido increíble. Lamentó no haber incluido Sudamérica en la gira de despedida que terminó en 2023 y presentó el show como una forma de saldar esa deuda con los fans brasileños.',
          'Confirmó que no planea nuevas giras ni shows solistas por problemas de salud. Tras bastidores se encontró con Gilberto Gil, que también tocó en el festival.',
        ],
      },
    },
  ),
  art(
    '2015', 'music', '2026-09-12T11:00:00Z', 260,
    ['stray-kids'],
    [
      { name: 'GMC Online', url: 'https://gmconline.com.br/entretenimento/rock-in-rio-2026-reune-700-mil-pessoas-em-sete-dias-edicao-2028-esta-confirmada/' },
      { name: 'setlist.fm', url: 'https://www.setlist.fm/setlist/stray-kids/2026/parque-olimpico-palco-mundo-rio-de-janeiro-brazil-1b4c8128.html' },
      { name: 'Terra', url: 'https://www.terra.com.br/diversao/musica/rock-in-rio/balanco-rock-in-rio-2026-os-melhores-e-os-piores-shows-do-festival,4a4d1ffbba949179bfcf2650bd416966v690jlth.html' },
    ],
    {
      pt: {
        slug: 'stray-kids-primeiro-kpop-headliner-palco-mundo-rock-in-rio',
        headline: 'Stray Kids faz história como o primeiro grupo de K-pop a fechar o Palco Mundo do Rock in Rio',
        summary: 'O show de 11 de setembro teve coreografias sem erro, telões gigantes e alerta da produção para a lotação na grade.',
        body: [
          'O Stray Kids virou o primeiro grupo de K-pop a ser atração principal do Palco Mundo, na abertura do segundo fim de semana do Rock in Rio, em 11 de setembro.',
          'A crítica elogiou a precisão das coreografias e o uso dos telões. Durante o show, a produção pediu que os fãs se afastassem da grade por causa da lotação na frente do palco.',
        ],
      },
      en: {
        slug: 'stray-kids-first-kpop-headliner-palco-mundo-rock-in-rio',
        headline: 'Stray Kids make history as the first K-pop group to headline Rock in Rio’s Palco Mundo',
        summary: 'The September 11 show brought flawless choreography, giant screens and crowd-safety warnings from the production.',
        body: [
          'Stray Kids became the first K-pop group to headline the Palco Mundo, opening Rock in Rio’s second weekend on September 11.',
          'Critics praised the precise choreography and the use of the giant screens. During the set, the production asked fans to step back from the barrier due to crowd density at the front.',
        ],
      },
      es: {
        slug: 'stray-kids-primer-kpop-headliner-palco-mundo-rock-in-rio',
        headline: 'Stray Kids hace historia como el primer grupo de K-pop en encabezar el Palco Mundo de Rock in Rio',
        summary: 'El show del 11 de septiembre tuvo coreografías impecables, pantallas gigantes y avisos de seguridad de la producción.',
        body: [
          'Stray Kids se convirtió en el primer grupo de K-pop en encabezar el Palco Mundo, en la apertura del segundo fin de semana de Rock in Rio, el 11 de septiembre.',
          'La crítica elogió la precisión de las coreografías y el uso de las pantallas. Durante el show, la producción pidió a los fans alejarse de la valla por la densidad del público.',
        ],
      },
    },
  ),
  art(
    '2016', 'music', '2026-09-14T18:00:00Z', 10,
    ['elton-john', 'demi-lovato', 'ivete-sangalo', 'stray-kids', 'luisa-sonza', 'alok'],
    [{ name: 'Terra', url: 'https://www.terra.com.br/diversao/musica/rock-in-rio/balanco-rock-in-rio-2026-os-melhores-e-os-piores-shows-do-festival,4a4d1ffbba949179bfcf2650bd416966v690jlth.html' }],
    {
      pt: {
        slug: 'rock-in-rio-2026-melhores-e-piores-shows-critica',
        headline: 'Rock in Rio 2026: os shows que a crítica amou — e os que dividiram opiniões',
        summary: 'Elton John, Jamiroquai e Demi Lovato estão entre os mais elogiados; Maroon 5 e Machine Gun Kelly receberam as piores avaliações.',
        body: [
          'No balanço do Terra, o topo ficou com Elton John, pela voz firme em mais de duas horas de clássicos, seguido de Jamiroquai e do encontro de Roupa Nova com Guilherme Arantes. Demi Lovato puxou uma das maiores plateias do festival, e Ivete Sangalo mostrou regularidade em sua 20ª participação no evento.',
          'Entre os shows com avaliação negativa estão Machine Gun Kelly, considerado deslocado no dia do metal, e Maroon 5, pelo repertório previsível. O crítico também não se convenceu com o show de Luísa Sonza, que misturou bossa nova e funk, e achou o set de Calvin Harris menos marcante que o de Alok.',
        ],
      },
      en: {
        slug: 'rock-in-rio-2026-best-and-worst-shows-critics',
        headline: 'Rock in Rio 2026: the shows critics loved — and the ones that split opinions',
        summary: 'Elton John, Jamiroquai and Demi Lovato were among the most praised; Maroon 5 and Machine Gun Kelly got the worst reviews.',
        body: [
          'In Terra’s wrap-up, Elton John topped the list for holding his voice through over two hours of classics, followed by Jamiroquai and the pairing of Roupa Nova with Guilherme Arantes. Demi Lovato drew one of the festival’s biggest crowds, and Ivete Sangalo was consistent in her 20th appearance at the event.',
          'On the negative side were Machine Gun Kelly, seen as out of place on metal day, and Maroon 5, for a predictable setlist. The critic was also unconvinced by Luísa Sonza’s mix of bossa nova and funk, and found Calvin Harris less memorable than Alok.',
        ],
      },
      es: {
        slug: 'rock-in-rio-2026-mejores-y-peores-shows-critica',
        headline: 'Rock in Rio 2026: los shows que la crítica amó y los que dividieron opiniones',
        summary: 'Elton John, Jamiroquai y Demi Lovato, entre los más elogiados; Maroon 5 y Machine Gun Kelly recibieron las peores reseñas.',
        body: [
          'En el balance de Terra, el primer lugar fue para Elton John, por sostener la voz en más de dos horas de clásicos, seguido de Jamiroquai y del encuentro de Roupa Nova con Guilherme Arantes. Demi Lovato reunió uno de los públicos más grandes, e Ivete Sangalo se mostró sólida en su 20.ª participación en el festival.',
          'Entre las peores evaluaciones quedaron Machine Gun Kelly, fuera de lugar en el día del metal, y Maroon 5, por un repertorio previsible. El crítico tampoco quedó convencido con el show de Luísa Sonza, que mezcló bossa nova y funk, y consideró el set de Calvin Harris menos memorable que el de Alok.',
        ],
      },
    },
    { confidence: 'reported' },
  ),

  /* ─── Luísa Sonza ──────────────────────────────────────── */
  art(
    '2017', 'music', '2026-04-07T15:00:00Z', 330,
    ['luisa-sonza'],
    [{ name: 'Wikipedia — Brutal Paraíso', url: 'https://en.wikipedia.org/wiki/Brutal_Para%C3%ADso' }],
    {
      pt: {
        slug: 'luisa-sonza-lanca-brutal-paraiso-quinto-album',
        headline: 'Luísa Sonza lança “Brutal Paraíso”, álbum de 23 faixas com Young Miko e Sebastián Yatra',
        summary: 'O quinto disco mistura pop, bossa nova, funk, rock e eletrônico e teve 4,1 milhões de streams nas primeiras 24 horas.',
        body: [
          'Luísa Sonza lançou em 7 de abril “Brutal Paraíso”, seu quinto álbum de estúdio. São 23 faixas e mais de uma hora de música, organizadas em três blocos que vão da introspecção à sensualidade e ao drama.',
          'O disco foi antecedido pelos singles “Telefone” e “Fruto do Tempo” e tem participações de Xamã, Young Miko, Sebastián Yatra, MC Morena, MC Meno K e MC Paiva.',
          'Nas primeiras 24 horas, somou 4,1 milhões de streams no Spotify e colocou 13 faixas no Top 200 diário do Brasil. A crítica elogiou a ambição, mas parte dela apontou excesso de duração.',
        ],
      },
      en: {
        slug: 'luisa-sonza-releases-brutal-paraiso-fifth-album',
        headline: 'Luísa Sonza releases “Brutal Paraíso”, a 23-track album with Young Miko and Sebastián Yatra',
        summary: 'Her fifth album blends pop, bossa nova, funk, rock and electronic music and hit 4.1 million streams in 24 hours.',
        body: [
          'Luísa Sonza released her fifth studio album, “Brutal Paraíso”, on April 7. It runs 23 tracks and over an hour, arranged in three sections moving from introspection to sensuality and drama.',
          'Singles “Telefone” and “Fruto do Tempo” came first, and the album features Xamã, Young Miko, Sebastián Yatra, MC Morena, MC Meno K and MC Paiva.',
          'It logged 4.1 million Spotify streams in its first 24 hours and placed 13 songs on Brazil’s daily Top 200. Critics praised the ambition, though some felt it ran too long.',
        ],
      },
      es: {
        slug: 'luisa-sonza-lanza-brutal-paraiso-quinto-album',
        headline: 'Luísa Sonza lanza “Brutal Paraíso”, un álbum de 23 canciones con Young Miko y Sebastián Yatra',
        summary: 'Su quinto disco mezcla pop, bossa nova, funk, rock y electrónica, y sumó 4,1 millones de streams en 24 horas.',
        body: [
          'Luísa Sonza lanzó el 7 de abril “Brutal Paraíso”, su quinto álbum de estudio. Son 23 canciones y más de una hora de música, en tres bloques que van de la introspección a la sensualidad y el drama.',
          'Lo precedieron los sencillos “Telefone” y “Fruto do Tempo”, y cuenta con Xamã, Young Miko, Sebastián Yatra, MC Morena, MC Meno K y MC Paiva.',
          'En sus primeras 24 horas sumó 4,1 millones de streams en Spotify y colocó 13 canciones en el Top 200 diario de Brasil. La crítica elogió la ambición, aunque parte señaló que es demasiado largo.',
        ],
      },
    },
  ),
  art(
    '2018', 'music', '2026-06-13T12:00:00Z', 345,
    ['luisa-sonza', 'pabllo-vittar'],
    [{ name: 'CNN Brasil', url: 'https://www.cnnbrasil.com.br/pop/musica/luisa-sonza-estreia-turne-com-pedido-de-noivado-e-performance-de-novos-hits/' }],
    {
      pt: {
        slug: 'luisa-sonza-estreia-turne-brutal-paraiso-rio-pedido-de-noivado',
        headline: 'Luísa Sonza estreia a turnê “Brutal Paraíso” no Rio com pedido de noivado na plateia',
        summary: 'No show de Dia dos Namorados, um fã pediu o namorado em casamento e a cantora abençoou o casal no palco.',
        body: [
          'Luísa Sonza estreou a turnê “Brutal Paraíso” em 12 de junho, no Jockey Club do Rio, dentro de uma programação de Dia dos Namorados que também teve Pabllo Vittar.',
          'O momento mais comentado foi um pedido de noivado entre dois fãs. A cantora parou o show, celebrou com o casal e pediu que eles cuidassem um do outro.',
          'O repertório teve “Depois do Fim” ao vivo pela primeira vez, além de “Chico” e das faixas do novo álbum, com figurinos e coreografias no visual do disco.',
        ],
      },
      en: {
        slug: 'luisa-sonza-brutal-paraiso-tour-premiere-rio-proposal',
        headline: 'Luísa Sonza opens the “Brutal Paraíso” tour in Rio with a marriage proposal in the crowd',
        summary: 'At the Valentine’s Day show in Brazil, a fan proposed to his boyfriend and the singer blessed the couple from the stage.',
        body: [
          'Luísa Sonza kicked off the “Brutal Paraíso” tour on June 12 at Rio’s Jockey Club, part of a Brazilian Valentine’s Day event that also featured Pabllo Vittar.',
          'The most talked-about moment was a proposal between two fans. She paused the show, celebrated with the couple and told them to take care of each other.',
          'The setlist included the live debut of “Depois do Fim”, plus “Chico” and songs from the new album, with costumes and choreography matching its visual concept.',
        ],
      },
      es: {
        slug: 'luisa-sonza-estrena-gira-brutal-paraiso-rio-propuesta',
        headline: 'Luísa Sonza estrena la gira “Brutal Paraíso” en Río con una propuesta de matrimonio en el público',
        summary: 'En el show del Día de los Enamorados brasileño, un fan le pidió matrimonio a su novio y la cantante bendijo a la pareja.',
        body: [
          'Luísa Sonza estrenó la gira “Brutal Paraíso” el 12 de junio en el Jockey Club de Río, dentro de un evento del Día de los Enamorados que también tuvo a Pabllo Vittar.',
          'El momento más comentado fue una propuesta de matrimonio entre dos fans. La cantante detuvo el show, celebró con la pareja y les pidió que se cuidaran mutuamente.',
          'El repertorio incluyó el estreno en vivo de “Depois do Fim”, además de “Chico” y temas del nuevo álbum, con vestuario y coreografías acordes al disco.',
        ],
      },
    },
  ),
  art(
    '2019', 'music', '2026-01-20T13:00:00Z', 55,
    ['luisa-sonza'],
    [{ name: 'Billboard Brasil', url: 'https://billboard.com.br/luisa-sonza-comenta-novo-album-2026/' }],
    {
      pt: {
        slug: 'luisa-sonza-bossa-sempre-nova-menescal-toquinho',
        headline: 'Luísa Sonza mergulha na bossa nova em “Bossa Sempre Nova”, com Roberto Menescal e Toquinho',
        summary: 'O projeto de janeiro reúne a cantora a dois nomes históricos do gênero e abriu o ano antes do álbum “Brutal Paraíso”.',
        body: [
          'Luísa Sonza abriu 2026 com “Bossa Sempre Nova”, projeto dedicado à bossa nova com participações de Roberto Menescal e Toquinho.',
          'O trabalho antecedeu o quinto álbum da cantora, “Brutal Paraíso”, lançado em abril, que manteve referências à bossa ao lado de funk, pop e eletrônico.',
        ],
      },
      en: {
        slug: 'luisa-sonza-bossa-sempre-nova-menescal-toquinho',
        headline: 'Luísa Sonza dives into bossa nova on “Bossa Sempre Nova” with Roberto Menescal and Toquinho',
        summary: 'The January project pairs her with two legends of the genre and set up her April album “Brutal Paraíso”.',
        body: [
          'Luísa Sonza opened 2026 with “Bossa Sempre Nova”, a bossa nova project featuring Roberto Menescal and Toquinho.',
          'It came ahead of her fifth album, “Brutal Paraíso”, released in April, which kept bossa references alongside funk, pop and electronic music.',
        ],
      },
      es: {
        slug: 'luisa-sonza-bossa-sempre-nova-menescal-toquinho',
        headline: 'Luísa Sonza se sumerge en la bossa nova con “Bossa Sempre Nova”, junto a Roberto Menescal y Toquinho',
        summary: 'El proyecto de enero la une a dos leyendas del género y abrió el camino a su álbum “Brutal Paraíso”.',
        body: [
          'Luísa Sonza abrió 2026 con “Bossa Sempre Nova”, un proyecto de bossa nova con Roberto Menescal y Toquinho.',
          'Llegó antes de su quinto álbum, “Brutal Paraíso”, lanzado en abril, que mantuvo referencias a la bossa junto al funk, el pop y la electrónica.',
        ],
      },
    },
  ),

  /* ─── Coachella 2026 ───────────────────────────────────── */
  art(
    '2020', 'music', '2026-04-13T12:00:00Z', 150,
    ['karol-g', 'j-balvin', 'peso-pluma', 'becky-g'],
    [
      { name: 'Foothill Dragon Press', url: 'https://foothilldragonpress.org/291354/a-latest/coachella-2026-a-overview-of-the-headlining-performances/' },
      { name: 'CBS News', url: 'https://www.cbsnews.com/amp/losangeles/news/coachella-2026-lineup-sabrina-carpenter-justin-bieber-anyma-and-karol-g-headliners' },
    ],
    {
      pt: {
        slug: 'karol-g-coachella-2026-primeira-latina-headliner',
        headline: 'Karol G é a primeira mulher latina a fechar o Coachella e leva J Balvin e Peso Pluma ao palco',
        summary: 'O show de domingo teve seis trocas de figurino, sete convidados e fogos no encerramento.',
        body: [
          'Karol G encerrou o primeiro fim de semana do Coachella 2026, em 12 de abril, como a primeira mulher latina a ser atração principal do festival.',
          'O show teve seis trocas de figurino e uma lista longa de convidados: Becky G, Mariah Angeliq, Greg Gonzalez, Wisin, J Balvin, Ryan Castro e Peso Pluma.',
          'No fim, com fogos, a colombiana anunciou uma nova turnê e falou sobre a representatividade da comunidade latina.',
        ],
      },
      en: {
        slug: 'karol-g-coachella-2026-first-latina-headliner',
        headline: 'Karol G becomes the first Latina to headline Coachella, bringing out J Balvin and Peso Pluma',
        summary: 'Her Sunday set featured six costume changes, seven guests and a fireworks finale.',
        body: [
          'Karol G closed Coachella 2026’s first weekend on April 12 as the first Latina to headline the festival.',
          'The set had six costume changes and a long list of guests: Becky G, Mariah Angeliq, Greg Gonzalez, Wisin, J Balvin, Ryan Castro and Peso Pluma.',
          'She ended with fireworks, announced a new tour and spoke about representation for the Latino community.',
        ],
      },
      es: {
        slug: 'karol-g-coachella-2026-primera-latina-headliner',
        headline: 'Karol G es la primera mujer latina en encabezar Coachella y sube a J Balvin y Peso Pluma al escenario',
        summary: 'Su show del domingo tuvo seis cambios de vestuario, siete invitados y fuegos artificiales al final.',
        body: [
          'Karol G cerró el primer fin de semana de Coachella 2026, el 12 de abril, como la primera mujer latina en encabezar el festival.',
          'El show tuvo seis cambios de vestuario y una larga lista de invitados: Becky G, Mariah Angeliq, Greg Gonzalez, Wisin, J Balvin, Ryan Castro y Peso Pluma.',
          'Al final, con fuegos artificiales, anunció una nueva gira y habló de la representación de la comunidad latina.',
        ],
      },
    },
  ),
  art(
    '2021', 'music', '2026-04-12T08:00:00Z', 215,
    ['justin-bieber', 'billie-eilish', 'sza'],
    [{ name: 'Foothill Dragon Press', url: 'https://foothilldragonpress.org/291354/a-latest/coachella-2026-a-overview-of-the-headlining-performances/' }],
    {
      pt: {
        slug: 'justin-bieber-bieberchella-coachella-2026-billie-eilish-sza',
        headline: '“Bieberchella”: Justin Bieber domina o sábado do Coachella com Billie Eilish e SZA',
        summary: 'O headliner misturou músicas novas, vídeos antigos do YouTube e memes, e recebeu também Sexyy Red e Big Sean.',
        body: [
          'Justin Bieber fechou o sábado do Coachella 2026 num show que os fãs apelidaram de “Bieberchella”. O repertório juntou as faixas mais recentes a vídeos nostálgicos do início da carreira no YouTube e compilações de memes.',
          'O cantor recebeu Billie Eilish, SZA, Sexyy Red e Big Sean, alternando momentos mais delicados com trechos de rap e R&B.',
        ],
      },
      en: {
        slug: 'justin-bieber-bieberchella-coachella-2026-billie-eilish-sza',
        headline: '“Bieberchella”: Justin Bieber owns Coachella Saturday with Billie Eilish and SZA',
        summary: 'The headliner mixed new songs with vintage YouTube clips and memes, and also brought out Sexyy Red and Big Sean.',
        body: [
          'Justin Bieber closed Coachella 2026’s Saturday with a set fans nicknamed “Bieberchella”. It blended his newest songs with nostalgic clips from his early YouTube days and meme montages.',
          'He brought out Billie Eilish, SZA, Sexyy Red and Big Sean, shifting between tender moments and rap and R&B stretches.',
        ],
      },
      es: {
        slug: 'justin-bieber-bieberchella-coachella-2026-billie-eilish-sza',
        headline: '“Bieberchella”: Justin Bieber domina el sábado de Coachella con Billie Eilish y SZA',
        summary: 'El headliner mezcló canciones nuevas, videos antiguos de YouTube y memes, y también invitó a Sexyy Red y Big Sean.',
        body: [
          'Justin Bieber cerró el sábado de Coachella 2026 con un show que los fans apodaron “Bieberchella”. Juntó sus temas más recientes con videos nostálgicos de sus inicios en YouTube y recopilaciones de memes.',
          'Invitó a Billie Eilish, SZA, Sexyy Red y Big Sean, alternando momentos íntimos con tramos de rap y R&B.',
        ],
      },
    },
  ),
  art(
    '2022', 'music', '2026-04-11T08:00:00Z', 20,
    ['sabrina-carpenter', 'madonna'],
    [{ name: 'Foothill Dragon Press', url: 'https://foothilldragonpress.org/291354/a-latest/coachella-2026-a-overview-of-the-headlining-performances/' }],
    {
      pt: {
        slug: 'sabrina-carpenter-coachella-2026-madonna',
        headline: 'Sabrina Carpenter abre o Coachella como headliner e chama Madonna para um dueto',
        summary: 'O show de sexta teve trocas de figurino e clássicos de Madonna cantados pelas duas.',
        body: [
          'Sabrina Carpenter foi a atração principal da sexta-feira do Coachella 2026, com um show cheio de trocas de figurino e hits como “Espresso”.',
          'O ponto alto foi a entrada de Madonna, que cantou clássicos ao lado dela. As duas voltariam a se encontrar meses depois: dividiram o palco na abertura do VMA e venceram Melhor Colaboração com “Bring Your Love”.',
        ],
      },
      en: {
        slug: 'sabrina-carpenter-coachella-2026-madonna',
        headline: 'Sabrina Carpenter opens Coachella as headliner and brings out Madonna for a duet',
        summary: 'Her Friday set featured costume changes and Madonna classics sung together.',
        body: [
          'Sabrina Carpenter headlined Coachella 2026’s Friday with a set full of costume changes and hits like “Espresso”.',
          'The peak was Madonna’s surprise appearance to sing classics with her. The two reunited months later, opening the VMAs together and winning Best Collaboration for “Bring Your Love”.',
        ],
      },
      es: {
        slug: 'sabrina-carpenter-coachella-2026-madonna',
        headline: 'Sabrina Carpenter abre Coachella como headliner e invita a Madonna a un dueto',
        summary: 'Su show del viernes tuvo cambios de vestuario y clásicos de Madonna cantados a dúo.',
        body: [
          'Sabrina Carpenter encabezó el viernes de Coachella 2026 con un show lleno de cambios de vestuario y éxitos como “Espresso”.',
          'El momento cumbre fue la aparición de Madonna para cantar clásicos con ella. Meses después volvieron a coincidir: abrieron juntas los VMA y ganaron Mejor Colaboración con “Bring Your Love”.',
        ],
      },
    },
  ),

  /* ─── Lollapalooza Brasil ──────────────────────────────── */
  art(
    '2023', 'music', '2026-03-23T12:00:00Z', 120,
    ['sabrina-carpenter', 'luisa-sonza', 'chappell-roan', 'addison-rae'],
    [{ name: 'Terra', url: 'https://www.terra.com.br/diversao/musica/lollapalooza/quais-foram-os-melhores-e-piores-shows-do-lollapalooza-2026-veja-balanco-do-festival,5d4917ccbef8e702b8d9429e521caab5dp594c6z.html' }],
    {
      pt: {
        slug: 'lollapalooza-brasil-2026-balanco-sabrina-carpenter-luisa-sonza',
        headline: 'Lollapalooza Brasil 2026: Sabrina Carpenter chama Luísa Sonza, Tyler, the Creator e Lorde brilham',
        summary: 'O festival em Interlagos (20 a 22/3) teve Sabrina, Chappell Roan, Tyler e Lorde como atrações principais.',
        body: [
          'O Lollapalooza Brasil 2026 aconteceu de 20 a 22 de março no Autódromo de Interlagos, com Sabrina Carpenter, Chappell Roan, Tyler, the Creator e Lorde no topo do line-up.',
          'Sabrina fez um show completo e divertido e levou Luísa Sonza ao palco, apesar de problemas de volume. Na avaliação do Terra, Tyler, the Creator e Lorde fizeram algumas das melhores apresentações, e Negra Li abriu a sexta com uma aula de rap.',
          'Do lado negativo, a crítica apontou o uso excessivo de playback nos shows de Addison Rae e Katseye. Os dias foram sem chuva, mas com lama no gramado.',
        ],
      },
      en: {
        slug: 'lollapalooza-brasil-2026-recap-sabrina-carpenter-luisa-sonza',
        headline: 'Lollapalooza Brasil 2026: Sabrina Carpenter brings out Luísa Sonza as Tyler, the Creator and Lorde shine',
        summary: 'The Interlagos festival (March 20–22) was headlined by Sabrina, Chappell Roan, Tyler and Lorde.',
        body: [
          'Lollapalooza Brasil 2026 ran March 20–22 at the Interlagos racetrack, headlined by Sabrina Carpenter, Chappell Roan, Tyler, the Creator and Lorde.',
          'Sabrina delivered a fun, complete set and brought out Luísa Sonza despite some volume issues. Per Terra’s review, Tyler, the Creator and Lorde gave some of the best performances, and Negra Li opened Friday with a rap masterclass.',
          'On the downside, critics flagged heavy playback in the sets by Addison Rae and Katseye. The days stayed dry, though the grounds were muddy.',
        ],
      },
      es: {
        slug: 'lollapalooza-brasil-2026-balance-sabrina-carpenter-luisa-sonza',
        headline: 'Lollapalooza Brasil 2026: Sabrina Carpenter invita a Luísa Sonza y brillan Tyler, the Creator y Lorde',
        summary: 'El festival en Interlagos (20 al 22/3) tuvo a Sabrina, Chappell Roan, Tyler y Lorde como cabezas de cartel.',
        body: [
          'Lollapalooza Brasil 2026 se celebró del 20 al 22 de marzo en el Autódromo de Interlagos, con Sabrina Carpenter, Chappell Roan, Tyler, the Creator y Lorde como cabezas de cartel.',
          'Sabrina hizo un show completo y divertido e invitó a Luísa Sonza, pese a problemas de volumen. Según Terra, Tyler, the Creator y Lorde dieron algunas de las mejores presentaciones, y Negra Li abrió el viernes con una clase de rap.',
          'En lo negativo, la crítica señaló el exceso de playback en los shows de Addison Rae y Katseye. No llovió, aunque el terreno estaba embarrado.',
        ],
      },
    },
  ),

  /* ─── Premiações e TV ──────────────────────────────────── */
  art(
    '2024', 'music', '2026-02-02T05:00:00Z', 350,
    ['bad-bunny', 'kendrick-lamar', 'sza', 'billie-eilish', 'olivia-dean', 'lady-gaga'],
    [
      { name: 'PBS News', url: 'https://www.pbs.org/newshour/arts/bad-bunny-wins-album-of-the-year-at-the-2026-grammy-awards-making-history-for-a-spanish-language-album' },
      { name: 'NPR', url: 'https://www.npr.org/2026/02/01/nx-s1-5693046/2026-grammy-awards-full-list-winners-nominees' },
    ],
    {
      pt: {
        slug: 'grammy-2026-bad-bunny-album-do-ano-historia',
        headline: 'Grammy 2026: Bad Bunny faz história com o primeiro Álbum do Ano em espanhol',
        summary: '“Debí Tirar Más Fotos” levou o prêmio principal; Kendrick Lamar e SZA venceram Gravação do Ano e Olivia Dean foi a revelação.',
        body: [
          'Bad Bunny venceu Álbum do Ano no Grammy 2026, em 1º de fevereiro, com “Debí Tirar Más Fotos”. É a primeira vez que um disco cantado em espanhol leva a principal categoria da premiação.',
          'Kendrick Lamar e SZA ganharam Gravação do Ano com “Luther”, e Kendrick chegou a 27 Grammys na carreira, passando Jay-Z. Billie Eilish levou Canção do Ano com “Wildflower”, Olivia Dean foi eleita Artista Revelação e Lady Gaga venceu Melhor Álbum Pop Vocal.',
          'No discurso, Bad Bunny exaltou Porto Rico, e vários artistas usaram o palco para criticar a política de imigração dos EUA.',
        ],
      },
      en: {
        slug: 'grammys-2026-bad-bunny-album-of-the-year-history',
        headline: 'Grammys 2026: Bad Bunny makes history with the first Spanish-language Album of the Year',
        summary: '“Debí Tirar Más Fotos” took the top prize; Kendrick Lamar and SZA won Record of the Year and Olivia Dean was Best New Artist.',
        body: [
          'Bad Bunny won Album of the Year at the February 1 Grammys for “Debí Tirar Más Fotos”, the first Spanish-language album to take the ceremony’s top category.',
          'Kendrick Lamar and SZA won Record of the Year for “Luther”, bringing Kendrick to 27 career Grammys and past Jay-Z. Billie Eilish won Song of the Year for “Wildflower”, Olivia Dean was named Best New Artist and Lady Gaga took Best Pop Vocal Album.',
          'In his speech Bad Bunny celebrated Puerto Rico, and several artists used the stage to criticize U.S. immigration policy.',
        ],
      },
      es: {
        slug: 'grammy-2026-bad-bunny-album-del-ano-historia',
        headline: 'Grammy 2026: Bad Bunny hace historia con el primer Álbum del Año en español',
        summary: '“Debí Tirar Más Fotos” se llevó el premio mayor; Kendrick Lamar y SZA ganaron Grabación del Año y Olivia Dean fue la revelación.',
        body: [
          'Bad Bunny ganó Álbum del Año en los Grammy del 1 de febrero con “Debí Tirar Más Fotos”, el primer disco en español que se lleva la categoría principal.',
          'Kendrick Lamar y SZA ganaron Grabación del Año con “Luther”, y Kendrick llegó a 27 Grammy, superando a Jay-Z. Billie Eilish se llevó Canción del Año con “Wildflower”, Olivia Dean fue Mejor Artista Nuevo y Lady Gaga ganó Mejor Álbum Vocal Pop.',
          'En su discurso, Bad Bunny celebró a Puerto Rico, y varios artistas usaron el escenario para criticar la política migratoria de EE. UU.',
        ],
      },
    },
  ),
  art(
    '2025', 'music', '2026-02-10T15:00:00Z', 5,
    ['bad-bunny', 'kendrick-lamar'],
    [
      { name: 'Forbes', url: 'https://www.forbes.com/sites/maurybrown/2026/02/10/super-bowl-lx-viewership-second-highest-all-time-bad-bunny-has-1282m-viewers/' },
      { name: 'CNN Business', url: 'https://www.cnn.com/2026/02/10/media/super-bowl-lx-ratings-bad-bunny-nbc' },
    ],
    {
      pt: {
        slug: 'super-bowl-lx-bad-bunny-128-milhoes-audiencia',
        headline: 'Show de Bad Bunny no Super Bowl LX tem 128,2 milhões de espectadores nos EUA',
        summary: 'É a quarta maior audiência de um show do intervalo, atrás de Kendrick Lamar, Michael Jackson e Usher.',
        body: [
          'O show do intervalo de Bad Bunny no Super Bowl LX, em 8 de fevereiro, teve média de 128,2 milhões de espectadores nos Estados Unidos.',
          'A marca é a quarta maior da história, atrás de Kendrick Lamar (2025), Michael Jackson (1993) e Usher (2024). O jogo, vencido pelo Seattle Seahawks sobre o New England Patriots no Levi’s Stadium, foi o primeiro medido com a nova metodologia da Nielsen.',
        ],
      },
      en: {
        slug: 'super-bowl-lx-bad-bunny-128-million-viewers',
        headline: 'Bad Bunny’s Super Bowl LX halftime show draws 128.2 million U.S. viewers',
        summary: 'It ranks as the fourth-most-watched halftime show, behind Kendrick Lamar, Michael Jackson and Usher.',
        body: [
          'Bad Bunny’s Super Bowl LX halftime show on February 8 averaged 128.2 million U.S. viewers.',
          'That is the fourth-biggest halftime audience ever, behind Kendrick Lamar (2025), Michael Jackson (1993) and Usher (2024). The game, won by the Seattle Seahawks over the New England Patriots at Levi’s Stadium, was the first measured with Nielsen’s new methodology.',
        ],
      },
      es: {
        slug: 'super-bowl-lx-bad-bunny-128-millones-audiencia',
        headline: 'El show de Bad Bunny en el Super Bowl LX reúne 128,2 millones de espectadores en EE. UU.',
        summary: 'Es la cuarta mayor audiencia de un show de medio tiempo, detrás de Kendrick Lamar, Michael Jackson y Usher.',
        body: [
          'El show de medio tiempo de Bad Bunny en el Super Bowl LX, el 8 de febrero, promedió 128,2 millones de espectadores en Estados Unidos.',
          'Es la cuarta cifra más alta de la historia, detrás de Kendrick Lamar (2025), Michael Jackson (1993) y Usher (2024). El partido, ganado por los Seattle Seahawks ante los New England Patriots en el Levi’s Stadium, fue el primero medido con la nueva metodología de Nielsen.',
        ],
      },
    },
  ),
  art(
    '2026', 'movies-tv', '2026-03-16T04:00:00Z', 200,
    ['wagner-moura', 'michael-b-jordan'],
    [
      { name: 'Billboard Brasil', url: 'https://billboard.com.br/oscar-2026-lista-vencedores/' },
      { name: 'Omelete', url: 'https://www.omelete.com.br/oscar-2026/oscar-2026-indicados' },
    ],
    {
      pt: {
        slug: 'oscar-2026-uma-batalha-apos-a-outra-wagner-moura',
        headline: 'Oscar 2026: “Uma Batalha Após a Outra” vence Melhor Filme; Wagner Moura disputou Melhor Ator',
        summary: 'O filme de Paul Thomas Anderson levou seis estatuetas; “O Agente Secreto”, de Kleber Mendonça Filho, teve três indicações.',
        body: [
          'O Oscar 2026, em 15 de março, consagrou “Uma Batalha Após a Outra”, de Paul Thomas Anderson, com seis prêmios, entre eles Melhor Filme, Direção e Ator Coadjuvante para Sean Penn.',
          'Michael B. Jordan venceu Melhor Ator por “Pecadores”, Jessie Buckley levou Melhor Atriz por “Hamnet” e Amy Madigan ganhou como coadjuvante. “Valor Sentimental” foi o Melhor Filme Internacional.',
          'O Brasil esteve na disputa com “O Agente Secreto”, de Kleber Mendonça Filho, indicado a Melhor Filme e Filme Internacional, e com Wagner Moura concorrendo a Melhor Ator.',
        ],
      },
      en: {
        slug: 'oscars-2026-one-battle-after-another-wagner-moura',
        headline: 'Oscars 2026: “One Battle After Another” wins Best Picture; Wagner Moura was up for Best Actor',
        summary: 'Paul Thomas Anderson’s film took six awards; Kleber Mendonça Filho’s “The Secret Agent” earned three nominations.',
        body: [
          'The March 15 Oscars crowned Paul Thomas Anderson’s “One Battle After Another” with six awards, including Best Picture, Director and Supporting Actor for Sean Penn.',
          'Michael B. Jordan won Best Actor for “Sinners”, Jessie Buckley took Best Actress for “Hamnet” and Amy Madigan won Supporting Actress. “Sentimental Value” was Best International Feature.',
          'Brazil competed with Kleber Mendonça Filho’s “The Secret Agent”, nominated for Best Picture and International Feature, and Wagner Moura in the Best Actor race.',
        ],
      },
      es: {
        slug: 'oscar-2026-una-batalla-tras-otra-wagner-moura',
        headline: 'Óscar 2026: “Una batalla tras otra” gana Mejor Película; Wagner Moura compitió como Mejor Actor',
        summary: 'La película de Paul Thomas Anderson ganó seis estatuillas; “El agente secreto”, de Kleber Mendonça Filho, tuvo tres nominaciones.',
        body: [
          'El Óscar del 15 de marzo coronó a “Una batalla tras otra”, de Paul Thomas Anderson, con seis premios, entre ellos Mejor Película, Dirección y Actor de Reparto para Sean Penn.',
          'Michael B. Jordan ganó Mejor Actor por “Pecadores”, Jessie Buckley se llevó Mejor Actriz por “Hamnet” y Amy Madigan ganó como actriz de reparto. “Valor sentimental” fue Mejor Película Internacional.',
          'Brasil compitió con “El agente secreto”, de Kleber Mendonça Filho, nominada a Mejor Película y Película Internacional, y con Wagner Moura en la categoría de Mejor Actor.',
        ],
      },
    },
  ),
  art(
    '2027', 'movies-tv', '2026-04-22T03:00:00Z', 60,
    ['ana-paula-renault'],
    [{ name: 'CNN Brasil', url: 'https://www.cnnbrasil.com.br/pop/bbb/ana-paula-milena-e-juliano-quanto-cada-finalista-ganhou-no-bbb-26/' }],
    {
      pt: {
        slug: 'bbb-26-ana-paula-renault-campea-75-por-cento',
        headline: 'Ana Paula Renault vence o BBB 26 com 75,94% dos votos e leva o maior prêmio da história',
        summary: 'A campeã ganhou R$ 5,7 milhões; Milena Moreira e Juliano Floss completaram o pódio.',
        body: [
          'Ana Paula Renault é a campeã do BBB 26. Na final de 21 de abril, ela recebeu 75,94% dos votos e levou R$ 5,7 milhões, o maior prêmio já pago pelo reality.',
          'Milena Moreira ficou em segundo lugar e Juliano Floss em terceiro. Os três finalistas ganharam apartamentos, e a vencedora ainda levou um carro e R$ 50 mil de uma dinâmica do programa.',
        ],
      },
      en: {
        slug: 'bbb-26-ana-paula-renault-wins-75-percent',
        headline: 'Ana Paula Renault wins Big Brother Brasil 26 with 75.94% of the vote and a record prize',
        summary: 'She took home R$5.7 million; Milena Moreira and Juliano Floss rounded out the top three.',
        body: [
          'Ana Paula Renault won Big Brother Brasil 26. In the April 21 finale she received 75.94% of the vote and R$5.7 million, the largest prize in the show’s history.',
          'Milena Moreira finished second and Juliano Floss third. All three finalists won apartments, and the winner also took a car and R$50,000 from an in-game challenge.',
        ],
      },
      es: {
        slug: 'bbb-26-ana-paula-renault-campeona-75-por-ciento',
        headline: 'Ana Paula Renault gana el BBB 26 con el 75,94% de los votos y el mayor premio de la historia',
        summary: 'La ganadora se llevó R$ 5,7 millones; Milena Moreira y Juliano Floss completaron el podio.',
        body: [
          'Ana Paula Renault es la campeona de Big Brother Brasil 26. En la final del 21 de abril obtuvo el 75,94% de los votos y R$ 5,7 millones, el mayor premio del reality.',
          'Milena Moreira quedó segunda y Juliano Floss tercero. Los tres finalistas ganaron apartamentos, y la campeona además se llevó un auto y R$ 50 mil de una dinámica del programa.',
        ],
      },
    },
  ),

  /* ─── Fofoca e música pop ──────────────────────────────── */
  art(
    '2028', 'gossip', '2026-07-04T18:00:00Z', 320,
    ['taylor-swift', 'travis-kelce'],
    [
      { name: 'Good Morning America', url: 'https://www.goodmorningamerica.com/culture/story/taylor-swift-travis-kelces-2nd-wedding-event-expected-134426168' },
      { name: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Wedding_of_Taylor_Swift_and_Travis_Kelce' },
    ],
    {
      pt: {
        slug: 'taylor-swift-travis-kelce-casamento-nova-york-adam-sandler',
        headline: 'Taylor Swift e Travis Kelce se casam em Nova York com Adam Sandler celebrando a cerimônia',
        summary: 'O casamento foi confirmado pela equipe da cantora; a festa teve cerca de mil convidados e regra de celular proibido.',
        body: [
          'Taylor Swift e Travis Kelce se casaram em Nova York, numa celebração de dois dias em 3 e 4 de julho. Uma representante da cantora confirmou o casamento à ABC News.',
          'O ator Adam Sandler celebrou a cerimônia. O irmão de Taylor, Austin, e o de Travis, Jason, foram os únicos padrinhos. Os noivos usaram Dior, e o vestido dela foi assinado por Jonathan Anderson.',
          'Entre os cerca de mil convidados estavam Hugh Grant, Ethan Hawke, Jason Sudeikis e Benson Boone. Celulares foram proibidos para convidados e equipe. O noivado havia sido anunciado em agosto de 2025.',
        ],
      },
      en: {
        slug: 'taylor-swift-travis-kelce-wedding-new-york-adam-sandler',
        headline: 'Taylor Swift and Travis Kelce marry in New York, with Adam Sandler officiating',
        summary: 'Her team confirmed the wedding; the two-day celebration had around 1,000 guests and a strict no-phone rule.',
        body: [
          'Taylor Swift and Travis Kelce married in New York during a two-day celebration on July 3 and 4. A representative for Swift confirmed the wedding to ABC News.',
          'Adam Sandler officiated. Swift’s brother Austin and Kelce’s brother Jason were the only members of the wedding party. Both wore Dior, with her gown designed by Jonathan Anderson.',
          'The roughly 1,000 guests included Hugh Grant, Ethan Hawke, Jason Sudeikis and Benson Boone, and phones were banned for guests and staff. The couple announced their engagement in August 2025.',
        ],
      },
      es: {
        slug: 'taylor-swift-travis-kelce-boda-nueva-york-adam-sandler',
        headline: 'Taylor Swift y Travis Kelce se casan en Nueva York con Adam Sandler como oficiante',
        summary: 'Su equipo confirmó la boda; la celebración de dos días tuvo cerca de mil invitados y celulares prohibidos.',
        body: [
          'Taylor Swift y Travis Kelce se casaron en Nueva York en una celebración de dos días, el 3 y 4 de julio. Una representante de la cantante lo confirmó a ABC News.',
          'Adam Sandler ofició la ceremonia. Austin, hermano de Taylor, y Jason, hermano de Travis, fueron los únicos padrinos. Ambos vistieron Dior, y el vestido de ella fue diseñado por Jonathan Anderson.',
          'Entre los cerca de mil invitados estuvieron Hugh Grant, Ethan Hawke, Jason Sudeikis y Benson Boone, y se prohibieron los celulares. El compromiso se había anunciado en agosto de 2025.',
        ],
      },
    },
  ),
  art(
    '2029', 'music', '2026-03-29T13:00:00Z', 275,
    ['bts'],
    [
      { name: 'Wikipedia — Arirang', url: 'https://en.wikipedia.org/wiki/Arirang_(album)' },
      { name: 'Rolling Stone', url: 'https://www.rollingstone.com/music/music-news/bts-arirang-first-week-sales-record-1235538129/' },
    ],
    {
      pt: {
        slug: 'bts-arirang-recordes-primeira-semana-swim',
        headline: 'BTS volta com “Arirang” e quebra recordes: 1º na Billboard 200 e “Swim” no topo da Hot 100',
        summary: 'O álbum da volta do grupo vendeu 641 mil unidades nos EUA na estreia e 4,2 milhões de cópias na Coreia.',
        body: [
          'O BTS lançou “Arirang” em 20 de março, primeiro álbum do grupo completo após o serviço militar. O disco estreou em 1º na Billboard 200 com 641 mil unidades nos EUA, a maior semana de um grupo desde 2014, e vendeu 4,2 milhões de cópias na Coreia do Sul.',
          'O single “Swim” estreou no topo da Hot 100, e as 14 faixas ocuparam as 14 primeiras posições do ranking global do Spotify. O álbum abriu a “Arirang World Tour”, com 85 datas até março de 2027 — incluindo três shows em São Paulo.',
        ],
      },
      en: {
        slug: 'bts-arirang-first-week-records-swim',
        headline: 'BTS return with “Arirang” and break records: No. 1 on the Billboard 200 and “Swim” tops the Hot 100',
        summary: 'The comeback album moved 641,000 U.S. units in week one and 4.2 million copies in Korea.',
        body: [
          'BTS released “Arirang” on March 20, the group’s first album as a full lineup since military service. It debuted at No. 1 on the Billboard 200 with 641,000 U.S. units, the biggest week for a group since 2014, and sold 4.2 million copies in South Korea.',
          'Lead single “Swim” debuted at No. 1 on the Hot 100, and all 14 tracks filled the top 14 of Spotify’s global chart. The album launched the Arirang World Tour, 85 dates through March 2027 — including three shows in São Paulo.',
        ],
      },
      es: {
        slug: 'bts-arirang-records-primera-semana-swim',
        headline: 'BTS vuelve con “Arirang” y rompe récords: #1 en el Billboard 200 y “Swim” en la cima del Hot 100',
        summary: 'El álbum del regreso vendió 641 mil unidades en EE. UU. en su debut y 4,2 millones de copias en Corea.',
        body: [
          'BTS lanzó “Arirang” el 20 de marzo, su primer álbum con el grupo completo tras el servicio militar. Debutó en el #1 del Billboard 200 con 641 mil unidades en EE. UU., la mayor semana de un grupo desde 2014, y vendió 4,2 millones de copias en Corea del Sur.',
          'El sencillo “Swim” debutó en el #1 del Hot 100, y las 14 canciones ocuparon los 14 primeros puestos de la lista global de Spotify. El álbum abrió la Arirang World Tour, con 85 fechas hasta marzo de 2027, incluidas tres en São Paulo.',
        ],
      },
    },
  ),
  art(
    '2030', 'music', '2026-07-24T12:00:00Z', 40,
    ['anitta'],
    [{ name: 'Billboard Brasil', url: 'https://billboard.com.br/anitta-novo-album-tudo-sobre/' }],
    {
      pt: {
        slug: 'anitta-equilibrivm-ii-maria-bethania-alceu-valenca',
        headline: 'Anitta lança “EQUILIBRIVM II”, com Maria Bethânia, Alceu Valença e tambores de candomblé',
        summary: 'O nono álbum da cantora fala de amor, espiritualidade e ancestralidade e chega com um filme musical.',
        body: [
          'Anitta lançou em 23 de julho “EQUILIBRIVM II”, continuação do projeto iniciado em abril e nono álbum da carreira. São 19 faixas que misturam tambores de candomblé com funk, reggae e forró.',
          'O disco tem participações de Maria Bethânia, Alceu Valença, Mart’nália, MC Tha e Mestrinho, entre outros, e uma versão em espanhol de “Azul”, de Djavan. A cantora disse que se colocou inteira no trabalho, cheio de espiritualidade e da sua visão de mundo.',
          'O lançamento veio acompanhado de um curta musical disponível no Globoplay e no YouTube.',
        ],
      },
      en: {
        slug: 'anitta-equilibrivm-ii-maria-bethania-alceu-valenca',
        headline: 'Anitta releases “EQUILIBRIVM II” with Maria Bethânia, Alceu Valença and candomblé drums',
        summary: 'Her ninth album explores love, spirituality and ancestry and arrives with a musical short film.',
        body: [
          'Anitta released “EQUILIBRIVM II” on July 23, the continuation of the project she began in April and her ninth album. Its 19 tracks blend candomblé drums with funk, reggae and forró.',
          'Guests include Maria Bethânia, Alceu Valença, Mart’nália, MC Tha and Mestrinho, among others, plus a Spanish-language cover of Djavan’s “Azul”. She said she put all of herself into the record, which carries her spirituality and worldview.',
          'It comes with a musical short film on Globoplay and YouTube.',
        ],
      },
      es: {
        slug: 'anitta-equilibrivm-ii-maria-bethania-alceu-valenca',
        headline: 'Anitta lanza “EQUILIBRIVM II”, con Maria Bethânia, Alceu Valença y tambores de candomblé',
        summary: 'Su noveno álbum habla de amor, espiritualidad y ancestralidad, y llega con un cortometraje musical.',
        body: [
          'Anitta lanzó el 23 de julio “EQUILIBRIVM II”, continuación del proyecto iniciado en abril y noveno álbum de su carrera. Son 19 canciones que mezclan tambores de candomblé con funk, reggae y forró.',
          'Cuenta con Maria Bethânia, Alceu Valença, Mart’nália, MC Tha y Mestrinho, entre otros, además de una versión en español de “Azul”, de Djavan. La cantante dijo que se entregó por completo en este trabajo, lleno de espiritualidad y de su visión del mundo.',
          'El lanzamiento llegó con un cortometraje musical disponible en Globoplay y YouTube.',
        ],
      },
    },
  ),
];

/** Curadoria editorial: os assuntos que marcaram 2026 (usado no módulo da home). */
export const yearTopIds = ['2024', '2025', '2029', '2028', '2020', '2013', '2014', '2026', '2017', '2027'];
