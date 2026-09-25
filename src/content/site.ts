/**
 * ЕДИНСТВЕННЫЙ файл с контентом сайта.
 * Тексты, ссылки, карточки проектов, фото — всё правится здесь,
 * структура страницы при этом не меняется.
 *
 * Правила (из ТЗ): не добавлять даты, цифры, звания, географию и результаты
 * проектов без подтверждения клиентом. Все внешние ссылки открываются в новой вкладке.
 */

export const site = {
  name: 'Phil Godlewski',
  /** Домен подставится из SITE_URL при сборке; здесь — только для og:site_name */
  siteName: 'Phil Godlewski',
  title: 'Phil Godlewski — Owner & Co-Founder of ATOM Ventures Group',
  description:
    'Phil Godlewski — entrepreneur, owner and co-founder of ATOM Ventures Group. Building ventures at the intersection of technology, sports, AI and design: JGGL, Blockchain Sports, Neurodesign, Arteki Studio.',
  ogImage: '/img/og-default.jpg',
};

export const socials = {
  instagram: { label: 'Instagram', handle: '@philgodlewski.atom', url: 'https://www.instagram.com/philgodlewski.atom/' },
  // TODO: подтвердить точный адрес Threads (ТЗ: «ссылка из профиля Instagram»)
  threads: { label: 'Threads', handle: '@philgodlewski.atom', url: 'https://www.threads.com/@philgodlewski.atom' },
};



export const hero = {
  eyebrow: 'Owner & Co-Founder of ATOM Ventures Group',
  firstName: 'Phil',
  lastName: 'Godlewski',
  lead: 'Building ventures at the intersection of technology, sports, AI and design.',
  primaryCta: { label: 'Explore the ecosystem', href: '#ecosystem' },
  secondaryCta: { label: 'Connect', href: '#contact' },
  /** Фоновое фото первого экрана (Phil справа, слева уходит в темноту). Файл в public/ */
  background: '/img/hero-phil.webp',
  backgroundAlt: 'Phil Godlewski, owner and co-founder of ATOM Ventures Group',
};

export const profile = {
  label: 'Profile',
  heading: 'Entrepreneur. Founder. Builder.',
  text:
    'Phil Godlewski is an entrepreneur, owner and co-founder of ATOM Ventures Group. His public profile brings together technology, sports, AI-driven products and creative design.',
  /** Короткие теги — редакционное обобщение из ТЗ, согласовать с персоной */
  tags: ['Technology', 'Sports', 'AI', 'Design'],
  /** Визуал справа от текста (маска, 3:4). Сгенерировано в Higgsfield, оригинал 4K в gen/hf/ */
  image: '/img/mask-portrait.webp',
};

export const atom = {
  label: 'ATOM Ventures Group',
  heading: 'A venture platform connecting technology, sports, AI and creative industries.',
  text: 'Phil Godlewski is the owner and co-founder of the group.',
  logo: '/img/logos/atom-global.svg',
  logoAlt: 'ATOM Global',
  /** Четыре вертикали экосистемы (из one-pager ATOM) */
  verticals: [
    { name: 'Social Media', project: 'JGGL' },
    { name: 'Sports & Technology', project: 'Blockchain Sports' },
    { name: 'Design & AI', project: 'Neurodesign' },
    { name: 'Animation & Production', project: 'Arteki Studio' },
  ],
  /** Фон плитки с логотипом (гравировка) */
  background: '/img/bg-engraving.webp',
  /** Официальный сайт холдинга; проверен 22.09.2026 (200) */
  url: 'https://atomgroup.io/',
  urlLabel: 'atomgroup.io',
};

export type Project = {
  name: string;
  desc: string;
  url: string | null;
  urlLabel?: string;
  /** Путь к логотипу в public/. null — типографский знак */
  logo: string | null;
  /** Логотип тёмный — рендерить на светлой плитке */
  light?: boolean;
  tag: string;
};

export const ecosystem = {
  label: 'Ecosystem',
  /** Фон секции: доска расследователя с красными нитями (21:9) */
  background: '/img/bg-evidence.webp',
  heading: 'Projects across the ATOM ecosystem',
  intro: 'Four connected directions — digital products, sports innovation, design and animation.',
  list: [
    {
      name: 'JGGL',
      tag: 'Social · AI',
      desc: 'A social network that creates the soundtrack of your life from real-world moments.',
      url: 'https://jggl.ai/',
      urlLabel: 'jggl.ai',
      logo: '/img/logos/jggl.svg',
    },
    {
      name: 'Blockchain Sports',
      tag: 'SportTech',
      desc: 'A global next-generation sports ecosystem that connects real-world sports with blockchain technology.',
      url: 'https://bcsports.io/en',
      urlLabel: 'bcsports.io',
      logo: '/img/logos/blockchain-sports.svg',
    },
    {
      name: 'Neurodesign',
      tag: 'Design · Technology',
      desc: 'Neural network-driven creativity for interior design, architecture and visualization.',
      // Официального сайта нет; на atomgroup.io кнопка проекта ведёт в Instagram
      url: 'https://www.instagram.com/neurodesign_com/',
      urlLabel: '@neurodesign_com',
      logo: '/img/logos/neurodesign.svg',
    },
    {
      name: 'Arteki Studio',
      tag: 'Animation · AI',
      desc: 'AI-powered animation pipeline for cinematic quality at speed.',
      url: 'https://artekistudio.com/en',
      urlLabel: 'artekistudio.com',
      logo: '/img/logos/arteki.svg',
    },
  ] satisfies Project[],
};

export const focus = {
  label: 'Focus areas',
  /** Фоновая дымка секции (21:9) */
  background: '/img/smoke.webp',
  heading: 'Build. Connect. Innovate.',
  items: [
    { title: 'Technology', text: 'Digital ventures and products.' },
    { title: 'Sports', text: 'New models for the sports industry.' },
    { title: 'AI', text: 'Practical applications of artificial intelligence.' },
    { title: 'Design', text: 'Creative systems for a changing digital world.' },
  ],
};

export type MediaItem = { src: string; caption: string; url: string | null; /** object-position, если лицо не по центру */ pos?: string };

export const media = {
  label: 'Media',
  /** Фон секции: засекреченное досье (21:9) */
  background: '/img/bg-dossier.webp',
  heading: 'From the archive',
  text: 'Interviews, conversations and updates from Phil Godlewski’s work across technology, sports and creative ventures.',
  /**
   * Фото от клиента (сентябрь 2026). url — ссылка на оригинал поста, если есть.
   * Если массив пуст — блок и пункт меню не показываются.
   */
  items: [
    { src: '/img/photos/phil-8315.webp', caption: 'Phil Godlewski', url: null, pos: '30% 40%' },
    { src: '/img/photos/phil-8349.webp', caption: 'Blockchain Sports Arena', url: null },
    { src: '/img/photos/phil-8356.webp', caption: 'Team walkthrough', url: null },
    { src: '/img/photos/phil-8370.webp', caption: 'Blockchain Sports Arena', url: null },
    { src: '/img/photos/phil-8381.webp', caption: 'Arena lounge', url: null },
    { src: '/img/photos/phil-8438.webp', caption: 'With the team', url: null },
    { src: '/img/photos/phil-8439.webp', caption: 'Office floor', url: null },
    { src: '/img/photos/phil-8494.webp', caption: 'Working session', url: null },
    { src: '/img/photos/phil-8517.webp', caption: 'ATOM Media', url: null },
  ] as MediaItem[],
};

export const follow = {
  label: 'Follow',
  /** Фон секции: старая карта с булавками (21:9) */
  background: '/img/bg-map.webp',
  heading: 'Stay connected',
  text: 'Follow Phil Godlewski on Instagram and Threads for project news and updates.',
};

export const contact = {
  label: 'Contact',
  heading: 'Let’s build what comes next.',
  text: 'For business inquiries and partnerships, get in touch with the ATOM Ventures Group team.',
  /**
   * Endpoint формы (Formspree / Web3Forms / свой). Пока пусто — форма не показывается,
   * остаётся кнопка на Instagram. Личный email на сайт не выводим (ТЗ, блок 8).
   */
  formEndpoint: '',
  /** Фон карточки контактов: маска справа, слева затемнение под текст (16:9) */
  image: '/img/mask-wide.webp',
  fallbackCta: { label: 'Message on Instagram', url: socials.instagram.url },
};

export const footer = {
  note: '© ' + new Date().getFullYear() + ' Phil Godlewski. All rights reserved.',
};

const navAll = [
  { label: 'Profile', href: '#profile' },
  { label: 'ATOM', href: '#atom' },
  { label: 'Ecosystem', href: '#ecosystem' },
  { label: 'Focus', href: '#focus' },
  { label: 'Media', href: '#media' },
  { label: 'Contact', href: '#contact' },
];
/** Пункт Media показывается только когда в блоке есть фото */
export const nav = navAll.filter((n) => n.href !== '#media' || media.items.length > 0);
