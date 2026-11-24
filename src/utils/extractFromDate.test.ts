import { describe, expect, it } from 'vitest'
import { formatLongDate, getYear } from './extractFromDate'

describe('formatLongDate', () => {
  it('formata em português', () => {
    expect(formatLongDate('2024-04-01')).toBe('1 de abril de 2024')
  })

  it('não muda o dia em fusos negativos (ex.: Brasil, UTC-3)', () => {
    // Em "AAAA-MM-DD" a data é meia-noite UTC; sem timeZone UTC viraria 31/03 no Brasil.
    const previousTimezone = process.env.TZ
    process.env.TZ = 'America/Belem'
    try {
      expect(formatLongDate('2024-04-01')).toBe('1 de abril de 2024')
    } finally {
      process.env.TZ = previousTimezone
    }
  })

  it('devolve vazio para data ausente ou inválida', () => {
    expect(formatLongDate(undefined)).toBe('')
    expect(formatLongDate('não é data')).toBe('')
  })
})

describe('getYear', () => {
  it('extrai o ano', () => {
    expect(getYear('2024-04-01')).toBe('2024')
    expect(getYear('2024-01-01')).toBe('2024')
  })

  it('devolve vazio para data inválida', () => {
    expect(getYear('')).toBe('')
  })
})
