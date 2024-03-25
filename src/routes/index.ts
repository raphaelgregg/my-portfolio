import { About } from "../pages/about";
import { Home } from "../pages/home";
import { Resume } from "../pages/resume";

export function navigateTo(path: string, rootElement: HTMLElement) {
  switch (path) {
    case '/':
      rootElement.innerHTML = Home();
      console.log(rootElement, path);
      break;
    case '/about':
      rootElement.innerHTML = About();
      console.log(rootElement, path);
      break;
    case '/resume':
      rootElement.innerHTML = Resume();
      console.log(rootElement, path);
      break;
    default:
      rootElement.innerHTML = '<h1>404 Not Found</h1>';
      console.log(rootElement, path);
  }
}

export function preventDefaultRouter(event: Event) {
  const target = event.target as HTMLAnchorElement;
  if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('/')) {
    event.preventDefault();
    history.pushState(null, '', target.href);
    navigateTo(target.pathname, document.getElementById('app')!);
  }
}