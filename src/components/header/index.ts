import './styles.css'

export function Header() {
  return `
    <nav id="hide-header">
      <div>
        <a href="/" class="brand"><img src="/svg/brand.svg" alt="RaphaelGregg"></a>

        <ul>
          <li><a href="/resume">Resumo</a></li>
        </ul>
      </div>
    </nav>
  `
}
