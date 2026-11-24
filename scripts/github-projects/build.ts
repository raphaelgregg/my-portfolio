import type {
  GithubProject,
  GithubProjectApp,
} from '../../src/dtos/githubProjectDTO.ts'
import { classifyLinks } from './links.ts'
import { findReadmePath, type RepoSource } from './sources.ts'
import { parseReadme, stripMarkup } from './readme.ts'
import {
  appNameFromFolder,
  headlineTechs,
  inferTechsFromFiles,
  stackFromPackage,
  uniqueTechs,
} from './stack.ts'

/** Campos do GitHub que usamos (os mesmos da API REST de um repositório). */
export interface RepoMeta {
  name: string
  description?: string | null
  homepage?: string | null
  created_at: string
  pushed_at: string
  language?: string | null
  fork: boolean
  default_branch?: string
}

export interface BuiltProject {
  project: GithubProject
  /** Imagens do repositório a copiar, na mesma ordem de cover/screenshots. */
  images: string[]
}

const RASTER_IMAGE = /\.(png|jpe?g|gif|webp)$/i

/** "./.github/a%20b.png" → ".github/a b.png"; null para URLs externas. */
function repoPath(src: string): string | null {
  if (/^(https?:)?\/\//i.test(src) || src.startsWith('/')) return null
  try {
    return decodeURI(src.replace(/^\.\//, ''))
  } catch {
    return src.replace(/^\.\//, '')
  }
}

function humanize(repoName: string): string {
  return repoName
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

async function findApps(
  source: RepoSource,
  files: string[],
): Promise<GithubProjectApp[]> {
  const folders = [
    ...new Set(
      files
        .filter((file) => /^[^/]+\/package\.json$/.test(file))
        .map((file) => file.split('/')[0]),
    ),
  ]

  const apps: GithubProjectApp[] = []
  for (const folder of folders) {
    const text = await source
      .readText(`${folder}/package.json`)
      .catch(() => null)
    if (!text) continue
    try {
      apps.push({
        name: appNameFromFolder(folder),
        stack: stackFromPackage(JSON.parse(text)),
      })
    } catch {
      // package.json inválido: ignora a pasta
    }
  }
  return apps
}

export async function buildProject(
  owner: string,
  meta: RepoMeta,
  source: RepoSource,
): Promise<BuiltProject> {
  const files = await source.files()
  const readmePath = findReadmePath(files)
  const parsed = parseReadme(
    readmePath ? ((await source.readText(readmePath)) ?? '') : '',
  )

  // Só monorepos (web + mobile + API...) mostram a lista de aplicações
  const foundApps = await findApps(source, files)
  const apps = foundApps.length >= 2 ? foundApps : []

  const readmeTechs = uniqueTechs(parsed.techs)
  const techs = readmeTechs.length
    ? readmeTechs
    : apps.length
      ? headlineTechs(
          apps.map((app) => app.stack),
          apps.some((app) => app.name === 'API'),
        )
      : inferTechsFromFiles(files)

  const images = parsed.images
    .map((image) => repoPath(image.src))
    .filter(
      (path): path is string =>
        path !== null && RASTER_IMAGE.test(path) && files.includes(path),
    )
  const uniqueImages = [...new Set(images)]
  const webPaths = uniqueImages.map(
    (_, index) => `/projects/${meta.name}/${index + 1}.webp`,
  )

  const repo = `${owner}/${meta.name}`
  const project: GithubProject = {
    slug: meta.name,
    repo,
    name: parsed.title || humanize(meta.name),
    summary: parsed.summary || stripMarkup(meta.description ?? ''),
    features: parsed.doneItems,
    techs,
    apps,
    syllabus: parsed.syllabus,
    links: classifyLinks(repo, parsed.links, meta.homepage),
    cover: webPaths[0],
    screenshots: webPaths,
    createdAt: meta.created_at.slice(0, 10),
    pushedAt: meta.pushed_at.slice(0, 10),
    language: meta.language ?? undefined,
    fork: meta.fork,
  }

  return { project, images: uniqueImages }
}
