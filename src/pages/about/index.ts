import { Header } from "../../components/header";

export function About() {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = `
        ${Header()}
        <h1>Welcome to About Page</h1>
        <p>This is the About page.</p>
      `;
    }
}