import type { GithubProject } from '../../src/dtos/githubProjectDTO.ts'
import { buildProject, type BuiltProject } from './build.ts'
import type { RepoSource } from './sources.ts'

/** Conteúdo de content/projects/<nome>/project.json. */
export interface PrivateProjectConfig {
  /** Quando o projeto foi feito: "AAAA-MM" ou "AAAA-MM-DD". */
  date: string
  /** Site publicado, se for público. */
  site?: string
}

/** "2024-05" → "2024-05-01"; "2024-05-10" continua igual; qualquer outra coisa é erro. */
export function normalizeDate(date: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date
  if (/^\d{4}-\d{2}$/.test(date)) return `${date}-01`
  throw new Error(`Data inválida "${date}": use AAAA-MM ou AAAA-MM-DD`)
}

/**
 * Projeto de código fechado (cliente): o texto e as imagens vêm de uma pasta
 * escrita à mão (README.md no mesmo formato dos READMEs do GitHub), então só
 * é publicado o que está ali. O projeto não tem link de repositório.
 */
export async function buildPrivateProject(
  slug: string,
  config: PrivateProjectConfig,
  source: RepoSource,
): Promise<BuiltProject> {
  const date = normalizeDate(config.date)
  const { project, images } = await buildProject(
    '',
    {
      name: slug,
      homepage: config.site,
      created_at: date,
      pushed_at: date,
      fork: false,
    },
    source,
  )

  const privateProject: GithubProject = { ...project, private: true }
  delete privateProject.repo
  delete privateProject.links.repo
  return { project: privateProject, images }
}
