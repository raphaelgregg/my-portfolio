import { describe, expect, it } from 'vitest'
import { CardExperience, CompanyThumbnail } from './index'

describe('CompanyThumbnail', () => {
  it('usa a imagem quando há logo', () => {
    const html = CompanyThumbnail('Lanlink', 'https://x.com/logo.svg', 'thumb')
    expect(html).toContain('<img class="thumb"')
    expect(html).toContain('alt="Logo da empresa Lanlink"')
  })

  it('deixa a inicial escondida como plano B caso a imagem falhe', () => {
    const html = CompanyThumbnail('Lanlink', 'https://x.com/logo.svg', 'thumb')
    expect(html).toContain('onerror=')
    expect(html).toMatch(/company-thumbnail-placeholder[^>]*hidden[^>]*>L</)
  })

  it('sem logo, mostra a inicial da empresa (escapada)', () => {
    const html = CompanyThumbnail('<b>x', '', 'thumb')
    expect(html).toContain('company-thumbnail-placeholder')
    expect(html).toContain('>&lt;<') // a inicial é o "<", escapado
    expect(html).not.toContain('<img')
  })

  it('não quebra sem nome', () => {
    expect(CompanyThumbnail(undefined, undefined, 'thumb')).toContain('>?<')
  })
})

describe('CardExperience', () => {
  it('mostra o cargo mais recente e o link da experiência', () => {
    const html = CardExperience({
      id: '4',
      companyShortName: 'Lanlink',
      jobs: [{ id: '0', title: 'Analista', description: '' }],
    })
    expect(html).toContain('href="/experience/4"')
    expect(html).toContain('Analista')
    expect(html).not.toMatch(/undefined|null/)
  })
})
