#!/usr/bin/env bash
# PreToolUse (Edit|Write|MultiEdit): impede a edição manual de arquivos gerados
# ou sensíveis. Sai com código 2 e explica o caminho correto.
set -u

file=$(jq -r '.tool_input.file_path // empty' 2>/dev/null)
[ -n "$file" ] || exit 0

block() {
  echo "Bloqueado: $1" >&2
  exit 2
}

case "$file" in
  */src/data/github-projects.json)
    block "github-projects.json é gerado por 'npm run sync:projects'. Ajuste o script em scripts/github-projects/ ou o pinned.json e rode a sincronização." ;;
  */package-lock.json)
    block "package-lock.json é mantido pelo npm. Use 'npm install' ou 'npm uninstall' para mudar dependências." ;;
  */.env.example|*/.env.*.example) ;;
  */.env|*/.env.*)
    block "arquivos .env podem conter segredos e não devem ser editados por aqui." ;;
esac
exit 0
