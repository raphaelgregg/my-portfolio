import { describe, expect, it } from 'vitest'
import { ResumeSheet } from './resumeContent'

describe('ResumeSheet', () => {
  const html = ResumeSheet()

  it('tem um único h1 com o nome e as seções esperadas em ordem', () => {
    expect(html.match(/<h1>/g)).toHaveLength(1)
    expect(html).toContain('<h1>Raphael Gregg</h1>')

    const sections = [...html.matchAll(/<h2>(.*?)<\/h2>/g)].map(
      (match) => match[1],
    )
    expect(sections).toEqual([
      'Resumo',
      'Experiência profissional',
      'Formação acadêmica',
      'Habilidades',
      'Certificações',
    ])
  })

  it('não exibe "undefined" nem "null" no texto', () => {
    expect(html).not.toMatch(/undefined|null/)
  })

  it('abre links externos com rel="noopener noreferrer"', () => {
    const externalLinks = [...html.matchAll(/<a [^>]*>/g)].map(
      (match) => match[0],
    )
    expect(externalLinks.length).toBeGreaterThan(0)
    for (const link of externalLinks)
      expect(link).toContain('rel="noopener noreferrer"')
  })
})
