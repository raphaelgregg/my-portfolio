// Definindo um tipo para os diferentes formatos de data suportados
type DateFormat = 'full' | 'text' | 'custom' | 'custom-text' | 'year';

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
    case 'custom-text':
      // Retorna a data no formato personalizado, dia numérico, mês por extenso e ano numérico
      return `${data.getDate()} de ${getMonthName(data.getMonth())} de ${data.getFullYear()}`;
  
    default:
      console.log("Formato de data inválido");
      return null;
  }
}

// Função auxiliar para obter o nome do mês em português
function getMonthName(month: number): string {
  const months = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];
  return months[month];
}
