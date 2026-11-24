import { describe, expect, it } from 'vitest'
import { buildProject, type RepoMeta } from './build.ts'
import type { RepoSource } from './sources.ts'

/** Repositório em memória: { caminho: conteúdo }. */
function fakeSource(files: Record<string, string>): RepoSource {
  return {
    files: async () => Object.keys(files),
    readText: async (path) => files[path] ?? null,
    readBinary: async (path) =>
      path in files ? Buffer.from(files[path]) : null,
  }
}

const meta = (overrides: Partial<RepoMeta> = {}): RepoMeta => ({
  name: 'meu-repo',
  description: 'Descrição do GitHub',
  homepage: 'meu-repo.vercel.app',
  created_at: '2021-03-09T10:00:00Z',
  pushed_at: '2022-01-02T10:00:00Z',
  language: 'TypeScript',
  fork: false,
  ...overrides,
})

describe('buildProject', () => {
  it('monta o projeto a partir do README, das imagens e dos metadados', async () => {
    const source = fakeSource({
      'README.md':
        '# Meu App\n\n## 💻 Projeto\n\nUm aplicativo para organizar tarefas do dia a dia.\n\n## Tecnologias\n\n- ReactJS\n- Typescript\n\n![tela](./.github/tela.png)\n![logo](.github/logo.svg)',
      '.github/tela.png': 'png',
      '.github/logo.svg': 'svg',
    })

    const { project, images } = await buildProject('dono', meta(), source)

    expect(project).toMatchObject({
      slug: 'meu-repo',
      repo: 'dono/meu-repo',
      name: 'Meu App',
      summary: 'Um aplicativo para organizar tarefas do dia a dia.',
      techs: ['React', 'TypeScript'], // nomes padronizados
      cover: '/projects/meu-repo/1.webp',
      createdAt: '2021-03-09',
      pushedAt: '2022-01-02',
      language: 'TypeScript',
      fork: false,
    })
    expect(project.links.site).toBe('https://meu-repo.vercel.app') // homepage do GitHub
    expect(images).toEqual(['.github/tela.png']) // o SVG (logo) não é captura de tela
  })

  it('sem README: usa a descrição do GitHub, o nome do repositório e deduz as tecnologias pelos arquivos', async () => {
    const { project } = await buildProject(
      'dono',
      meta({ name: 'landing-light', homepage: null }),
      fakeSource({ 'index.html': '', 'style.css': '', 'app.js': '' }),
    )

    expect(project.name).toBe('Landing Light')
    expect(project.summary).toBe('Descrição do GitHub')
    expect(project.techs).toEqual(['HTML', 'CSS', 'JavaScript'])
    expect(project.screenshots).toEqual([])
    expect(project.cover).toBeUndefined()
  })

  it('monorepo: lista as aplicações (web, mobile, API) com a stack de cada uma', async () => {
    const pkg = (deps: Record<string, string>) =>
      JSON.stringify({ dependencies: deps })
    const source = fakeSource({
      'web/package.json': pkg({ react: '1', leaflet: '1' }),
      'mobile/package.json': pkg({
        react: '1',
        'react-native': '1',
        expo: '1',
      }),
      'server/package.json': pkg({ express: '1', knex: '1' }),
    })

    const { project } = await buildProject('dono', meta(), source)

    expect(project.apps).toEqual([
      { name: 'Web', stack: ['React', 'Leaflet'] },
      { name: 'Mobile', stack: ['React Native', 'Expo'] },
      { name: 'API', stack: ['Express', 'Knex'] },
    ])
    expect(project.techs).toContain('Node.js') // há uma API
  })

  it('uma única aplicação (package.json só na raiz ou em uma pasta) não vira "aplicações"', async () => {
    const { project } = await buildProject(
      'dono',
      meta(),
      fakeSource({
        'web/package.json': '{"dependencies":{"react":"1"}}',
        'index.html': '',
      }),
    )
    expect(project.apps).toEqual([])
  })

  it('ignora imagens externas, inexistentes e package.json inválido', async () => {
    const { images } = await buildProject(
      'dono',
      meta(),
      fakeSource({
        'readme.md':
          '# X\n![a](https://x.com/a.png)\n![b](./nao-existe.png)\n![c](./ok.png)',
        'ok.png': 'png',
        'web/package.json': '{ quebrado',
        'mobile/package.json': '{}',
      }),
    )
    expect(images).toEqual(['ok.png'])
  })
})
