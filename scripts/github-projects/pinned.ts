type FetchLike = typeof fetch

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes { ... on Repository { name } }
      }
    }
  }
`

/**
 * Repositórios fixados no perfil, na ordem em que aparecem no GitHub.
 *
 * Usa a API GraphQL, que exige um token (o GITHUB_TOKEN do Actions serve).
 * Devolve null quando não há token, a chamada falha ou não há fixados: nesses
 * casos o chamador mantém a lista de pinned.json.
 */
export async function fetchPinnedRepos(
  owner: string,
  token: string | undefined,
  fetchImpl: FetchLike = fetch,
): Promise<string[] | null> {
  if (!token) return null

  try {
    const response = await fetchImpl('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'portfolio-sync',
      },
      body: JSON.stringify({ query: QUERY, variables: { login: owner } }),
    })
    if (!response.ok) return null

    const body = (await response.json()) as {
      data?: { user?: { pinnedItems?: { nodes?: { name?: string }[] } } }
    }
    const names = (body.data?.user?.pinnedItems?.nodes ?? [])
      .map((node) => node.name)
      .filter((name): name is string => Boolean(name))

    return names.length > 0 ? names : null
  } catch {
    return null
  }
}
