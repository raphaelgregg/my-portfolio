/**
 * Leitura de README em Markdown/HTML simples: título, imagens, links, seções e
 * listas. Só funções puras (sem rede nem disco), para testar com exemplos reais.
 */

export interface ReadmeImage {
  src: string
  alt: string
}

export interface ReadmeLink {
  text: string
  href: string
}

export interface ReadmeSection {
  heading: string
  /** Linhas do corpo, sem a linha do título. */
  lines: string[]
}

export interface ParsedReadme {
  title: string
  images: ReadmeImage[]
  links: ReadmeLink[]
  sections: ReadmeSection[]
  /** Itens marcados como feitos: "- [x] algo". */
  doneItems: string[]
  /** Primeiro parágrafo de texto da seção "Projeto"/"Sobre". */
  summary: string
  /** Itens da seção de tecnologias, sem links nem formatação. */
  techs: string[]
  /** Roteiro por aula ("Aula 1 - ..."), com os tópicos de cada uma. */
  syllabus: { title: string; items: string[] }[]
}

const MD_IMAGE = /!\[([^\]]*)\]\(([^)\s]+)[^)]*\)/g
const HTML_IMAGE = /<img\b[^>]*>/gi
const MD_LINK = /(?<!!)\[([^\]]+)\]\(([^)\s]+)[^)]*\)/g
// href ou src: há READMEs com <a src="..."> (erro comum) e o link funciona do mesmo jeito
const HTML_LINK = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi

function attribute(tag: string, name: string): string {
  const match = new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, 'i').exec(tag)
  return match ? match[1] : ''
}

/** Texto puro: sem tags, imagens, links Markdown, ênfase e emojis iniciais. */
export function stripMarkup(text: string): string {
  return text
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(MD_IMAGE, '')
    .replace(MD_LINK, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[*_`]{1,3}/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/^[\s\p{Extended_Pictographic}️]+/u, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function findImages(markdown: string): ReadmeImage[] {
  const found: { index: number; image: ReadmeImage }[] = []

  for (const match of markdown.matchAll(MD_IMAGE)) {
    found.push({
      index: match.index ?? 0,
      image: { alt: match[1], src: match[2] },
    })
  }
  for (const match of markdown.matchAll(HTML_IMAGE)) {
    const tag = match[0]
    found.push({
      index: match.index ?? 0,
      image: { alt: attribute(tag, 'alt'), src: attribute(tag, 'src') },
    })
  }

  return found
    .filter(({ image }) => image.src)
    .sort((a, b) => a.index - b.index)
    .map(({ image }) => image)
}

function findLinks(markdown: string): ReadmeLink[] {
  const found: { index: number; link: ReadmeLink }[] = []

  for (const match of markdown.matchAll(MD_LINK)) {
    found.push({
      index: match.index ?? 0,
      link: { text: stripMarkup(match[1]), href: match[2] },
    })
  }
  for (const match of markdown.matchAll(HTML_LINK)) {
    const href = attribute(match[1], 'href') || attribute(match[1], 'src')
    if (href) {
      found.push({
        index: match.index ?? 0,
        link: { text: stripMarkup(match[2]), href },
      })
    }
  }

  const formatted = found
    .sort((a, b) => a.index - b.index)
    .map(({ link }) => link)
  const known = new Set(formatted.map((link) => link.href))
  return [
    ...formatted,
    ...findBareUrls(markdown).filter((link) => !known.has(link.href)),
  ]
}

/** URLs escritas soltas no texto ("link do projeto: https://..."), fora de links formatados. */
function findBareUrls(markdown: string): ReadmeLink[] {
  const urls = markdown.match(/https?:\/\/[^\s)<>"'\]]+/g) ?? []
  return urls.map((href) => ({
    text: href,
    href: href.replace(/[.,;:]+$/, ''),
  }))
}

function findTitle(markdown: string): string {
  const heading = /^#\s+(.+)$/m.exec(markdown)
  if (heading) return stripMarkup(heading[1])

  // <h1 ...><img alt="Nome" ...></h1>: o nome está no alt do logo
  const html = /<h1\b[^>]*>([\s\S]*?)<\/h1>/i.exec(markdown)
  if (html) {
    const alt = attribute(/<img\b[^>]*>/i.exec(html[1])?.[0] ?? '', 'alt')
    return alt || stripMarkup(html[1])
  }
  return ''
}

function splitSections(markdown: string): ReadmeSection[] {
  const sections: ReadmeSection[] = []
  let current: ReadmeSection | null = null

  for (const line of markdown.split(/\r?\n/)) {
    const heading = /^#{2,6}\s+(.+)$/.exec(line)
    if (heading) {
      current = { heading: stripMarkup(heading[1]), lines: [] }
      sections.push(current)
    } else if (current) {
      current.lines.push(line)
    }
  }
  return sections
}

const LIST_ITEM = /^\s*[-*+]\s+(?:\[([ xX])\]\s*)?(.*\S)\s*$/

function listItems(
  lines: string[],
): { checked: boolean | null; text: string; indent: number }[] {
  const items: { checked: boolean | null; text: string; indent: number }[] = []
  for (const line of lines) {
    const match = LIST_ITEM.exec(line)
    if (!match) continue
    items.push({
      checked: match[1] === undefined ? null : match[1].toLowerCase() === 'x',
      text: stripMarkup(match[2]),
      indent: /^\s*/.exec(line)?.[0].length ?? 0,
    })
  }
  return items
}

function findSummary(sections: ReadmeSection[]): string {
  const section = sections.find((item) =>
    /^(projeto|meu projeto|sobre( o (projeto|app))?)$/i.test(item.heading),
  )
  if (!section) return ''

  for (const line of section.lines) {
    if (!line.trim() || LIST_ITEM.test(line)) continue
    const text = stripMarkup(line)

    // Introdução de lista ("Foram criadas as seguintes features:") e linhas de
    // aula do roteiro de um curso não são um resumo do projeto
    const isLeadIn = /:$/.test(text)
    const isLesson = /^Aul\w*\s*\d+/i.test(text)
    // A partir da primeira aula só há texto de aula: nada mais é resumo do projeto
    if (isLesson) break
    if (text.length > 20 && !isLeadIn) return text
  }
  return ''
}

function findTechs(sections: ReadmeSection[]): string[] {
  const section = sections.find((item) =>
    /tecnolog|^techs?$/i.test(item.heading),
  )
  return section ? listItems(section.lines).map((item) => item.text) : []
}

/** "Aula 1 - Título" (aceita "Aulda 2" etc.) seguido de uma lista de tópicos. */
function findSyllabus(markdown: string): { title: string; items: string[] }[] {
  const result: { title: string; items: string[] }[] = []
  let current: { title: string; items: string[] } | null = null

  for (const line of markdown.split(/\r?\n/)) {
    const lesson = /^Aul\w*\s*\d+\s*-\s*(.+)$/i.exec(line.trim())
    if (lesson) {
      current = { title: stripMarkup(lesson[1]), items: [] }
      result.push(current)
      continue
    }
    if (!current) continue

    const item = LIST_ITEM.exec(line)
    if (item) current.items.push(stripMarkup(item[2]))
    else if (/^#{1,6}\s/.test(line)) current = null // acabou a parte das aulas
  }
  return result.filter((lesson) => lesson.items.length > 0)
}

export function parseReadme(markdown: string): ParsedReadme {
  const sections = splitSections(markdown)

  const doneItems = listItems(markdown.split(/\r?\n/))
    .filter((item) => item.checked === true)
    .map((item) => item.text)

  return {
    title: findTitle(markdown),
    images: findImages(markdown),
    links: findLinks(markdown),
    sections,
    doneItems,
    summary: findSummary(sections),
    techs: findTechs(sections),
    syllabus: findSyllabus(markdown),
  }
}
