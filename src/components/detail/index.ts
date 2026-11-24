import { escapeHtml as esc } from '../../utils/escapeHtml'
import '../../styles/detail.css'

/*
 * ESQUELETO DAS PÁGINAS DE DETALHE (experiência, projeto)
 *
 * A página é um cabeçalho (nome, fatos, ações) mais uma lista de seções
 * { id, title, body }. Cada body é produzido por uma função que devolve o HTML
 * ou '' (corpo vazio = a seção não aparece). Para uma seção nova: escreva a
 * função do corpo e acrescente uma linha à lista da página.
 */
export interface SectionSpec {
  id: string
  title: string
  body: string
}

export function Section({ id, title, body }: SectionSpec): string {
  if (!body) return ''

  return `
    <section class="detail-section" aria-labelledby="${id}">
      <div class="detail-wrapper">
        <h2 id="${id}" class="detail-title">${esc(title)}</h2>
        ${body}
      </div>
    </section>`
}

/** Item "Rótulo / valor" do cabeçalho; sem valor, não aparece. */
export function Fact(label: string, valueHtml: string): string {
  return valueHtml
    ? `<div><dt>${esc(label)}</dt><dd>${valueHtml}</dd></div>`
    : ''
}

export function paragraphBody(text?: string): string {
  return text ? `<p class="detail-text">${esc(text)}</p>` : ''
}

export function bulletList(items: string[] = []): string {
  return items.length
    ? `<ul class="detail-bullets">${items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>`
    : ''
}

/**
 * Chips de tecnologia. Se houver ícone em /public/svg, ele aparece; sem ele, só
 * o texto (o arquivo é procurado pelo nome e o <img> some se não existir).
 */
export function techChips(
  techs: string[] = [],
  iconFor: (tech: string) => string | undefined = () => undefined,
): string {
  if (techs.length === 0) return ''

  const chips = techs
    .map((tech) => {
      const icon = iconFor(tech)
      const image = icon
        ? `<img src="/svg/${esc(icon)}.svg" alt="" onerror="this.remove()" />`
        : ''
      return `<span>${image}${esc(tech)}</span>`
    })
    .join('')

  return `<div class="detail-chips">${chips}</div>`
}
