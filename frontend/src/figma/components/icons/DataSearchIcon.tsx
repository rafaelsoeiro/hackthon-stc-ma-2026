'use client';

/**
 * DataSearchIcon — ícone composto: cilindro de banco de dados + lupa sobreposta.
 * Comunica "pesquisar/explorar dados" de forma intuitiva.
 * Mesmas props de uso que ícones lucide-react.
 */
interface DataSearchIconProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number | string;
  strokeWidth?: number;
}

export function DataSearchIcon({
  className,
  style,
  size = 24,
  strokeWidth = 1.75,
}: DataSearchIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {/* ── Cilindro de banco de dados (deslocado levemente para cima/esquerda) ── */}
      {/* Tampa superior */}
      <ellipse cx="10.5" cy="4.8" rx="7.5" ry="2.3" />
      {/* Corpo vertical */}
      <path d="M3 4.8V14.8" />
      <path d="M18 4.8V10.5" />
      {/* Arco inferior visível */}
      <path d="M3 14.8a7.5 2.3 0 0 0 10 .8" />
      {/* Divisor central */}
      <path d="M3 9.8a7.5 2.3 0 0 0 15 0" />

      {/* ── Lupa sobreposta (canto inferior direito) ── */}
      <circle cx="18.2" cy="18.2" r="3.3" />
      {/* Cabo da lupa */}
      <path d="M20.7 20.7 23 23" strokeWidth={strokeWidth * 1.1} />
    </svg>
  );
}
