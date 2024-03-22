import { Card } from '../../components/card';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header';

export function Home() {
  return `
      ${Header()}
      <div class="home-container">
        <section class="brief">
          <div class="brief-wrapper">
            <img src="/svg/hero.svg" alt=""/>
            
            <div>
              <h1>
                Olá!
                <br/>
                Eu sou o Gregg,
                <br/> 
                <span class="gradient-text">dev front-end</span> aficionado por projetos web e Mobile.
              </h1>

    
              <p>Analista de sistemas formado pela <a href="https://www.unama.br/" target="_blank">Unama</a></span></p>      
              <p>futuro especialista em <a>desenvolvimento front-end</a></p>
              <p>Atualmente, parte da equipe de trabalho da <a href="https://www.lanlink.com.br/" target="_blank">Lanlink Informática</a></p>
            </div>
          </div>
        </section>

        <section class="portfolio">
          <div class="portfolio-wrapper">
            <div class="portfolio-wrapper-section-header">
              <h4>Selecione um Projeto</h4>
              <p>Para que você conheça um pouco mais do meu trabalho</p>
            </div>
        
            <div class="cards">
              ${Card()}
              ${Card()}
              ${Card()}
              ${Card()}
            </div>
          </div>
        </section>
      </div>
    ${Footer()}
    `
}
