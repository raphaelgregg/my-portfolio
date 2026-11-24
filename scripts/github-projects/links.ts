import type { GithubProjectLinks } from '../../src/dtos/githubProjectDTO.ts'
import type { ReadmeLink } from './readme.ts'

const IGNORED = /linkedin\.com|^mailto:|^tomail:|^#|github\.com\/[^/]+\/?$/i
// Documentação de tecnologias citada na lista de tecnologias: não é o site do projeto
const TECH_DOCS =
  /facebook\.github\.io|reactjs\.org|nodejs\.org|expo\.(io|dev)|typescriptlang\.org/i
const IMAGE = /\.(png|jpe?g|gif|webp|svg)(\?|$)/i
const VIDEO = /youtube\.com|youtu\.be/i
const LAYOUT = /figma\.com|xd\.adobe\.com/i
const CHALLENGE = /devchallenge\.com\.br\/challenges\//i
const HOSTING = /vercel\.app|netlify\.app|github\.io|pages\.dev/i
const SITE_TEXT = /preview|deploy|link app|demo/i

/** "app.vercel.app" → "https://app.vercel.app". */
export function withProtocol(url: string): string {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`
}

/**
 * Separa os links do README por finalidade (vídeo, layout, desafio, site
 * publicado) e ignora redes sociais, e-mails, âncoras e imagens.
 * `homepage` é o site cadastrado no GitHub, usado se o README não tiver um.
 */
export function classifyLinks(
  repo: string,
  links: ReadmeLink[],
  homepage?: string | null,
): GithubProjectLinks {
  const result: GithubProjectLinks = { repo: `https://github.com/${repo}` }

  for (const { text, href } of links) {
    if (IGNORED.test(href) || TECH_DOCS.test(href) || IMAGE.test(href)) continue

    if (VIDEO.test(href)) result.video ??= href
    else if (LAYOUT.test(href)) result.layout ??= href
    else if (CHALLENGE.test(href)) result.challenge ??= href
    else if (HOSTING.test(href) || SITE_TEXT.test(text)) result.site ??= href
  }

  if (!result.site && homepage) result.site = withProtocol(homepage)
  return result
}
