import { describe, expect, it } from 'vitest'
import {
  formatDuration,
  formatLongDate,
  formatMonthYear,
  formatPeriod,
  getYear,
} from './extractFromDate'

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

describe('formatMonthYear', () => {
  it('abrevia o mês em português', () => {
    expect(formatMonthYear('2021-12-07')).toBe('dez 2021')
    expect(formatMonthYear('2012-03-01')).toBe('mar 2012')
  })

  it('devolve vazio para data inválida', () => {
    expect(formatMonthYear('')).toBe('')
    expect(formatMonthYear('xx')).toBe('')
  })
})

describe('formatPeriod', () => {
  it('formata período encerrado e em andamento', () => {
    expect(formatPeriod('2012-03-01', '2020-12-01')).toBe('mar 2012 – dez 2020')
    expect(formatPeriod('2021-12-07', 'presente')).toBe('dez 2021 – Presente')
  })

  it('só a entrada quando não há saída válida; vazio sem entrada', () => {
    expect(formatPeriod('2021-12-07', undefined)).toBe('dez 2021')
    expect(formatPeriod(undefined, 'presente')).toBe('')
  })
})

describe('formatDuration', () => {
  const now = new Date('2026-11-24T12:00:00Z')

  it('conta meses de forma inclusiva (igual ao LinkedIn)', () => {
    expect(formatDuration('2012-03-01', '2020-12-01', now)).toBe(
      '8 anos e 10 meses',
    )
    expect(formatDuration('2021-12-01', 'presente', now)).toBe('5 anos')
    expect(formatDuration('2026-04-01', 'presente', now)).toBe('8 meses')
  })

  it('usa singular e plural corretamente', () => {
    expect(formatDuration('2021-12-01', '2021-12-31', now)).toBe('1 mês')
    expect(formatDuration('2021-01-01', '2022-01-01', now)).toBe(
      '1 ano e 1 mês',
    )
  })

  it('devolve vazio se as datas forem inválidas ou invertidas', () => {
    expect(formatDuration(undefined, 'presente', now)).toBe('')
    expect(formatDuration('2022-01-01', '2021-01-01', now)).toBe('')
  })
})
