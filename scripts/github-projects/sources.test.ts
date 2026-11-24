import { describe, expect, it } from 'vitest'
import { findReadmePath, RemoteSource } from './sources.ts'

describe('findReadmePath', () => {
  it('acha o README na raiz com qualquer capitalização', () => {
    expect(findReadmePath(['src/a.ts', 'readme.md'])).toBe('readme.md')
    expect(findReadmePath(['README.md'])).toBe('README.md')
    expect(findReadmePath(['Readme'])).toBe('Readme')
  })

  it('ignora README de subpastas e devolve null se não houver', () => {
    expect(findReadmePath(['server/README.md', 'index.html'])).toBeNull()
  })
})

describe('RemoteSource (fetch simulado)', () => {
  const calls: string[] = []
  const fakeFetch = (async (url: string | URL | Request) => {
    const target = String(url)
    calls.push(target)

    if (target.includes('/git/trees/')) {
      return new Response(
        JSON.stringify({
          tree: [
            { path: 'README.md', type: 'blob' },
            { path: 'web', type: 'tree' },
            { path: 'web/a b.png', type: 'blob' },
          ],
        }),
      )
    }
    if (target.endsWith('/missing.md')) return new Response('', { status: 404 })
    return new Response('conteúdo')
  }) as typeof fetch

  it('lista só os arquivos (blobs) pela API de árvore', async () => {
    const source = new RemoteSource('dono/repo', 'main', undefined, fakeFetch)
    expect(await source.files()).toEqual(['README.md', 'web/a b.png'])
    expect(calls[0]).toBe(
      'https://api.github.com/repos/dono/repo/git/trees/main?recursive=1',
    )
  })

  it('lê arquivos pelo raw.githubusercontent, codificando o caminho, e devolve null se 404', async () => {
    const source = new RemoteSource('dono/repo', 'main', undefined, fakeFetch)

    expect(await source.readText('web/a b.png')).toBe('conteúdo')
    expect(calls[calls.length - 1]).toBe(
      'https://raw.githubusercontent.com/dono/repo/main/web/a%20b.png',
    )
    expect(await source.readText('missing.md')).toBeNull()
  })

  it('envia o token quando existe', async () => {
    let authorization: string | null = null
    const spy = (async (_url: string | URL | Request, init?: RequestInit) => {
      authorization = new Headers(init?.headers).get('Authorization')
      return new Response('{"tree":[]}')
    }) as typeof fetch

    await new RemoteSource('dono/repo', 'main', 'segredo', spy).files()
    expect(authorization).toBe('Bearer segredo')
  })
})
