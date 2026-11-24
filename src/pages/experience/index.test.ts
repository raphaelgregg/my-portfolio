import { describe, expect, it, vi } from 'vitest'
import type { ExperienceDTO } from '../../dtos/experienceDTO'
import { Experience } from './index'

const experiences: ExperienceDTO[] = [
  { id: '0', company: 'Pessoal', projects: [] },
  {
    id: '90',
    company: 'Empresa <b>X</b>',
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
  // id 4 existe em data/career.ts: os cargos do currículo substituem os do banco
  {
    id: '4',
    company: 'Lanlink',
    location: 'Belém, PA',
    hireDate: '2021-12-07',
    departureDate: 'presente',
    jobsOverview: 'Resumo antigo do banco.',
    jobs: [{ id: '0', title: 'Cargo antigo do banco', description: '' }],
  },
]

vi.mock('../../services/firebaseService', () => ({
  getDataFromFirebase: vi.fn(async () => experiences),
}))
vi.mock('../../utils/pageTitle', () => ({ setPageTitle: vi.fn() }))

describe('Experience', () => {
  it('mostra empresa, período, local, site, cargos e casos', async () => {
    const html = await Experience('90')

    expect(html).toContain('<h1>Empresa &lt;b&gt;X&lt;/b&gt;</h1>') // escapa HTML do banco
    expect(html).toContain('Dez 2021 – Presente')
    expect(html).toContain('Vitória, ES')
    expect(html).toContain('lanlink.com.br')
    expect(html).toContain('Minha atuação') // sem cargos locais, usa o resumo do banco
    expect(html).toContain('Empresa de TI.')
    expect(html).toContain('Técnico N2')
    expect(html).toContain('Troca do parque tecnológico.')
    expect(html).toContain('App X')
  })

  it('não repete a descrição do cargo como "caso de sucesso"', async () => {
    const html = await Experience('90')
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

  describe('com cargos do currículo (data/career.ts)', () => {
    it('usa cargos, período e local do currículo no lugar dos do banco', async () => {
      const html = await Experience('4')

      expect(html).toContain('Analista de Suporte Windows')
      expect(html).toContain('Abr 2026 – Presente · Vitória, ES')
      expect(html).toContain(
        'Administração de servidores Windows, Active Directory e Exchange',
      )
      expect(html).not.toContain('Cargo antigo do banco')
      expect(html).not.toContain('Belém, PA</dd>') // local do banco substituído
    })

    it('mostra os 4 cargos da Lanlink, do mais recente ao mais antigo', async () => {
      const html = await Experience('4')
      const roles = [
        ...html.matchAll(/<li class="experience-job">\s*<h3>(.*?)<\/h3>/g),
      ].map((match) => match[1])

      expect(roles).toEqual([
        'Analista de Suporte Windows',
        'Analista de Suporte em TIC Jr.',
        'Técnico de Suporte N2',
        'Técnico de Suporte N2',
      ])
    })

    it('omite "Minha atuação" quando há cargos detalhados', async () => {
      const html = await Experience('4')
      expect(html).not.toContain('Minha atuação')
      expect(html).not.toContain('Resumo antigo do banco.')
    })
  })
})
