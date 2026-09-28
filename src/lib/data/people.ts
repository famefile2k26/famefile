/**
 * Perfis reais (enciclopédicos). Só fatos estáveis e verificáveis: identidade, carreira, obras.
 * Métricas (Fame Score, seguidores, crescimento) ficam vazias até existirem providers com fonte.
 * Fotos: preenchidas pelo admin (campo `image`).
 */
import type { Person } from './types';

type Entry = Omit<Person, 'id' | 'hue' | 'aliases' | 'socials'> &
  Partial<Pick<Person, 'aliases' | 'socials'>>;

const ig = (handle: string) => ({ instagram: { handle } });

const entries: Entry[] = [
  /* ─── GLOBAL ─────────────────────────────────────────────── */
  {
    slug: 'taylor-swift', publicName: 'Taylor Swift', market: 'global', kinds: ['singer'], country: 'US',
    legalName: 'Taylor Alison Swift', birthDate: '1989-12-13', birthPlace: 'West Reading, Pensilvânia', activeSince: 2004,
    genres: ['Pop', 'Country', 'Folk'], socials: ig('taylorswift'),
    works: [
      { title: 'Fearless', year: 2008, kind: 'album' },
      { title: '1989', year: 2014, kind: 'album' },
      { title: 'Folklore', year: 2020, kind: 'album' },
      { title: 'Midnights', year: 2022, kind: 'album' },
      { title: 'The Eras Tour', year: 2023, kind: 'tour' },
      { title: 'The Tortured Poets Department', year: 2024, kind: 'album' },
    ],
    t: {
      pt: {
        role: 'Cantora e compositora',
        bio: 'Cantora e compositora americana que começou no country e se tornou um dos maiores nomes do pop mundial. É conhecida pelas letras autobiográficas e por regravar os próprios álbuns nas “Taylor’s Versions”.',
        highlights: ['The Eras Tour (2023–2024) se tornou a turnê de maior bilheteria da história.', 'É a recordista de vitórias em Álbum do Ano no Grammy, com quatro prêmios.', 'Recomprou em 2025 os masters dos seus seis primeiros álbuns.'],
      },
      en: {
        role: 'Singer-songwriter',
        bio: 'American singer-songwriter who started in country and became one of the biggest names in global pop. She is known for autobiographical lyrics and for re-recording her own albums as “Taylor’s Versions”.',
        highlights: ['The Eras Tour (2023–2024) became the highest-grossing tour of all time.', 'She holds the record for most Album of the Year wins at the Grammys, with four.', 'In 2025 she bought back the masters of her first six albums.'],
      },
      es: {
        role: 'Cantautora',
        bio: 'Cantautora estadounidense que empezó en el country y se convirtió en uno de los mayores nombres del pop mundial. Es conocida por sus letras autobiográficas y por regrabar sus propios álbumes como “Taylor’s Versions”.',
        highlights: ['The Eras Tour (2023–2024) se convirtió en la gira más taquillera de la historia.', 'Tiene el récord de premios a Álbum del Año en los Grammy, con cuatro.', 'En 2025 recompró los masters de sus seis primeros álbumes.'],
      },
    },
  },
  {
    slug: 'beyonce', publicName: 'Beyoncé', market: 'global', kinds: ['singer'], country: 'US', aliases: ['Beyonce', 'Queen B'],
    legalName: 'Beyoncé Giselle Knowles-Carter', birthDate: '1981-09-04', birthPlace: 'Houston, Texas', activeSince: 1990,
    genres: ['R&B', 'Pop', 'Hip-hop', 'Country'], socials: ig('beyonce'),
    works: [
      { title: 'Dangerously in Love', year: 2003, kind: 'album' },
      { title: 'Lemonade', year: 2016, kind: 'album' },
      { title: 'Renaissance', year: 2022, kind: 'album' },
      { title: 'Renaissance World Tour', year: 2023, kind: 'tour' },
      { title: 'Cowboy Carter', year: 2024, kind: 'album' },
    ],
    t: {
      pt: {
        role: 'Cantora, compositora e empresária',
        bio: 'Cantora americana que ficou famosa no Destiny’s Child antes de seguir carreira solo. É uma das artistas mais influentes do pop e do R&B.',
        highlights: ['É a artista com mais vitórias na história do Grammy.', 'Venceu Álbum do Ano no Grammy 2025 com “Cowboy Carter”.', '“Lemonade” (2016) foi lançado junto com um filme visual.'],
      },
      en: {
        role: 'Singer, songwriter and businesswoman',
        bio: 'American singer who rose to fame with Destiny’s Child before going solo. She is one of the most influential artists in pop and R&B.',
        highlights: ['She is the most awarded artist in Grammy history.', 'She won Album of the Year at the 2025 Grammys with “Cowboy Carter”.', '“Lemonade” (2016) was released alongside a visual film.'],
      },
      es: {
        role: 'Cantante, compositora y empresaria',
        bio: 'Cantante estadounidense que saltó a la fama con Destiny’s Child antes de su carrera solista. Es una de las artistas más influyentes del pop y el R&B.',
        highlights: ['Es la artista con más premios en la historia de los Grammy.', 'Ganó Álbum del Año en los Grammy 2025 con “Cowboy Carter”.', '“Lemonade” (2016) se lanzó junto con una película visual.'],
      },
    },
  },
  {
    slug: 'rihanna', publicName: 'Rihanna', market: 'global', kinds: ['singer'], country: 'BB',
    legalName: 'Robyn Rihanna Fenty', birthDate: '1988-02-20', birthPlace: 'Saint Michael, Barbados', activeSince: 2005,
    genres: ['Pop', 'R&B', 'Dancehall'], socials: ig('badgalriri'),
    works: [
      { title: 'Good Girl Gone Bad', year: 2007, kind: 'album' },
      { title: 'Loud', year: 2010, kind: 'album' },
      { title: 'Anti', year: 2016, kind: 'album' },
      { title: 'Fenty Beauty', year: 2017, kind: 'project' },
    ],
    t: {
      pt: {
        role: 'Cantora e empresária',
        bio: 'Cantora e empresária de Barbados, dona de uma das sequências de hits mais fortes do pop dos anos 2000 e 2010. Fundou a Fenty Beauty, marca que mudou o padrão de inclusão na indústria da beleza.',
        highlights: ['“Umbrella” (2007) lhe deu projeção mundial.', 'Criou a Fenty Beauty (2017) e a Savage X Fenty (2018).', 'Fez o show do intervalo do Super Bowl LVII, em 2023.'],
      },
      en: {
        role: 'Singer and entrepreneur',
        bio: 'Barbadian singer and entrepreneur behind one of the strongest hit runs in 2000s and 2010s pop. She founded Fenty Beauty, a brand that reset the standard for inclusion in the beauty industry.',
        highlights: ['“Umbrella” (2007) made her a global star.', 'She founded Fenty Beauty (2017) and Savage X Fenty (2018).', 'She headlined the Super Bowl LVII halftime show in 2023.'],
      },
      es: {
        role: 'Cantante y empresaria',
        bio: 'Cantante y empresaria de Barbados, con una de las rachas de éxitos más fuertes del pop de los 2000 y 2010. Fundó Fenty Beauty, una marca que cambió el estándar de inclusión en la industria de la belleza.',
        highlights: ['“Umbrella” (2007) la convirtió en estrella mundial.', 'Creó Fenty Beauty (2017) y Savage X Fenty (2018).', 'Protagonizó el show de medio tiempo del Super Bowl LVII en 2023.'],
      },
    },
  },
  {
    slug: 'justin-bieber', publicName: 'Justin Bieber', market: 'global', kinds: ['singer'], country: 'CA',
    legalName: 'Justin Drew Bieber', birthDate: '1994-03-01', birthPlace: 'London, Ontário', activeSince: 2008,
    genres: ['Pop', 'R&B'], socials: ig('justinbieber'),
    works: [
      { title: 'My World 2.0', year: 2010, kind: 'album' },
      { title: 'Purpose', year: 2015, kind: 'album' },
      { title: 'Justice', year: 2021, kind: 'album' },
      { title: 'Swag', year: 2025, kind: 'album' },
    ],
    t: {
      pt: {
        role: 'Cantor',
        bio: 'Cantor canadense descoberto no YouTube ainda adolescente, que virou um fenômeno global do pop. Nos trabalhos mais recentes aproximou o som do R&B.',
        highlights: ['“Baby” (2010) foi um dos primeiros clipes a virar fenômeno no YouTube.', '“Purpose” (2015) emplacou “Sorry”, “Love Yourself” e “What Do You Mean?”.', 'Lançou de surpresa o álbum “Swag” em 2025.'],
      },
      en: {
        role: 'Singer',
        bio: 'Canadian singer discovered on YouTube as a teenager who became a global pop phenomenon. His recent work leans toward R&B.',
        highlights: ['“Baby” (2010) was one of the first music videos to become a YouTube phenomenon.', '“Purpose” (2015) delivered “Sorry”, “Love Yourself” and “What Do You Mean?”.', 'He surprise-released the album “Swag” in 2025.'],
      },
      es: {
        role: 'Cantante',
        bio: 'Cantante canadiense descubierto en YouTube cuando era adolescente, que se convirtió en un fenómeno global del pop. Sus trabajos recientes se acercan al R&B.',
        highlights: ['“Baby” (2010) fue uno de los primeros videos en volverse fenómeno en YouTube.', '“Purpose” (2015) trajo “Sorry”, “Love Yourself” y “What Do You Mean?”.', 'Lanzó por sorpresa el álbum “Swag” en 2025.'],
      },
    },
  },
  {
    slug: 'ariana-grande', publicName: 'Ariana Grande', market: 'global', kinds: ['singer', 'actor'], country: 'US',
    legalName: 'Ariana Grande-Butera', birthDate: '1993-06-26', birthPlace: 'Boca Raton, Flórida', activeSince: 2008,
    genres: ['Pop', 'R&B'], socials: ig('arianagrande'),
    works: [
      { title: 'My Everything', year: 2014, kind: 'album' },
      { title: 'Sweetener', year: 2018, kind: 'album' },
      { title: 'Thank U, Next', year: 2019, kind: 'album' },
      { title: 'Eternal Sunshine', year: 2024, kind: 'album' },
      { title: 'Wicked', year: 2024, kind: 'film' },
    ],
    t: {
      pt: {
        role: 'Cantora e atriz',
        bio: 'Cantora e atriz americana conhecida pelo alcance vocal e por hits como “Thank U, Next” e “7 Rings”. Começou na TV, na série “Victorious”, e voltou às telas como Glinda em “Wicked”.',
        highlights: ['Indicada ao Oscar de Melhor Atriz Coadjuvante por “Wicked” (2024).', 'Venceu o Grammy de Melhor Álbum Pop Vocal com “Sweetener”.', '“Thank U, Next” (2019) quebrou recordes de streaming no lançamento.'],
      },
      en: {
        role: 'Singer and actress',
        bio: 'American singer and actress known for her vocal range and hits like “Thank U, Next” and “7 Rings”. She started on TV in “Victorious” and returned to the screen as Glinda in “Wicked”.',
        highlights: ['Nominated for the Oscar for Best Supporting Actress for “Wicked” (2024).', 'Won the Grammy for Best Pop Vocal Album with “Sweetener”.', '“Thank U, Next” (2019) broke streaming records on release.'],
      },
      es: {
        role: 'Cantante y actriz',
        bio: 'Cantante y actriz estadounidense conocida por su rango vocal y por éxitos como “Thank U, Next” y “7 Rings”. Empezó en la TV con “Victorious” y volvió a la pantalla como Glinda en “Wicked”.',
        highlights: ['Nominada al Óscar a Mejor Actriz de Reparto por “Wicked” (2024).', 'Ganó el Grammy a Mejor Álbum Vocal Pop con “Sweetener”.', '“Thank U, Next” (2019) rompió récords de streaming en su estreno.'],
      },
    },
  },
  {
    slug: 'billie-eilish', publicName: 'Billie Eilish', market: 'global', kinds: ['singer'], country: 'US',
    legalName: "Billie Eilish Pirate Baird O'Connell", birthDate: '2001-12-18', birthPlace: 'Los Angeles, Califórnia', activeSince: 2015,
    genres: ['Pop', 'Alternativo'], socials: ig('billieeilish'),
    works: [
      { title: 'When We All Fall Asleep, Where Do We Go?', year: 2019, kind: 'album' },
      { title: 'Happier Than Ever', year: 2021, kind: 'album' },
      { title: 'Hit Me Hard and Soft', year: 2024, kind: 'album' },
    ],
    t: {
      pt: {
        role: 'Cantora e compositora',
        bio: 'Cantora e compositora americana que estourou com “Ocean Eyes” e produz as músicas com o irmão, Finneas. Marcou uma geração com um pop sombrio e intimista.',
        highlights: ['Venceu os quatro principais Grammys na mesma noite, em 2020.', 'Tem dois Oscars de Melhor Canção Original: “No Time to Die” e “What Was I Made For?”.', '“Birds of a Feather” (2024) virou um dos maiores hits de sua carreira.'],
      },
      en: {
        role: 'Singer-songwriter',
        bio: 'American singer-songwriter who broke through with “Ocean Eyes” and makes her music with her brother, Finneas. Her dark, intimate pop defined a generation.',
        highlights: ['She won all four major Grammys in a single night in 2020.', 'She has two Oscars for Best Original Song: “No Time to Die” and “What Was I Made For?”.', '“Birds of a Feather” (2024) became one of the biggest hits of her career.'],
      },
      es: {
        role: 'Cantautora',
        bio: 'Cantautora estadounidense que despegó con “Ocean Eyes” y hace su música con su hermano, Finneas. Su pop oscuro e íntimo marcó a una generación.',
        highlights: ['Ganó los cuatro Grammy principales en una misma noche, en 2020.', 'Tiene dos Óscar a Mejor Canción Original: “No Time to Die” y “What Was I Made For?”.', '“Birds of a Feather” (2024) se volvió uno de los mayores éxitos de su carrera.'],
      },
    },
  },
  {
    slug: 'the-weeknd', publicName: 'The Weeknd', market: 'global', kinds: ['singer'], country: 'CA', aliases: ['Abel Tesfaye'],
    legalName: 'Abel Makkonen Tesfaye', birthDate: '1990-02-16', birthPlace: 'Toronto, Ontário', activeSince: 2009,
    genres: ['R&B', 'Pop', 'Synth-pop'], socials: ig('theweeknd'),
    works: [
      { title: 'Beauty Behind the Madness', year: 2015, kind: 'album' },
      { title: 'After Hours', year: 2020, kind: 'album' },
      { title: 'Dawn FM', year: 2022, kind: 'album' },
      { title: 'Hurry Up Tomorrow', year: 2025, kind: 'album' },
    ],
    t: {
      pt: {
        role: 'Cantor e produtor',
        bio: 'Cantor e produtor canadense que saiu das mixtapes anônimas para o topo do pop, misturando R&B sombrio com sintetizadores dos anos 80.',
        highlights: ['“Blinding Lights” é uma das músicas mais tocadas da história do Spotify.', 'Fez o show do intervalo do Super Bowl LV, em 2021.', 'Fechou com “Hurry Up Tomorrow” (2025) a trilogia iniciada em “After Hours”.'],
      },
      en: {
        role: 'Singer and producer',
        bio: 'Canadian singer and producer who went from anonymous mixtapes to the top of pop, blending dark R&B with ’80s synths.',
        highlights: ['“Blinding Lights” is one of the most-streamed songs in Spotify history.', 'He headlined the Super Bowl LV halftime show in 2021.', '“Hurry Up Tomorrow” (2025) closed the trilogy that began with “After Hours”.'],
      },
      es: {
        role: 'Cantante y productor',
        bio: 'Cantante y productor canadiense que pasó de mixtapes anónimos a la cima del pop, mezclando R&B oscuro con sintetizadores ochenteros.',
        highlights: ['“Blinding Lights” es una de las canciones más escuchadas en la historia de Spotify.', 'Protagonizó el show de medio tiempo del Super Bowl LV en 2021.', '“Hurry Up Tomorrow” (2025) cerró la trilogía iniciada con “After Hours”.'],
      },
    },
  },
  {
    slug: 'drake', publicName: 'Drake', market: 'global', kinds: ['singer'], country: 'CA', aliases: ['Aubrey Graham'],
    legalName: 'Aubrey Drake Graham', birthDate: '1986-10-24', birthPlace: 'Toronto, Ontário', activeSince: 2001,
    genres: ['Hip-hop', 'R&B'], socials: ig('champagnepapi'),
    works: [
      { title: 'Take Care', year: 2011, kind: 'album' },
      { title: 'Nothing Was the Same', year: 2013, kind: 'album' },
      { title: 'Views', year: 2016, kind: 'album' },
      { title: 'Scorpion', year: 2018, kind: 'album' },
    ],
    t: {
      pt: {
        role: 'Rapper e cantor',
        bio: 'Rapper, cantor e empresário canadense que começou como ator na série “Degrassi”. É um dos artistas mais ouvidos da era do streaming.',
        highlights: ['“Take Care” venceu o Grammy de Melhor Álbum de Rap.', '“One Dance” e “God’s Plan” estão entre os maiores hits de streaming da sua geração.', 'Fundou o selo e a marca OVO.'],
      },
      en: {
        role: 'Rapper and singer',
        bio: 'Canadian rapper, singer and entrepreneur who started as an actor on “Degrassi”. He is one of the most-streamed artists of the streaming era.',
        highlights: ['“Take Care” won the Grammy for Best Rap Album.', '“One Dance” and “God’s Plan” are among the biggest streaming hits of his generation.', 'He founded the OVO label and brand.'],
      },
      es: {
        role: 'Rapero y cantante',
        bio: 'Rapero, cantante y empresario canadiense que empezó como actor en la serie “Degrassi”. Es uno de los artistas más escuchados de la era del streaming.',
        highlights: ['“Take Care” ganó el Grammy a Mejor Álbum de Rap.', '“One Dance” y “God’s Plan” están entre los mayores éxitos de streaming de su generación.', 'Fundó el sello y la marca OVO.'],
      },
    },
  },
  {
    slug: 'dua-lipa', publicName: 'Dua Lipa', market: 'global', kinds: ['singer'], country: 'GB',
    birthDate: '1995-08-22', birthPlace: 'Londres, Inglaterra', activeSince: 2014,
    genres: ['Pop', 'Dance'], socials: ig('dualipa'),
    works: [
      { title: 'Dua Lipa', year: 2017, kind: 'album' },
      { title: 'Future Nostalgia', year: 2020, kind: 'album' },
      { title: 'Dance the Night', year: 2023, kind: 'single' },
      { title: 'Radical Optimism', year: 2024, kind: 'album' },
    ],
    t: {
      pt: {
        role: 'Cantora e compositora',
        bio: 'Cantora britânica de família kosovar-albanesa, referência do pop dançante desde “Future Nostalgia”. Também apresenta o podcast “At Your Service”.',
        highlights: ['“Future Nostalgia” venceu o Grammy de Melhor Álbum Pop Vocal.', '“Levitating” foi uma das músicas mais tocadas de 2021.', 'Gravou “Dance the Night” para a trilha de “Barbie” (2023).'],
      },
      en: {
        role: 'Singer-songwriter',
        bio: 'British singer of Kosovo-Albanian descent and a reference for dance-pop since “Future Nostalgia”. She also hosts the podcast “At Your Service”.',
        highlights: ['“Future Nostalgia” won the Grammy for Best Pop Vocal Album.', '“Levitating” was one of the most-played songs of 2021.', 'She recorded “Dance the Night” for the “Barbie” soundtrack (2023).'],
      },
      es: {
        role: 'Cantautora',
        bio: 'Cantante británica de familia kosovar-albanesa, referente del pop bailable desde “Future Nostalgia”. También conduce el podcast “At Your Service”.',
        highlights: ['“Future Nostalgia” ganó el Grammy a Mejor Álbum Vocal Pop.', '“Levitating” fue una de las canciones más sonadas de 2021.', 'Grabó “Dance the Night” para la banda sonora de “Barbie” (2023).'],
      },
    },
  },
  {
    slug: 'sabrina-carpenter', publicName: 'Sabrina Carpenter', market: 'global', kinds: ['singer', 'actor'], country: 'US',
    legalName: 'Sabrina Annlynn Carpenter', birthDate: '1999-05-11', birthPlace: 'Quakertown, Pensilvânia', activeSince: 2011,
    genres: ['Pop'], socials: ig('sabrinacarpenter'),
    works: [
      { title: "Emails I Can't Send", year: 2022, kind: 'album' },
      { title: 'Espresso', year: 2024, kind: 'single' },
      { title: "Short n' Sweet", year: 2024, kind: 'album' },
      { title: "Man's Best Friend", year: 2025, kind: 'album' },
    ],
    t: {
      pt: {
        role: 'Cantora e atriz',
        bio: 'Cantora e atriz americana que começou na Disney, na série “Girl Meets World”, e virou estrela pop global com “Espresso” e “Please Please Please”.',
        highlights: ['“Short n’ Sweet” venceu o Grammy de Melhor Álbum Pop Vocal em 2025.', '“Espresso” foi um dos maiores hits de 2024.', 'Lançou “Man’s Best Friend” em 2025.'],
      },
      en: {
        role: 'Singer and actress',
        bio: 'American singer and actress who started at Disney on “Girl Meets World” and became a global pop star with “Espresso” and “Please Please Please”.',
        highlights: ['“Short n’ Sweet” won the Grammy for Best Pop Vocal Album in 2025.', '“Espresso” was one of the biggest hits of 2024.', 'She released “Man’s Best Friend” in 2025.'],
      },
      es: {
        role: 'Cantante y actriz',
        bio: 'Cantante y actriz estadounidense que empezó en Disney con “Girl Meets World” y se volvió estrella pop global con “Espresso” y “Please Please Please”.',
        highlights: ['“Short n’ Sweet” ganó el Grammy a Mejor Álbum Vocal Pop en 2025.', '“Espresso” fue uno de los mayores éxitos de 2024.', 'Lanzó “Man’s Best Friend” en 2025.'],
      },
    },
  },

  /* ─── LATINO ─────────────────────────────────────────────── */
  {
    slug: 'bad-bunny', publicName: 'Bad Bunny', market: 'latin', kinds: ['singer'], country: 'PR', aliases: ['Benito'],
    legalName: 'Benito Antonio Martínez Ocasio', birthDate: '1994-03-10', birthPlace: 'Bayamón, Porto Rico', activeSince: 2013,
    genres: ['Reggaeton', 'Trap latino'], socials: ig('badbunnypr'),
    works: [
      { title: 'YHLQMDLG', year: 2020, kind: 'album' },
      { title: 'Un Verano Sin Ti', year: 2022, kind: 'album' },
      { title: 'Nadie Sabe Lo Que Va a Pasar Mañana', year: 2023, kind: 'album' },
      { title: 'Debí Tirar Más Fotos', year: 2025, kind: 'album' },
    ],
    t: {
      pt: {
        role: 'Rapper e cantor',
        bio: 'Rapper e cantor porto-riquenho que levou a música em espanhol ao topo das paradas mundiais sem abrir mão do idioma nem das raízes caribenhas.',
        highlights: ['Foi o artista mais ouvido do mundo no Spotify em 2020, 2021 e 2022.', '“Un Verano Sin Ti” foi o primeiro álbum todo em espanhol indicado a Álbum do Ano no Grammy.', 'Foi a atração do show do intervalo do Super Bowl LX, em 2026.'],
      },
      en: {
        role: 'Rapper and singer',
        bio: 'Puerto Rican rapper and singer who took Spanish-language music to the top of the global charts without giving up his language or Caribbean roots.',
        highlights: ['He was Spotify’s most-streamed artist worldwide in 2020, 2021 and 2022.', '“Un Verano Sin Ti” was the first all-Spanish album nominated for Album of the Year at the Grammys.', 'He headlined the Super Bowl LX halftime show in 2026.'],
      },
      es: {
        role: 'Rapero y cantante',
        bio: 'Rapero y cantante puertorriqueño que llevó la música en español a la cima de las listas mundiales sin renunciar a su idioma ni a sus raíces caribeñas.',
        highlights: ['Fue el artista más escuchado del mundo en Spotify en 2020, 2021 y 2022.', '“Un Verano Sin Ti” fue el primer álbum totalmente en español nominado a Álbum del Año en los Grammy.', 'Protagonizó el show de medio tiempo del Super Bowl LX en 2026.'],
      },
    },
  },
  {
    slug: 'shakira', publicName: 'Shakira', market: 'latin', kinds: ['singer'], country: 'CO',
    legalName: 'Shakira Isabel Mebarak Ripoll', birthDate: '1977-02-02', birthPlace: 'Barranquilla, Colômbia', activeSince: 1990,
    genres: ['Pop latino', 'Rock', 'Dance'], socials: ig('shakira'),
    works: [
      { title: 'Pies Descalzos', year: 1995, kind: 'album' },
      { title: 'Laundry Service', year: 2001, kind: 'album' },
      { title: 'Waka Waka', year: 2010, kind: 'single' },
      { title: 'Las Mujeres Ya No Lloran', year: 2024, kind: 'album' },
    ],
    t: {
      pt: {
        role: 'Cantora e compositora',
        bio: 'Cantora e compositora colombiana, pioneira do crossover latino no pop mundial, de “Hips Don’t Lie” a “Waka Waka”.',
        highlights: ['“Waka Waka” foi o hino da Copa do Mundo de 2010.', 'Dividiu o show do intervalo do Super Bowl LIV (2020) com Jennifer Lopez.', '“Las Mujeres Ya No Lloran” venceu o Grammy de Melhor Álbum Pop Latino.'],
      },
      en: {
        role: 'Singer-songwriter',
        bio: 'Colombian singer-songwriter and a pioneer of the Latin crossover into global pop, from “Hips Don’t Lie” to “Waka Waka”.',
        highlights: ['“Waka Waka” was the anthem of the 2010 World Cup.', 'She co-headlined the Super Bowl LIV halftime show (2020) with Jennifer Lopez.', '“Las Mujeres Ya No Lloran” won the Grammy for Best Latin Pop Album.'],
      },
      es: {
        role: 'Cantautora',
        bio: 'Cantautora colombiana, pionera del crossover latino en el pop mundial, de “Hips Don’t Lie” a “Waka Waka”.',
        highlights: ['“Waka Waka” fue el himno del Mundial de 2010.', 'Compartió el show de medio tiempo del Super Bowl LIV (2020) con Jennifer Lopez.', '“Las Mujeres Ya No Lloran” ganó el Grammy a Mejor Álbum de Pop Latino.'],
      },
    },
  },
  {
    slug: 'karol-g', publicName: 'Karol G', market: 'latin', kinds: ['singer'], country: 'CO', aliases: ['La Bichota'],
    legalName: 'Carolina Giraldo Navarro', birthDate: '1991-02-14', birthPlace: 'Medellín, Colômbia', activeSince: 2006,
    genres: ['Reggaeton', 'Pop latino'], socials: ig('karolg'),
    works: [
      { title: 'KG0516', year: 2021, kind: 'album' },
      { title: 'Mañana Será Bonito', year: 2023, kind: 'album' },
      { title: 'Tropicoqueta', year: 2025, kind: 'album' },
    ],
    t: {
      pt: {
        role: 'Cantora',
        bio: 'Cantora colombiana de reggaeton conhecida como “La Bichota”, uma das artistas latinas de maior sucesso da década.',
        highlights: ['“Mañana Será Bonito” foi o primeiro álbum em espanhol de uma mulher a estrear em 1º na Billboard 200.', 'O mesmo disco venceu o Grammy de Melhor Álbum de Música Urbana.', '“Tusa”, com Nicki Minaj, virou um clássico do reggaeton.'],
      },
      en: {
        role: 'Singer',
        bio: 'Colombian reggaeton singer known as “La Bichota” and one of the most successful Latin artists of the decade.',
        highlights: ['“Mañana Será Bonito” was the first Spanish-language album by a woman to debut at No. 1 on the Billboard 200.', 'The same record won the Grammy for Best Música Urbana Album.', '“Tusa”, with Nicki Minaj, became a reggaeton classic.'],
      },
      es: {
        role: 'Cantante',
        bio: 'Cantante colombiana de reguetón conocida como “La Bichota”, una de las artistas latinas más exitosas de la década.',
        highlights: ['“Mañana Será Bonito” fue el primer álbum en español de una mujer en debutar en el #1 del Billboard 200.', 'Ese mismo disco ganó el Grammy a Mejor Álbum de Música Urbana.', '“Tusa”, con Nicki Minaj, se volvió un clásico del reguetón.'],
      },
    },
  },
  {
    slug: 'j-balvin', publicName: 'J Balvin', market: 'latin', kinds: ['singer'], country: 'CO',
    legalName: 'José Álvaro Osorio Balvín', birthDate: '1985-05-07', birthPlace: 'Medellín, Colômbia', activeSince: 2004,
    genres: ['Reggaeton'], socials: ig('jbalvin'),
    works: [
      { title: 'Energía', year: 2016, kind: 'album' },
      { title: 'Mi Gente', year: 2017, kind: 'single' },
      { title: 'Vibras', year: 2018, kind: 'album' },
      { title: 'Colores', year: 2020, kind: 'album' },
    ],
    t: {
      pt: {
        role: 'Cantor',
        bio: 'Cantor colombiano apontado como um dos responsáveis por levar o reggaeton às paradas globais nos anos 2010.',
        highlights: ['“Mi Gente” (2017), com Willy William, virou hit mundial.', 'Participou do show do intervalo do Super Bowl LIV, em 2020.', '“Vibras” (2018) consolidou seu som colorido e pop.'],
      },
      en: {
        role: 'Singer',
        bio: 'Colombian singer credited with helping push reggaeton onto the global charts in the 2010s.',
        highlights: ['“Mi Gente” (2017), with Willy William, became a worldwide hit.', 'He appeared in the Super Bowl LIV halftime show in 2020.', '“Vibras” (2018) cemented his colorful, pop-leaning sound.'],
      },
      es: {
        role: 'Cantante',
        bio: 'Cantante colombiano señalado como uno de los responsables de llevar el reguetón a las listas globales en los años 2010.',
        highlights: ['“Mi Gente” (2017), con Willy William, se volvió un éxito mundial.', 'Participó en el show de medio tiempo del Super Bowl LIV en 2020.', '“Vibras” (2018) consolidó su sonido colorido y pop.'],
      },
    },
  },
  {
    slug: 'peso-pluma', publicName: 'Peso Pluma', market: 'latin', kinds: ['singer'], country: 'MX',
    legalName: 'Hassan Emilio Kabande Laija', birthDate: '1999-06-15', birthPlace: 'Zapopan, Jalisco', activeSince: 2020,
    genres: ['Corridos tumbados', 'Regional mexicano'],
    works: [
      { title: 'Ella Baila Sola', year: 2023, kind: 'single' },
      { title: 'Génesis', year: 2023, kind: 'album' },
      { title: 'Éxodo', year: 2024, kind: 'album' },
    ],
    t: {
      pt: {
        role: 'Cantor e compositor',
        bio: 'Cantor mexicano que colocou os corridos tumbados no centro do pop global a partir de 2023.',
        highlights: ['“Ella Baila Sola”, com Eslabon Armado, levou o regional mexicano ao top 10 da Billboard Hot 100.', '“Génesis” venceu o Grammy de Melhor Álbum de Música Mexicana.'],
      },
      en: {
        role: 'Singer-songwriter',
        bio: 'Mexican singer who put corridos tumbados at the center of global pop starting in 2023.',
        highlights: ['“Ella Baila Sola”, with Eslabon Armado, took regional Mexican music into the Billboard Hot 100 top 10.', '“Génesis” won the Grammy for Best Música Mexicana Album.'],
      },
      es: {
        role: 'Cantautor',
        bio: 'Cantante mexicano que puso los corridos tumbados en el centro del pop global a partir de 2023.',
        highlights: ['“Ella Baila Sola”, con Eslabon Armado, llevó el regional mexicano al top 10 del Billboard Hot 100.', '“Génesis” ganó el Grammy a Mejor Álbum de Música Mexicana.'],
      },
    },
  },
  {
    slug: 'rosalia', publicName: 'Rosalía', market: 'latin', kinds: ['singer'], country: 'ES', aliases: ['Rosalia'],
    legalName: 'Rosalía Vila Tobella', birthDate: '1992-09-25', birthPlace: 'Sant Esteve Sesrovires, Catalunha', activeSince: 2013,
    genres: ['Flamenco', 'Pop', 'Experimental'], socials: ig('rosalia.vt'),
    works: [
      { title: 'El Mal Querer', year: 2018, kind: 'album' },
      { title: 'Motomami', year: 2022, kind: 'album' },
      { title: 'Lux', year: 2025, kind: 'album' },
    ],
    t: {
      pt: {
        role: 'Cantora e compositora',
        bio: 'Cantora espanhola que reinventou o flamenco misturando-o com pop, reggaeton e música experimental.',
        highlights: ['“El Mal Querer” venceu o Grammy Latino de Álbum do Ano.', '“Motomami” também levou Álbum do Ano no Grammy Latino, em 2022.', 'Lançou “Lux” em 2025.'],
      },
      en: {
        role: 'Singer-songwriter',
        bio: 'Spanish singer who reinvented flamenco by blending it with pop, reggaeton and experimental music.',
        highlights: ['“El Mal Querer” won Album of the Year at the Latin Grammys.', '“Motomami” also won Latin Grammy Album of the Year, in 2022.', 'She released “Lux” in 2025.'],
      },
      es: {
        role: 'Cantautora',
        bio: 'Cantante española que reinventó el flamenco mezclándolo con pop, reguetón y música experimental.',
        highlights: ['“El Mal Querer” ganó el Grammy Latino a Álbum del Año.', '“Motomami” también ganó Álbum del Año en los Grammy Latinos, en 2022.', 'Lanzó “Lux” en 2025.'],
      },
    },
  },
  {
    slug: 'maluma', publicName: 'Maluma', market: 'latin', kinds: ['singer'], country: 'CO',
    legalName: 'Juan Luis Londoño Arias', birthDate: '1994-01-28', birthPlace: 'Medellín, Colômbia', activeSince: 2010,
    genres: ['Reggaeton', 'Pop latino'], socials: ig('maluma'),
    works: [
      { title: 'Pretty Boy, Dirty Boy', year: 2015, kind: 'album' },
      { title: 'Felices los 4', year: 2017, kind: 'single' },
      { title: 'F.A.M.E.', year: 2018, kind: 'album' },
      { title: 'Papi Juancho', year: 2020, kind: 'album' },
    ],
    t: {
      pt: {
        role: 'Cantor',
        bio: 'Cantor colombiano de reggaeton e pop latino, um dos nomes mais populares da música urbana nas redes.',
        highlights: ['“Felices los 4” (2017) é um dos seus maiores sucessos.', 'Gravou “Medellín” com Madonna, em 2019.'],
      },
      en: {
        role: 'Singer',
        bio: 'Colombian reggaeton and Latin pop singer, one of the most popular names in urban music on social media.',
        highlights: ['“Felices los 4” (2017) is one of his biggest hits.', 'He recorded “Medellín” with Madonna in 2019.'],
      },
      es: {
        role: 'Cantante',
        bio: 'Cantante colombiano de reguetón y pop latino, uno de los nombres más populares de la música urbana en redes.',
        highlights: ['“Felices los 4” (2017) es uno de sus mayores éxitos.', 'Grabó “Medellín” con Madonna en 2019.'],
      },
    },
  },
  {
    slug: 'rauw-alejandro', publicName: 'Rauw Alejandro', market: 'latin', kinds: ['singer'], country: 'PR',
    legalName: 'Raúl Alejandro Ocasio Ruiz', birthDate: '1993-01-10', birthPlace: 'San Juan, Porto Rico', activeSince: 2014,
    genres: ['Reggaeton', 'R&B', 'Pop latino'], socials: ig('rauwalejandro'),
    works: [
      { title: 'Vice Versa', year: 2021, kind: 'album' },
      { title: 'Todo de Ti', year: 2021, kind: 'single' },
      { title: 'Saturno', year: 2022, kind: 'album' },
      { title: 'Cosa Nuestra', year: 2024, kind: 'album' },
    ],
    t: {
      pt: {
        role: 'Cantor e dançarino',
        bio: 'Cantor e dançarino porto-riquenho que mistura reggaeton, R&B e pop eletrônico, conhecido pelas performances coreografadas.',
        highlights: ['“Todo de Ti” (2021) foi um hit mundial.', '“Cosa Nuestra” (2024) homenageia a salsa e a cultura de Porto Rico.'],
      },
      en: {
        role: 'Singer and dancer',
        bio: 'Puerto Rican singer and dancer who blends reggaeton, R&B and electronic pop, known for his choreographed performances.',
        highlights: ['“Todo de Ti” (2021) was a worldwide hit.', '“Cosa Nuestra” (2024) pays tribute to salsa and Puerto Rican culture.'],
      },
      es: {
        role: 'Cantante y bailarín',
        bio: 'Cantante y bailarín puertorriqueño que mezcla reguetón, R&B y pop electrónico, conocido por sus shows coreografiados.',
        highlights: ['“Todo de Ti” (2021) fue un éxito mundial.', '“Cosa Nuestra” (2024) rinde homenaje a la salsa y a la cultura de Puerto Rico.'],
      },
    },
  },
  {
    slug: 'feid', publicName: 'Feid', market: 'latin', kinds: ['singer'], country: 'CO', aliases: ['Ferxxo'],
    legalName: 'Salomón Villada Hoyos', birthDate: '1992-08-19', birthPlace: 'Medellín, Colômbia', activeSince: 2015,
    genres: ['Reggaeton'],
    works: [
      { title: 'Feliz Cumpleaños Ferxxo Te Pirateamos el Álbum', year: 2022, kind: 'album' },
      { title: 'Mor, No Le Temes a la Oscuridad', year: 2023, kind: 'album' },
      { title: 'Ferxxo Vol X: Sagrado', year: 2025, kind: 'album' },
    ],
    t: {
      pt: {
        role: 'Cantor e produtor',
        bio: 'Cantor e produtor colombiano conhecido como “Ferxxo”, marcado pelo reggaeton melódico e pela estética toda em verde.',
        highlights: ['Começou como compositor e produtor para outros artistas antes da carreira solo.', '“Classy 101”, com Young Miko, e “Luna” estão entre seus maiores hits.'],
      },
      en: {
        role: 'Singer and producer',
        bio: 'Colombian singer and producer known as “Ferxxo”, recognized for melodic reggaeton and an all-green aesthetic.',
        highlights: ['He started as a songwriter and producer for other artists before going solo.', '“Classy 101”, with Young Miko, and “Luna” are among his biggest hits.'],
      },
      es: {
        role: 'Cantante y productor',
        bio: 'Cantante y productor colombiano conocido como “Ferxxo”, marcado por el reguetón melódico y una estética toda en verde.',
        highlights: ['Empezó como compositor y productor para otros artistas antes de su carrera solista.', '“Classy 101”, con Young Miko, y “Luna” están entre sus mayores éxitos.'],
      },
    },
  },
  {
    slug: 'bizarrap', publicName: 'Bizarrap', market: 'latin', kinds: ['singer'], country: 'AR', aliases: ['Biza', 'BZRP'],
    legalName: 'Gonzalo Julián Conde', birthDate: '1998-08-29', birthPlace: 'Ramos Mejía, Argentina', activeSince: 2017,
    genres: ['Eletrônica', 'Trap', 'Hip-hop'],
    works: [
      { title: 'BZRP Music Sessions', year: 2019, kind: 'project' },
      { title: 'Session #52 (Quevedo)', year: 2022, kind: 'single' },
      { title: 'Session #53 (Shakira)', year: 2023, kind: 'single' },
    ],
    t: {
      pt: {
        role: 'Produtor e DJ',
        bio: 'Produtor e DJ argentino que ficou famoso pelas “BZRP Music Sessions”, parcerias gravadas com artistas do mundo todo.',
        highlights: ['A Session #53, com Shakira, bateu recordes de visualização no YouTube em 2023.', 'A Session #52, com Quevedo, virou hit global em 2022.', 'Aparece sempre de boné e óculos escuros, sem mostrar o rosto por inteiro.'],
      },
      en: {
        role: 'Producer and DJ',
        bio: 'Argentine producer and DJ famous for the “BZRP Music Sessions”, collaborations recorded with artists from around the world.',
        highlights: ['Session #53, with Shakira, broke YouTube viewing records in 2023.', 'Session #52, with Quevedo, became a global hit in 2022.', 'He always appears in a cap and sunglasses, never fully showing his face.'],
      },
      es: {
        role: 'Productor y DJ',
        bio: 'Productor y DJ argentino famoso por las “BZRP Music Sessions”, colaboraciones grabadas con artistas de todo el mundo.',
        highlights: ['La Session #53, con Shakira, rompió récords de reproducciones en YouTube en 2023.', 'La Session #52, con Quevedo, fue un éxito global en 2022.', 'Siempre aparece con gorra y lentes oscuros, sin mostrar el rostro por completo.'],
      },
    },
  },

  /* ─── BRASIL ─────────────────────────────────────────────── */
  {
    slug: 'anitta', publicName: 'Anitta', market: 'brazil', kinds: ['singer'], country: 'BR',
    legalName: 'Larissa de Macedo Machado', birthDate: '1993-03-30', birthPlace: 'Rio de Janeiro, RJ', activeSince: 2011,
    genres: ['Pop', 'Funk', 'Reggaeton'], socials: ig('anitta'),
    works: [
      { title: 'Show das Poderosas', year: 2013, kind: 'single' },
      { title: 'Kisses', year: 2019, kind: 'album' },
      { title: 'Versions of Me', year: 2022, kind: 'album' },
      { title: 'Funk Generation', year: 2024, kind: 'album' },
    ],
    t: {
      pt: {
        role: 'Cantora, compositora e empresária',
        bio: 'Cantora e empresária carioca que levou o funk brasileiro ao mercado internacional e é a artista brasileira de maior alcance global.',
        highlights: ['“Envolver” (2022) foi a primeira música de uma artista brasileira solo a chegar ao 1º lugar global do Spotify.', 'Primeira artista brasileira a ganhar um VMA, com “Envolver”.', '“Funk Generation” (2024) foi indicado ao Grammy de Melhor Álbum de Música Urbana.'],
      },
      en: {
        role: 'Singer, songwriter and businesswoman',
        bio: 'Rio de Janeiro singer and businesswoman who took Brazilian funk to the international market and is Brazil’s artist with the widest global reach.',
        highlights: ['“Envolver” (2022) was the first song by a solo Brazilian artist to hit No. 1 on Spotify’s global chart.', 'She was the first Brazilian artist to win a VMA, with “Envolver”.', '“Funk Generation” (2024) was nominated for the Grammy for Best Música Urbana Album.'],
      },
      es: {
        role: 'Cantante, compositora y empresaria',
        bio: 'Cantante y empresaria de Río de Janeiro que llevó el funk brasileño al mercado internacional y es la artista brasileña de mayor alcance global.',
        highlights: ['“Envolver” (2022) fue la primera canción de una artista brasileña solista en llegar al #1 global de Spotify.', 'Fue la primera artista brasileña en ganar un VMA, con “Envolver”.', '“Funk Generation” (2024) fue nominado al Grammy a Mejor Álbum de Música Urbana.'],
      },
    },
  },
  {
    slug: 'luisa-sonza', publicName: 'Luísa Sonza', market: 'brazil', kinds: ['singer'], country: 'BR', aliases: ['Luisa Sonza'],
    legalName: 'Luísa Gerloff Sonza', birthDate: '1998-07-18', birthPlace: 'Tuparendi, RS', activeSince: 2005,
    genres: ['Pop', 'Funk'], socials: ig('luisasonza'),
    works: [
      { title: 'Pandora', year: 2019, kind: 'album' },
      { title: 'Doce 22', year: 2021, kind: 'album' },
      { title: 'Escândalo Íntimo', year: 2023, kind: 'album' },
      { title: 'Brutal Paraíso', year: 2025, kind: 'album' },
    ],
    t: {
      pt: {
        role: 'Cantora e compositora',
        bio: 'Cantora e compositora gaúcha que começou cantando em bailes ainda criança e se tornou um dos principais nomes do pop brasileiro.',
        highlights: ['“Doce 22” (2021) consolidou seu nome no pop nacional.', '“Chico” (2023) virou um dos maiores sucessos da carreira.', 'Canta profissionalmente desde criança, em bailes no interior do Rio Grande do Sul.'],
      },
      en: {
        role: 'Singer-songwriter',
        bio: 'Singer-songwriter from southern Brazil who started singing at local dances as a child and became one of the leading names in Brazilian pop.',
        highlights: ['“Doce 22” (2021) established her in Brazilian pop.', '“Chico” (2023) became one of the biggest hits of her career.', 'She has sung professionally since childhood, at dances in rural Rio Grande do Sul.'],
      },
      es: {
        role: 'Cantautora',
        bio: 'Cantautora del sur de Brasil que empezó cantando en bailes desde niña y se convirtió en uno de los principales nombres del pop brasileño.',
        highlights: ['“Doce 22” (2021) consolidó su nombre en el pop brasileño.', '“Chico” (2023) se volvió uno de los mayores éxitos de su carrera.', 'Canta profesionalmente desde niña, en bailes del interior de Rio Grande do Sul.'],
      },
    },
  },
  {
    slug: 'ludmilla', publicName: 'Ludmilla', market: 'brazil', kinds: ['singer'], country: 'BR', aliases: ['Lud'],
    legalName: 'Ludmila Oliveira da Silva', birthDate: '1995-04-24', birthPlace: 'Rio de Janeiro, RJ', activeSince: 2012,
    genres: ['Funk', 'Pop', 'Pagode', 'R&B'], socials: ig('ludmilla'),
    works: [
      { title: 'Hoje', year: 2014, kind: 'album' },
      { title: 'Numanice #2', year: 2022, kind: 'album' },
      { title: 'Vilã', year: 2023, kind: 'album' },
    ],
    t: {
      pt: {
        role: 'Cantora e compositora',
        bio: 'Cantora e compositora carioca que começou no funk como MC Beyoncé e passou a transitar entre pop, R&B e pagode.',
        highlights: ['“Numanice #2” venceu o Grammy Latino de Melhor Álbum de Samba/Pagode (2022).', 'O projeto Numanice virou uma das turnês de pagode mais populares do país.'],
      },
      en: {
        role: 'Singer-songwriter',
        bio: 'Rio de Janeiro singer-songwriter who started in funk as MC Beyoncé and now moves between pop, R&B and pagode.',
        highlights: ['“Numanice #2” won the Latin Grammy for Best Samba/Pagode Album (2022).', 'Her Numanice project became one of Brazil’s most popular pagode tours.'],
      },
      es: {
        role: 'Cantautora',
        bio: 'Cantautora de Río de Janeiro que empezó en el funk como MC Beyoncé y hoy transita entre pop, R&B y pagode.',
        highlights: ['“Numanice #2” ganó el Grammy Latino a Mejor Álbum de Samba/Pagode (2022).', 'Su proyecto Numanice se volvió una de las giras de pagode más populares de Brasil.'],
      },
    },
  },
  {
    slug: 'ivete-sangalo', publicName: 'Ivete Sangalo', market: 'brazil', kinds: ['singer'], country: 'BR', aliases: ['Veveta'],
    legalName: 'Ivete Maria Dias de Sangalo', birthDate: '1972-05-27', birthPlace: 'Juazeiro, BA', activeSince: 1993,
    genres: ['Axé', 'MPB', 'Pop'], socials: ig('ivetesangalo'),
    works: [
      { title: 'Banda Eva', year: 1993, kind: 'project' },
      { title: 'MTV ao Vivo', year: 2004, kind: 'album' },
      { title: 'Multishow ao Vivo no Maracanã', year: 2007, kind: 'album' },
    ],
    t: {
      pt: {
        role: 'Cantora e apresentadora',
        bio: 'Cantora, compositora e apresentadora baiana, maior nome do axé e presença constante no Carnaval de Salvador desde os anos 1990.',
        highlights: ['Ficou conhecida como vocalista da Banda Eva antes da carreira solo, iniciada em 1999.', '“MTV ao Vivo” (2004) é um dos DVDs mais vendidos da história do Brasil.', 'Gravou no Maracanã um show histórico, lançado em 2007.'],
      },
      en: {
        role: 'Singer and TV host',
        bio: 'Singer, songwriter and TV host from Bahia, the biggest name in axé music and a fixture of Salvador’s Carnival since the 1990s.',
        highlights: ['She rose to fame as lead singer of Banda Eva before going solo in 1999.', '“MTV ao Vivo” (2004) is one of the best-selling DVDs in Brazilian history.', 'She recorded a landmark concert at Maracanã, released in 2007.'],
      },
      es: {
        role: 'Cantante y presentadora',
        bio: 'Cantante, compositora y presentadora de Bahía, el mayor nombre del axé y figura habitual del Carnaval de Salvador desde los años 90.',
        highlights: ['Se hizo conocida como vocalista de Banda Eva antes de su carrera solista, iniciada en 1999.', '“MTV ao Vivo” (2004) es uno de los DVD más vendidos de la historia de Brasil.', 'Grabó en el Maracaná un concierto histórico, lanzado en 2007.'],
      },
    },
  },
  {
    slug: 'gusttavo-lima', publicName: 'Gusttavo Lima', market: 'brazil', kinds: ['singer'], country: 'BR', aliases: ['Embaixador'],
    legalName: 'Nivaldo Batista Lima', birthDate: '1989-09-03', birthPlace: 'Presidente Olegário, MG', activeSince: 2009,
    genres: ['Sertanejo'], socials: ig('gusttavolima'),
    works: [
      { title: 'Inventor dos Amores', year: 2010, kind: 'single' },
      { title: 'Balada', year: 2011, kind: 'single' },
      { title: 'Apelido Carinhoso', year: 2017, kind: 'single' },
      { title: 'O Embaixador', year: 2018, kind: 'album' },
    ],
    t: {
      pt: {
        role: 'Cantor e compositor',
        bio: 'Cantor e compositor mineiro, um dos maiores nomes do sertanejo, conhecido como “Embaixador”.',
        highlights: ['“Balada” (2011) fez sucesso também fora do Brasil.', 'Criou o projeto “Buteco”, de shows ao vivo que viraram álbuns e turnês.', '“Apelido Carinhoso” (2017) é um dos seus maiores sucessos.'],
      },
      en: {
        role: 'Singer-songwriter',
        bio: 'Singer-songwriter from Minas Gerais, one of the biggest names in sertanejo, known as “The Ambassador”.',
        highlights: ['“Balada” (2011) was also a hit outside Brazil.', 'He created “Buteco”, a live-show project that became albums and tours.', '“Apelido Carinhoso” (2017) is one of his biggest hits.'],
      },
      es: {
        role: 'Cantautor',
        bio: 'Cantautor de Minas Gerais, uno de los mayores nombres del sertanejo, conocido como “El Embajador”.',
        highlights: ['“Balada” (2011) también fue un éxito fuera de Brasil.', 'Creó “Buteco”, un proyecto de shows en vivo que se convirtió en álbumes y giras.', '“Apelido Carinhoso” (2017) es uno de sus mayores éxitos.'],
      },
    },
  },
  {
    slug: 'ana-castela', publicName: 'Ana Castela', market: 'brazil', kinds: ['singer'], country: 'BR', aliases: ['Boiadeira'],
    legalName: 'Ana Flávia Castela', birthDate: '2003-11-16', birthPlace: 'Amambai, MS', activeSince: 2021,
    genres: ['Agronejo', 'Sertanejo'],
    works: [
      { title: 'Pipoco', year: 2022, kind: 'single' },
      { title: 'Boiadeira', year: 2022, kind: 'single' },
    ],
    t: {
      pt: {
        role: 'Cantora e compositora',
        bio: 'Cantora e compositora sul-mato-grossense conhecida como “Boiadeira”, que popularizou o agronejo entre o público jovem.',
        highlights: ['“Pipoco” (2022) a tornou conhecida em todo o país.', 'Está entre os nomes mais ouvidos do sertanejo nas plataformas desde 2022.'],
      },
      en: {
        role: 'Singer-songwriter',
        bio: 'Singer-songwriter from Mato Grosso do Sul known as “Boiadeira” (the Cowgirl), who made agronejo popular with young audiences.',
        highlights: ['“Pipoco” (2022) made her known nationwide.', 'She has been among the most-streamed sertanejo acts since 2022.'],
      },
      es: {
        role: 'Cantautora',
        bio: 'Cantautora de Mato Grosso do Sul conocida como “Boiadeira”, que popularizó el agronejo entre el público joven.',
        highlights: ['“Pipoco” (2022) la hizo conocida en todo Brasil.', 'Está entre los nombres más escuchados del sertanejo desde 2022.'],
      },
    },
  },
  {
    slug: 'jao', publicName: 'Jão', market: 'brazil', kinds: ['singer'], country: 'BR', aliases: ['Jao'],
    legalName: 'João Vitor Romania Balbino', birthDate: '1994-01-24', birthPlace: 'Américo Brasiliense, SP', activeSince: 2016,
    genres: ['Pop'],
    works: [
      { title: 'Lobos', year: 2018, kind: 'album' },
      { title: 'Anti-Herói', year: 2019, kind: 'album' },
      { title: 'Pirata', year: 2021, kind: 'album' },
      { title: 'Super', year: 2023, kind: 'album' },
    ],
    t: {
      pt: {
        role: 'Cantor e compositor',
        bio: 'Cantor e compositor paulista que ganhou público com versões publicadas na internet e se tornou um dos principais nomes do pop brasileiro.',
        highlights: ['Seus quatro álbuns formam uma sequência ligada aos elementos: “Lobos”, “Anti-Herói”, “Pirata” e “Super”.', 'Ganhou visibilidade com covers publicados no YouTube.'],
      },
      en: {
        role: 'Singer-songwriter',
        bio: 'São Paulo singer-songwriter who built an audience with covers posted online and became one of the leading names in Brazilian pop.',
        highlights: ['His four albums form a cycle tied to the elements: “Lobos”, “Anti-Herói”, “Pirata” and “Super”.', 'He first gained visibility with covers posted on YouTube.'],
      },
      es: {
        role: 'Cantautor',
        bio: 'Cantautor de São Paulo que ganó público con versiones publicadas en internet y se convirtió en uno de los principales nombres del pop brasileño.',
        highlights: ['Sus cuatro álbumes forman un ciclo ligado a los elementos: “Lobos”, “Anti-Herói”, “Pirata” y “Super”.', 'Se dio a conocer con covers publicados en YouTube.'],
      },
    },
  },
  {
    slug: 'neymar', publicName: 'Neymar', market: 'brazil', kinds: ['athlete'], country: 'BR', aliases: ['Neymar Jr', 'Ney'],
    legalName: 'Neymar da Silva Santos Júnior', birthDate: '1992-02-05', birthPlace: 'Mogi das Cruzes, SP', activeSince: 2009,
    genres: ['Futebol'], socials: ig('neymarjr'),
    works: [
      { title: 'Santos', year: 2009, kind: 'club' },
      { title: 'Barcelona', year: 2013, kind: 'club' },
      { title: 'Paris Saint-Germain', year: 2017, kind: 'club' },
      { title: 'Al-Hilal', year: 2023, kind: 'club' },
      { title: 'Santos', year: 2025, kind: 'club' },
    ],
    t: {
      pt: {
        role: 'Jogador de futebol',
        bio: 'Atacante brasileiro revelado pelo Santos, com passagens por Barcelona, PSG e Al-Hilal, e um dos atletas mais seguidos do mundo nas redes.',
        highlights: ['É o maior artilheiro da história da seleção brasileira.', 'Sua ida do Barcelona para o PSG, em 2017, é a transferência mais cara da história do futebol.', 'Voltou ao Santos em 2025.'],
      },
      en: {
        role: 'Footballer',
        bio: 'Brazilian forward who came up at Santos, went on to Barcelona, PSG and Al-Hilal, and is one of the most-followed athletes in the world on social media.',
        highlights: ['He is the all-time top scorer for the Brazil national team.', 'His 2017 move from Barcelona to PSG is the most expensive transfer in football history.', 'He returned to Santos in 2025.'],
      },
      es: {
        role: 'Futbolista',
        bio: 'Delantero brasileño surgido en el Santos, con pasos por Barcelona, PSG y Al-Hilal, y uno de los atletas más seguidos del mundo en redes.',
        highlights: ['Es el máximo goleador de la historia de la selección brasileña.', 'Su paso del Barcelona al PSG, en 2017, es el fichaje más caro de la historia del fútbol.', 'Volvió al Santos en 2025.'],
      },
    },
  },
  {
    slug: 'virginia-fonseca', publicName: 'Virginia Fonseca', market: 'brazil', kinds: ['creator'], country: 'BR', aliases: ['Virginia'],
    legalName: 'Virginia Pimenta da Fonseca Serrão Costa', birthDate: '1999-04-06', birthPlace: 'Danbury, Connecticut (EUA)', activeSince: 2016,
    genres: ['Lifestyle', 'Beleza'], socials: ig('virginia'),
    works: [
      { title: 'Talismã Digital', year: 2021, kind: 'project' },
      { title: 'WePink', year: 2021, kind: 'project' },
    ],
    t: {
      pt: {
        role: 'Influenciadora, empresária e apresentadora',
        bio: 'Influenciadora digital, empresária e apresentadora, uma das maiores criadoras de conteúdo do Brasil, com negócios em beleza e marketing.',
        highlights: ['Fundou a WePink, marca de cosméticos e skincare.', 'Também fundou a agência de marketing Talismã Digital.', 'Nasceu nos Estados Unidos e fez carreira no Brasil.'],
      },
      en: {
        role: 'Influencer, entrepreneur and TV host',
        bio: 'Digital influencer, entrepreneur and TV host, one of Brazil’s biggest content creators, with businesses in beauty and marketing.',
        highlights: ['She founded WePink, a cosmetics and skincare brand.', 'She also founded the marketing agency Talismã Digital.', 'She was born in the United States and built her career in Brazil.'],
      },
      es: {
        role: 'Influencer, empresaria y presentadora',
        bio: 'Influencer, empresaria y presentadora, una de las mayores creadoras de contenido de Brasil, con negocios de belleza y marketing.',
        highlights: ['Fundó WePink, una marca de cosméticos y skincare.', 'También fundó la agencia de marketing Talismã Digital.', 'Nació en Estados Unidos e hizo su carrera en Brasil.'],
      },
    },
  },
  {
    slug: 'casimiro', publicName: 'Casimiro', market: 'brazil', kinds: ['streamer', 'creator'], country: 'BR', aliases: ['Cazé', 'Casimiro Miguel'],
    legalName: 'Casimiro Miguel Vieira da Silva Ferreira', birthDate: '1993-10-20', birthPlace: 'Rio de Janeiro, RJ', activeSince: 2020,
    genres: ['Esporte', 'Entretenimento'],
    works: [{ title: 'CazéTV', year: 2022, kind: 'project' }],
    t: {
      pt: {
        role: 'Streamer e apresentador',
        bio: 'Streamer, apresentador e comentarista esportivo carioca, famoso pelas reações ao vivo e dono da CazéTV.',
        highlights: ['A CazéTV transmitiu de graça todos os jogos da Copa do Mundo de 2022.', 'Bateu recorde de audiência simultânea no YouTube, com mais de 3,4 milhões de pessoas.', 'Foi comentarista esportivo antes de estourar como streamer.'],
      },
      en: {
        role: 'Streamer and host',
        bio: 'Rio de Janeiro streamer, host and sports commentator, famous for his live reactions and owner of CazéTV.',
        highlights: ['CazéTV streamed every 2022 World Cup match for free.', 'He set a YouTube record for concurrent viewers, with more than 3.4 million people.', 'He worked as a sports commentator before breaking out as a streamer.'],
      },
      es: {
        role: 'Streamer y presentador',
        bio: 'Streamer, presentador y comentarista deportivo de Río de Janeiro, famoso por sus reacciones en vivo y dueño de CazéTV.',
        highlights: ['CazéTV transmitió gratis todos los partidos del Mundial 2022.', 'Batió el récord de audiencia simultánea en YouTube, con más de 3,4 millones de personas.', 'Fue comentarista deportivo antes de despegar como streamer.'],
      },
    },
  },
];

export const realPeople: Person[] = entries.map((e, i) => ({
  aliases: [],
  socials: {},
  ...e,
  id: e.slug,
  hue: (i * 47 + 320) % 360,
}));
