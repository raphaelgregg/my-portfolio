const longDateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  // Datas vêm como "AAAA-MM-DD" (UTC); sem isso o dia mudaria em fusos como o do Brasil.
  timeZone: 'UTC',
})

const monthYearFormatter = new Intl.DateTimeFormat('pt-BR', {
  month: 'short',
  year: 'numeric',
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

/** Valor usado no banco para "ainda trabalho aqui". */
const PRESENT = 'presente'

/** "2021-12-07" → "dez 2021" (vazio se a data for inválida). */
export function formatMonthYear(isoDate?: string): string {
  const date = parseDate(isoDate)
  if (!date) return ''

  const parts = monthYearFormatter.formatToParts(date)
  const month = parts.find((part) => part.type === 'month')?.value ?? ''
  const year = parts.find((part) => part.type === 'year')?.value ?? ''
  return `${month.replace('.', '')} ${year}`
}

/** "dez 2021 – Presente" a partir das datas de entrada e saída. */
export function formatPeriod(
  hireDate?: string,
  departureDate?: string,
): string {
  const start = formatMonthYear(hireDate)
  if (!start) return ''

  const end =
    departureDate === PRESENT ? 'Presente' : formatMonthYear(departureDate)
  return end ? `${start} – ${end}` : start
}

function pluralize(amount: number, singular: string, plural: string): string {
  return `${amount} ${amount === 1 ? singular : plural}`
}

/**
 * "5 anos e 3 meses". Conta os meses de forma inclusiva (como o LinkedIn):
 * de dez/2021 a dez/2021 é 1 mês. "presente" vai até `now`.
 */
export function formatDuration(
  hireDate?: string,
  departureDate?: string,
  now: Date = new Date(),
): string {
  const start = parseDate(hireDate)
  const end = departureDate === PRESENT ? now : parseDate(departureDate)
  if (!start || !end) return ''

  const months =
    (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
    (end.getUTCMonth() - start.getUTCMonth()) +
    1
  if (months < 1) return ''

  const years = Math.floor(months / 12)
  const remainder = months % 12
  const parts = [
    years > 0 ? pluralize(years, 'ano', 'anos') : '',
    remainder > 0 ? pluralize(remainder, 'mês', 'meses') : '',
  ].filter(Boolean)

  return parts.join(' e ')
}
