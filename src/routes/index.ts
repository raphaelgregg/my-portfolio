import { About } from '../pages/about'
import { Experience } from '../pages/experience'
import { Home } from '../pages/home'
import { Project } from '../pages/project'
import { Resume } from '../pages/resume'
import { LoadError, NotFound } from '../pages/status'
import { setPageTitle } from '../utils/pageTitle'

type PageRenderer = () => string | Promise<string>

interface StaticRoute {
  render: PageRenderer
  title?: string
}

const staticRoutes: Record<string, StaticRoute> = {
  '/': { render: Home },
  '/about': { render: About, title: 'Sobre' },
  '/resume': { render: Resume, title: 'Currículo' },
  // Endereço antigo do currículo para PDF: mantido para não quebrar links
  '/curriculum-download': { render: Resume, title: 'Currículo' },
}

/** Rotas com parâmetro: "/project/3" → Project("3"). */
const dynamicRoutes: Array<{
  prefix: string
  render: (id: string) => string | Promise<string>
}> = [
  { prefix: '/experience/', render: Experience },
  { prefix: '/project/', render: Project },
]

async function resolveRoute(path: string): Promise<string> {
  const staticRoute = staticRoutes[path]
  if (staticRoute) {
    setPageTitle(staticRoute.title)
    return staticRoute.render()
  }

  for (const { prefix, render } of dynamicRoutes) {
    const id = path.startsWith(prefix) ? path.slice(prefix.length) : ''
    if (id) return render(id)
  }

  setPageTitle('Página não encontrada')
  return NotFound()
}

/** Renderiza no elemento raiz a página correspondente ao caminho da URL. */
export async function navigateTo(path: string, rootElement: HTMLElement) {
  try {
    rootElement.innerHTML = await resolveRoute(path)
  } catch (error) {
    console.error(`Erro ao renderizar "${path}":`, error)
    setPageTitle('Erro ao carregar')
    rootElement.innerHTML = LoadError(path)
  }
}
