import { Footer } from '../../components/footer'
import { Header } from '../../components/header'
import { HTMLToPDF } from '../../utils/htmlToPDF'
import { Curriculum } from './download'
import { ResumeFirstPage, ResumeSecondPage } from './resumeContent'

import './styles.css'

const DOWNLOAD_FILENAME = 'curriculo-raphaelgregg.pdf'

/** Liga o botão de download (existe só na página /resume). */
export function setupCurriculumDownload() {
  document.getElementById('btn-download')?.addEventListener('click', () => {
    HTMLToPDF({ htmlString: Curriculum(), filename: DOWNLOAD_FILENAME })
  })
}

export function Resume() {
  return `
  ${Header()}

  <div class="resume-container">
    <div class="resume-wrapper">
      <button id="btn-download" aria-label="Baixar currículo em PDF"><i class="file-down-icon" data-lucide="file-down"></i></button>

      ${ResumeFirstPage()}

      <div class="page-break"></div>
    </div>

    <div class="resume-wrapper">
      ${ResumeSecondPage()}
    </div>
  </div>
  ${Footer()}
  `
}
