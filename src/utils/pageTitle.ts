const SITE_NAME = 'Raphael Gregg'
const DEFAULT_TITLE = `${SITE_NAME} | Desenvolvedor Front-end`

/** Atualiza o título da aba a cada página (a SPA só tem um index.html). */
export function setPageTitle(pageTitle?: string): void {
  document.title = pageTitle ? `${pageTitle} | ${SITE_NAME}` : DEFAULT_TITLE
}
