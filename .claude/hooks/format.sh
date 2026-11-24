#!/usr/bin/env bash
# PostToolUse (Edit|Write|MultiEdit): formata o arquivo editado com Prettier
# e aplica correções do ESLint em arquivos TS/JS. Nunca bloqueia a edição.
set -u

file=$(jq -r '.tool_input.file_path // empty' 2>/dev/null)
[ -n "$file" ] && [ -f "$file" ] || exit 0

root="${CLAUDE_PROJECT_DIR:-$(pwd)}"
cd "$root" || exit 0
[ -x node_modules/.bin/prettier ] || exit 0 # dependências não instaladas

case "$file" in
  *.ts|*.js|*.css|*.html|*.json|*.md|*.yml|*.yaml) ;;
  *) exit 0 ;;
esac

node_modules/.bin/prettier --write --ignore-unknown --log-level silent "$file" || true

case "$file" in
  */src/*.ts|*/scripts/*.ts|*/eslint.config.js)
    [ -x node_modules/.bin/eslint ] && node_modules/.bin/eslint --fix "$file" >/dev/null 2>&1 || true
    ;;
esac
exit 0
