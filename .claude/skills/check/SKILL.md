---
name: check
description: Roda as mesmas verificações do CI (typecheck, lint, format:check, testes e build) e resume o que falhou.
disable-model-invocation: true
allowed-tools: Bash(npm run *), Bash(npm test), Bash(npm ci)
---

Valide o projeto como o CI faz (`.github/workflows/ci.yml`).

1. Se `node_modules` não existir, rode `npm ci`.
2. Rode, nesta ordem, sem parar na primeira falha (execute todas e colete os resultados):
   - `npm run typecheck`
   - `npm run lint`
   - `npm run format:check`
   - `npm test`
   - `npm run build`
3. Responda com uma tabela: etapa, resultado (passou/falhou). Para cada falha, mostre o erro essencial (arquivo:linha e mensagem), sem colar o log inteiro.
4. Não corrija nada automaticamente. Se for só formatação, sugira `npm run format`; caso contrário, pergunte se deve corrigir.
