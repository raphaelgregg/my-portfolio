import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterAll, describe, expect, it } from 'vitest'
import { buildPrivateProject, normalizeDate } from './private.ts'
import { FolderSource, type RepoSource } from './sources.ts'

function fakeSource(files: Record<string, string>): RepoSource {
  return {
    files: async () => Object.keys(files),
    readText: async (path) => files[path] ?? null,
    readBinary: async (path) =>
      path in files ? Buffer.from(files[path]) : null,
  }
}

describe('normalizeDate', () => {
  it('aceita AAAA-MM e AAAA-MM-DD', () => {
    expect(normalizeDate('2024-05')).toBe('2024-05-01')
    expect(normalizeDate('2024-05-10')).toBe('2024-05-10')
  })

  it('recusa formatos inválidos', () => {
    expect(() => normalizeDate('maio de 2024')).toThrow(/Data inválida/)
    expect(() => normalizeDate('2024')).toThrow(/Data inválida/)
  })
})

describe('buildPrivateProject', () => {
  const readme =
    '# Sistema do Cliente\n\n## Projeto\n\nPlataforma de agendamento feita para uma clínica.\n\n## Tecnologias\n\n- React\n- Typescript\n\n## Funcionalidades\n\n- [x] Agenda online\n\n![tela](./tela.png)'

  it('monta o projeto só com o que está na pasta, sem link de repositório', async () => {
    const source = fakeSource({
      'README.md': readme,
      'tela.png': 'png',
    })

    const { project, images } = await buildPrivateProject(
      'clinica',
      { date: '2024-05', site: 'clinica.com.br' },
      source,
    )

    expect(project).toMatchObject({
      slug: 'clinica',
      name: 'Sistema do Cliente',
      summary: 'Plataforma de agendamento feita para uma clínica.',
      techs: ['React', 'TypeScript'],
      features: ['Agenda online'],
      cover: '/projects/clinica/1.webp',
      createdAt: '2024-05-01',
      private: true,
    })
    expect(project.links.site).toBe('https://clinica.com.br')
    expect('repo' in project).toBe(false)
    expect('repo' in project.links).toBe(false)
    expect(images).toEqual(['tela.png'])
  })

  it('sem site, não há botão de aplicação', async () => {
    const { project } = await buildPrivateProject(
      'clinica',
      { date: '2024-05' },
      fakeSource({ 'README.md': readme }),
    )
    expect(project.links.site).toBeUndefined()
  })
})

describe('FolderSource', () => {
  let dir = ''

  afterAll(async () => {
    if (dir) await rm(dir, { recursive: true, force: true })
  })

  it('lista os arquivos da pasta (inclusive de subpastas) sem precisar do git', async () => {
    dir = await mkdtemp(join(tmpdir(), 'portfolio-folder-'))
    await mkdir(join(dir, 'img'))
    await writeFile(join(dir, 'README.md'), '# Olá')
    await writeFile(join(dir, 'img', 'tela.png'), 'png')

    const source = new FolderSource(dir)

    expect(await source.files()).toEqual(['README.md', 'img/tela.png'])
    expect(await source.readText('README.md')).toBe('# Olá')
    expect(await source.readText('nao-existe.md')).toBeNull()
    expect((await source.readBinary('img/tela.png'))?.toString()).toBe('png')
  })
})
