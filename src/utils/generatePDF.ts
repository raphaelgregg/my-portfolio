import html2pdf from 'html2pdf.js';

interface GeneratePDFProps {
  htmlContent: string;
  filename: string;
}

export function generatePDF({ htmlContent, filename }: GeneratePDFProps) {
  try {
    // Configurações do PDF
    const options = {
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Obter o elemento HTML correspondente ao seletor
    const element = document.querySelector(htmlContent);

    // Gerar PDF a partir do conteúdo HTML
    html2pdf().set(options).from(element as HTMLElement).save();

    console.log('PDF gerado com sucesso:', filename);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
  }
}



export const setupCurriculumDownload = () => {
  const curriculumDownload = document.getElementById('btn-download');
  
  curriculumDownload?.addEventListener('click', () => {
    generatePDF({
      htmlContent: '.resume-wrapper',
      filename: 'curriculo-raphaelgregg.pdf',
    });
  });
};