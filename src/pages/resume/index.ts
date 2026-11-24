import { Footer } from '../../components/footer'
import { Header } from '../../components/header'
import { printAsPdf } from '../../utils/printAsPdf'
import { ResumeSheet } from './resumeContent'

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

        ${ResumeSheet()}
      </div>
    </main>
    ${Footer()}
  `
}
