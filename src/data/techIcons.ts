/**
 * Ícones de tecnologia disponíveis em /public/svg. O nome do arquivo não é o
 * nome da tecnologia (JavaScript → js.svg); tecnologias sem ícone ficam só com
 * o texto.
 */
const ICON_BY_TECH: Record<string, string> = {
  html: 'html',
  css: 'css',
  javascript: 'js',
  js: 'js',
  typescript: 'typescript',
  tailwind: 'tailwind',
  'tailwind css': 'tailwind',
}

export function techIconFor(tech: string): string | undefined {
  return ICON_BY_TECH[tech.trim().toLowerCase()]
}
