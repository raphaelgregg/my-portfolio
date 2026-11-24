import { createApp } from './app'

const rootElement = document.getElementById('app')

if (rootElement) {
  createApp(rootElement)
} else {
  console.error('Elemento com id "app" não encontrado.')
}
