import { describe, expect, it } from 'vitest'
import { classifyLinks, withProtocol } from './links.ts'

const link = (href: string, text = href) => ({ href, text })

describe('classifyLinks', () => {
  it('separa vídeo, layout, desafio e site publicado', () => {
    const result = classifyLinks('o/r', [
      link('https://www.youtube.com/watch?v=abc', 'Preview no Youtube'),
      link('https://www.figma.com/file/xyz', 'Figma'),
      link('https://xd.adobe.com/view/1', 'Adobe XD'),
      link('https://devchallenge.com.br/challenges/123/details', 'Desafio'),
      link('https://meu-app.vercel.app/', 'Preview'),
    ])

    expect(result).toEqual({
      repo: 'https://github.com/o/r',
      video: 'https://www.youtube.com/watch?v=abc',
      layout: 'https://www.figma.com/file/xyz', // o primeiro de cada tipo
      challenge: 'https://devchallenge.com.br/challenges/123/details',
      site: 'https://meu-app.vercel.app/',
    })
  })

  it('ignora redes sociais, e-mail, âncoras, imagens e documentação de tecnologias', () => {
    const result = classifyLinks('o/r', [
      link('https://www.linkedin.com/in/alguem/', 'Contato'),
      link('mailto:a@b.com'),
      link('tomail:a@b.com'),
      link('#projeto', 'Projeto'),
      link('https://x.com/logo.png'),
      link('https://github.com/alguem', 'perfil'),
      link('https://facebook.github.io/react-native/', 'React Native'),
      link('https://reactjs.org', 'React'),
    ])
    expect(result).toEqual({ repo: 'https://github.com/o/r' })
  })

  it('usa a homepage do GitHub quando o README não tem site', () => {
    expect(classifyLinks('o/r', [], 'app.vercel.app').site).toBe(
      'https://app.vercel.app',
    )
    expect(
      classifyLinks('o/r', [link('https://a.vercel.app/')], 'b.vercel.app')
        .site,
    ).toBe('https://a.vercel.app/')
  })
})

describe('withProtocol', () => {
  it('acrescenta https só quando falta', () => {
    expect(withProtocol('a.com')).toBe('https://a.com')
    expect(withProtocol('http://a.com')).toBe('http://a.com')
  })
})
