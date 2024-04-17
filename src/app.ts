
import { navigateTo } from './routes';

// "createApp" inicializar sua aplicação, garantindo que o componente correto seja renderizado na página conforme a URL atua
export function createApp(rootElement: HTMLElement) {
  // window.location.pathname é uma propriedade que retorna o caminho da URL atual da página
  navigateTo(window.location.pathname, rootElement);
}

// Adicionar evento ouvinte "popstate" ao objeto window, evento acionado sempre que navegador volta ou avança
window.addEventListener('popstate', () => {
  // chama a função navigateTo com o caminho atual da URL (window.location.pathname) e o elemento raiz da sua aplicação (document.getElementById('app')). Isso garante que, sempre que houver uma mudança na URL, o componente correspondente será renderizado dentro do elemento app
  navigateTo(window.location.pathname, document.getElementById('app')!);
});