import { ChevronLeft, ChevronRight, createIcons, FileDown } from 'lucide'
import { initHideOnScroll } from './components/header/hide-on-scroll'
import { setupCurriculumDownload, setupResumePager } from './pages/resume'
import { Loading } from './pages/status'
import { navigateTo } from './routes'

import './styles/global.css'
import './styles/queries.css'

/** Só mostra "Carregando…" se a página demorar; carregamentos rápidos não piscam. */
const LOADING_DELAY_MS = 250

/** Link interno que deve ser tratado pelo roteador (sem recarregar a página). */
function getInternalLink(event: MouseEvent): HTMLAnchorElement | null {
  const link = (event.target as Element).closest('a')
  const isPlainLeftClick =
    event.button === 0 &&
    !(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)

  if (!link || !isPlainLeftClick || link.target === '_blank') return null
  return link.origin === window.location.origin ? link : null
}

/** Vai para a âncora da URL (#projetos) ou, sem âncora, para o topo. */
function scrollToHashOrTop() {
  const target = window.location.hash
    ? document.querySelector(window.location.hash)
    : null

  if (target) target.scrollIntoView()
  else window.scrollTo({ top: 0, behavior: 'instant' })
}

/** Leva o foco ao conteúdo para leitores de tela, já que a página não recarrega. */
function focusMainContent() {
  const main = document.getElementById('conteudo')
  main?.setAttribute('tabindex', '-1')
  main?.focus({ preventScroll: true })
}

export function createApp(rootElement: HTMLElement) {
  // Renderiza a página e liga o que depende do HTML recém-criado
  const render = async () => {
    const loadingTimer = setTimeout(() => {
      rootElement.innerHTML = Loading()
    }, LOADING_DELAY_MS)

    await navigateTo(window.location.pathname, rootElement)
    clearTimeout(loadingTimer)

    setupCurriculumDownload()
    setupResumePager()
    createIcons({ icons: { FileDown, ChevronLeft, ChevronRight } })
  }

  // Navegação interna sem recarregar a página
  document.addEventListener('click', (event) => {
    const link = getInternalLink(event)
    if (!link) return

    const isSamePage = link.pathname === window.location.pathname

    // Âncora na mesma página: o navegador já rola até ela
    if (isSamePage && link.hash) return

    event.preventDefault()
    history.pushState(null, '', link.href)

    if (isSamePage) {
      scrollToHashOrTop()
      return
    }

    render().then(() => {
      scrollToHashOrTop()
      focusMainContent()
    })
  })

  // Botões voltar/avançar do navegador
  window.addEventListener('popstate', () => render().then(scrollToHashOrTop))

  initHideOnScroll()
  render().then(() => {
    if (window.location.hash) scrollToHashOrTop()
  })
}
