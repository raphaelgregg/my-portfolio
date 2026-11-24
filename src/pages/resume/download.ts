import { ResumeFirstPage, ResumeSecondPage } from './resumeContent'

// Estilos aplicados apenas ao currículo gerado em PDF
const styles = `
  <style>
     #app {
      margin: 0 auto;
      display: grid;
      gap: 6rem;
     }

     .resume-page {
      max-width: 794px; 
      max-height: 1023px;
      min-height: 1023px;
      background-color: #fff;
     }

    .resume-wrapper {
      /* Estilos para o wrapper do currículo */
      padding: 3rem 5rem;
      border-radius: 0;
      height: 100%;
      width: 100%;
    }

    /* Outros estilos conforme necessário */
    .resume-wrapper section {
      display: grid;
      grid-template-columns: 1fr 3fr;
    }
  </style>
`;

/** HTML do currículo usado na geração do PDF e na rota /curriculum-download. */
export function Curriculum() {
  return `
  ${styles}

  <div class="resume-wrapper">
    ${ResumeFirstPage()}
  </div>

  <div class="page-break"></div>

  <div class="resume-wrapper">
    ${ResumeSecondPage()}
  </div>
  `;
}
