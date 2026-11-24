import { describe, expect, it, vi } from 'vitest'
import type { ExperienceDTO } from '../../dtos/experienceDTO'
import { splitExperience } from './homeData'

// Evita inicializar o Firebase: aqui só testamos a lógica de divisão
vi.mock('../../services/firebaseService', () => ({
  getDataFromFirebase: vi.fn(),
}))

describe('splitExperience', () => {
  const personal: ExperienceDTO = {
    id: '0',
    projects: [{ id: '1', title: 'Meu Portfólio' }],
  }
  const old: ExperienceDTO = {
    id: '1',
    companyShortName: 'Antiga',
    departureDate: '2020-01-01',
  }
  const current: ExperienceDTO = {
    id: '2',
    companyShortName: 'Atual',
    departureDate: 'presente',
  }
  const recent: ExperienceDTO = {
    id: '3',
    companyShortName: 'Recente',
    departureDate: '2023-06-01',
  }

  it('separa projetos pessoais (id 0) dos empregos', () => {
    const { jobs, personalProjects } = splitExperience([personal, old])
    expect(jobs.map((job) => job.id)).toEqual(['1'])
    expect(personalProjects.map((project) => project.title)).toEqual([
      'Meu Portfólio',
    ])
  })

  it('ordena do mais recente para o mais antigo, com "presente" primeiro', () => {
    const { jobs } = splitExperience([personal, old, recent, current])
    expect(jobs.map((job) => job.companyShortName)).toEqual([
      'Atual',
      'Recente',
      'Antiga',
    ])
  })

  it('aceita ids numéricos vindos do banco', () => {
    const numeric = {
      id: 0,
      projects: [{ id: '1' }],
    } as unknown as ExperienceDTO
    expect(splitExperience([numeric, old]).personalProjects).toHaveLength(1)
  })

  it('degrada para listas vazias se os dados não existirem', () => {
    expect(splitExperience(null)).toEqual({ jobs: [], personalProjects: [] })
  })

  it('não altera o array original', () => {
    const input = [personal, old, current]
    splitExperience(input)
    expect(input.map((item) => item.id)).toEqual(['0', '1', '2'])
  })
})
