import { Footer } from "../../components/footer";
import { Header } from "../../components/header";



export function Resume() {

  return `
  ${Header()}
  
  <div class="resume-container"> 
  <div class="resume-wrapper">
  <button id="btn-download"><i class="file-down-icon" data-lucide="file-down"></i></button>

    <header>
      <h2>Raphael Gregg</h2>
        
      <div>
        <a href="https://raphaelgregg.vercel.app/" target="_blank">raphaelgregg.vercel.app</a>
        <a href="https://github.com/raphaelgregg" target="_blank">github.com/raphaelgregg</a>
        <a href="https://www.linkedin.com/in/raphaelgregg" target="_blank">linkedin.com/in/raphaelgregg</a>
      </div>
    </header>

    <section>
      <h5>Experiência</h5>

      <div class="work-list">
        <div class="work-card">
            <h4 class="work-title">Lanlink Serviços de Informática SA<span class="work-job"> - Técnico Nível 2</span></h4>
              
            <span class="timeline">Dez 2021 - Presente | Vitória, ES</span>

            <p class="work-description">Atendimento e suporte aos usuários no Ministérios Público do Espírito
            Santo, apoio as equipes de 3º e 1º nível.</p>
        </div>

        <div class="work-card">
            <h4 class="work-title">Lanlink Serviços de Informática SA<span class="work-job"> - Técnico Nível 2</span></h4>
              
            <span class="timeline">Dez 2021 - Mai 2022 | Pará, PA</span>

            <p class="work-description">Atendimento e suporte aos usuários no Tribunal de Justiça do Pará
            , participação na troca do parque técnologico nos forúns do estado.</p>
        </div>

        <div class="work-card">
          <h4 class="work-title">Freelancer Projeto Web <span class="work-job"> - Desenvolvedor Front-end</span></h4>
              
          <span class="timeline">Set 2021 - Nov 2022 | Belém, PA</span>

          <p class="work-description">Desenvolviemnto da API Front-end e layout do projeto dashboard para gerenciamento de processos juridicos, no qual, gerenciava processos e clientes.
          App construido em ReactJS e Firebase para armazenamento de dados.
          </p>
        </div>

        <div class="work-card">
          <h4 class="work-title">Freelancer Projeto Mobile <span class="work-job">- Desenvolvedor Mobile</span></h4>
              
          <span class="timeline">Jul 2021 - Ago 2022 | Belém, PA</span>

          <p class="work-description">Desenvolviemnto da Aplicativo Android elaborado como ferramenta de ensino-aprendizagem, no qual, você pode aprender técnicas sobre multiletramentos e práticas discursivas em sala de
          aula, apresentado como tese de mestrado na Universidade do Estado do Pará.
          Aplicativo foi construido em React Native com Expo e Firebase para Api Back-end.
          </p>
        </div>
      </div>
    </section>

    <section class="education">
      <h5>Educação</h5>

      <div class="education-list">
        <div class="education-card">
          <h4 class="education-title">Universidade da Amazônia</h4>
            
          <span class="timeline">Jan 2014 - Mar 2017 | Belém, PA</span>

          <p class="education-description">
          Tecnólogo em Análise e Desenvolvimento de Sistemas , Área de estudo
          Desenvolvimento de sistemas.
          </p>
        </div>

        <div class="education-card">
          <h4 class="certification-title">Certificados</h4>

          <p class="certification-description">
          Semana Omnistack 11, MD-100 Windows Client, Scrum Foundation Professional - SFPC, Análise de Requisitos de Software com Histórias de Usuários, Certificado Bootcamp GoStack 12.  
          </p>
        </div>
    </section>

    <section class="skillset">
      <h5>Habilidades</h5>
      <div class="skillset-list">
        <div class="skillset-card">
            <h4 class="skillset-title">Ferramentas</h4>

            <p class="skillset-description">Figma, Html, CSS, Javascript, TypeScript, Reacjs, React Native</p>
        </div>
      </div>
    </section>
  </div>
</div>

  ${Footer()}
  `;
}