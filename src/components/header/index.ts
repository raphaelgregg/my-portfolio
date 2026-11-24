import './styles.css'

export function Header() {
  return `
    <header>
      <nav id="hide-header" aria-label="Principal">
        <div>
          <a href="/" class="brand"><img src="/svg/brand.svg" alt="Raphael Gregg, página inicial"></a>

          <ul>
            <li class="nav-section-link"><a href="/#experiencia">Experiência</a></li>
            <li><a href="/#projetos">Projetos</a></li>
            <li class="nav-section-link"><a href="/#contato">Contato</a></li>
            <li><a href="/resume">Currículo</a></li>
          </ul>
        </div>
      </nav>
    </header>
  `
}
