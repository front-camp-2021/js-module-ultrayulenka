export default class DefaultComponent {
  constructor(username) {
    this.username = username;

    this.render();
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = `
      <div class="wrapper">
        <h1>Hello, ${this.username}!</h1>
      </div>
    `;

    this.element = element.firstElementChild;
  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
