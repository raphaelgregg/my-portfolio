import { About } from './pages/about';
import { Home } from './pages/home';
import { Resume } from './pages/resume';

export function Router() {
  const routes: { [key: string]: () => void } = {
      '/': Home,
      '/about': About,
      '/resume': Resume,
    };

  function navigate(pathname: string) {
    const routeHandler = routes[pathname];
    if (routeHandler) {
      routeHandler();
    } else {
      console.error('Route not found');
    }
  }

  function mount(root: Element) {
    root.addEventListener('click', (event: Event) => {
      if (event.target instanceof HTMLAnchorElement) {
        event.preventDefault();
        const href = event.target.getAttribute('href');
        if (href) {
          window.history.pushState({}, '', href);
          navigate(href);
        }
      }
    });

    const route = window.location.pathname;
    navigate(route);

  }
  
  // function notfound() {
  //   // Simulate React component rendering
  //   // const aboutComponent = new About();
  //   // aboutComponent.render();
  //   console.log("Render 404 page not found component here");
  // }

  return {
    mount
  };
}