import App from './app.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `${App()}`;


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
