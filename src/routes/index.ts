import { About } from "../pages/about";
import { Experience } from "../pages/experience";
import { Home } from "../pages/home";
import { Project } from "../pages/project";
import { Resume } from "../pages/resume";
import { Curriculum } from "../pages/resume/download";

// recebe o caminho da url atual na pagina e o elemento html, para retornar o conteudo de pagina referente
export async function navigateTo(path: string, rootElement: HTMLElement) {
  switch (path) {
    case '/':
      const homeContent = await Home();
      rootElement.innerHTML = homeContent;
      // console.log(rootElement, path);
      break;
    case '/about':
      rootElement.innerHTML = About();
      // console.log(rootElement, path);
      break;
    case '/resume':
      rootElement.innerHTML = Resume();
      // console.log(rootElement, path);
      break;
    case '/curriculum-download':
      rootElement.innerHTML = Curriculum();
      // console.log(rootElement, path);
      break;
    default:
      rootElement.innerHTML = await handleDynamicPath(path);
      // console.log(rootElement, path: function handleDynamicPath);
  }
}

// evita o coportamento padrão da Tag anchor "A"
export function preventDefaultRouter(event: Event) {
  const target = event.target as HTMLAnchorElement;
  if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('/')) {
    event.preventDefault();
    history.pushState(null, '', target.href); // Atualiza a URL sem recarregar a página
    navigateTo(target.pathname, document.getElementById('app')!);
  }
}

async function handleDynamicPath(path: string): Promise<string> {
  // Verifica se o caminho começa com '/experience/'
  if (path.startsWith('/experience/')) {
    const experienceId = path.split('/').pop(); // Extrai o ID da experiência da URL
    if (experienceId) {
      return await Experience(experienceId); // Retorna o conteúdo da página de experiência com o ID
    }
  }

  // Verifica se o caminho começa com '/project/'
  if (path.startsWith('/project/')) {
    const projectId = path.split('/').pop(); // Extrai o ID do projeto da URL
    if (projectId) {
      return await Project(projectId); // Retorna o conteúdo da página do projeto com o ID
    }
  }

  return '<h1>404 Not Found</h1>';
}