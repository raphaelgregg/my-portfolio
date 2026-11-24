import { execFile } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { promisify } from 'node:util'

const run = promisify(execFile)

/** De onde ler os arquivos de um repositório: um clone local ou a API do GitHub. */
export interface RepoSource {
  /** Caminhos dos arquivos versionados (com "/"). */
  files(): Promise<string[]>
  readText(path: string): Promise<string | null>
  readBinary(path: string): Promise<Buffer | null>
}

export class LocalSource implements RepoSource {
  readonly dir: string

  constructor(dir: string) {
    this.dir = dir
  }

  async files(): Promise<string[]> {
    const { stdout } = await run('git', ['-C', this.dir, 'ls-files', '-z'], {
      maxBuffer: 64 * 1024 * 1024,
    })
    return stdout.split('\0').filter(Boolean)
  }

  async readText(path: string): Promise<string | null> {
    return readFile(join(this.dir, path), 'utf8').catch(() => null)
  }

  async readBinary(path: string): Promise<Buffer | null> {
    return readFile(join(this.dir, path)).catch(() => null)
  }
}

type FetchLike = typeof fetch

/** Lê pela API REST (sem token são 60 requisições por hora; com GITHUB_TOKEN, 5000). */
export class RemoteSource implements RepoSource {
  readonly repo: string
  readonly branch: string
  private readonly token?: string
  private readonly fetchImpl: FetchLike

  constructor(
    repo: string,
    branch: string,
    token?: string,
    fetchImpl: FetchLike = fetch,
  ) {
    this.repo = repo
    this.branch = branch
    this.token = token
    this.fetchImpl = fetchImpl
  }

  private headers(): Record<string, string> {
    return {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'portfolio-sync',
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
    }
  }

  async files(): Promise<string[]> {
    const url = `https://api.github.com/repos/${this.repo}/git/trees/${this.branch}?recursive=1`
    const response = await this.fetchImpl(url, { headers: this.headers() })
    if (!response.ok)
      throw new Error(`GitHub ${response.status} ao listar ${this.repo}`)

    const tree = (await response.json()) as {
      tree: { path: string; type: string }[]
    }
    return tree.tree
      .filter((entry) => entry.type === 'blob')
      .map((entry) => entry.path)
  }

  private async raw(path: string): Promise<Response | null> {
    const encoded = path.split('/').map(encodeURIComponent).join('/')
    const url = `https://raw.githubusercontent.com/${this.repo}/${this.branch}/${encoded}`
    const response = await this.fetchImpl(url, { headers: this.headers() })
    return response.ok ? response : null
  }

  async readText(path: string): Promise<string | null> {
    return (await this.raw(path))?.text() ?? null
  }

  async readBinary(path: string): Promise<Buffer | null> {
    const response = await this.raw(path)
    return response ? Buffer.from(await response.arrayBuffer()) : null
  }
}

/** README na raiz, com qualquer capitalização (README.md, readme.md...). */
export function findReadmePath(files: string[]): string | null {
  return files.find((file) => /^readme(\.(md|markdown))?$/i.test(file)) ?? null
}
