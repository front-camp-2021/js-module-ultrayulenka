export default class CardsList {
  element;
  className = "cards-list";
  componentClassName = "cards-list__item";

  constructor ({data = [], Component = null}) {
    this.data = data;
    this.Component = Component;

    this.render();
  }

  render () {
    this.element = document.createElement("ul");
    this.element.className = this.className;
    this.renderComponents();
  }

  renderComponents () {
    if(!this.data.length) {
      this.element.append("No products found");
      return;
    }

    if(this.Component === null) {
      this.element.append("Something went wrong...");
      console.error("Component is invalid");
      return;
    }

    this.data.forEach(item => {
      const listItem = new this.Component({...item, tag: "li"});
      listItem.element.classList.add(this.componentClassName);
      listItem.element.setAttribute("data-element", "body");
      this.element.append(listItem.element);
    })
  }

  update (data) {
    if (!this.element) return;
    this.element.innerHTML = "";
    this.data = data;
    this.renderComponents();
  }

  remove () {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy () {
    this.remove();
    this.element = null;
  }
}