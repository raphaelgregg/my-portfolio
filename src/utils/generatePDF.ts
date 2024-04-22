// import html2pdf from 'html2pdf.js';

// interface GeneratePDFProps {
//   htmlContent?: string;
//   pagesContent?: string[];
//   filename: string; 
// }

// export function generateHTMLToPDF({ htmlContent, filename }: GeneratePDFProps) {
//   try {
//     // Configurações do PDF
//     const options = {
//       filename: filename,
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//     };

//     // Obter o elemento HTML correspondente ao seletor
//     const element = document.querySelector(htmlContent!);

//     // Gerar PDF a partir do conteúdo HTML
//     html2pdf().set(options).from(element as HTMLElement).save();

//     console.log('PDF gerado com sucesso:', filename);
//   } catch (error) {
//     console.error('Erro ao gerar PDF:', error);
//   }
// }


import html2pdf from 'html2pdf.js';

interface GeneratePDFProps {
  elementSelector?: string;
  pagesContent?: string[];
  filename: string; 
}

export async function generateHTMLToPDF({ elementSelector, filename }: GeneratePDFProps) {
  try {
    // Configurações do PDF
    const options = {
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Retorna content da Dom pelo seletor informado
    const htmlContent = document.querySelector(elementSelector!);

    const button = document.getElementById('btn-download');
    if (button) button.style.visibility = 'hidden'; // Oculta o botão

    // Gerar PDF a partir da string HTML
    html2pdf().set(options).from(htmlContent as HTMLElement || '').save();
    
    if (button) button.style.display = 'block';
    
    console.log('PDF gerado com sucesso:', filename);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
  }
}

