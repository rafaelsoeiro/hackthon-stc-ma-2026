export const pageIdToPath: Record<string, string> = {
  home: '/',
  dados: '/dados',
  pessoas: '/pessoas',
  governo: '/governo',
  obras: '/obras',
  contratos: '/contratos',
  programas: '/programas',
  ia: '/ia',
  tecnico: '/tecnico',
  institucional: '/institucional',
  sitemap: '/sitemap',
  glossario: '/glossario',
  busca: '/busca',
};

export function pathToPageId(pathname: string): string {
  if (pathname === '/') return 'home';

  const match = Object.entries(pageIdToPath).find(([, path]) =>
    path !== '/' && (pathname === path || pathname.startsWith(`${path}/`)),
  );

  return match?.[0] ?? 'home';
}
