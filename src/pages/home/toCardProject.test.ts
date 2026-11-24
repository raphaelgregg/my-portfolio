import { describe, expect, it } from 'vitest'
import { CardMyProject } from '../../components/cardMyProjects'
import { findGithubProject } from '../../data/github-projects'
import { toCardProject } from './toCardProject'

describe('card de projeto do GitHub', () => {
  it('adapta o projeto ao card: link pelo slug, categoria, resumo e data', () => {
    const grab = findGithubProject('grab-devchallenge')!
    const card = toCardProject(grab)

    expect(card).toMatchObject({
      id: 'grab-devchallenge',
      title: 'Grab: página de login',
      role: 'Desafio DevChallenge',
      thumbnail: '/projects/grab-devchallenge/1.webp',
    })

    const html = CardMyProject(card)
    expect(html).toContain('href="/project/grab-devchallenge"')
    expect(html).toContain('Desenvolvido em Fev 2021')
  })

  it('mostra as tecnologias como etiquetas de texto, sem ícones', () => {
    const html = CardMyProject(
      toCardProject(findGithubProject('nlw-04-moveit')!),
    )

    expect(html).toContain('<span>TypeScript</span>')
    expect(html).toContain('<span>React</span>')
    expect(html).not.toContain('/svg/')
  })

  it('sem captura de tela, mostra a inicial do projeto', () => {
    const html = CardMyProject(
      toCardProject(findGithubProject('nlw-02-omnistack')!),
    )

    expect(html).toContain('company-thumbnail-placeholder')
    expect(html).toContain('>P<') // Proffy
    expect(html).not.toContain('<img class="card-project-thumb"')
  })
})
