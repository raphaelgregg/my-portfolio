import AbstractView from "./abstractView.ts"

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Dashboard");
  }

  async getHtml(): Promise<string> {
    return `
      <h1>Hi</h1>
    `;
  }
}