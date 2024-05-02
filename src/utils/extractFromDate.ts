// Definindo um tipo para os diferentes formatos de data suportados
type DateFormat = 'full' | 'text' | 'custom' | 'year';

// Método para extrair partes específicas de uma data
export function extractFromDate(dateString: string, format: DateFormat): string | null {
  if (!dateString) {
    console.log("Data não fornecida");
    return null;
  }

  const data = new Date(dateString);

  switch (format) {
    case 'full':
      return data.toISOString(); // Retorna a data completa no formato ISO
    case 'text':
      return data.toDateString(); // Retorna a data em texto
    case 'year':
      return data.getFullYear().toString(); // Retorna a data em texto
    case 'custom':
      // Retorna a data no formato personalizado, aqui você pode adicionar sua lógica de formatação personalizada
      return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    default:
      console.log("Formato de data inválido");
      return null;
  }
}
