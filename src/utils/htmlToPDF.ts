// import html2pdf from 'html2pdf.js';

// interface GeneratePDFProps {
//   htmlContent?: string;
//   pagesContent?: string[];
//   filename: string; 
// }

// export function HTMLToPDF({ htmlContent, filename }: GeneratePDFProps) {
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

interface HTMLToPDFProps {
  elementSelector?: string;
  pagesContent?: string[];
  htmlString?: string;
  cssCustom?: string;
  filename: string; 
}

export async function HTMLToPDF({ 
  elementSelector,
  htmlString, 
  cssCustom, 
  filename }: HTMLToPDFProps) {
  
    try {
    // Configurações do PDF
    const options = {
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      css: cssCustom
    };

  // Retorna content da DOM pelo seletor informado
  if(elementSelector!){
    console.log(true);
    // const htmlContent = document.querySelector(elementSelector);
  }

  if (htmlString!) {
    console.log(htmlString);
    // Obtém o HTML do elemento e encapsula em uma string CSS
    // const htmlContet = htmlString;    
    // Agora você pode usar htmlString e cssString com html2pdf
  }
  
    // Gerar PDF a partir da string HTML
    // html2pdf().set(options).from(htmlString || '').save();
    console.log('PDF gerado com sucesso:', filename);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
  }
}

