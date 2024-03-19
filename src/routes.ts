import Home from './pages/home/index.ts';
import About from './pages/about/index.ts';
import Resume from './pages/resume/index.ts';

const navigation = (url: any) => {
  history.pushState(null, "null", url);
  router(); 
}

export const router = async () => {
  const routes = [
      {path: '/', view: Home},
      {path: '/about', view: About},
      {path: '/resume', view: Resume},
      // {path: '/resume', view: () => console.log('view resume')},
  ];

  // teste each route for potential match
  const matchesRouter = routes.map(route => {
    return {
      route: route,
      isMatch: location.pathname === route.path
    }
  });

  // console.log(matchesRouter)

  // Return routes finding matches
  let match = matchesRouter.find(matchesRouter =>  matchesRouter.isMatch);

  // console.log(match)

  // Return routes result raiz not finding matches 
  if(!match) {
    match = {
      route: routes[0],
      isMatch: true
    };
  }

  // console.log(match.route.view());

  const view = new match.route.view();

  document.querySelector<HTMLDivElement>("#app")!.innerHTML = await view.getHtml();
}

// Execute real event history reder page
window.addEventListener('popstate', router);

// targer.matches referencies object data-link and prevent default event and execute navigation
document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    if (e.target?.matches("[data-link]")) {
      console.log(e.target)
      e.preventDefault();
      navigation(e.target.href);
    }
  });

  router();
});