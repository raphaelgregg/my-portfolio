# Portfólio · Raphael Gregg

Portfólio pessoal: página inicial com experiência profissional e projetos, páginas de detalhe, e um currículo em páginas A4 que vira PDF. É uma SPA em **TypeScript puro** (sem framework de interface) construída com [Vite](https://vite.dev), com dados de empresas e formação no **Firebase Realtime Database**, cargos no código e projetos lidos do **GitHub**.

- **Site:** https://portfolio.rgregg.com.br
- **Repositório:** https://github.com/raphaelgregg/my-portfolio

## Índice

1. [Ferramentas](#ferramentas)
2. [Requisitos](#requisitos)
3. [Instalação e início rápido](#instalação-e-início-rápido)
4. [Comandos](#comandos)
5. [Estrutura do projeto](#estrutura-do-projeto)
6. [Rotas](#rotas)
7. [Atualizar informações do site](#atualizar-informações-do-site)
8. [Firebase (dados)](#firebase-dados)
9. [Qualidade e CI](#qualidade-e-ci)
10. [Automações e Claude Code](#automações-e-claude-code)
11. [Publicação (Vercel) e branches](#publicação-vercel-e-branches)
12. [Convenções de código](#convenções-de-código)
13. [Problemas comuns](#problemas-comuns)

## Ferramentas

| Ferramenta                                                     | Para que serve                                                                               |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [Node.js 26 LTS](https://nodejs.org/)                          | Executa o Vite, os testes e os scripts (que são TypeScript rodado direto pelo Node)          |
| [Vite 8](https://vite.dev)                                     | Servidor de desenvolvimento e build de produção                                              |
| [TypeScript 5.9](https://www.typescriptlang.org)               | Linguagem, em modo `strict`                                                                  |
| [Firebase 13](https://firebase.google.com)                     | Realtime Database: dados de usuário, formação e empresas                                     |
| [Lucide](https://lucide.dev)                                   | Ícones (download do currículo, setas dos carrosséis)                                         |
| [ESLint 10](https://eslint.org) + typescript-eslint            | Análise estática                                                                             |
| [Prettier 3](https://prettier.io)                              | Formatação                                                                                   |
| [Vitest 5](https://vitest.dev)                                 | Testes automatizados                                                                         |
| [sharp](https://sharp.pixelplumbing.com)                       | Otimiza as imagens dos projetos (só no `sync:projects`)                                      |
| [GitHub Actions](https://docs.github.com/actions)              | CI: lint, formatação, testes e build a cada push e pull request                              |
| [Dependabot](https://docs.github.com/code-security/dependabot) | Abre PRs semanais de atualização de dependências e de actions                                |
| [Claude Code](https://claude.com/claude-code)                  | Assistente de código com hooks e skill configurados no repositório (`.claude/`, `CLAUDE.md`) |
| [Vercel](https://vercel.com)                                   | Hospedagem e deploy automático                                                               |

## Requisitos

- **Node.js 26 LTS.** A versão está em `.nvmrc` e em `engines` do `package.json`. O Vercel usa o `engines` e ignora a versão configurada no painel.
- **Git** e acesso à internet (o Firebase e as fontes do Google são carregados em tempo de execução).
- Opcionais: [nvm](https://github.com/nvm-sh/nvm) para trocar de versão do Node; [GitHub CLI](https://cli.github.com) (`gh`) para listar os projetos fixados; um `GITHUB_TOKEN` para o `sync:projects` não esbarrar no limite da API.

## Instalação e início rápido

```bash
git clone https://github.com/raphaelgregg/my-portfolio.git
cd my-portfolio

nvm use          # lê o .nvmrc e seleciona o Node 26
npm ci           # instala exatamente o que está no package-lock.json
npm run dev      # sobe o servidor de desenvolvimento
```

O terminal mostra o endereço (normalmente http://localhost:5173). A página recarrega sozinha quando você salva um arquivo.

Para conferir que está tudo certo na sua máquina:

```bash
npm run lint && npm test && npm run build
```

> O npm 11 não executa scripts de `postinstall` por padrão e avisa disso na instalação (pacotes `@firebase/util` e `protobufjs`). O site não depende deles; o aviso é esperado.

## Comandos

| Comando                 | O que faz                                                                                                |
| ----------------------- | -------------------------------------------------------------------------------------------------------- |
| `npm run dev`           | Servidor de desenvolvimento com recarga automática                                                       |
| `npm run build`         | Checa os tipos e gera o build de produção em `dist/`                                                     |
| `npm run preview`       | Serve o build de `dist/` localmente (inclusive as rotas, como `/resume`)                                 |
| `npm run typecheck`     | Só a checagem de tipos (`tsc`), sem gerar arquivos                                                       |
| `npm run lint`          | ESLint                                                                                                   |
| `npm run format`        | Prettier: formata todos os arquivos                                                                      |
| `npm run format:check`  | Prettier: só verifica (é o que o CI roda)                                                                |
| `npm test`              | Testes (Vitest)                                                                                          |
| `npm run sync:projects` | Atualiza os projetos pessoais a partir do GitHub ([como usar](#c-os-projetos-fixados-no-github-mudaram)) |

## Estrutura do projeto

```
index.html                 Documento base: título, descrição, Open Graph e fontes
vercel.json                Rotas da SPA e cabeçalhos de segurança no Vercel
CLAUDE.md                  Instruções do projeto para o Claude Code
.claude/                   Hooks e skills do Claude Code (ver Automações)
.github/
  workflows/ci.yml         CI: lint, formatação, testes e build
  workflows/sync-projects.yml  Sincronização semanal dos projetos (abre PR)
  dependabot.yml           Atualizações semanais de dependências e actions
.nvmrc                     Versão do Node (26)
public/
  favicon.svg              Ícone do site
  svg/                     Ícones de tecnologia e ilustrações
  projects/<repo>/         Capas e capturas dos projetos (geradas pelo sync:projects)
scripts/
  sync-github-projects.ts  Gera os dados dos projetos a partir do GitHub
  github-projects/         Parser de README, links, stack, fontes e lista de fixados
src/
  main.ts / app.ts         Entrada, navegação entre páginas e eventos globais
  routes/                  Mapa de URL → página
  pages/<nome>/            Uma pasta por página (index.ts + styles.css)
  components/<nome>/       Peças reutilizáveis (header, footer, cards, carousel, detail)
  data/                    Conteúdo no código: cargos, projetos e curadoria, ícones
  services/                Acesso ao Firebase
  dtos/                    Tipos dos dados
  utils/                   Funções auxiliares (datas, escapeHtml, impressão em PDF)
  styles/                  main.css (entrada), tokens, reset, base, layout, components e detail.css (páginas de detalhe)
```

> `public/svg/<tecnologia>.svg` é procurado pelo nome da tecnologia: antes de remover um ícone, confira `src/data/techIcons.ts` e os dados.

## Rotas

| URL                    | Página                                                                         |
| ---------------------- | ------------------------------------------------------------------------------ |
| `/`                    | Início: apresentação, experiência profissional (carrossel) e projetos pessoais |
| `/experience/:id`      | Detalhe de uma empresa: período, duração, local, site, cargos e projetos       |
| `/project/:slug`       | Detalhe de um projeto do GitHub: README, capturas, aplicações e tecnologias    |
| `/resume`              | Currículo em páginas A4 (botão vermelho no canto baixa o PDF)                  |
| `/curriculum-download` | Endereço antigo do currículo; abre o mesmo conteúdo                            |
| `/about`               | Em construção                                                                  |

O `vercel.json` redireciona qualquer caminho para o `index.html`; é isso que permite abrir uma rota diretamente pela URL.

## Atualizar informações do site

### Onde está cada informação

| Quero mudar…                                                          | Onde editar                                                                  |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Texto da apresentação ("Olá! Eu sou…", "dev front-end…")              | `src/pages/home/index.ts` (e `user.surname` e `user.profession` no Firebase) |
| Nome da faculdade na apresentação                                     | Firebase, nó `education` (campo `universityShortName`)                       |
| **Currículo**: resumo, contatos, formação, habilidades, certificações | `src/pages/resume/resumeContent.ts`                                          |
| **Cargos** (aparecem no currículo, nas páginas e nos cards)           | `src/data/career.ts`                                                         |
| **Empresas** (nome, logo, site, "sobre a empresa")                    | Firebase, nó `experience`                                                    |
| **Projetos pessoais**                                                 | `npm run sync:projects` (a partir do GitHub)                                 |
| Nome de exibição e categoria de um projeto                            | `src/data/github-projects.ts` (`curation`)                                   |
| E-mail, GitHub e LinkedIn (bloco "Contato" da home e rodapé)          | `src/data/contact.ts`                                                        |
| Título da aba, descrição, Open Graph e domínio canônico               | `index.html`                                                                 |
| Favicon                                                               | `public/favicon.svg`                                                         |
| Ícones de tecnologia                                                  | `public/svg/` e `src/data/techIcons.ts`                                      |

Depois de qualquer edição no código: rode `npm run dev`, confira no navegador, rode `npm run lint && npm test` e [publique](#publicação-vercel-e-branches). Mudanças no Firebase aparecem no site assim que a página é recarregada, sem deploy.

### Receitas

#### A. Atualizar o currículo (e o PDF)

1. Edite `src/pages/resume/resumeContent.ts`. Ele guarda o perfil, o resumo (deixe `''` para ocultar a seção), a formação, as habilidades e as certificações. As experiências do currículo vêm de `src/data/career.ts`.
2. Abra `/resume` no `npm run dev`. A tela e o PDF usam o mesmo HTML e CSS, então o que você vê é o que sai no arquivo.
3. Para conferir o PDF, clique no botão vermelho de download e, na janela de impressão, escolha **Salvar como PDF** (o nome do arquivo já vem preenchido). O currículo é A4, com texto selecionável e links clicáveis.

Em telas a partir de 840px o currículo aparece em páginas A4 com navegação (botões e setas do teclado); no celular ele rola como uma página contínua.

#### B. Adicionar uma nova experiência ou cargo

Uma empresa tem **duas partes**, para o currículo e as páginas nunca divergirem:

| Parte                                       | Onde                      | Alimenta                                                  |
| ------------------------------------------- | ------------------------- | --------------------------------------------------------- |
| A **empresa** (nome, logo, site, "sobre")   | Firebase, nó `experience` | card da home e cabeçalho/"Sobre" da página                |
| Os **cargos** (período, local, atribuições) | `src/data/career.ts`      | página da experiência, card da home **e currículo (PDF)** |

1. **Empresa nova:** no Firebase, inclua um item em `experience` com um `id` novo:

   ```json
   {
     "id": 5,
     "company": "Nome completo da empresa",
     "companyShortName": "Nome curto (aparece no card)",
     "thumbnailCompany": "https://.../logo.svg",
     "url": "https://site.com.br/",
     "companyOverview": "Parágrafo sobre a empresa.",
     "companyOverviewShort": "Uma frase para o card.",
     "location": "Cidade, UF",
     "hireDate": "2024-01-01",
     "departureDate": "presente",
     "jobs": [],
     "projects": []
   }
   ```

2. **Cargos:** em `src/data/career.ts`, inclua um objeto em `positions` por cargo, com `experienceId: '5'`. Início e término no formato `AAAA-MM-01`; término `presente` se continua. Período, duração, local e o cargo do card são calculados a partir daqui.

Pronto: o card aparece na home, a página `/experience/5` é criada e o cargo entra no currículo. Se a empresa ainda não existe no Firebase, ela é criada a partir do `career.ts`, sem logo (o card mostra a inicial). Campos vazios (`url: "#"`, sem projetos, sem "sobre") simplesmente não aparecem.

Para **mudar um cargo existente** (nova função, datas, atribuições), edite só o objeto dele em `career.ts`.

#### C. Os projetos fixados no GitHub mudaram

A seção "Projetos Pessoais" mostra os repositórios fixados no seu perfil, preenchidos a partir do README de cada um.

O conteúdo dos repositórios já listados é atualizado toda semana por um workflow que abre um PR ([Automações](#automações-e-claude-code)); os passos abaixo servem para mudar a **lista** de repositórios ou rodar a atualização na hora.

| O quê                                                          | Onde                                                  |
| -------------------------------------------------------------- | ----------------------------------------------------- |
| Quais repositórios (e a ordem)                                 | `scripts/github-projects/pinned.json`                 |
| Dados gerados do README e do GitHub                            | `src/data/github-projects.json` (**não edite à mão**) |
| Capas e capturas de tela (WebP, até 1200px)                    | `public/projects/<repo>/` (geradas)                   |
| Nome de exibição, categoria e resumo quando o README não serve | `src/data/github-projects.ts` (`curation`)            |

1. O comando lê os repositórios fixados do seu perfil (API GraphQL) e atualiza `scripts/github-projects/pinned.json` sozinho. Isso exige `GITHUB_TOKEN` no ambiente; sem ele (ou se a consulta falhar), usa a lista que já está no `pinned.json` e avisa. Para editar a lista à mão, mude o `pinned.json` e rode o comando sem token.
2. Se quiser conferir os fixados antes (precisa do `gh` autenticado):

   ```bash
   gh api graphql -f query='{ user(login:"raphaelgregg") { pinnedItems(first:6, types:REPOSITORY) { nodes { ... on Repository { name } } } } }' --jq '.data.user.pinnedItems.nodes[].name'
   ```

3. Gere os dados:

   ```bash
   npm run sync:projects                      # lê pela API do GitHub
   GITHUB_TOKEN=... npm run sync:projects     # com token: 5000 requisições/h em vez de 60
   npm run sync:projects -- --local ~/repos   # lê de clones locais (<pasta>/<repo>)
   ```

4. Se um projeto novo precisar de nome de exibição ou categoria, acrescente-o em `curation`. Reexecutar o sync **não apaga** a curadoria.
5. Revise o `git diff` e faça o commit.

O comando lê o README (título, resumo, funcionalidades marcadas `[x]`, tecnologias, links de site, vídeo, layout e desafio, e o roteiro de aulas de READMEs de curso), as imagens, as aplicações de monorepos (`web`, `mobile`, `server`, pelo `package.json` de cada uma) e as datas. Quanto mais completo o README do repositório, melhor o resultado no site.

#### D. Textos, contatos e SEO

- **Apresentação da home:** edite os textos em `src/pages/home/index.ts`.
- **Contatos (bloco "Contato" da home e rodapé):** `src/data/contact.ts`. Os contatos do currículo ficam em `resumeContent.ts`.
- **Visual da home:** o hero, a lista de projetos (uma linha por projeto: capa, texto e data) e o bloco de contato escuro que se junta ao rodapé estão em `src/pages/home/` e `src/components/cardMyProjects/`. A fonte dos títulos das seções (Bricolage Grotesque) vem do `index.html` e da variável `--font-display`; para voltar à Inter, troque só essa variável. Se a imagem de uma logo falhar, o card mostra a inicial da empresa.
- **Título, descrição e domínio:** em `index.html` estão `<title>`, `description`, `canonical` e `og:url`. Se o domínio principal mudar, atualize os dois últimos.

#### E. Dados do Firebase (empresas, usuário, formação)

1. Abra o [console do Firebase](https://console.firebase.google.com), projeto `my-portfolio-5104c`, **Realtime Database**.
2. Edite o nó (`user`, `education` ou `experience`) e salve. O site já mostra a mudança ao recarregar.

## Firebase (dados)

O site lê três nós do Realtime Database:

| Nó           | Usado para                                                                                         |
| ------------ | -------------------------------------------------------------------------------------------------- |
| `user`       | `surname` e `profession` na apresentação (os demais campos do tipo `UserDTO` não aparecem no site) |
| `education`  | `universityShortName` na apresentação                                                              |
| `experience` | Empresas: cards da home e cabeçalho das páginas de experiência                                     |

- `src/services/data.json` é um **snapshot de referência** do banco (formato dos dados e exemplo). Ele não é lido pelo site.
- As leituras são feitas uma vez por sessão e reaproveitadas entre as páginas (`src/services/firebaseService.ts`). Se o Firebase falhar, a home continua mostrando as empresas de `career.ts`.
- Os ids numéricos antigos em `/project/<número>` mostram estudos de caso que ainda vêm do nó `experience` (item de `id` 0); os projetos novos usam o slug do repositório.
- A chave em `src/services/firebaseConfig.ts` é pública por definição no Firebase. **A proteção dos dados vem das regras do banco**: confirme no console que a escrita pública está bloqueada.

## Qualidade e CI

O arquivo `.github/workflows/ci.yml` roda a cada push e pull request, com o Node de `.nvmrc`:

```
npm ci → npm run lint → npm run format:check → npm test → npm run build
```

Antes de publicar, rode o mesmo localmente: `npm run lint && npm run format:check && npm test && npm run build`. Se o `format:check` falhar, `npm run format` corrige.

Os testes (`npm test`) cobrem utilitários, páginas, dados e os scripts de sincronização; `*.test.ts` fica ao lado do arquivo testado.

## Automações e Claude Code

Tudo o que roda sozinho no projeto, e para quê.

| Automação                 | Arquivo                               | Quando roda                                | Para que serve                                                                     |
| ------------------------- | ------------------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------- |
| CI                        | `.github/workflows/ci.yml`            | A cada push e pull request                 | Garante lint, formatação, testes e build                                           |
| Sincronização de projetos | `.github/workflows/sync-projects.yml` | Segundas, 06:17 UTC, e manualmente         | Atualiza os dados dos projetos do GitHub e abre um PR se algo mudou                |
| Dependabot                | `.github/dependabot.yml`              | Semanalmente                               | Abre PRs de atualização do npm (devDependencies agrupadas) e das actions do GitHub |
| Hook de formatação        | `.claude/hooks/format.sh`             | Após o Claude editar um arquivo            | Roda Prettier e, em `.ts`, `eslint --fix`, para o CI não falhar por estilo         |
| Hook de proteção          | `.claude/hooks/protect-files.sh`      | Antes de o Claude editar um arquivo        | Bloqueia edição manual de `github-projects.json`, `package-lock.json` e `.env*`    |
| Skill `/check`            | `.claude/skills/check/SKILL.md`       | Quando você digita `/check` no Claude Code | Roda typecheck, lint, format:check, testes e build e resume o que falhou           |
| Instruções do projeto     | `CLAUDE.md`                           | Carregado em toda sessão do Claude Code    | Comandos, estrutura, convenções e cuidados do projeto                              |

Os hooks são registrados em `.claude/settings.json`. Eles só valem para o Claude Code e não afetam quem edita à mão; para `.env.example` não há bloqueio.

### Sincronização semanal dos projetos

O workflow roda `npm run sync:projects` e, se `src/data/github-projects.json` ou `public/projects/` mudarem, abre o PR `chore: sync github projects` na branch `chore/sync-projects`. Sem mudanças, termina com sucesso e sem PR.

- **Rodar na hora:** Actions → "Sync projects" → "Run workflow".
- **Permissão necessária:** Settings → Actions → General → "Allow GitHub Actions to create and approve pull requests".
- **CI nos PRs do sync (opcional):** PRs abertos com o `GITHUB_TOKEN` padrão não disparam o CI. Para que disparem, crie o secret `SYNC_PROJECTS_TOKEN_MYPORTFOLIO` (Settings → Secrets and variables → Actions) com um token pessoal fine-grained limitado a este repositório, com permissões **Contents** e **Pull requests** em leitura e escrita. Sem o secret, o workflow usa o `GITHUB_TOKEN`. Tokens fine-grained expiram: anote a data de renovação.
- **Fixados do perfil:** o workflow lê os repositórios fixados no seu perfil com o `GITHUB_TOKEN` e grava a lista em `scripts/github-projects/pinned.json`. Se você fixar ou trocar um projeto, a mudança entra no próximo PR do sync. Se a consulta falhar, o workflow usa o `pinned.json` e avisa no log.
- Agendamentos só rodam a partir da branch padrão (`main`).

### Dependabot e `npm audit`

O `npm audit` aponta 4 vulnerabilidades altas, todas com a mesma origem: `@grpc/grpc-js` 1.9.16, dependência do `firebase`. O site só usa `firebase/app` e `firebase/database`, e o build de produção não contém `grpc`, então elas não chegam ao navegador. Não rode `npm audit fix --force`: ele instalaria o `firebase@9`, uma versão muito mais antiga. A correção virá com uma versão nova do `firebase`, que o Dependabot propõe em PR. Se precisar resolver antes, a alternativa é `overrides` no `package.json` (`"@grpc/grpc-js": "^1.14.7"`), que exige testar o `firebase/database`.

### Claude Code

O `CLAUDE.md` e a pasta `.claude/` ficam no repositório para que qualquer sessão do Claude Code já conheça os comandos e as regras do projeto. Para mudar o comportamento dos hooks, edite `.claude/settings.json` e os scripts em `.claude/hooks/`.

## Publicação (Vercel) e branches

O deploy é automático pelo Vercel a cada push. O `vercel.json` define as rotas da SPA e os cabeçalhos de segurança; a versão do Node vem do `engines` do `package.json`.

| Branch                     | Papel                                                       |
| -------------------------- | ----------------------------------------------------------- |
| `main`                     | Código estável; deve ser a branch de **produção** do Vercel |
| `development`              | Integração do que está em andamento                         |
| demais (ex.: `claude-dev`) | Trabalho em curso; geram **preview**                        |

Fluxo sugerido: trabalhe numa branch, abra um pull request (o CI roda), integre em `development` e, quando estiver pronto, em `main`.

> **Produção ou preview?** Só a branch configurada como **produção** no Vercel publica no site principal; as demais geram deploys de _preview_. A configuração fica em **Settings → Environments → Production** do projeto (campo de branch de produção). Se uma atualização na `main` aparecer só como preview, essa configuração está apontando para outra branch. Um preview pronto também pode ser publicado manualmente com **Promote to Production**, sem rebuild.

## Convenções de código

- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/pt-br/) (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`).
- **Segurança:** todo texto vindo do banco ou do GitHub deve passar por `escapeHtml` (`src/utils/escapeHtml.ts`) ao entrar em um template HTML; links com `target="_blank"` levam `rel="noopener noreferrer"`.
- **Páginas de detalhe:** `components/detail` define o esqueleto compartilhado (experiência e projeto): um cabeçalho e uma **lista de seções** `{ id, title, body }`. Cada `body` é uma função que devolve o HTML ou `''`, e corpo vazio faz a seção não aparecer. Para criar uma seção nova, escreva a função do corpo e acrescente uma linha à lista da página.
- **Carrossel:** `components/carousel` (`Carousel({ label, items })` + `setupCarousels()`) serve para qualquer lista de cards: rolagem nativa com encaixe, botões, indicadores, arrastar com o mouse e animação de entrada. Os controles só aparecem quando há cards fora da tela.
- **Organização do CSS:** os estilos globais ficam em `src/styles/`, carregados por `main.css` em camadas (`@layer`), da menos para a mais forte: `reset` → `base` (elementos HTML) → `layout` (`.container`, `.section`) → `components` (`.button`, `.card`, `.chip`, `.gradient-text`). O `styles.css` de cada componente ou página fica **fora das camadas** e por isso sempre vence os estilos compartilhados, sem precisar aumentar a especificidade. Regras: use classes (não seletores de elemento como `nav div`), com a media query no fim do próprio arquivo, sempre `min-width` (mobile first); os breakpoints (485, 610, 742, 986 e 1090px) estão listados em `tokens.css`.
- **Tokens de CSS:** `src/styles/tokens.css` é a fonte única de valores. Use as variáveis em vez de números soltos: tipografia (`--text-xs` a `--text-3xl`, `--leading-*`), espaçamento (`--space-1` a `--space-24`, múltiplos de 0.4rem), formas (`--radius-*`, `--border`), cores e largura (`--container-width`, `--gutter`). O `html` usa 62.5%, então 1rem = 10px. Respeite a hierarquia dos títulos: h1 (`--text-xl`) > h2 (`--text-lg`) > h3 (`--text-md`). O CSS do currículo (`pages/resume`) mantém valores próprios, porque a página A4 depende de medidas exatas para imprimir.
- **Acessibilidade:** `<main id="conteudo">` em toda página, link "pular para o conteúdo", foco visível e respeito a `prefers-reduced-motion`.

## Problemas comuns

| Sintoma                                                | O que fazer                                                                                           |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `npm ci` avisa sobre `engines` ou o Vite não inicia    | Você está com outro Node: `nvm use` (precisa ser o 26)                                                |
| Porta ocupada no `npm run dev`                         | O Vite usa a próxima porta livre e mostra o endereço; ou `npm run dev -- --port 3000`                 |
| Home sem cards ou sem textos do banco                  | Veja o console do navegador (Firebase indisponível?); as empresas de `career.ts` aparecem mesmo assim |
| `sync:projects` falha com 403 ou limite de requisições | Use `GITHUB_TOKEN=... npm run sync:projects` ou o modo `--local`                                      |
| Ícone de tecnologia não aparece                        | Confira `public/svg/` e `src/data/techIcons.ts`; tecnologias sem ícone ficam só com o texto           |
| O workflow de sync terminou sem abrir PR               | Normal quando nada mudou nos projetos; veja o passo final do job ("not ahead of base")                |
| O PR do sync não dispara o CI                          | Crie o secret `SYNC_PROJECTS_TOKEN_MYPORTFOLIO` ([Automações](#automações-e-claude-code))             |
| `npm audit` aponta 4 vulnerabilidades altas            | Vêm do `grpc-js` via `firebase`, fora do bundle; veja [Automações](#automações-e-claude-code)         |
| `format:check` falha no CI                             | `npm run format` e faça o commit                                                                      |
| A `main` só gera preview no Vercel                     | Veja [Publicação](#publicação-vercel-e-branches): a branch de produção do projeto não é a `main`      |
