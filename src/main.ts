import './styles/global.css';
import App from './app.ts';
import Home from './pages/home/index.ts';
import About from './pages/about/index.ts';
import Resume from './pages/resume/index.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `${App}`;



const navigation = (url: any) => {
  history.pushState(null, "null", url);
  router(); 
}

const router = async () => {
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


// import routes from './routes.js';

// seleciona div principal da index
// const app = document.querySelector<HTMLDivElement>('#app');


// const init = () => window.addEventListener('hashchange', renderPage);
    
// //@ts-ignore
// const validateHash = (hash) => hash === "" ? 'home' : hash.replace('#', '');

// const renderPage =() => {
//   const page = validateHash(window.location.hash);
//   app!.innerHTML = '';
//     //@ts-ignore
//     app!.appendChild(routes[page]);
// }

//   window.addEventListener('load', () => {
//     renderPage();
//     init();
//   })


// import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
