import Pagination from '../../module-5/pagination/index.js';
import SideBar from '../../module-4/side-bar/index.js';
import CardsList from '../../module-3/cards-list-v1/index.js';
import Search from '../search/index.js';
import { request } from './request/index.js';
import { prepareFilters } from './prepare-filters/index.js';
import Card from '../../module-2/card/index.js';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000';

export default class Page {
  element;
  subElements = {};
  components = {};
  pageLimit = 10;
  totalPages = 100;
  page = 1;
  filters = new URLSearchParams();
  filtersList = {
    category: [],
    brand: []
  }

  constructor() {
    this.filters.set('_page', '1');
    this.filters.set('_limit', this.pageLimit);

    this.render();
    this.addEvents();
  }

  get template () {
    return `<div class="wrapper">
      <header class="header">
          <div class="logo-container">
              <div class="logo">
                  <a href="#" class="link"> 
                      <img class="logo__icon" src="../../images/logo.svg" alt="">
                  </a>
              </div>
              <h1 class="title">
                  <a href="#" class="link">
                      Online Store
                  </a>
              </h1>
          </div>
          <nav class="nav">
              <a href="#" class="nav__link">
                  <div class="home-icon">
                      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 6.25L8.61984 1L16.2397 6.25V14.5C16.2397 15.3284 15.4816 16 14.5464 16H2.6933C1.75811 16 1 15.3284 1 14.5V6.25Z" stroke="#7E72F2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M5.68909 16V8H11.5505V16" stroke="#7E72F2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>  
                  </div>  
              </a>
              <div class="arrows arrows_right"></div>
              <a href="#" class="nav__link">
                  eCommerce
              </a>
              <div class="arrows arrows_right"></div>
              <a href="#" class="nav__link nav__link_current">
                  Electronics
              </a>
          </nav>
      </header>
      <div class="content">
        <main class="main">
          <div class="search"></div>
        </main>
      </div>
    </div>`
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.template;
    this.element = wrapper.firstElementChild;

    this.subElements = this.getSubElements();

    this.renderComponents();
  }

  renderComponents () {
    this.renderPagination();
    this.renderSidebar();
    this.renderSearch();
    this.renderCardsList();
  }

  getSubElements () {
    const contentBox = this.element.querySelector(".content");
    const searchBox = this.element.querySelector(".search");
    const main = this.element.querySelector(".main");
    return {
      main,
      contentBox,
      searchBox
    }
  }

  addEvents () {
    this.element.addEventListener("page-changed", this.onPageChanged);
    this.element.addEventListener("search-filter", this.onSearch);
    this.element.addEventListener("range-selected", this.onRangeChange);
    this.element.addEventListener("filter-selected", this.onFilterSelected);
    this.element.addEventListener("clear-filters", this.onClearFilters);
  }

  onPageChanged = (event) => {
    const { cardsList } = this.components;
    this.page = event.detail;
    this.filters.set('_page', this.page);
    this.getProducts(this.filters).then((products) => {
      cardsList.update(products);
    })
  }

  onSearch = (event) => {
    const searchContent = event.detail.toLowerCase();
    this.page = 1;
    this.filters.set('q', searchContent);
    this.filters.set("_page", this.page);

    this.updatePagination();
    this.updateCardsList();
  }

  onRangeChange = (event) => {
    const { filterName, value } = event.detail;
    const name = filterName.toLowerCase();
    this.page = 1;
    this.filters.set(`${name}_gte`, value.from);
    this.filters.set(`${name}_lte`, value.to);
    this.filters.set("_page", this.page)

    this.updatePagination();
    this.updateCardsList();
  }

  onFilterSelected = (event) => {
    const entries = event.detail.map(item => item.split("="));
    this.page = 1;

    for(let key of Object.keys(this.filtersList)) {
      this.filtersList[key] = [];
    }

    entries.forEach(item => {
      const [key, value] = item;
      if(this.filtersList[key]) this.filtersList[key].push(value);
    });

    for(let key of Object.keys(this.filtersList)) {
      this.filters.delete(key);

      if(this.filtersList[key].length > 0) {
        this.filtersList[key].forEach(value => {
          this.filters.append(key, value);
        })
      }
    }

    this.updatePagination();
    this.updateCardsList();
  }

  onClearFilters = () => {
    this.page = 1;
    this.filters = new URLSearchParams();
    this.filters.set('_page', '1');
    this.filters.set('_limit', this.pageLimit);

    const { search } = this.components;
    search.reset();

    this.updatePagination();
    this.updateCardsList();
  }

  updatePagination () {
    const { pagination } = this.components;
    const search = new URLSearchParams();
    for(let pair of this.filters.entries()) {
      const [ key, value ] = pair;
      if(key !== "_limit" && key!== "_page") {
        search.append(key, value);
      }
    }
    this.getProducts(search).then(products => {
      const pagesAmount = Math.ceil(products.length / this.pageLimit);
      pagination.update(pagesAmount);
    });
  }

  updateCardsList () {
    const { cardsList } = this.components;
    this.getProducts(this.filters).then(products => {
      cardsList.update(products);
    });
  }

  renderPagination () {
    const pagesAmount = Math.ceil(this.totalPages / this.pageLimit)
    this.components.pagination = new Pagination({totalPages: pagesAmount, page: 1});
    const { pagination } = this.components;
    this.element.append(pagination.element);
  }

  renderSidebar () {
    this.getFilters().then(() => {
      this.components.sidebar = new SideBar(this.categoriesFilter, this.brandFilter);
      const { sidebar } = this.components;
      const { contentBox } = this.subElements;
      contentBox.prepend(sidebar.element);
    });
  }

  renderSearch () {
    this.components.search = new Search();
    const { search } = this.components;
    const { searchBox } = this.subElements;
    searchBox.append(search.element);
  }

  renderCardsList () {
    this.getProducts(this.filters).then((products) => {
      this.components.cardsList = new CardsList({data: products, Component: Card});
      const { cardsList } = this.components;
      const { main } = this.subElements;
      main.append(cardsList.element);
    })
  }

  async getFilters () {
    const categories = await this.getResource(new URL("categories", BACKEND_URL));
    this.categoriesFilter = categories? prepareFilters(categories, "category") : [];
    const brands = await this.getResource(new URL("brands", BACKEND_URL));
    this.brandFilter = brands? prepareFilters(brands, "brand") : [];
  }

  async getProducts (search = "") {
    const url = new URL("products", BACKEND_URL);
    if(search) url.search = search;
    const products = await this.getResource(url);
    const result = products? products : [];
    return result;
  }

  async getResource (url) {
    const [data, error] = await request(url);
    if(error) {
      console.error(`${error}: failed to load resource from ${url}`);
      return null;
    } else {
      return data;
    }
  }

  removeEvents () {
    this.element.removeEventListener("page-changed", this.onPageChanged);
    this.element.removeEventListener("search-filter", this.onSearch);
    this.element.removeEventListener("range-selected", this.onRangeChange);
    this.element.removeEventListener("filter-selected", this.onFilterSelected);
    this.element.removeEventListener("clear-filters", this.onClearFilters);
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

    for(let component of Object.values(this.components)) {
      component.destroy();
    }

    this.subElements = {};
    this.components = {};
  }
}
