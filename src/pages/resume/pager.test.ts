import { describe, expect, it } from 'vitest'
import { clampPage, getPageCount } from './pager'

describe('getPageCount', () => {
  const pageWidth = 794

  it('uma página quando o conteúdo cabe na folha', () => {
    expect(getPageCount(794, pageWidth)).toBe(1)
    expect(getPageCount(740, pageWidth)).toBe(1)
  })

  it('conta cada coluna extra como uma página (a última perde a margem direita)', () => {
    // 2 páginas: 2 × 794 menos 16mm (~60px) de margem direita
    expect(getPageCount(2 * 794 - 60, pageWidth)).toBe(2)
    expect(getPageCount(3 * 794 - 60, pageWidth)).toBe(3)
  })

  it('tolera arredondamento de 1px', () => {
    expect(getPageCount(794 + 1, pageWidth)).toBe(1)
  })

  it('devolve 1 se a largura da página for inválida', () => {
    expect(getPageCount(1000, 0)).toBe(1)
  })
})

describe('clampPage', () => {
  it('mantém a página dentro dos limites', () => {
    expect(clampPage(-1, 3)).toBe(0)
    expect(clampPage(1, 3)).toBe(1)
    expect(clampPage(5, 3)).toBe(2)
  })
})
