const HIDDEN_CLASS = 'is-hidden'

/**
 * Esconde o cabeçalho ao rolar para baixo e o mostra ao rolar para cima.
 * O cabeçalho é renderizado a cada troca de página, então ele é buscado
 * a cada evento em vez de guardado.
 */
export function initHideOnScroll(): void {
  let lastScrollY = window.scrollY

  window.addEventListener(
    'scroll',
    () => {
      const isScrollingUp = window.scrollY < lastScrollY
      document
        .getElementById('hide-header')
        ?.classList.toggle(HIDDEN_CLASS, !isScrollingUp)
      lastScrollY = window.scrollY
    },
    { passive: true },
  )
}
