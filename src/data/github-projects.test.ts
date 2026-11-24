import { existsSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import pinned from '../../scripts/github-projects/pinned.json'
import { findGithubProject, githubProjects } from './github-projects'

describe('projetos do GitHub (dados gerados + curadoria)', () => {
  it('tem exatamente os repositórios fixados, na ordem do perfil', () => {
    expect(githubProjects.map((project) => project.slug)).toEqual(pinned.repos)
  })

  it('todo projeto tem nome, categoria, resumo, tecnologias e links válidos', () => {
    for (const project of githubProjects) {
      expect(project.name, project.slug).not.toBe('')
      expect(project.category, project.slug).not.toBe('')
      expect(project.summary, project.slug).not.toBe('')
      expect(project.techs.length, project.slug).toBeGreaterThan(0)
      expect(project.links.repo).toBe(
        `https://github.com/${pinned.owner}/${project.slug}`,
      )
      expect(project.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(`${project.name}${project.summary}`).not.toMatch(/undefined|null/)
    }
  })

  it('as imagens referenciadas existem em public/ e são .webp', () => {
    for (const project of githubProjects) {
      for (const src of project.screenshots) {
        expect(src.endsWith('.webp'), src).toBe(true)
        expect(
          existsSync(new URL(`../../public${src}`, import.meta.url)),
          src,
        ).toBe(true)
      }
      expect(project.cover).toBe(project.screenshots[0])
    }
  })

  it('a curadoria prevalece sobre o texto gerado (resumo do estagio-frontend)', () => {
    expect(findGithubProject('estagio-frontend')?.summary).toMatch(
      /navbar fixa/,
    )
    expect(findGithubProject('nlw-02-omnistack')?.name).toBe('Proffy')
  })

  it('findGithubProject devolve undefined para slug desconhecido', () => {
    expect(findGithubProject('nao-existe')).toBeUndefined()
    expect(findGithubProject('0')).toBeUndefined() // ids antigos do Firebase não colidem
  })
})
