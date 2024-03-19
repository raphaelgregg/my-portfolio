import AbstractView from "./abstractView.ts"

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Resume");
  }

  async getHtml(): Promise<string> {
    return `
      <h1>Resume</h1>
    `;
  }
}