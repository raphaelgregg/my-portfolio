import { Router } from './router';

export function createApp() {
  //@ts-ignore
  const router = new Router();

  // Initialize router
  window.addEventListener('DOMContentLoaded', () => {
    router.navigate(window.location.pathname);
  });

  window.addEventListener('popstate', () => {
    router.navigate(window.location.pathname);
  });

  return {
    mount(selector: string) {
      const root = document.querySelector(selector);
      if (root) {
        router.mount(root);
      } else {
        console.error('Root element not found');
      }
    }
  };
}
