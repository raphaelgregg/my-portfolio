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
        <p>Desenveldor Front-end <span>Freelancer</span></p>
        <p>Trabando na <span>Lanlink Serviços de informática</span></p>
        <p>Granduado em <span>Unama</span></p>
      </div>
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
