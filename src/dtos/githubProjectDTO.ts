/** Projeto fixado no GitHub, montado a partir do README e dos metadados do repositório. */
export interface GithubProject {
  /** Nome do repositório; também é o id na URL (/project/<slug>). */
  slug: string
  /** "dono/repositório". */
  repo: string
  /** Título tirado do README (pode ser trocado em data/github-projects.ts). */
  name: string
  /** Uma ou duas frases sobre o projeto. */
  summary: string
  /** Funcionalidades marcadas como feitas ([x]) no README. */
  features: string[]
  /** Tecnologias, com nomes normalizados (React, TypeScript...). */
  techs: string[]
  /** Aplicações de um monorepo (web, mobile, API) e a stack de cada uma. */
  apps: GithubProjectApp[]
  /** Roteiro de aulas, quando o README é o de um curso (ex.: NLW). */
  syllabus: GithubProjectSyllabusItem[]
  links: GithubProjectLinks
  /** Capa: caminho em /public, já otimizada. */
  cover?: string
  /** Capturas de tela, na ordem do README. */
  screenshots: string[]
  /** Datas ISO (AAAA-MM-DD) de criação e do último push. */
  createdAt: string
  pushedAt: string
  /** Linguagem principal segundo o GitHub. */
  language?: string
  /** Fork de outro repositório (ex.: teste técnico). */
  fork: boolean
}

export interface GithubProjectApp {
  /** "Web", "Mobile" ou "API". */
  name: string
  stack: string[]
}

export interface GithubProjectSyllabusItem {
  title: string
  items: string[]
}

export interface GithubProjectLinks {
  repo: string
  /** Aplicação publicada. */
  site?: string
  /** Vídeo de demonstração. */
  video?: string
  /** Layout (Figma, Adobe XD). */
  layout?: string
  /** Página do desafio, quando é um desafio de plataforma. */
  challenge?: string
}
