export default class FiltersList {
  element;
  listElement;
  inputElements;
  className = "filter-item";
  listClassName = "options-list";

  constructor ({
     title = '',
     list = [],
     tag = ''
  } = {}) {
    this.title = title;
    this.list = list;
    this.tag = tag;

    this.render();
    this.addEvents();
  }

  render () {
    this.element = document.createElement(this.tag? this.tag : "div");
    this.element.className = this.className;
    this.element.innerHTML = `<h4 class="filter-item__title">${this.title}</h4>`;
    if(this.list.length) this.renderList();
  }

  renderList () {
    this.listElement = document.createElement("ul");
    this.listElement.className = this.listClassName;
    this.list.forEach(this.renderListItem);
    this.element.append(this.listElement);
    this.inputElements = this.element.querySelectorAll("input");
  }

  renderListItem = (item) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `<li class="options-list__item">
      <div>
        <input class="options-list__input" type="checkbox" id="${item.value}" 
        value="${item.value}" name="${item.title}" ${item.checked? "checked" : ""}>
        <label class="options-list__label" for="${item.value}">${item.title}</label>
      </div>
    </li>`
    this.listElement.append(wrapper.firstElementChild);
  }

  addEvents () {
    this.element.addEventListener("change", this.onChange);
  }

  removeEvents () {
    this.element.removeEventListener("change", this.onChange);
  }

  onChange = (event) => {
    if(event.target.type !== "checkbox") return;
    let newEvent;
    if(event.target.checked) {
      newEvent = new CustomEvent("add-filter", { bubbles: true, detail: event.target.value });
    } else {
      newEvent = new CustomEvent("remove-filter", { bubbles: true, detail: event.target.value });
    }
    event.target.dispatchEvent(newEvent);
  }

  reset = () => {
    this.inputElements.forEach(input => {
      if(input.checked) {
        input.checked = false;
      }
    });
  }

  remove () {
    if (this.element) {
      this.element.remove();
      this.removeEvents();
    }
  }

  destroy () {
    this.remove();
    this.element = null;
    this.listElement = null;
    this.inputElements = null;
  }
}
