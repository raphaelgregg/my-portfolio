/**
 * Abre a janela de impressão do navegador, de onde o PDF é salvo
 * ("Salvar como PDF"). Usa o CSS @media print da página, então o PDF sai com
 * o mesmo layout da tela, texto selecionável e links clicáveis.
 *
 * O título do documento vira o nome sugerido do arquivo.
 */
export function printAsPdf(fileTitle: string): void {
  const originalTitle = document.title
  document.title = fileTitle

  window.addEventListener(
    'afterprint',
    () => (document.title = originalTitle),
    {
      once: true,
    },
  )
  window.print()
}
