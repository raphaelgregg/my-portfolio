import { describe, expect, it } from 'vitest'
import { fetchPinnedRepos } from './pinned.ts'

function fakeFetch(body: unknown, status = 200): typeof fetch {
  return (async () =>
    new Response(JSON.stringify(body), { status })) as typeof fetch
}

describe('fetchPinnedRepos', () => {
  it('devolve os nomes dos fixados, na ordem do GitHub', async () => {
    const fetchImpl = fakeFetch({
      data: {
        user: {
          pinnedItems: { nodes: [{ name: 'novo-projeto' }, { name: 'happy' }] },
        },
      },
    })
    expect(await fetchPinnedRepos('dono', 'token', fetchImpl)).toEqual([
      'novo-projeto',
      'happy',
    ])
  })

  it('manda o login e o token na chamada GraphQL', async () => {
    let request: { url: string; init?: RequestInit } | undefined
    const fetchImpl = (async (
      url: string | URL | Request,
      init?: RequestInit,
    ) => {
      request = { url: String(url), init }
      return new Response(JSON.stringify({ data: { user: null } }))
    }) as typeof fetch

    await fetchPinnedRepos('dono', 'abc', fetchImpl)

    expect(request?.url).toBe('https://api.github.com/graphql')
    expect(request?.init?.headers).toMatchObject({
      Authorization: 'Bearer abc',
    })
    expect(JSON.parse(String(request?.init?.body)).variables).toEqual({
      login: 'dono',
    })
  })

  it('sem token, não chama a API e devolve null', async () => {
    let called = false
    const fetchImpl = (async () => {
      called = true
      return new Response('{}')
    }) as typeof fetch

    expect(await fetchPinnedRepos('dono', undefined, fetchImpl)).toBeNull()
    expect(called).toBe(false)
  })

  it('devolve null se a API falhar, a resposta vier vazia ou a rede cair', async () => {
    expect(await fetchPinnedRepos('dono', 't', fakeFetch({}, 401))).toBeNull()
    expect(
      await fetchPinnedRepos(
        'dono',
        't',
        fakeFetch({ data: { user: { pinnedItems: { nodes: [] } } } }),
      ),
    ).toBeNull()

    const broken = (async () => {
      throw new Error('rede')
    }) as typeof fetch
    expect(await fetchPinnedRepos('dono', 't', broken)).toBeNull()
  })
})
