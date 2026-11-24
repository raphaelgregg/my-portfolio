/**
 * Paginação do currículo na tela (telas largas): cada "página" é uma folha A4
 * e o conteúdo é dividido pelo próprio CSS (colunas de altura A4). A rolagem
 * horizontal do .cv-viewport troca de página. O PDF não usa isto: a impressão
 * flui em páginas normais com as mesmas medidas.
 */

/** Largura mínima da tela para mostrar a folha A4 inteira (ver styles.css). */
const PAGED_MIN_WIDTH = '(min-width: 840px)'

/** Quantas páginas cabem na largura rolável (as colunas extras passam do viewport). */
export function getPageCount(scrollWidth: number, pageWidth: number): number {
  if (pageWidth <= 0) return 1
  // O último pedaço tem a margem direita a menos; o "- 1" absorve arredondamentos
  return Math.max(1, Math.ceil((scrollWidth - 1) / pageWidth))
}

export function clampPage(page: number, pageCount: number): number {
  return Math.min(Math.max(page, 0), pageCount - 1)
}

const SCROLL_SETTLE_MS = 120

export function setupResumePager(): void {
  const viewport = document.querySelector<HTMLElement>('.cv-viewport')
  const sheet = viewport?.querySelector<HTMLElement>('.cv-sheet')
  const pager = document.querySelector<HTMLElement>('.cv-pager')
  const prevButton = document.getElementById(
    'cv-prev',
  ) as HTMLButtonElement | null
  const nextButton = document.getElementById(
    'cv-next',
  ) as HTMLButtonElement | null
  const status = document.getElementById('cv-page-status')

  if (!viewport || !sheet || !pager || !prevButton || !nextButton || !status)
    return

  const isPaged = window.matchMedia(PAGED_MIN_WIDTH)
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  )
  let pageCount = 1
  let settleTimer: number | undefined

  const currentPage = () =>
    clampPage(Math.round(viewport.scrollLeft / viewport.clientWidth), pageCount)

  const render = () => {
    const page = currentPage()
    pager.hidden = !isPaged.matches || pageCount < 2
    status.textContent = `Página ${page + 1} de ${pageCount}`
    prevButton.disabled = page === 0
    nextButton.disabled = page === pageCount - 1
  }

  const goTo = (page: number) => {
    viewport.scrollTo({
      left: clampPage(page, pageCount) * viewport.clientWidth,
      behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
    })
  }

  const measure = () => {
    const page = currentPage()

    // Mede com a folha de 1 página de largura: o excesso são as colunas extras
    sheet.style.removeProperty('--cv-pages')
    pageCount = isPaged.matches
      ? getPageCount(viewport.scrollWidth, viewport.clientWidth)
      : 1

    // A folha passa a ter exatamente N páginas de largura; sem isso a última
    // página não rola o bastante para alinhar (falta a margem direita)
    sheet.style.setProperty('--cv-pages', String(pageCount))

    // Medir encolheu a folha por um instante e o navegador limitou o scroll:
    // volta para a página em que o leitor estava
    viewport.scrollLeft = isPaged.matches
      ? clampPage(page, pageCount) * viewport.clientWidth
      : 0
    render()
  }

  prevButton.addEventListener('click', () => goTo(currentPage() - 1))
  nextButton.addEventListener('click', () => goTo(currentPage() + 1))

  // Rolagem manual (trackpad, foco por Tab): atualiza o contador e "encaixa" na página
  viewport.addEventListener(
    'scroll',
    () => {
      render()
      window.clearTimeout(settleTimer)
      settleTimer = window.setTimeout(() => {
        const aligned = viewport.scrollLeft % viewport.clientWidth === 0
        if (!aligned) goTo(currentPage())
      }, SCROLL_SETTLE_MS)
    },
    { passive: true },
  )

  // Setas do teclado; sai de cena sozinho quando a página é trocada
  const onKeyDown = (event: KeyboardEvent) => {
    if (!viewport.isConnected) {
      document.removeEventListener('keydown', onKeyDown)
      return
    }
    const target = event.target as HTMLElement
    if (target.closest('input, textarea, select')) return
    if (event.key === 'ArrowLeft') goTo(currentPage() - 1)
    if (event.key === 'ArrowRight') goTo(currentPage() + 1)
  }
  document.addEventListener('keydown', onKeyDown)

  // Recalcula quando o tamanho muda (janela, carregamento das fontes)
  new ResizeObserver(measure).observe(viewport)
  isPaged.addEventListener('change', measure)
  document.fonts?.ready.then(measure)
  measure()
}
