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

| URL                         | Página                                   |
| --------------------------- | ---------------------------------------- |
| `/`                         | Início (experiência e projetos pessoais) |
| `/project/:id`              | Detalhe do projeto                       |
| `/resume`                   | Currículo na tela (botão baixa o PDF)    |
| `/curriculum-download`      | Mesmo currículo, no formato usado no PDF |
| `/about`, `/experience/:id` | Em construção                            |

## Manutenção

- **Currículo:** edite `src/pages/resume/resumeContent.ts` (dados, resumo e certificações). O PDF é gerado pela impressão do navegador, com o CSS `@media print` de `src/pages/resume/styles.css`: mesma aparência da tela, A4, texto selecionável e links clicáveis. Para baixar: botão "Baixar PDF" → na janela, destino "Salvar como PDF" (o nome do arquivo já vem preenchido).
- **Projetos e experiências:** vêm do Firebase. `src/services/data.json` é um snapshot de referência dos dados.
- **Textos vindos do banco** devem passar por `escapeHtml` ao entrar em templates.
- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/pt-br/) (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`).
- **CI:** `.github/workflows/ci.yml` roda lint, formatação e build.
