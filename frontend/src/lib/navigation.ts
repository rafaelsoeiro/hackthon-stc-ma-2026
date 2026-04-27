export type NavItem = {
  href: string;
  label: string;
};

export const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Inicio' },
  { href: '/dados', label: 'Dinheiro Publico' },
  { href: '/pessoas', label: 'Servidores' },
  { href: '/governo', label: 'Estrutura de Governo' },
  { href: '/obras', label: 'Obras' },
  { href: '/contratos', label: 'Contratos' },
  { href: '/programas', label: 'Programas Sociais' },
  { href: '/ia', label: 'Assistente IA' },
  { href: '/tecnico', label: 'Explorar Dados' },
  { href: '/institucional', label: 'Institucional' },
  { href: '/sitemap', label: 'Mapa do Site' },
  { href: '/glossario', label: 'Glossario' },
];
