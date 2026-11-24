import './styles.css'

export function Header() {
  return `
    <header>
      <nav id="hide-header" class="site-nav" aria-label="Principal">
        <div class="container site-nav-inner">
          <a href="/" class="brand"><img src="/svg/brand.svg" alt="Raphael Gregg, página inicial"></a>

          <ul class="site-nav-links">
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
