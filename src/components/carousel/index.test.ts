import { describe, expect, it } from 'vitest'
import { getActiveStop, getStopCount, getStopOffset } from './index'

describe('getStopCount', () => {
  // 4 cards de 290px com 24px de espaço: conteúdo de 1232px, passo de 314px
  const step = 314

  it('uma parada quando tudo cabe', () => {
    expect(getStopCount(900, 955, step)).toBe(1)
    expect(getStopCount(955, 955, step)).toBe(1)
  })

  it('uma parada por card que não cabe, mais a inicial', () => {
    expect(getStopCount(1232, 955, step)).toBe(2) // 277px a rolar: cabe em 1 passo
    expect(getStopCount(1232, 600, step)).toBe(3) // 632px a rolar: 3 paradas (0, 314, fim)
    expect(getStopCount(1232, 290, step)).toBe(4) // celular: 1 card por vez
  })

  it('uma sobra pequena não cria uma parada quase igual à anterior', () => {
    // 632px a rolar = 2 passos (628) + 4px: as paradas são 0, 314 e 632
    expect(getStopCount(1232, 600, step)).toBe(3)
    expect(getStopCount(1232 + 100, 600, step)).toBe(4) // sobra de 100px (32% do card): conta
  })

  it('passo inválido → 1 parada', () => {
    expect(getStopCount(2000, 500, 0)).toBe(1)
  })
})

describe('getActiveStop e getStopOffset', () => {
  const maxScroll = 277
  const step = 314
  const stops = 2

  it('identifica a parada pela posição de rolagem', () => {
    expect(getActiveStop(0, maxScroll, step, stops)).toBe(0)
    expect(getActiveStop(100, maxScroll, step, stops)).toBe(0)
    expect(getActiveStop(200, maxScroll, step, stops)).toBe(1)
    expect(getActiveStop(maxScroll, maxScroll, step, stops)).toBe(1)
  })

  it('a última parada é o fim exato da rolagem', () => {
    expect(getStopOffset(0, maxScroll, step, stops)).toBe(0)
    expect(getStopOffset(1, maxScroll, step, stops)).toBe(maxScroll)
    expect(getStopOffset(5, maxScroll, step, stops)).toBe(maxScroll)
  })

  it('com uma parada só, sempre a 0', () => {
    expect(getActiveStop(50, 0, step, 1)).toBe(0)
  })
})
