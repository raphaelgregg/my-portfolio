import { About } from '../pages/about'
import { Experience } from '../pages/experience'
import { Home } from '../pages/home'
import { Project } from '../pages/project'
import { Resume } from '../pages/resume'
import { Curriculum } from '../pages/resume/download'

type PageRenderer = () => string | Promise<string>

const staticRoutes: Record<string, PageRenderer> = {
  '/': Home,
  '/about': About,
  '/resume': Resume,
  '/curriculum-download': Curriculum,
}

/** Rotas com parâmetro: "/project/3" → Project("3"). */
const dynamicRoutes: Array<{
  prefix: string
  render: (id: string) => string | Promise<string>
}> = [
  { prefix: '/experience/', render: Experience },
  { prefix: '/project/', render: Project },
]

const NOT_FOUND_HTML = '<h1>404 Not Found</h1>'
const ERROR_HTML = '<h1>Não foi possível carregar esta página.</h1>'

async function resolveRoute(path: string): Promise<string> {
  const staticRoute = staticRoutes[path]
  if (staticRoute) return staticRoute()

  for (const { prefix, render } of dynamicRoutes) {
    const id = path.startsWith(prefix) ? path.slice(prefix.length) : ''
    if (id) return render(id)
  }

  return NOT_FOUND_HTML
}

/** Renderiza no elemento raiz a página correspondente ao caminho da URL. */
export async function navigateTo(path: string, rootElement: HTMLElement) {
  try {
    rootElement.innerHTML = await resolveRoute(path)
  } catch (error) {
    console.error(`Erro ao renderizar "${path}":`, error)
    rootElement.innerHTML = ERROR_HTML
  }
}
