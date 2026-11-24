import { describe, expect, it, vi } from 'vitest'
import type { ExperienceDTO } from '../../dtos/experienceDTO'
import { Experience } from './index'

const experiences: ExperienceDTO[] = [
  { id: '0', company: 'Pessoal', projects: [] },
  {
    id: '4',
    company: 'Lanlink <b>SA</b>',
    thumbnailCompany: 'https://exemplo.com/logo.svg',
    url: 'https://www.lanlink.com.br/',
    hireDate: '2021-12-07',
    departureDate: 'presente',
    location: 'Vitória, ES',
    companyOverview: 'Empresa de TI.',
    jobsOverview: 'Suporte N2.',
    jobs: [
      {
        id: '0',
        title: 'Técnico N2',
        description: 'Suporte técnico de nível 2.',
        successCases: [
          { date: '2021-12-07', case: 'Suporte técnico de nível 2.' },
          { date: '2022-05-01', case: 'Troca do parque tecnológico.' },
        ],
      },
    ],
    projects: [
      { id: '0', title: 'App X', role: 'Dev', technologies: ['react'] },
    ],
  },
  { id: '5', company: 'Sem site', url: '#' },
]

vi.mock('../../services/firebaseService', () => ({
  getDataFromFirebase: vi.fn(async () => experiences),
}))
vi.mock('../../utils/pageTitle', () => ({ setPageTitle: vi.fn() }))

describe('Experience', () => {
  it('mostra empresa, período, local, site, cargos e casos', async () => {
    const html = await Experience('4')

    expect(html).toContain('<h1>Lanlink &lt;b&gt;SA&lt;/b&gt;</h1>') // escapa HTML do banco
    expect(html).toContain('dez 2021 – Presente')
    expect(html).toContain('Vitória, ES')
    expect(html).toContain('lanlink.com.br')
    expect(html).toContain('Empresa de TI.')
    expect(html).toContain('Técnico N2')
    expect(html).toContain('Troca do parque tecnológico.')
    expect(html).toContain('App X')
  })

  it('não repete a descrição do cargo como "caso de sucesso"', async () => {
    const html = await Experience('4')
    expect(html.match(/Suporte técnico de nível 2\./g)).toHaveLength(1)
  })

  it('não cria link de site quando a url é "#" nem seções vazias', async () => {
    const html = await Experience('5')
    expect(html).not.toContain('<dt>Site</dt>')
    expect(html).not.toContain('Sobre a empresa')
    expect(html).not.toContain('Cargos e responsabilidades')
  })

  it('exibe aviso para experiência inexistente', async () => {
    const html = await Experience('999')
    expect(html).toContain('Experiência não encontrada')
    expect(html).toContain('href="/#experiencia"')
  })

  it('não exibe "undefined" nem "null"', async () => {
    expect(await Experience('5')).not.toMatch(/undefined|null/)
  })
})
