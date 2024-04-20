import html2pdf from 'html2pdf.js';
import { Curriculum, pagesPDF } from '../pages/resume/download';

interface GeneratePDFProps {
  htmlContent?: string;
  pagesContent?: string[];
  filename: string; 
}

export function generatePDFToHTML({ htmlContent, filename }: GeneratePDFProps) {
  try {
    // Configurações do PDF
    const options = {
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // // Obter o elemento HTML correspondente ao seletor
    // const element = document.querySelector(htmlContent);

    // // Gerar PDF a partir do conteúdo HTML
    // html2pdf().set(options).from(element as HTMLElement).save();

    console.log('PDF gerado com sucesso:', filename);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
  }
}

async function generatePDF({ pagesContent, filename }: GeneratePDFProps) {
  try {
    if (!pagesContent || pagesContent.length === 0) {
      throw new Error('Nenhum conteúdo de página fornecido.');
    }

    // Configurações do PDF
    const options = {
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { 
        unit: 'in', 
        format: 'letter', 
        orientation: 'portrait'
      }
    };

    const pdf = html2pdf().set(options);

    // Para cada página de conteúdo
    for (const page of pagesContent) {
      // Adicionar a página de conteúdo ao PDF
      pdf.from(page);
    }
    
    // Salvar o PDF após todas as páginas terem sido adicionadas
    await pdf.outputPdf('save');


    console.log('PDF gerado com sucesso:', filename);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
  }
}


export const setupCurriculumDownload = () => {
  const curriculumDownload = document.getElementById('btn-download');

  curriculumDownload?.addEventListener('click', () => {
    // Supondo que pagesPDF seja uma lista de strings contendo o conteúdo HTML de cada página
    const curriculumContent = pagesPDF;
    generatePDF({
      pagesContent: curriculumContent,
      filename: 'curriculo-raphaelgregg.pdf',
    });
  });
};