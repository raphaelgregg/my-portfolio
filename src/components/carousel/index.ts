import './styles.css'

/**
 * Carrossel genérico de cards. Usa a rolagem horizontal nativa (com encaixe
 * por CSS scroll-snap), então funciona com toque, trackpad, teclado e roda do
 * mouse; o JS acrescenta botões, indicadores, arrastar com o mouse e a
 * animação de entrada. Os controles só aparecem se houver cards fora da tela.
 *
 * Uso: Carousel({ label, items }) devolve o HTML; setupCarousels() liga o
 * comportamento depois que a página é renderizada.
 */
interface CarouselProps {
  /** Nome da região para leitores de tela. */
  label: string
  /** HTML de cada card. */
  items: string[]
}

export function Carousel({ label, items }: CarouselProps): string {
  return `
    <div class="carousel" data-carousel>
      <div class="carousel-track" data-carousel-track role="region" aria-label="${label}">
        ${items.map((item, index) => `<div class="carousel-item" style="--i: ${index}">${item}</div>`).join('')}
      </div>

      <div class="carousel-controls" data-carousel-controls hidden>
        <button class="carousel-button" type="button" data-carousel-prev aria-label="Anterior">
          <i data-lucide="chevron-left" aria-hidden="true"></i>
        </button>
        <div class="carousel-dots" data-carousel-dots></div>
        <button class="carousel-button" type="button" data-carousel-next aria-label="Próximo">
          <i data-lucide="chevron-right" aria-hidden="true"></i>
        </button>
      </div>

      <p class="sr-only" aria-live="polite" data-carousel-status></p>
    </div>`
}

/**
 * Quantas posições de parada existem: a primeira é 0, a última é o fim da
 * rolagem, e entre elas uma a cada `step` pixels (a largura de um card).
 */
/** Fração de um card abaixo da qual a sobra de rolagem não cria uma parada nova. */
const STOP_TOLERANCE = 0.15

export function getStopCount(
  scrollWidth: number,
  clientWidth: number,
  step: number,
): number {
  const maxScroll = scrollWidth - clientWidth
  if (step <= 0 || maxScroll < 1) return 1
  // Uma sobra pequena (< 15% de um card) não vira uma parada própria
  return Math.ceil(maxScroll / step - STOP_TOLERANCE) + 1
}

/** A parada mais próxima da posição atual de rolagem. */
export function getActiveStop(
  scrollLeft: number,
  maxScroll: number,
  step: number,
  stopCount: number,
): number {
  if (stopCount <= 1 || step <= 0) return 0
  if (scrollLeft >= maxScroll - 2) return stopCount - 1
  return Math.min(Math.round(scrollLeft / step), stopCount - 1)
}

/** Posição de rolagem de uma parada (a última é o fim exato). */
export function getStopOffset(
  stop: number,
  maxScroll: number,
  step: number,
  stopCount: number,
): number {
  return stop >= stopCount - 1 ? maxScroll : stop * step
}

const DRAG_THRESHOLD_PX = 5
const SCROLL_SETTLE_MS = 120

function setupCarousel(root: HTMLElement): void {
  const track = root.querySelector<HTMLElement>('[data-carousel-track]')
  const controls = root.querySelector<HTMLElement>('[data-carousel-controls]')
  const dotsContainer = root.querySelector<HTMLElement>('[data-carousel-dots]')
  const prev = root.querySelector<HTMLButtonElement>('[data-carousel-prev]')
  const next = root.querySelector<HTMLButtonElement>('[data-carousel-next]')
  const status = root.querySelector<HTMLElement>('[data-carousel-status]')
  const items = [...root.querySelectorAll<HTMLElement>('.carousel-item')]

  if (!track || !controls || !dotsContainer || !prev || !next || !status) return

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let stopCount = 1
  let settleTimer: number | undefined

  const maxScroll = () => track.scrollWidth - track.clientWidth

  /** Distância entre o início de um card e o do próximo (card + espaço). */
  const step = () =>
    items.length > 1
      ? items[1].offsetLeft - items[0].offsetLeft
      : (items[0]?.offsetWidth ?? 0)

  const activeStop = () =>
    getActiveStop(track.scrollLeft, maxScroll(), step(), stopCount)

  const goTo = (stop: number) => {
    const clamped = Math.min(Math.max(stop, 0), stopCount - 1)
    track.scrollTo({
      left: getStopOffset(clamped, maxScroll(), step(), stopCount),
      behavior: reducedMotion.matches ? 'auto' : 'smooth',
    })
  }

  const renderState = () => {
    const stop = activeStop()
    prev.disabled = stop === 0
    next.disabled = stop === stopCount - 1

    dotsContainer.querySelectorAll('button').forEach((dot, index) => {
      if (index === stop) dot.setAttribute('aria-current', 'true')
      else dot.removeAttribute('aria-current')
    })

    // Cards que aparecem por inteiro na janela do carrossel
    const view = track.getBoundingClientRect()
    const visible = items
      .map((item, index) => ({ index, box: item.getBoundingClientRect() }))
      .filter(
        ({ box }) => box.left >= view.left - 2 && box.right <= view.right + 2,
      )
      .map(({ index }) => index + 1)
    status.textContent = visible.length
      ? `Mostrando ${visible[0]} a ${visible[visible.length - 1]} de ${items.length}`
      : ''
  }

  const measure = () => {
    stopCount = getStopCount(track.scrollWidth, track.clientWidth, step())
    const scrollable = stopCount > 1

    controls.hidden = !scrollable
    // Região rolável precisa ser alcançável pelo teclado
    if (scrollable) track.tabIndex = 0
    else track.removeAttribute('tabindex')

    dotsContainer.replaceChildren(
      ...Array.from({ length: stopCount }, (_, index) => {
        const dot = document.createElement('button')
        dot.type = 'button'
        dot.className = 'carousel-dot'
        dot.setAttribute(
          'aria-label',
          `Ir para a posição ${index + 1} de ${stopCount}`,
        )
        dot.addEventListener('click', () => goTo(index))
        return dot
      }),
    )
    renderState()
  }

  prev.addEventListener('click', () => goTo(activeStop() - 1))
  next.addEventListener('click', () => goTo(activeStop() + 1))

  track.addEventListener(
    'scroll',
    () => {
      renderState()
      window.clearTimeout(settleTimer)
      // Depois de arrastar, termina alinhado em uma parada
      settleTimer = window.setTimeout(() => {
        if (!track.classList.contains('is-dragging')) renderState()
      }, SCROLL_SETTLE_MS)
    },
    { passive: true },
  )

  setupMouseDrag(track, activeStop, goTo)
  setupEntranceAnimation(root, items)

  new ResizeObserver(measure).observe(track)
  measure()
}

/** Arrastar com o mouse (toque e trackpad já rolam nativamente). */
function setupMouseDrag(
  track: HTMLElement,
  activeStop: () => number,
  goTo: (stop: number) => void,
): void {
  let dragging = false
  let moved = false
  let startX = 0
  let startScroll = 0

  track.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    dragging = true
    moved = false
    startX = event.clientX
    startScroll = track.scrollLeft
  })

  track.addEventListener('pointermove', (event) => {
    if (!dragging) return
    const delta = event.clientX - startX

    if (!moved && Math.abs(delta) > DRAG_THRESHOLD_PX) {
      moved = true
      track.classList.add('is-dragging') // sem encaixe nem rolagem suave durante o arraste
      track.setPointerCapture(event.pointerId)
    }
    if (moved) track.scrollLeft = startScroll - delta
  })

  const endDrag = () => {
    if (!dragging) return
    dragging = false
    track.classList.remove('is-dragging')
    if (moved) goTo(activeStop())
  }
  track.addEventListener('pointerup', endDrag)
  track.addEventListener('pointercancel', endDrag)

  // Soltar o mouse sobre um card não deve abrir o link
  track.addEventListener(
    'click',
    (event) => {
      if (!moved) return
      event.preventDefault()
      event.stopPropagation()
      moved = false
    },
    true,
  )

  // Evita o "fantasma" de arrastar imagens e links
  track.addEventListener('dragstart', (event) => event.preventDefault())
}

/** Cards entram deslizando, um após o outro, quando o carrossel aparece. */
function setupEntranceAnimation(root: HTMLElement, items: HTMLElement[]): void {
  if (!('IntersectionObserver' in window)) return

  root.setAttribute('data-ready', '') // a partir daqui os cards começam escondidos
  items.forEach((item, index) => item.style.setProperty('--i', String(index)))

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      root.classList.add('is-visible')
      observer.disconnect()
    },
    { threshold: 0.2 },
  )
  observer.observe(root)
}

export function setupCarousels(): void {
  document
    .querySelectorAll<HTMLElement>('[data-carousel]')
    .forEach(setupCarousel)
}
