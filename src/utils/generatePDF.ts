// // Importe a biblioteca jsPDF
// import { jsPDF } from "jspdf";

// // Função para baixar o PDF
// export function generatePDF(containerSelector: string, filename: string) {
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

// export function generatePDF(containerSelector: string, filename: string) {
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


// import fs from "fs";
// import path from "path";
// import htmlPdf from "html-pdf";

// export function generatePDF(containerSelector: string, filename: string) {
//   // Captura o conteúdo HTML renderizado
//   const container = document.querySelector(containerSelector) as HTMLElement;

//   // Configurações do PDF
//   const options = {
//     format: "A4",
//     orientation: "portrait",
//     border: {
//       top: "0.5in",
//       right: "0.5in",
//       bottom: "0.5in",
//       left: "0.5in"
//     },
//   };

//   // Converte o HTML para PDF
//   htmlPdf.create(container, options).toFile(path.join(__dirname, `${filename}.pdf`), (err, res) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(res);
//     console.log(`PDF gerado em: ${res.filename}`);
//   });
// }

// import {jsPDF} from 'jspdf';
// import html2canvas from 'html2canvas';

// interface generatePDFProps {
//   containerSelector: string;
//   filename: string;
//   scale?: number;
//   orientation?: "portrait" | "landscape";
//   units?: "mm"| "cm" | "in" | "px" | "pc" | "em" | "ex",
//   format?: string;
// }
// export async function generatePDF({containerSelector, filename, scale, orientation, units, format}: generatePDFProps) {
//   try {
//     // Crie um novo objeto jsPDF
//     const doc = new jsPDF({
//       orientation: orientation,
//       unit: units,
//       format: format,
//     });

//     // Obtenha o elemento HTML correspondente ao seletor
//     const containerElement = document.querySelector(containerSelector);
//     // Obtenha a largura e a altura da div
//     const containerWidth = containerElement!.offsetWidth;
//     const containerHeight = containerElement!.offsetHeight;

//     console.log(containerHeight, containerWidth)

//     // Defina as dimensões do formato A4 em pixels (210 mm x 297 mm)
//     const a4WidthPx = 595; // (210 mm * 2.835)
//     const a4HeightPx = 842; // (297 mm * 2.835)

//     // Calcule a escala necessária para ajustar a div ao formato A4
//     const scaleWidth = a4WidthPx / containerWidth;
//     const scaleHeight = a4HeightPx / containerHeight;
//     const scale = Math.min(scaleWidth, scaleHeight);
    
//     // Defina a escala
//     //@ts-ignore
//     doc.scale(scale);

//     // // Verifique se o elemento HTML existe antes de continuar
//     // containerElement ? 
//       // Adicione o conteúdo HTML ao PDF
//       doc.html(containerElement as HTMLElement, {
//         x: 0,
//         y: 0,
//         html2canvas: { scale: 1 },
//         callback: () => {
//           // Salve o PDF com o nome de arquivo fornecido
//           doc.save(filename);
//         }
//       })
//   } catch (error) {
//     console.error('Erro ao gerar PDF:', error);
//   }
// }



import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

interface generatePDFProps {
  containerSelector: string;
  filename: string;
  scale?: number;
  orientation?: "portrait" | "landscape";
  units?: "mm"| "cm" | "in" | "px" | "pc" | "em" | "ex",
  format?: string;
}
export async function generatePDF({containerSelector, filename, scale, orientation, units, format}: generatePDFProps) {
  try {
    // Obter o elemento HTML correspondente ao seletor
    const containerElement = document.querySelector(containerSelector);

    // Converte o elemento em uma imagem usando html2canvas
    html2canvas(containerElement as HTMLElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      // Crie um novo objeto jsPDF com configurações
      const doc = new jsPDF({
              orientation: orientation,
      unit: units,
      format: format,
      });

      // Calcula a proporção da imagem para manter a largura do documento PDF
      const pdfWidth = doc.internal.pageSize.getWidth();
      // const pdfHeight = doc.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      // Adiciona a imagem ao PDF
      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight); // ajuste de tamanho para A4


      // Baixa o arquivo PDF
      doc.save(filename);
    });

  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
  }
}
