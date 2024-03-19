import AbstractView from "./abstractView.ts"

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("About");
  }

  async getHtml(): Promise<string> {
    return `
      <h1>About</h1>
    `;
  }
}