import FiltersList from '../filters-list/index.js';
import DoubleSlider from '../../module-5/double-slider/index.js';

export default class SideBar {
  element;
  listElement;
  filters = [];
  sliders = [];
  btnClear;
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
    this.listElement = this.element.querySelector("ul");
    this.btnClear = this.element.querySelector("#clear-filters");
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

  addEvents () {
    this.btnClear.addEventListener("click", this.onClearFiltersClick);
    this.element.addEventListener("add-filter", this.onAddFilter);
    this.element.addEventListener("remove-filter", this.onRemoveFilter);
  }

  removeEvents () {
    this.btnClear.removeEventListener("click", this.onClearFiltersClick);
    this.element.removeEventListener("add-filter", this.onAddFilter);
    this.element.removeEventListener("remove-filter", this.onRemoveFilter);
  }

  onClearFiltersClick = () => {
    this.selectedFilters = [];
    this.resetFilters();
    this.resetSliders();
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

    let newEvent;
    if(this.selectedFilters.length === 0) {
      newEvent = new CustomEvent("clear-filters", { bubbles: true });
    } else {
      newEvent = new CustomEvent("filter-selected", { bubbles: true, detail: this.selectedFilters });
    }
    this.element.dispatchEvent(newEvent);
  }

  resetFilters () {
    this.filters.forEach(filterItem => filterItem.reset());
  }

  resetSliders () {
    this.sliders.forEach( slider => slider.reset());
  }

  renderFilter ({list, title = ""}) {
    const filterItem = new FiltersList({ list, title, tag: "li" });
    this.filters.push(filterItem);
    this.listElement.append(filterItem.element);
  }

  renderDoubleSlider({props, title = ""}) {
    const slider = new DoubleSlider({ ...props, filterName: title, tag: "li"});
    this.sliders.push(slider);
    this.listElement.append(slider.element);
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
    this.filters = [];
    this.btnClear = null;
  }
}
