export default class CardsList {
  element;
  className = "cards-list";
  componentClassName = "cards-list__item";

  constructor ({data = [], Component = {}}) {
    this.data = data;
    this.Component = Component;

    this.render();
  }

  render () {
    this.element = document.createElement("ul");
    this.element.className = this.className;
    if(typeof this.Component === 'object' || !this.data.length ) return;
    this.renderComponents();
  }

  renderComponents () {
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
    if(data) this.renderComponents();
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