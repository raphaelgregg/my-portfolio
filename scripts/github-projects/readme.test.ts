import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { parseReadme, stripMarkup } from './readme.ts'

const fixture = (name: string) =>
  parseReadme(
    readFileSync(new URL(`./__fixtures__/${name}.md`, import.meta.url), 'utf8'),
  )

describe('stripMarkup', () => {
  it('remove tags, links, ênfase e emoji inicial', () => {
    expect(stripMarkup('🚀 **Olá** [mundo](https://x.com) <b>!</b>')).toBe(
      'Olá mundo !',
    )
  })
})

describe('README com título em Markdown (grab)', () => {
  const readme = fixture('grab')

  it('lê título, funcionalidades feitas e tecnologias', () => {
    expect(readme.title).toBe('Page Login GRAB - Desafio DevChallenge')
    expect(readme.doneItems).toEqual([
      'Criação pagina login',
      'Criação pagina criar conta',
      'Validação de campos com msgs personalizas',
    ])
    expect(readme.techs).toEqual(['HTML', 'CSS', 'JavaScript'])
  })

  it('lista as imagens na ordem e os links, inclusive em <a href>', () => {
    expect(readme.images.map((image) => image.src)).toEqual([
      './.github/grab1.png',
      './.github/grab2.png',
      './.github/grab3.png',
      './.github/grab-signup.png',
    ])
    const hrefs = readme.links.map((link) => link.href)
    expect(hrefs).toContain('https://www.youtube.com/watch?v=psTuLDxRp4E')
    expect(hrefs).toContain('https://grab-devchallenge.vercel.app/index.html')
  })
})

describe('resumo (summary)', () => {
  it('ignora introdução de lista e linhas de aula', () => {
    expect(fixture('grab').summary).toBe('') // "Foram criadas as seguintes Fetures:" não é resumo
    expect(fixture('moveit').summary).toBe('') // "Aula 1 - ..." não é resumo
  })
})

describe('README com <h1> e logo (nlw03)', () => {
  const readme = fixture('nlw03')

  it('usa o alt do logo como título e lê o resumo da seção Projeto', () => {
    expect(readme.title).toBe('Happy')
    expect(readme.summary).toMatch(
      /^O Happy é uma aplicação que conecta pessoas/,
    )
  })

  it('lê as tecnologias sem links e as imagens', () => {
    expect(readme.techs).toEqual([
      'Node.js',
      'React',
      'React Native',
      'Expo',
      'TypeScript',
    ])
    expect(readme.images.map((image) => image.src)).toEqual([
      '.github/logo.svg',
      '.github/happy.png',
    ])
  })
})

describe('README de teste técnico (estagio)', () => {
  const readme = fixture('estagio')

  it('lê as funcionalidades feitas, ignorando as regras do teste', () => {
    expect(readme.doneItems).toHaveLength(7)
    expect(readme.doneItems[0]).toBe('Criação a Navbar fixed no topo')
    expect(readme.doneItems).not.toContain(
      'Codificar o layout em CSS, HTML e Javascript',
    )
  })

  it('acha o link do Adobe XD (citação) e o do deploy', () => {
    const hrefs = readme.links.map((link) => link.href)
    expect(hrefs).toContain('https://estagio-frontend-blue.vercel.app/')
    expect(
      hrefs.some((href) => href.startsWith('https://xd.adobe.com/view/')),
    ).toBe(true) // URL solta no texto
  })
})

describe('README de curso (moveit)', () => {
  const readme = fixture('moveit')

  it('aceita <a src> como link e lê as tecnologias', () => {
    expect(readme.links).toContainEqual({
      text: 'link app Move-it',
      href: 'https://moveit-lovat-two.vercel.app/',
    })
    expect(readme.techs).toEqual(['Typescript', 'ReactJS', 'Next.js'])
  })

  it('monta o roteiro por aula, mesmo com "Aulda"', () => {
    expect(readme.syllabus.map((lesson) => lesson.title)).toEqual([
      'Rumo ao próximo nível',
      'Desvendando o Next.js',
      'Contexto e componentes',
    ])
    expect(readme.syllabus[0].items).toContain('O que é React?')
  })

  it('não trata tópicos de aula (não marcados) como funcionalidades', () => {
    expect(readme.doneItems).toEqual([])
  })
})
