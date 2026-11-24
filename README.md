# my-portfolio

Portfólio pessoal de Raphael Gregg: SPA em TypeScript puro (sem framework) com [Vite](https://vite.dev). Os dados de experiência, formação e projetos vêm do Firebase Realtime Database; o currículo é gerado em PDF no navegador.

## Requisitos

[Node.js 26 LTS](https://nodejs.org/) (versão em `.nvmrc` e em `engines` do `package.json`; o Vercel usa o `engines` e ignora a versão configurada no painel). Com nvm: `nvm use`.

## Como rodar

```bash
npm install
npm run dev          # servidor de desenvolvimento
npm run build        # checagem de tipos + build de produção em dist/
npm run preview      # serve o build localmente
npm run lint         # ESLint
npm run format       # Prettier (format:check só verifica)
```

O deploy é no Vercel; `vercel.json` redireciona todas as rotas para `index.html` (necessário para a navegação por URL).

## Estrutura

```
index.html                 Documento base (carrega src/main.ts)
public/                    Arquivos estáticos: favicon e svg/ (ícones de tecnologia)
src/
  main.ts / app.ts         Entrada, navegação entre páginas e eventos globais
  routes/                  Mapa de URL → página
  pages/<nome>/            Uma pasta por página (index.ts, styles.css)
  components/<nome>/       Peças reutilizáveis (header, footer, cards, carousel)
  services/                Acesso ao Firebase
  dtos/                    Tipos dos dados do banco
  utils/                   Funções auxiliares (datas, escapeHtml, PDF)
  styles/                  global.css e queries.css (responsivo)
```

> `public/svg/<tecnologia>.svg` é carregado pelo nome vindo do banco (`/svg/${tech}.svg`): não remova ícones sem checar os dados.

## Rotas

| URL                    | Página                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------- |
| `/`                    | Início (experiência e projetos pessoais)                                           |
| `/project/:slug`       | Detalhe de um projeto fixado no GitHub (README, capturas, aplicações, tecnologias) |
| `/resume`              | Currículo na tela (botão baixa o PDF)                                              |
| `/curriculum-download` | Mesmo currículo, no formato usado no PDF                                           |
| `/experience/:id`      | Detalhe da experiência: período, duração, local, site, cargos, casos e projetos    |
| `/about`               | Em construção                                                                      |

## Experiências: padrão da página e como adicionar uma nova

Os dados de uma experiência vêm de **dois lugares**, para que o currículo e as páginas nunca divirjam:

| O quê                                       | Onde                      | Alimenta                                                  |
| ------------------------------------------- | ------------------------- | --------------------------------------------------------- |
| A **empresa** (nome, logo, site, "sobre")   | Firebase, nó `experience` | card da home e cabeçalho/"Sobre" da página                |
| Os **cargos** (período, local, atribuições) | `src/data/career.ts`      | página da experiência, card da home **e currículo (PDF)** |

Se uma empresa não tem cargos em `career.ts`, a página usa os `jobs` do Firebase.

### Adicionar uma nova experiência

1. **Empresa:** no Firebase, inclua um item em `experience` com um `id` novo:

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

2. **Cargos:** em `src/data/career.ts`, inclua um objeto em `positions` por cargo, com `experienceId: '5'`. Mês de início/término no formato `AAAA-MM-01` (término `presente` se continua). Com isso, período, duração, local e cargo do card são calculados a partir daqui.

Pronto: o card aparece na home, a página `/experience/5` é criada e o cargo entra no currículo. Campos vazios (`url: "#"`, sem projetos, sem "sobre") simplesmente não aparecem.

### Cards em carrossel

Os cards da home ficam em `components/carousel` (`Carousel({ label, items })` + `setupCarousels()`): rolagem nativa com encaixe, botões, indicadores, arrastar com o mouse e animação de entrada. Os controles só aparecem quando há cards fora da tela, então o carrossel serve para qualquer lista de cards. Toda empresa que consta em `career.ts` ganha card, mesmo que ainda não exista no Firebase (sem logo, o card mostra a inicial da empresa).

### Como a página é montada

`src/pages/experience/index.ts` monta a página como uma **lista de seções** (`{ id, title, body }`). Cada `body` é produzido por uma função (`paragraphBody`, `jobsBody`, `projectsBody`) que devolve o HTML ou `''`; corpo vazio = a seção não aparece. Para criar uma seção nova: escreva a função do corpo e acrescente uma linha à lista em `Experience()`.

## Projetos pessoais (fixados no GitHub)

A seção "Projetos Pessoais" mostra os repositórios que você mantém **fixados no perfil do GitHub**, preenchidos a partir do README de cada um.

| O quê                                                          | Onde                                                  |
| -------------------------------------------------------------- | ----------------------------------------------------- |
| Quais repositórios (e a ordem)                                 | `scripts/github-projects/pinned.json`                 |
| Dados gerados do README e do GitHub                            | `src/data/github-projects.json` (**não edite à mão**) |
| Capas e capturas de tela (WebP, até 1200px)                    | `public/projects/<repo>/` (geradas)                   |
| Nome de exibição, categoria e resumo quando o README não serve | `src/data/github-projects.ts` (`curation`)            |

### Atualizar

```bash
npm run sync:projects                      # lê pela API do GitHub
GITHUB_TOKEN=... npm run sync:projects     # com token: 5000 requisições/h em vez de 60
npm run sync:projects -- --local ~/repos   # lê de clones locais (<pasta>/<repo>)
```

O comando lê o README (título, resumo, funcionalidades marcadas `[x]`, tecnologias, links de site, vídeo, layout e desafio, e o roteiro de aulas de READMEs de curso), as imagens, as aplicações de monorepos (`web`, `mobile`, `server`, pelo `package.json` de cada uma) e as datas. Rode, revise o `git diff` e faça o commit. Reexecutar não apaga a curadoria.

### Quando os fixados mudarem

1. Liste os fixados atuais (precisa do `gh` autenticado):

   ```bash
   gh api graphql -f query='{ user(login:"raphaelgregg") { pinnedItems(first:6, types:REPOSITORY) { nodes { ... on Repository { name } } } } }' --jq '.data.user.pinnedItems.nodes[].name'
   ```

2. Atualize `scripts/github-projects/pinned.json` com os nomes, na ordem.
3. Rode `npm run sync:projects` e, se um projeto novo precisar de nome de exibição ou categoria, acrescente-o em `curation`.

Os scripts são TypeScript executado direto pelo Node 26 (sem etapa de build) e têm testes (`npm test`).

## Manutenção

- **Currículo:** edite `src/pages/resume/resumeContent.ts` (dados, resumo e certificações). Em telas a partir de 840px o currículo é mostrado em páginas A4 com navegação (botões, setas do teclado); no celular ele rola como uma página contínua (`pager.ts`). O PDF é gerado pela impressão do navegador, com o CSS `@media print` de `src/pages/resume/styles.css`: mesma aparência da tela, A4, texto selecionável e links clicáveis. Para baixar: botão "Baixar PDF" → na janela, destino "Salvar como PDF" (o nome do arquivo já vem preenchido).
- **Projetos e experiências:** vêm do Firebase. `src/services/data.json` é um snapshot de referência dos dados.
- **Textos vindos do banco** devem passar por `escapeHtml` ao entrar em templates.
- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/pt-br/) (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`).
- **CI:** `.github/workflows/ci.yml` roda lint, formatação e build.
