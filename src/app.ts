import { createIcons, FileDown } from 'lucide'
import { initHideOnScroll } from './components/header/hide-on-scroll'
import { setupCurriculumDownload } from './pages/resume'
import { navigateTo } from './routes'

import './styles/global.css'
import './styles/queries.css'

/** Link interno que deve ser tratado pelo roteador (sem recarregar a página). */
function getInternalLink(event: MouseEvent): HTMLAnchorElement | null {
  const link = (event.target as Element).closest('a')
  const isPlainLeftClick =
    event.button === 0 && !(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)

  if (!link || !isPlainLeftClick || link.target === '_blank') return null
  return link.origin === window.location.origin ? link : null
}

export function createApp(rootElement: HTMLElement) {
  // Renderiza a página e liga o que depende do HTML recém-criado
  const render = async () => {
    await navigateTo(window.location.pathname, rootElement)
    setupCurriculumDownload()
    createIcons({ icons: { FileDown } })
  }

  // Navegação interna sem recarregar a página
  document.addEventListener('click', (event) => {
    const link = getInternalLink(event)
    if (!link) return

    event.preventDefault()
    history.pushState(null, '', link.href)
    // instant: o CSS global usa scroll-behavior: smooth, que animaria a rolagem
    render().then(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  })

  // Botões voltar/avançar do navegador
  window.addEventListener('popstate', render)

  initHideOnScroll()
  render()
}
