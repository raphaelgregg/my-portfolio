import type { GithubProject } from '../dtos/githubProjectDTO'
import generated from './github-projects.json'

/**
 * Projetos pessoais = os repositórios fixados no GitHub.
 *
 * github-projects.json é GERADO por `npm run sync:projects` (a partir do README
 * e dos metadados de cada repositório) e não deve ser editado à mão. O que o
 * README não diz fica aqui, em "curadoria": nome de exibição, categoria e, só
 * quando o texto gerado não serve, o resumo. Reexecutar o sync não apaga a curadoria.
 */
interface Curation {
  name?: string
  /** Etiqueta curta do tipo de projeto (aparece no card). */
  category: string
  summary?: string
  features?: string[]
}

export const curation: Record<string, Curation> = {
  'my-portfolio': {
    category: 'Site pessoal',
    // O README é a documentação do projeto; o resumo descreve o que o site é
    summary:
      'Este portfólio: uma SPA em TypeScript com Vite, com experiência e formação vindas do Firebase, projetos lidos do GitHub e um currículo em páginas A4 que vira PDF, publicada na Vercel.',
  },
  'grab-devchallenge': {
    name: 'Grab: página de login',
    category: 'Desafio DevChallenge',
  },
  'estagio-frontend': {
    name: 'Bredi: página inicial',
    category: 'Teste de estágio front-end',
    // O README só traz o enunciado do teste; o resumo vem da lista de entregas dele
    summary:
      'Página inicial responsiva com navbar fixa, carrossel alimentado por uma lista em data.js, seção de serviços e rodapé de contato, construída a partir de um layout no Adobe XD.',
  },
  'nlw-04-moveit': {
    name: 'Move.it',
    category: 'Rocketseat · NLW #04',
    // O README é o roteiro das aulas; o resumo vem do que elas descrevem
    summary:
      'Aplicação com contagem regressiva, desafios e ganho de experiência e níveis, feita no Next Level Week #04 com React, Next.js e TypeScript.',
  },
  'nlw03-oministack': { name: 'Happy', category: 'Rocketseat · NLW #03' },
  'nlw-02-omnistack': {
    // O repositório não tem README com título; o nome vem do código (Proffy)
    name: 'Proffy',
    category: 'Rocketseat · NLW #02',
    // README da pasta server/
    features: [
      'API: rota para listar o total de conexões e outra para criar uma conexão',
      'API: rotas para criar e listar aulas, com filtro por matéria, dia da semana e horário',
    ],
  },
  'nlw-01-booster': { name: 'Ecoleta', category: 'Rocketseat · NLW #01' },
}

export interface PersonalProject extends GithubProject {
  category: string
}

export const GITHUB_PROFILE_URL = 'https://github.com/raphaelgregg'

export const githubProjects: PersonalProject[] = (
  generated as GithubProject[]
).map((project) => {
  const custom = curation[project.slug]
  return {
    ...project,
    name: custom?.name ?? project.name,
    summary: custom?.summary ?? project.summary,
    features: custom?.features ?? project.features,
    category: custom?.category ?? 'Projeto pessoal',
  }
})

export function findGithubProject(slug: string): PersonalProject | undefined {
  return githubProjects.find((project) => project.slug === slug)
}
