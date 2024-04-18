import { About } from "../pages/about";
import { Home } from "../pages/home";
import { Resume } from "../pages/resume";
import { Curriculum } from "../pages/resume/download";

// recebe o caminho da url atual na pagina e o elemento html, para retornar o conteudo de pagina referente
export function navigateTo(path: string, rootElement: HTMLElement) {
  switch (path) {
    case '/':
      rootElement.innerHTML = Home();
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
      rootElement.innerHTML = '<h1>404 Not Found</h1>';
      // console.log(rootElement, path);
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