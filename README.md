# my-portfolio

Portfólio pessoal de Raphael Gregg: SPA em TypeScript puro (sem framework) com [Vite](https://vite.dev). Os dados de experiência, formação e projetos vêm do Firebase Realtime Database; o currículo é gerado em PDF no navegador.

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
  components/<nome>/       Peças reutilizáveis (header, footer, cards)
  services/                Acesso ao Firebase
  dtos/                    Tipos dos dados do banco
  utils/                   Funções auxiliares (datas, escapeHtml, PDF)
  styles/                  global.css e queries.css (responsivo)
```

> `public/svg/<tecnologia>.svg` é carregado pelo nome vindo do banco (`/svg/${tech}.svg`): não remova ícones sem checar os dados.

## Rotas

| URL                    | Página                                                                          |
| ---------------------- | ------------------------------------------------------------------------------- |
| `/`                    | Início (experiência e projetos pessoais)                                        |
| `/project/:id`         | Detalhe do projeto                                                              |
| `/resume`              | Currículo na tela (botão baixa o PDF)                                           |
| `/curriculum-download` | Mesmo currículo, no formato usado no PDF                                        |
| `/experience/:id`      | Detalhe da experiência: período, duração, local, site, cargos, casos e projetos |
| `/about`               | Em construção                                                                   |

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

### Como a página é montada

`src/pages/experience/index.ts` monta a página como uma **lista de seções** (`{ id, title, body }`). Cada `body` é produzido por uma função (`paragraphBody`, `jobsBody`, `projectsBody`) que devolve o HTML ou `''`; corpo vazio = a seção não aparece. Para criar uma seção nova: escreva a função do corpo e acrescente uma linha à lista em `Experience()`.

## Manutenção

- **Currículo:** edite `src/pages/resume/resumeContent.ts` (dados, resumo e certificações). Em telas a partir de 840px o currículo é mostrado em páginas A4 com navegação (botões, setas do teclado); no celular ele rola como uma página contínua (`pager.ts`). O PDF é gerado pela impressão do navegador, com o CSS `@media print` de `src/pages/resume/styles.css`: mesma aparência da tela, A4, texto selecionável e links clicáveis. Para baixar: botão "Baixar PDF" → na janela, destino "Salvar como PDF" (o nome do arquivo já vem preenchido).
- **Projetos e experiências:** vêm do Firebase. `src/services/data.json` é um snapshot de referência dos dados.
- **Textos vindos do banco** devem passar por `escapeHtml` ao entrar em templates.
- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/pt-br/) (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`).
- **CI:** `.github/workflows/ci.yml` roda lint, formatação e build.
