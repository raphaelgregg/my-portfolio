import { Footer } from '../../components/footer'
import { Header } from '../../components/header'
import './styles.css'

function StatusPage(
  title: string,
  message: string,
  linkLabel: string,
  href: string,
) {
  return `
    ${Header()}
    <main id="conteudo" class="status-page">
      <h1>${title}</h1>
      <p>${message}</p>
      <a class="button button-primary" href="${href}">${linkLabel}</a>
    </main>
    ${Footer()}
  `
}

export function NotFound() {
  return StatusPage(
    'Página não encontrada',
    'O endereço acessado não existe ou foi movido.',
    'Voltar para o início',
    '/',
  )
}

export function LoadError(path: string) {
  return StatusPage(
    'Não foi possível carregar esta página',
    'Verifique sua conexão e tente novamente.',
    'Tentar novamente',
    path,
  )
}

/** Exibido enquanto os dados do Firebase carregam. */
export function Loading() {
  return `<p class="status-loading" role="status">Carregando…</p>`
}
