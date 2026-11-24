/**
 * Gera src/data/github-projects.json e as imagens em public/projects/ a partir
 * dos repositórios fixados no GitHub (lista em scripts/github-projects/pinned.json).
 *
 *   npm run sync:projects                       lê pela API do GitHub
 *   npm run sync:projects -- --local ~/repos    lê de clones locais (<pasta>/<repo>)
 *   opções: --meta arquivo.json   metadados já baixados (lista de repos da API)
 *           GITHUB_TOKEN no ambiente: sobe o limite de requisições da API
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { format, resolveConfig } from 'prettier'
import sharp from 'sharp'
import type { GithubProject } from '../src/dtos/githubProjectDTO.ts'
import { buildProject, type RepoMeta } from './github-projects/build.ts'
import {
  LocalSource,
  RemoteSource,
  type RepoSource,
} from './github-projects/sources.ts'

const ROOT = new URL('..', import.meta.url).pathname
const IMAGE_WIDTH = 1200
const IMAGE_QUALITY = 80

function option(name: string): string | undefined {
  const index = process.argv.indexOf(`--${name}`)
  return index >= 0 ? process.argv[index + 1] : undefined
}

async function loadMeta(
  owner: string,
  repo: string,
  metaFile?: string,
): Promise<RepoMeta> {
  if (metaFile) {
    const all = JSON.parse(await readFile(metaFile, 'utf8')) as RepoMeta[]
    const meta = all.find((item) => item.name === repo)
    if (!meta) throw new Error(`${repo} não está em ${metaFile}`)
    return meta
  }

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'portfolio-sync',
    ...(process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {}),
  }
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    { headers },
  )
  if (!response.ok)
    throw new Error(`GitHub ${response.status} ao ler ${owner}/${repo}`)
  return (await response.json()) as RepoMeta
}

async function writeImages(
  source: RepoSource,
  slug: string,
  paths: string[],
): Promise<void> {
  const directory = join(ROOT, 'public', 'projects', slug)
  await rm(directory, { recursive: true, force: true })
  if (paths.length === 0) return
  await mkdir(directory, { recursive: true })

  for (const [index, path] of paths.entries()) {
    const original = await source.readBinary(path)
    if (!original) throw new Error(`Imagem ${slug}/${path} não encontrada`)

    await sharp(original)
      .resize({ width: IMAGE_WIDTH, withoutEnlargement: true })
      .webp({ quality: IMAGE_QUALITY })
      .toFile(join(directory, `${index + 1}.webp`))
  }
}

async function main(): Promise<void> {
  const { owner, repos } = JSON.parse(
    await readFile(join(ROOT, 'scripts/github-projects/pinned.json'), 'utf8'),
  ) as { owner: string; repos: string[] }
  const localDir = option('local')
  const metaFile = option('meta')

  const projects: GithubProject[] = []
  for (const repo of repos) {
    const meta = await loadMeta(owner, repo, metaFile)
    const source = localDir
      ? new LocalSource(join(localDir, repo))
      : new RemoteSource(
          `${owner}/${repo}`,
          meta.default_branch ?? 'main',
          process.env.GITHUB_TOKEN,
        )

    const { project, images } = await buildProject(owner, meta, source)
    await writeImages(source, project.slug, images)
    projects.push(project)
    console.log(
      `${project.slug.padEnd(20)} techs=${project.techs.join('/') || '-'} apps=${project.apps.length} features=${project.features.length} imagens=${images.length}`,
    )
  }

  // Formata com o Prettier do projeto: assim o arquivo gerado já passa no format:check do CI
  const outputFile = join(ROOT, 'src/data/github-projects.json')
  const config = (await resolveConfig(outputFile)) ?? {}
  await writeFile(
    outputFile,
    await format(JSON.stringify(projects), { ...config, parser: 'json' }),
  )
  console.log(
    `\n${projects.length} projetos gravados em src/data/github-projects.json`,
  )
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
