import { Footer } from "../../components/footer";
import { Header } from "../../components/header";

export function Resume() {
  return `
    ${Header()}
   
    <div class="resume-container">
      <div class="resume-wrapper">
        <Header>
          <h2>Raphael Gregg</h2>
            
          <div>
            <p>raphaelgregg.com</p>
            <p>github.com/raphaelgregg</p>
            <p>linkedin.com/in/raphaelgregg</p>
          </div>
        </Header>

        <section>
          <h5>Experiência</h5>

          <div class="work-card">
            <div>
              <h4 class="work-title">Lanlink Informatica</h4>
                
              <h4 class="work-job">Técnico N2</h4>
                
              <div class="timeline">
                <span>Dez 2021 - Presente</span>
                  |
                <span>Vitória, ES</span>
              </div>

              <p class="work-description">Developed high-fidelity mockups for SaluTemp's mobile application aimed at accurately informing the state of temperature-sensitive medications.</p>
            </div>
          </div>
        </section>


        <section>
          <h5>Educação</h5>

          <div class="work-card">
            <div>
              <h4 class="work-title">Universidade da Amazônia</h4>
                
              <span class="timeline">Dez 2013 - Jan 2017 | Belém, PA</span>

              <p class="work-description">Developed high-fidelity mockups for SaluTemp's mobile application aimed at accurately informing the state of temperature-sensitive medications.</p>
            </div>
          </div>
        </section>

        <section class="skillset">
          <h5>Habilidades</h5>

          <div class="work-card">
            <div>
              <h4 class="work-title">Design</h4>

              <p class="work-description">Fron-end Developer, Analista de Sistemas </p>
            </div>
          </div>

          <div class="work-card">
            <div>
              <h4 class="work-title">Ferramentas</h4>

              <p class="work-description">Figma, Html, CSS, Javascript, TypeScript, Reacjs</p>
            </div>
          </div>
        </section>
      </div>
    </div>
    
    ${Footer()}
  `;
}