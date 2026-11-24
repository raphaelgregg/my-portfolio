interface HTMLToPDFProps {
  htmlString: string
  filename: string
}

/** Gera e baixa um PDF a partir de uma string HTML. */
export async function HTMLToPDF({ htmlString, filename }: HTMLToPDFProps) {
  try {
    // Carregada só ao clicar em "baixar": a lib é pesada e a maioria dos
    // visitantes nunca a usa.
    const { default: html2pdf } = await import('html2pdf.js')

    await html2pdf()
      .set({
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      })
      .from(htmlString)
      .save()
  } catch (error) {
    console.error('Erro ao gerar PDF:', error)
  }
}
