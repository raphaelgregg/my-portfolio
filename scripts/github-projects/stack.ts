/** Tecnologias: nomes padronizados, stack por package.json e inferência por arquivos. */

/** Dependência do package.json → nome exibido. A ordem define a ordem na tela. */
const STACK_BY_DEPENDENCY: [string, string][] = [
  ['next', 'Next.js'],
  ['react-native', 'React Native'],
  ['expo', 'Expo'],
  ['react', 'React'],
  ['react-router-dom', 'React Router'],
  ['@react-navigation/native', 'React Navigation'],
  ['leaflet', 'Leaflet'],
  ['express', 'Express'],
  ['typeorm', 'TypeORM'],
  ['knex', 'Knex'],
  ['sqlite3', 'SQLite'],
  ['yup', 'Yup'],
  ['typescript', 'TypeScript'],
]

interface PackageJson {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}

export function stackFromPackage(pkg: PackageJson): string[] {
  const dependencies = { ...pkg.devDependencies, ...pkg.dependencies }
  const stack = STACK_BY_DEPENDENCY.filter(
    ([name]) => name in dependencies,
  ).map(([, label]) => label)

  // React Native já implica React: não repete
  return stack.includes('React Native')
    ? stack.filter((label) => label !== 'React')
    : stack
}

const TECH_ALIASES: Record<string, string> = {
  reactjs: 'React',
  'react.js': 'React',
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  nodejs: 'Node.js',
  'node.js': 'Node.js',
  nextjs: 'Next.js',
  'next.js': 'Next.js',
  'react native': 'React Native',
  html: 'HTML',
  html5: 'HTML',
  css: 'CSS',
  css3: 'CSS',
}

/** "ReactJS" → "React", "Typescript" → "TypeScript"; nomes desconhecidos ficam como vieram. */
export function normalizeTech(name: string): string {
  const key = name.trim().toLowerCase()
  return TECH_ALIASES[key] ?? name.trim()
}

export function uniqueTechs(names: string[]): string[] {
  return [...new Set(names.map(normalizeTech).filter(Boolean))]
}

/** Quando o README não lista tecnologias: pelo que há de código no repositório. */
export function inferTechsFromFiles(paths: string[]): string[] {
  const has = (pattern: RegExp) => paths.some((path) => pattern.test(path))
  const techs: string[] = []

  if (has(/\.html?$/i)) techs.push('HTML')
  if (has(/\.css$/i)) techs.push('CSS')
  if (has(/\.(js|jsx|mjs)$/i)) techs.push('JavaScript')
  if (has(/\.(ts|tsx)$/i)) techs.push('TypeScript')
  return techs
}

/** Tecnologias de destaque de um conjunto de stacks (para repos sem README de tecnologias). */
export function headlineTechs(stacks: string[][], hasApi: boolean): string[] {
  const all = new Set(stacks.flat())
  const order = ['TypeScript', 'Next.js', 'React', 'React Native', 'Expo']
  const techs = order.filter((tech) => all.has(tech))
  if (hasApi) techs.push('Node.js')
  return techs
}

/** Pasta do monorepo → nome da aplicação. */
export function appNameFromFolder(folder: string): string {
  const names: Record<string, string> = {
    web: 'Web',
    frontend: 'Web',
    mobile: 'Mobile',
    server: 'API',
    backend: 'API',
    api: 'API',
  }
  return names[folder.toLowerCase()] ?? folder
}
