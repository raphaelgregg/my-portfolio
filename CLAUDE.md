# my-portfolio

Portfólio pessoal (Raphael Gregg): SPA em **TypeScript puro** (sem framework de UI) com Vite 8. Dados de empresas, usuário e formação vêm do Firebase Realtime Database; cargos ficam no código; projetos vêm do GitHub via `npm run sync:projects`. Deploy automático na Vercel. Documentação completa em `README.md` (em português).

## Comandos

- `npm run dev`: servidor de desenvolvimento
- `npm run typecheck`: `tsc` (inclui `src` e `scripts`)
- `npm run lint` / `npm run format:check` / `npm test` / `npm run build`: o mesmo que o CI roda (`.github/workflows/ci.yml`)
- `npm run format`: Prettier em todos os arquivos
- `npm run sync:projects`: atualiza `src/data/github-projects.json` (Node roda o `.ts` direto; `GITHUB_TOKEN` evita o limite da API)
- Rode um teste só: `npx vitest run caminho/do/arquivo.test.ts`
- Use **Node 26** (`.nvmrc`).

## Estrutura

- `src/pages/<home|about|experience>`, `src/components/<nome>/{index.ts,styles.css}`, `src/routes`, `src/services` (Firebase), `src/data`, `src/dtos`, `src/utils`
- `scripts/github-projects/`: pipeline do `sync:projects`
- `content/projects/<nome>/`: projetos de clientes (código fechado), escritos à mão (README.md + project.json + imagens); só o que está lá é publicado. O sync gera os dados e `_template/` é o modelo.
- Testes ficam ao lado do código (`*.test.ts`), com Vitest.

## Convenções

- Prettier: sem ponto e vírgula, aspas simples, vírgula final (`.prettierrc.json`). Hooks em `.claude/` formatam a cada edição e bloqueiam a edição de arquivos gerados.
- Commits em Conventional Commits (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`).
- Todo texto vindo do banco ou do GitHub passa por `escapeHtml` (`src/utils/escapeHtml.ts`) antes de entrar em template HTML. Links com `target="_blank"` levam `rel="noopener noreferrer"`.
- Páginas de detalhe usam `components/detail` (lista de seções `{ id, title, body }`; corpo vazio omite a seção).
- Acessibilidade: `<main id="conteudo">`, link "pular para o conteúdo", foco visível, respeito a `prefers-reduced-motion`.
- CSS: estilos globais em `src/styles/` (`main.css` carrega `tokens`, `reset`, `base`, `layout` e `components` em `@layer`); o `styles.css` de cada componente/página fica fora das camadas. Use os tokens (`--text-*`, `--space-*`, `--radius-*`, `--container-width`) e as peças `.container`, `.section`, `.card`, `.chip`, em vez de números soltos (1rem = 10px). Classes, não seletores de elemento; media query `min-width` no fim do próprio arquivo. Títulos: h1 > h2 > h3 em tamanho.
- TypeScript `strict`, com `noUnusedLocals` e `noUnusedParameters`.

## Cuidados

- Não edite `src/data/github-projects.json` à mão: é gerado pelo `sync:projects`. Não edite `package-lock.json` à mão.
- Nunca versione chaves ou `.env`.
- `vercel.json` define rotas da SPA e cabeçalhos de segurança; mantenha os cabeçalhos ao mexer nele.
- Antes de concluir uma mudança, rode `/check`.
- Automações (CI, sync semanal dos projetos, Dependabot, hooks): ver a seção "Automações e Claude Code" do `README.md`.
