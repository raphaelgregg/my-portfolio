import { describe, expect, it } from 'vitest'
import type { ExperienceDTO } from '../dtos/experienceDTO'
import {
  applyCareer,
  positions,
  sortedPositions,
  type Position,
} from './career'

const position = (overrides: Partial<Position>): Position => ({
  experienceId: '1',
  role: 'Cargo',
  company: 'Empresa',
  location: 'Cidade, UF',
  start: '2020-01-01',
  end: '2021-01-01',
  ...overrides,
})

describe('applyCareer', () => {
  const firebase: ExperienceDTO[] = [
    {
      id: '1',
      company: 'A',
      location: 'Antigo',
      jobs: [{ id: '0', title: 'Velho', description: '' }],
    },
    {
      id: '2',
      company: 'B',
      location: 'Sem cargos',
      jobs: [{ id: '0', title: 'Do banco', description: '' }],
    },
  ]

  it('troca jobs, local e datas das empresas que têm cargos', () => {
    const result = applyCareer(firebase, [
      position({
        role: 'Antigo',
        start: '2018-03-01',
        end: '2019-12-01',
        location: 'X',
      }),
      position({
        role: 'Atual',
        start: '2020-01-01',
        end: 'presente',
        location: 'Y',
      }),
    ])!

    expect(result[0].jobs?.map((job) => job.title)).toEqual(['Atual', 'Antigo'])
    expect(result[0].location).toBe('Y') // local do cargo mais recente
    expect(result[0].hireDate).toBe('2018-03-01') // início do mais antigo
    expect(result[0].departureDate).toBe('presente')
  })

  it('usa o término mais recente quando nenhum cargo está em andamento', () => {
    const result = applyCareer(firebase, [
      position({ start: '2018-01-01', end: '2019-06-01' }),
      position({ start: '2019-07-01', end: '2020-12-01' }),
    ])!
    expect(result[0].departureDate).toBe('2020-12-01')
  })

  it('mantém intactas as empresas sem cargos locais', () => {
    const result = applyCareer(firebase, [position({ experienceId: '1' })])!
    expect(result[1]).toEqual(firebase[1])
  })

  it('não altera os dados de entrada', () => {
    const copy = structuredClone(firebase)
    applyCareer(firebase, [position({})])
    expect(firebase).toEqual(copy)
  })

  it('aceita ids numéricos do banco e devolve null/vazio como veio', () => {
    const numeric = [{ id: 1, company: 'A' }] as unknown as ExperienceDTO[]
    expect(
      applyCareer(numeric, [position({ role: 'Novo' })])![0].jobs?.[0].title,
    ).toBe('Novo')
    expect(applyCareer(null)).toBeNull()
  })
})

describe('positions (dados reais)', () => {
  it('toda posição tem datas válidas e início antes do fim', () => {
    for (const item of positions) {
      expect(item.start).toMatch(/^\d{4}-\d{2}-01$/)
      expect(item.end === 'presente' || /^\d{4}-\d{2}-01$/.test(item.end)).toBe(
        true,
      )
      if (item.end !== 'presente') expect(item.start <= item.end).toBe(true)
    }
  })

  it('há no máximo um cargo em andamento e ele é o mais recente', () => {
    const current = positions.filter((item) => item.end === 'presente')
    expect(current).toHaveLength(1)
    expect(sortedPositions()[0]).toBe(current[0])
  })
})
