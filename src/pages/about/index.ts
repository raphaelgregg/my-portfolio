import { Footer } from "../../components/footer";
import { Header } from "../../components/header";

import "./styles.css"

export function About() {
  return `
    ${Header()}
    <div class="about-container">
      <section class="brief-about">
        <p>working...</p>
      </section>
    </div>

    ${Footer()}
  `;
  
}