const longDateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  // Datas vêm como "AAAA-MM-DD" (UTC); sem isso o dia mudaria em fusos como o do Brasil.
  timeZone: 'UTC',
})

function parseDate(isoDate?: string): Date | null {
  if (!isoDate) return null
  const date = new Date(isoDate)
  return Number.isNaN(date.getTime()) ? null : date
}

/** "2024-04-01" → "1 de abril de 2024" (vazio se a data for inválida). */
export function formatLongDate(isoDate?: string): string {
  const date = parseDate(isoDate)
  return date ? longDateFormatter.format(date) : ''
}

/** "2024-04-01" → "2024" (vazio se a data for inválida). */
export function getYear(isoDate?: string): string {
  const date = parseDate(isoDate)
  return date ? String(date.getUTCFullYear()) : ''
}
