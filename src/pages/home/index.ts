import { Card } from '../../components/card';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';

export function Home() {
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = `
      ${Header()}
      <section class="brief">
      <img src="./src/assets/svg/hero.svg" alt=""/>
       
      <h1>
        Olá!
        <br/>
        Eu sou o Gregg,
        <br/> 
        <span class="gradient-text">dev front-end</span> com paixão por projetos web e mobile.
      </h1>

      <div>
        <p>Estudando <a>Desenvolvimento Front-end</a></p>
        <p>Trabando na <a href="https://www.lanlink.com.br/" target="_blank">Lanlink Serviços de informática</a></p>
        <p>Analista de Sistemas em <a href="https://www.unama.br/" target="_blank">Unama</a></span></p>      </div>
    </section>

    <section class="portfolio">
      <h3>Projetos</h3>

      <div class="cards scroll">
        ${Card()}
        ${Card()}
        ${Card()}
      </div>
    </section>

    ${Footer()}
    `;
  }
}
