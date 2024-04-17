import { Resume } from './pages/resume';
import { navigateTo } from './routes';

export function createApp(rootElement: HTMLElement) {
  navigateTo(window.location.pathname, rootElement);
  rootElement.innerHTML = Resume();
}

window.addEventListener('popstate', () => {
  navigateTo(window.location.pathname, document.getElementById('app')!);
});