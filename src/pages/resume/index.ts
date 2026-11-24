import { Footer } from '../../components/footer'
import { Header } from '../../components/header'
import { printAsPdf } from '../../utils/printAsPdf'
import { setupResumePager } from './pager'
import { ResumeSheet } from './resumeContent'

export { setupResumePager }

import './styles.css'

/** Nome sugerido pelo navegador ao salvar o PDF (vem do título da página). */
const PDF_FILE_TITLE = 'Curriculo - Raphael Gregg'

/** Liga o botão "Baixar PDF" (existe só na página /resume). */
export function setupCurriculumDownload() {
  document
    .getElementById('btn-download')
    ?.addEventListener('click', () => printAsPdf(PDF_FILE_TITLE))
}

export function Resume() {
  return `
    ${Header()}

    <main id="conteudo" class="resume-container">
      <div class="cv-paper">
        <button
          id="btn-download"
          type="button"
          aria-label="Baixar currículo em PDF"
          title="Baixar PDF"
        >
          <i class="file-down-icon" data-lucide="file-down" aria-hidden="true"></i>
        </button>

        <div class="cv-viewport">${ResumeSheet()}</div>
      </div>

      <div class="cv-pager" role="group" aria-label="Páginas do currículo" hidden>
        <button id="cv-prev" type="button" aria-label="Página anterior">
          <i data-lucide="chevron-left" aria-hidden="true"></i>
        </button>
        <p id="cv-page-status" aria-live="polite">Página 1 de 1</p>
        <button id="cv-next" type="button" aria-label="Próxima página">
          <i data-lucide="chevron-right" aria-hidden="true"></i>
        </button>
      </div>
    </main>
    ${Footer()}
  `
}
