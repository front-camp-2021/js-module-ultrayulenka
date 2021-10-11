import { debounce } from '../../module-1/debounce/index.js';

export default class Search {
    element;
    subElements = {};
    className = "searchbar";
    value = "";

    constructor () {
        this.render();
        this.addEvents();
    }

    get template () {
        return `<input class="searchbar__input" type="text" placeholder="Search" data-element="search-input">
        <button class="search-button "type="submit">
            <img class="searchbar__icon" src="../../images/search.svg" alt="">
        </button>`
    }

    render () {
        this.element = document.createElement("form");
        this.element.className = this.className;
        this.element.innerHTML = this.template;

        this.subElements = this.getSubElements();
    }

    getSubElements () {
        const input = this.element.querySelector('[data-element="search-input"]');
        return {
            input
        }
    }

    addEvents () {
        this.element.addEventListener("submit", this.onSubmit);
        this.element.addEventListener("keyup", this.onChange);
    }

    removeEvents () {
        this.element.removeEventListener("submit", this.onSubmit);
        this.element.removeEventListener("keyup", this.onChange);
    }

    onSubmit = (event) => {
        event.preventDefault();
        const { input } = this.subElements;
        this.dispatchSearchEvent (input.value);
    }

    onChange = debounce(() => {
        const { input } = this.subElements;
        this.dispatchSearchEvent (input.value);
    }, 1000);

    dispatchSearchEvent (value) {
        if(this.value === value) return;
        this.value = value;
        const newEvent = new CustomEvent("search-filter", { bubbles: true, detail: this.value  });
        this.element.dispatchEvent(newEvent);
    }

    reset = () => {
        const { input } = this.subElements;
        input.value = "";
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
    }
}
