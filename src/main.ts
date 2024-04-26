import { createIcons, FileDown } from 'lucide';
import { createApp } from './app.ts';
import { setupCurriculumDownload } from './pages/resume/index.ts';

// "DOMContentLoaded" é um evento que é acionado quando o documento HTML foi completamente carregado e analisado, sem esperar por folhas de estilo, imagens e subframes para finalizar o carregamento. Isso significa que, quando o evento DOMContentLoaded é disparado, todos os elementos do DOM estão acessíveis e podem ser manipulados por scripts
document.addEventListener('DOMContentLoaded', () => {
  init();
});

// Função de inicialização,
function init() {
  console.log('A página foi totalmente carregada e o DOM está acessível.');
    
  // Outras operações de inicialização aqui...
  // Código para ser executado quando a página estiver completamente carregada
  const rootElement = document.getElementById('app');
  rootElement ? createApp(rootElement) : console.error('Element with id "app" not found.');

  // Criar curriculo a partir de elemento Html utilizando html2pdf/utils
  setupCurriculumDownload();
  
  // Caution, this will import all the icons and bundle them.
  createIcons({ 
    icons: {
      FileDown
    } 
  });
}