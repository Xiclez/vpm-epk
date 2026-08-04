import type { ArtistData } from '../types/content'

/**
 * Single source of truth for every editable piece of artist content.
 *
 * All URLs, names, venues and gallery images below were extracted from the
 * original static press kit (reference/current-presskit.html) and from the
 * press-kit mockup. Nothing here is invented: no labels, festivals, awards,
 * statistics, press quotes or dates beyond what the source material contains.
 * Items that still need real data are marked with `EDITABLE PLACEHOLDER`.
 */
export const artistData: ArtistData = {
  name: 'VPM',
  tagline: 'FOLLOW THE FLAME',
  roles: ['DJ', 'Producer'],
  location: 'Chihuahua, México',

  /** Mockup panel 01 — verbatim. */
  shortBio:
    'VPM es un proyecto de música electrónica enfocado en crear experiencias que conectan a las personas a través del groove, la energía y la selección musical. Cada set es un viaje construido para la pista de baile.',

  /**
   * Condensed from the four source paragraphs — same claims, tighter editorial
   * rhythm. The last entry is revealed through the "read more" control.
   */
  extendedBio: [
    'VPM es un DJ que ha logrado convertir la oscuridad, la elegancia y la energía en una sola identidad sonora capaz de transformar cualquier pista. Su propuesta reúne atmósferas profundas, vocales hipnóticas y bajos que avanzan con una fuerza casi magnética.',
    'Originario de Chihuahua, ha desarrollado un estilo propio que refleja la vibra urbana de su entorno. Su capacidad para leer el ambiente y moldear la energía del lugar lo hace igual de sólido en clubes íntimos de estética underground, grandes escenarios, rooftops o eventos de marca. No se limita a mezclar música: construye una narrativa que evoluciona a lo largo del set, desde la contemplación profunda hasta la euforia total.',
    'Destaca por su profesionalismo y su enfoque detallado en cada presentación: selección musical precisa, manejo técnico impecable e intención artística clara. Cada show aporta un valor real para promotores y venues — mayor engagement, mayor permanencia en pista y una atmósfera distintiva que enriquece la identidad del evento.',
    'Para quienes buscan un DJ con una propuesta sólida, con sonido propio y con la capacidad de generar una conexión auténtica con el público, VPM representa una apuesta ideal. Su música no solo suena: se siente, se vive y se convierte en parte de la experiencia colectiva, dejando huella en cada espacio que toca.',
  ],

  /** Mockup panel 03 — verbatim copy. */
  musicalIdentity: {
    heading: 'MUSICAL IDENTITY',
    lead:
      'Busco canciones con vocales que no solo hagan bailar, sino también cantar a la gente y que se sienta parte del viaje musical.',
    body: [
      'La búsqueda empieza en el groove: piezas con cuerpo, con vocal, con algo que la pista pueda reconocer y devolver.',
      'Cuando eso ocurre el set deja de ser una selección de tracks y se convierte en algo compartido.',
    ],
    pullQuote: 'Groove, energía y conexión. Esa es la esencia de VPM.',
  },

  sound: {
    lead:
      'Presión en las bajas frecuencias, vocales hipnóticas y un groove que no suelta la pista. Tensión que se acumula y se libera en el momento exacto.',
    notes: [
      'Bajos que avanzan con una fuerza casi magnética.',
      'Atmósferas profundas mezcladas con vocales hipnóticas.',
      'Tensión, liberación y conexión colectiva con la pista.',
    ],
  },

  liveExperience: {
    statements: [
      'Cada presentación es única.',
      'La pista siempre cuenta una historia diferente.',
      'La energía se construye progresivamente.',
      'Cada set avanza de la tensión a la liberación colectiva.',
    ],
    images: [
      {
        src: 'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769212147/IMG_5170_kutpl0.jpg',
        alt: 'VPM en cabina durante un set en vivo',
        ratio: '4:5',
      },
      {
        src: 'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769212148/IMG_5729_awcrxx.jpg',
        alt: 'Pista de baile llena durante una presentación de VPM',
        ratio: '1:1',
      },
      {
        src: 'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769212146/550430df-02d7-4cdf-9a34-de2df4ca5ec3_mz10ry.jpg',
        alt: 'Ambiente de club durante un set de VPM',
        ratio: '16:9',
      },
      {
        src: 'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769212149/IMG_5675_qrn2nh.jpg',
        alt: 'VPM mezclando con audífonos frente al público',
        ratio: '3:4',
      },
    ],
  },

  /** Bass House and Deep Tech are the primaries; the rest are the wider range. */
  genres: [
    { name: 'Bass House', primary: true },
    { name: 'Deep Tech', primary: true },
    { name: 'Tech House', primary: false },
    { name: 'House', primary: false },
    { name: 'Minimal', primary: false },
    { name: 'Techno', primary: false },
  ],

  socials: [
    {
      platform: 'instagram',
      label: 'Instagram',
      handle: '@vpm_holyjunkie',
      url: 'https://www.instagram.com/vpm_holyjunkie?igsh=MXBtbWR4d2ptcXFkbQ%3D%3D',
    },
    {
      platform: 'facebook',
      label: 'Facebook',
      handle: 'VPM',
      url: 'https://www.facebook.com/share/1GnsvGMfP4/?mibextid=wwXIfr',
    },
    {
      platform: 'soundcloud',
      label: 'SoundCloud',
      handle: 'iram-alvidrez',
      url: 'https://soundcloud.com/iram-alvidrez',
    },
    {
      platform: 'youtube',
      label: 'YouTube',
      handle: 'VPM',
      url: 'https://www.youtube.com/channel/UCK_haacNtBCtIjhHGHz9rEg',
    },
  ],

  /** From the press-kit mockup, panel 10. */
  booking: {
    contactName: 'Iram Alvidrez',
    phoneDisplay: '614 210 0637',
    phoneNational: '6142100637',
    countryCode: '52',
    email: 'isp4r74@gmail.com',
    whatsappMessage: 'Hola VPM, me interesa reservar una fecha.',
    emailSubject: 'Booking VPM',
  },

  mixes: [
    {
      id: 'vpm-bday-2026',
      title: 'VPM B-Day 2026 — On Studio',
      isNew: true,
      // EDITABLE — descriptive line, not a claim about the release.
      description: 'Sesión grabada en estudio. Bass House y Deep Tech de principio a fin.',
      poster:
        'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769212152/IMG_5710_nph4hm.jpg',
      url: 'https://soundcloud.com/iram-alvidrez/vpm-b-day-2026-on-studio',
      embedUrl:
        'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/iram-alvidrez/vpm-b-day-2026-on-studio&color=%23E1261C&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true',
    },
    {
      id: 'transformation',
      title: 'Transformation',
      // EDITABLE — this SoundCloud link is a set/playlist.
      description: 'Selección de sets agrupados: atmósferas profundas y groove sostenido.',
      poster:
        'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769212152/IMG_5669_pmnrih.jpg',
      url: 'https://soundcloud.com/iram-alvidrez/sets/transformation',
      embedUrl:
        'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/iram-alvidrez/sets/transformation&color=%23E1261C&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true',
    },
    {
      id: 'nocturnal-echoes',
      title: 'Nocturnal Echoes',
      // EDITABLE — descriptive line.
      description: 'Registro nocturno: vocales hipnóticas sobre bajos densos.',
      poster:
        'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769212154/IMG_5719_p8t675.jpg',
      url: 'https://soundcloud.com/iram-alvidrez/nocturnal-echoes',
      embedUrl:
        'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/iram-alvidrez/nocturnal-echoes&color=%23E1261C&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true',
    },
  ],

  videos: [
    {
      id: 'eUQEsSZE7Yg',
      title: 'VPM BDAY @ Studio Bar',
      description:
        'Una sesión inmersiva de 1:30 horas recorriendo sonidos Tech House y Minimal Bass. Grabado en vivo en StudioBar Chihuahua, Enero 2026.',
      embedUrl:
        'https://www.youtube-nocookie.com/embed/eUQEsSZE7Yg?rel=0&controls=1&playsinline=1',
      url: 'https://www.youtube.com/watch?v=eUQEsSZE7Yg',
      poster:
        'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769214455/Black_and_White_Minimalist_Modern_Music_Production_Studio_Business_Card_eqzqqt.png',
      duration: '1:30 h',
    },
  ],

  /** Real names from the source HTML. "Los Grandres" corrected to "Los Grandes". */
  supportedBy: [
    'Samuel Lupian',
    'De La Reiver',
    'Alex Lozduar',
    'Ever Tapia',
    'Divixxion',
    'Totti',
    'Synk',
    'Ruary',
    'Los Grandes',
    'Exxotic',
    'Kevin Zamorano',
    'Seack',
  ],

  venues: [
    {
      name: 'Epicentro',
      image:
        'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769213656/283344215_305230331808884_1334220189795785226_n_t5dghg.jpg',
    },
    {
      name: 'Zulu Coctail & Lounge',
      image:
        'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769213657/527452439_18233857495288765_8697610036031186230_n_w7bdso.jpg',
    },
    {
      name: 'StudioBar',
      image:
        'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769213721/154844876_459705698557620_160901859768699531_n_u8ppxq.jpg',
    },
    {
      name: 'El Camino Mezcalería',
      image:
        'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769213657/489880522_1335868967652607_8496667785564096930_n_qh9r13.jpg',
    },
    {
      name: 'Booz Inside',
      image:
        'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769213656/447799061_1510941989838463_3262853843744824137_n_p5tiqc.jpg',
    },
    {
      name: 'Patio Mamitas',
      image:
        'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769213657/337656477_134825399540196_4162967201138695440_n_ttyaqx.jpg',
    },
    {
      name: 'La Puerta de Alcalá CUU',
      image:
        'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769213657/325322805_914691736376400_9054788658765717016_n_clsehq.jpg',
    },
    {
      name: 'Summer Forest Fest',
      image:
        'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769213656/475977051_632824309435968_1699175458973705315_n_ii5nsi.jpg',
    },
    {
      name: 'Winter Lotus Fest',
      image:
        'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769213657/574105972_17896899123337696_434186040606095028_n_mxbaxw.jpg',
    },
    {
      name: 'Electroroom CUU',
      image:
        'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769213656/395044326_312682728161169_1840215908911257268_n_oxqrkw.jpg',
    },
    {
      name: 'Ágora Beats CUU',
      image:
        'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769213656/452346534_1535316610387049_5716491048862926439_n_mmqro7.jpg',
    },
  ],

  gallery: [
    {
      id: 'g01',
      src: 'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769212147/IMG_5170_kutpl0.jpg',
      alt: 'VPM en cabina bajo luz roja',
      ratio: '4:5',
    },
    {
      id: 'g02',
      src: 'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769212148/IMG_5729_awcrxx.jpg',
      alt: 'Público en la pista durante un set de VPM',
      ratio: '1:1',
    },
    {
      id: 'g03',
      src: 'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769212146/550430df-02d7-4cdf-9a34-de2df4ca5ec3_mz10ry.jpg',
      alt: 'Ambiente de club durante una presentación',
      ratio: '16:9',
      wide: true,
    },
    {
      id: 'g04',
      src: 'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769212149/IMG_5675_qrn2nh.jpg',
      alt: 'VPM mezclando con audífonos',
      ratio: '3:4',
    },
    {
      id: 'g05',
      src: 'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769212149/IMG_5680_vbwl1v.jpg',
      alt: 'Detalle de cabina y mezcladora',
      ratio: '1:1',
    },
    {
      id: 'g06',
      src: 'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769212152/IMG_5710_nph4hm.jpg',
      alt: 'VPM durante un set nocturno',
      ratio: '4:5',
    },
    {
      id: 'g07',
      src: 'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769212152/IMG_5669_pmnrih.jpg',
      alt: 'Vista de la pista desde la cabina',
      ratio: '16:9',
      wide: true,
    },
    {
      id: 'g08',
      src: 'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769212154/IMG_5719_p8t675.jpg',
      alt: 'VPM de perfil durante una presentación',
      ratio: '3:4',
    },
    {
      id: 'g09',
      src: 'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769212154/IMG_5714_oo29m4.jpg',
      alt: 'Luces de club sobre la pista',
      ratio: '1:1',
    },
    {
      id: 'g10',
      src: 'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769212158/IMG_5705_mks5dq.jpg',
      alt: 'Momento de un set en vivo',
      ratio: '4:5',
    },
    {
      id: 'g11',
      src: 'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769212160/IMG_5670_za66du.jpg',
      alt: 'Detalle del público durante el set',
      ratio: '1:1',
    },
    {
      id: 'g12',
      src: 'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769212171/IMG_5700_xsc094.jpg',
      alt: 'VPM en cabina con la pista al fondo',
      ratio: '3:4',
    },
    {
      id: 'g13',
      src: 'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769212173/IMG_5699_olfdvd.jpg',
      alt: 'Ambiente urbano de la noche de club',
      ratio: '16:9',
      wide: true,
    },
    {
      id: 'g14',
      src: 'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769212146/freepik__professional-studio-photo-of-a-26yearold-hispanic-__53051_pkcbet.jpg',
      alt: 'Retrato de estudio de VPM',
      ratio: '4:5',
    },
    {
      id: 'g15',
      src: 'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769212146/freepik__a-portrait-of-a-24-year-old-hispanic-man-with-fair__53050_kvnmlu.jpg',
      alt: 'Retrato de VPM',
      ratio: '1:1',
    },
  ],

  rider: {
    intro: 'Compatible con cualquier equipo de estándar profesional de club.',
    groups: [
      {
        title: 'Reproductores',
        items: ['Pioneer DJ / AlphaTheta', 'CDJ-2000 / CDJ-3000', 'XDJ Series'],
      },
      {
        title: 'Mezcladoras',
        items: ['DJM-900', 'DJM-900NXS2', 'DJM-V10'],
      },
      {
        title: 'Audio en cabina',
        items: ['Standard club setup', 'Monitores de cabina y subwoofer'],
      },
      {
        title: 'Escenario',
        items: ['Iluminación profesional', 'Suministro eléctrico estable'],
      },
    ],
    software: 'Rekordbox',
  },

  downloads: [
    {
      label: 'DOWNLOAD TECHNICAL RIDER',
      // >>> Place the real PDF at: public/assets/downloads/vpm-technical-rider.pdf
      //     then set `available: true`. No placeholder PDF is generated.
      href: '/assets/downloads/vpm-technical-rider.pdf',
      available: false,
      note: 'PDF disponible a solicitud vía booking.',
    },
  ],

  nav: [
    { id: 'about', label: 'About', primary: true },
    { id: 'sound', label: 'The Sound', primary: true },
    { id: 'identity', label: 'Identity', primary: false },
    { id: 'live', label: 'Live', primary: true },
    { id: 'mixes', label: 'Mixes', primary: true },
    { id: 'support', label: 'Supported By', primary: false },
    { id: 'appearances', label: 'Appearances', primary: true },
    { id: 'rider', label: 'Rider', primary: true },
    { id: 'gallery', label: 'Gallery', primary: true },
    { id: 'socials', label: 'Socials', primary: false },
  ],

  seo: {
    lang: 'es',
    title: 'VPM — DJ & Producer | Electronic Press Kit',
    description:
      'Presskit oficial de VPM, DJ y productor originario de Chihuahua. Bass House, Deep Tech, Tech House, House, Minimal y Techno. Sets en vivo, mixes y booking.',
    ogTitle: 'VPM — DJ & Producer | Official EPK',
    ogDescription:
      'Explora el sonido de VPM: Bass House, Deep Tech y atmósferas profundas. Sets en vivo, mixes y booking.',
    keywords:
      'VPM, DJ, Chihuahua, Bass House, Deep Tech, Tech House, Techno, Minimal, Electronic Music, Presskit, EPK',
  },

  images: {
    heroPortrait:
      'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769210889/IMG_7302_oim3kl.jpg',
    aboutPortrait:
      'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769212146/freepik__professional-studio-photo-of-a-26yearold-hispanic-__53051_pkcbet.jpg',
  },
}

/** Brand assets copied out of /reference into /public. */
export const brandAssets = {
  graffiti: '/assets/brand/vpm-graffiti.jpeg',
  ring: '/assets/brand/vpm-ring.jpeg',
  flameCharacter: '/assets/brand/vpm-flame-character.jpeg',
} as const
