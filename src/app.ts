import { navigateTo } from './router.ts';

export function createApp(rootElement: HTMLElement) {
  navigateTo(window.location.pathname, rootElement);
}

window.addEventListener('popstate', () => {
  navigateTo(window.location.pathname, document.getElementById('app')!);
});