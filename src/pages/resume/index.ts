import { Header } from "../../components/header";

export function Resume() {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = `
        ${Header()}
        <h1>Welcome to Resume Page</h1>
        <p>This is the Resume page.</p>
      `;
    }
}