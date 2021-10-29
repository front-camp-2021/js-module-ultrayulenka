import FiltersList from '../filters-list/index.js';
import DoubleSlider from '../../module-5/double-slider/index.js';

export default class SideBar {
  element;
  subElements = {};
  filters = [];
  sliders = [];
  selectedFilters = [];

  constructor (categoriesFilter = [], brandFilter = []) {
    this.categoriesFilter = categoriesFilter;
    this.brandFilter = brandFilter;

    this.render();
    this.addEvents();
  }

  get template() {
    return `<div class="sidebar__header">
        <h3 class="section-title">
            Filters
        </h3>
        <button class="button button_small">
            <div class="arrows arrows_left"></div>
            <div class="arrows arrows_down"></div>
        </button>
    </div>
    <div class="sidebar__container">
        <ul class="filter-list"></ul>
    </div>
    <button class="button button_primary button_large" id="clear-filters">
        CLEAR ALL FILTERS
    </button>`
  }

  render () {
    this.element = document.createElement("aside");
    this.element.className = "sidebar";
    this.element.innerHTML = this.template;
    
    this.subElements = this.getSubElements();

    this.renderDoubleSlider({
      props: { 
        min: 0, 
        max: 85000,
        precision: 0, 
        formatValue: value => value + " UAH"
      },
      title: "Price" 
    });
    if(this.categoriesFilter.length) this.renderFilter({title: "Category", list: this.categoriesFilter});
    if(this.brandFilter.length) this.renderFilter({title: "Brand", list: this.brandFilter});
    this.renderDoubleSlider({props: { min: 0, max: 5, precision: 2 }, title: "Rating" });
  }

  getSubElements () {
    const listElement = this.element.querySelector("ul");
    const btnClear = this.element.querySelector("#clear-filters");

    return {
      listElement,
      btnClear
    }
  }

  addEvents () {
    const { btnClear } = this.subElements;

    btnClear.addEventListener("click", this.onClearFiltersClick);
    this.element.addEventListener("add-filter", this.onAddFilter);
    this.element.addEventListener("remove-filter", this.onRemoveFilter);
  }

  removeEvents () {
    const { btnClear } = this.subElements;

    btnClear.removeEventListener("click", this.onClearFiltersClick);
    this.element.removeEventListener("add-filter", this.onAddFilter);
    this.element.removeEventListener("remove-filter", this.onRemoveFilter);
  }

  onClearFiltersClick = () => {
    this.selectedFilters = [];
    this.reset();
    const newEvent = new CustomEvent("clear-filters", { bubbles: true });
    this.element.dispatchEvent(newEvent);
  }

  onAddFilter = (event) => {
    this.selectedFilters.push(event.detail);
    const newEvent = new CustomEvent("filter-selected", { bubbles: true, detail: this.selectedFilters });
    this.element.dispatchEvent(newEvent);
  }

  onRemoveFilter = (event) => {
    const index = this.selectedFilters.findIndex(item => item === event.detail);
    if(index < 0) return;

    this.selectedFilters.splice(index, 1);

    const newEvent = new CustomEvent("filter-selected", { bubbles: true, detail: this.selectedFilters });
    this.element.dispatchEvent(newEvent);
  }

  reset () {
    this.filters.forEach(filterItem => filterItem.reset());
    this.sliders.forEach( slider => slider.reset());
  }

  renderFilter ({list, title = ""}) {
    const { listElement } = this.subElements;

    const filterItem = new FiltersList({ list, title, tag: "li" });
    this.filters.push(filterItem);
    
    listElement.append(filterItem.element);
  }

  renderDoubleSlider({props, title = ""}) {
    const { listElement } = this.subElements;

    const slider = new DoubleSlider({ ...props, filterName: title, tag: "li"});
    this.sliders.push(slider);

    listElement.append(slider.element);
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

    for(let element of Object.values(this.subElements)) {
      element = null;
    }

    this.subElements = {};

    this.filters.forEach(filter => {
      filter.destroy();
    });

    this.filters = [];

    this.sliders.forEach(slider => {
      slider.destroy();
    });

    this.sliders = [];
  }
}
