import html2pdf from 'html2pdf.js';

interface HTMLToPDFProps {
  elementSelector?: string;
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

    if(elementSelector!){
      console.log(true + "elementSelector");
      // Retorna content da DOM pelo seletor informado
      const htmlContent = document.querySelector(elementSelector) as HTMLElement;
      // Gerar PDF a partir do elemento HTML selecionado
      html2pdf().set(options).from(htmlContent || '<p>html não encontrado!').save();
    }

    if (htmlString!) {
      console.log(true + "htmlString");
      // Gerar PDF a partir da string HTML
      html2pdf().set(options).from(htmlString || '<p>html não encontrado!').save();
    }
  
    console.log('PDF gerado com sucesso:', filename);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
  }
}

