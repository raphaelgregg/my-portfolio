const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

/**
 * Escapa texto vindo do banco de dados antes de inseri-lo em templates HTML.
 * Aceita undefined/null e devolve string vazia (evita o texto "undefined" na tela).
 */
export function escapeHtml(value: unknown): string {
  return String(value ?? '').replace(/[&<>"']/g, (char) => HTML_ESCAPES[char])
}
