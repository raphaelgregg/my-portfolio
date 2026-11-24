import { describe, expect, it, vi } from 'vitest'
import {
  findGithubProject,
  type PersonalProject,
} from '../../data/github-projects'
import { GithubProjectPage } from './github'

vi.mock('../../utils/pageTitle', () => ({ setPageTitle: vi.fn() }))

const project = (slug: string): PersonalProject => {
  const found = findGithubProject(slug)
  if (!found) throw new Error(`projeto ${slug} não existe nos dados`)
  return found
}

describe('GithubProjectPage', () => {
  it('monorepo: mostra capturas, aplicações e tecnologias', () => {
    const html = GithubProjectPage(project('nlw03-oministack'))

    expect(html).toContain('<h1>Happy</h1>')
    expect(html).toContain('Rocketseat · NLW #03')
    expect(html).toContain('Capturas de tela')
    expect(html).toContain('<h3>API</h3>')
    expect(html).toContain('<h3>Mobile</h3>')
    expect(html).toContain('<h3>Web</h3>')
    expect(html).toContain('href="/#projetos"') // volta para a seção da home
  })

  it('projeto de desafio: botão do site, vídeo, desafio e funcionalidades', () => {
    const html = GithubProjectPage(project('grab-devchallenge'))

    expect(html).toContain('Ver aplicação')
    expect(html).toContain('Código no GitHub')
    expect(html).toContain('Vídeo de demonstração')
    expect(html).toContain('Página do desafio')
    expect(html).toContain('Criação pagina login')
  })

  it('links externos abrem com rel="noopener noreferrer"', () => {
    const html = GithubProjectPage(project('grab-devchallenge'))
    const external = [...html.matchAll(/<a [^>]*target="_blank"[^>]*>/g)].map(
      (match) => match[0],
    )

    expect(external.length).toBeGreaterThan(0)
    for (const link of external)
      expect(link).toContain('rel="noopener noreferrer"')
  })

  it('curso: mostra o roteiro por aula; sem site, não há botão "Ver aplicação"', () => {
    const moveit = GithubProjectPage(project('nlw-04-moveit'))
    expect(moveit).toContain('Roteiro das aulas')
    expect(moveit).toContain('Aula 1: Rumo ao próximo nível')

    const proffy = GithubProjectPage(project('nlw-02-omnistack'))
    expect(proffy).not.toContain('Ver aplicação')
    expect(proffy).not.toContain('Roteiro das aulas')
  })

  it('seções sem conteúdo não aparecem (sem capturas, sem aplicações)', () => {
    const html = GithubProjectPage(project('nlw-04-moveit'))

    expect(html).not.toContain('Capturas de tela')
    expect(html).not.toContain('Aplicações')
  })

  it('não exibe "undefined" nem "null" em nenhum projeto', () => {
    for (const slug of [
      'grab-devchallenge',
      'estagio-frontend',
      'nlw-04-moveit',
      'nlw03-oministack',
      'nlw-02-omnistack',
      'nlw-01-booster',
    ]) {
      expect(GithubProjectPage(project(slug)), slug).not.toMatch(
        /undefined|null/,
      )
    }
  })
})
