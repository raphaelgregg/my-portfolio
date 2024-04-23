declare module 'html2pdf.js' {
  interface Options {
    filename?: string;
    image?: { type: string; quality: number };
    margin?: [0,0,0,0];
    enableLinks?: true,
    html2canvas?: { scale: number };
    jsPDF?: { unit: string; format: string; orientation: string };
    css?: string;
  }

  interface Html2Pdf {
    set(options: Options): Html2Pdf;
    from(element: HTMLElement | string): Html2Pdf;
    save(): void;
  }

  const html2pdf: {
    (): Html2Pdf;
  };

  export default html2pdf;
}
