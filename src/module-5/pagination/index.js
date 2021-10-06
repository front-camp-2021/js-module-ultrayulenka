export default class Pagination {
  element;
  start = 0;
  pageIndex = 0;
  className = "page-navigation";

  constructor({
    totalPages = 10,
    page = 1,
  } = {}) {
    this.totalPages = totalPages;
    this.pageIndex = page - 1;

    this.render();
    this.addEvents();
  }

  render () {
    this.element = document.createElement("nav");
    this.element.className = this.className;
    this.element.innerHTML = this.template;
    this.subelements = this.getSubelements();
    this.renderListItems();
    this.current = this.element.querySelector(".page-navigation__item_current");
  }

  renderListItems () {
    const { listElement } = this.subelements;
    for(let i = 1; i <= this.totalPages; i++) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `<li class="page-navigation__item">
        <a href="#" class="page-navigation__page-link">${i}</a>
      </li>`;
      this.editItemClasses(i, wrapper.firstElementChild);
      listElement.append(wrapper.firstElementChild);
    }
  }

  editItemClasses (i, element) {
    if(i === this.pageIndex) element.classList.add("page-navigation__item_prev");
    if(i === this.pageIndex + 1) element.classList.add("page-navigation__item_current");
    if(i === this.pageIndex + 2) element.classList.add("page-navigation__item_next");
  }

  get template () {
    return `<a class="page-navigation__page-link" id="prev-page"></a>
    <ul data-element="pages-list" class="page-navigation__list"></ul>
    <a class="page-navigation__page-link" id="next-page"></a>`
  }

  getSubelements () {
    const listElement = this.element.querySelector('[data-element="pages-list"]');
    const prevBtn = this.element.querySelector("#prev-page");
    const nextBtn = this.element.querySelector("#next-page");
    return {
      listElement,
      prevBtn,
      nextBtn
    }
  }

  addEvents () {
    const { listElement, prevBtn, nextBtn } = this.subelements;
    prevBtn.addEventListener("pointerup", this.goToPrevPage);
    nextBtn.addEventListener("pointerup", this.goToNextPage);
    listElement.addEventListener("pointerup", this.goToPage);
  }

  removeEvents () {
    const { listElement, prevBtn, nextBtn } = this.subelements;
    prevBtn.removeEventListener("pointerup", this.goToPrevPage);
    nextBtn.removeEventListener("pointerup", this.goToNextPage);
    listElement.removeEventListener("pointerup", this.goToPage);
  }

  goToPrevPage = (event) => {
    event.preventDefault();
    if(this.pageIndex <= 0) return;
    const { listElement } = this.subelements;
    this.resetClasses();
    this.pageIndex = this.pageIndex - 1;
    this.current = listElement.children[this.pageIndex];
    this.addClasses();
    this.dispatchPageEvent();
  }

  goToNextPage = (event) => {
    event.preventDefault();
    if(this.pageIndex >= this.totalPages - 1) return;
    const { listElement } = this.subelements;
    this.resetClasses();
    this.pageIndex = this.pageIndex + 1;
    this.current = listElement.children[this.pageIndex];
    this.addClasses();
    this.dispatchPageEvent();
  }

  goToPage = (event) => {
    event.preventDefault();
    const { listElement } = this.subelements;
    const item = event.target.closest(".page-navigation__item");
    if(item) {
      if(item === this.current) return;
      this.resetClasses();
      this.pageIndex = Number(item.innerText) - 1;
      this.current = listElement.children[this.pageIndex];
      this.addClasses();
      this.dispatchPageEvent();
    }
  }

  resetClasses () {
    if(this.current.previousSibling) this.current.previousSibling.classList.remove("page-navigation__item_prev");
    if(this.current.nextSibling) this.current.nextSibling.classList.remove("page-navigation__item_next");
    if(this.current) this.current.classList.remove("page-navigation__item_current");
  }

  addClasses () {
    if(this.current.previousSibling) this.current.previousSibling.classList.add("page-navigation__item_prev");
    if(this.current.nextSibling) this.current.nextSibling.classList.add("page-navigation__item_next");
    if(this.current) this.current.classList.add("page-navigation__item_current");
  }

  dispatchPageEvent () {
    const newEvent = new CustomEvent("page-changed", { bubbles: true, detail: this.pageIndex });
    this.element.dispatchEvent(newEvent);
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
  }
}
