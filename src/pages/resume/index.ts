import { Footer } from "../../components/footer";
import { Header } from "../../components/header";

export function Resume() {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = `
        ${Header()}
        ${Footer()}
      `;
    }
}