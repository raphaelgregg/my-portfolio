// // Importe a biblioteca jsPDF
// import { jsPDF } from "jspdf";

// // Função para baixar o PDF
// export function downloadPDF(containerSelector: string, filename: string) {
//   // Crie um novo documento PDF com jsPDF
//   const pdf = new jsPDF({
//     orientation: "portrait", // Orientation of the first page. Possible values are "portrait" or "landscape" (or shortcuts "p" or "l").
//     unit: "mm", //Measurement unit (base unit) to be used when coordinates are specified. Possible values are "pt" (points), "mm", "cm", "m", "in" or "px".
//     format: "a4", //The format of the first page 
//     putOnlyUsedFonts:true, // Only put fonts into the PDF, which were used.
//   });

//   // Selecione o elemento container pelo seletor
//   const container = document.querySelector(containerSelector) as HTMLElement;

//   // Aplique os estilos CSS ao conteúdo HTML antes de criar o PDF
//   // applyStyles(container);

//   // Crie o PDF com o conteúdo HTML
//   pdf.html(container, {
//     callback: function (pdf) {
//       // Salve o PDF com o nome especificado
//       pdf.save(filename);
//     }
//   });
// }

// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";

// export function downloadPDF(containerSelector: string, filename: string) {
//   // Captura o conteúdo HTML renderizado
//   const container = document.querySelector(containerSelector);
  
//   // Obtém o tamanho do conteúdo HTML
//   const contentWidth = container!.offsetWidth;
//   const contentHeight = container!.offsetHeight;

//   // Configurações do PDF
//   const pdf = new jsPDF({
//     orientation: "portrait",
//     unit: "mm",
//     format: "a4",
//   });

//   // Ajusta a escala do PDF conforme necessário
//   const scaleFactor = pdf.internal.pageSize.getWidth() / contentWidth;

//   // Captura o conteúdo HTML e adiciona ao PDF
//   html2canvas(container as HTMLElement, { scale: scaleFactor }).then(canvas => {
//     const imageData = canvas.toDataURL("image/jpeg");
//     pdf.addImage(imageData, "JPEG", 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    
//     // Salva o PDF
//     pdf.save(filename);
//   });
// }


import fs from "fs";
import path from "path";
import htmlPdf from "html-pdf";

export function downloadPDF(containerSelector: string, filename: string) {
  // Captura o conteúdo HTML renderizado
  const container = document.querySelector(containerSelector) as HTMLElement;

  // Configurações do PDF
  const options = {
    format: "A4",
    orientation: "portrait",
    border: {
      top: "0.5in",
      right: "0.5in",
      bottom: "0.5in",
      left: "0.5in"
    },
  };

  // Converte o HTML para PDF
  htmlPdf.create(container, options).toFile(path.join(__dirname, `${filename}.pdf`), (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(res);
    console.log(`PDF gerado em: ${res.filename}`);
  });
}
