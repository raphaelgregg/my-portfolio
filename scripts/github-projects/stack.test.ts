import { describe, expect, it } from 'vitest'
import {
  appNameFromFolder,
  headlineTechs,
  inferTechsFromFiles,
  normalizeTech,
  stackFromPackage,
  uniqueTechs,
} from './stack.ts'

describe('stackFromPackage', () => {
  it('traduz dependências em tecnologias, na ordem de destaque', () => {
    const stack = stackFromPackage({
      dependencies: { express: '1', typeorm: '1', sqlite3: '1', cors: '1' },
      devDependencies: { typescript: '1' },
    })
    expect(stack).toEqual(['Express', 'TypeORM', 'SQLite', 'TypeScript'])
  })

  it('não repete React ao lado de React Native', () => {
    expect(
      stackFromPackage({
        dependencies: { react: '1', 'react-native': '1', expo: '1' },
      }),
    ).toEqual(['React Native', 'Expo'])
  })
})

describe('normalizeTech e uniqueTechs', () => {
  it('padroniza nomes e remove repetidos', () => {
    expect(normalizeTech('ReactJS')).toBe('React')
    expect(normalizeTech('Typescript')).toBe('TypeScript')
    expect(normalizeTech('Algo Novo')).toBe('Algo Novo')
    expect(
      uniqueTechs(['ReactJS', 'React', 'Typescript', 'TypeScript']),
    ).toEqual(['React', 'TypeScript'])
  })
})

describe('inferTechsFromFiles', () => {
  it('deduz HTML, CSS e JavaScript pelos arquivos', () => {
    expect(
      inferTechsFromFiles([
        'index.html',
        'styles/a.css',
        'scripts.js',
        'logo.png',
      ]),
    ).toEqual(['HTML', 'CSS', 'JavaScript'])
  })
})

describe('headlineTechs e appNameFromFolder', () => {
  it('destaca as tecnologias principais e acrescenta Node.js quando há API', () => {
    const stacks = [
      ['React Native', 'Expo', 'TypeScript'],
      ['Express', 'Knex'],
    ]
    expect(headlineTechs(stacks, true)).toEqual([
      'TypeScript',
      'React Native',
      'Expo',
      'Node.js',
    ])
    expect(headlineTechs(stacks, false)).not.toContain('Node.js')
  })

  it('nomeia as aplicações do monorepo', () => {
    expect(appNameFromFolder('server')).toBe('API')
    expect(appNameFromFolder('web')).toBe('Web')
    expect(appNameFromFolder('mobile')).toBe('Mobile')
    expect(appNameFromFolder('docs')).toBe('docs')
  })
})
