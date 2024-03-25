export function Header() {
  // Hide and show header
  let prevScrollPosition = window.scrollY;
  window.onscroll = function() {
    let currentScrollPosition = window.scrollY;
      if (prevScrollPosition > currentScrollPosition) {
        //@ts-ignore
        document.getElementById("hide-header").style.top = "0";
      } else {
        //@ts-ignore
        document.getElementById("hide-header").style.top = "-66px"; // VALUE SIZE OF HEADER
      }
      prevScrollPosition = currentScrollPosition;
  }

  return `
    <nav id="hide-header">
      <div>
        <a href="/" class="brand"><img src="/svg/brand.svg" alt="RaphaelGregg"></a>

        <ul>
          <li><a href="/about">Sobre</a></li>
          <li><a href="/resume">Resumo</a></li>
        </ul>
      </div>
    </nav>
  `;
}
