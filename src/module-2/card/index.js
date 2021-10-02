export default class Card {
  element;
  className = "card";

  constructor ({
    id = '',
    images = [],
    title = '',
    rating = 0,
    price = 0,
    category = '',
    brand = '',
    tag = ''
  } = {}) {
    this.id = id;
    this.images = images;
    this.title = title;
    this.rating = rating;
    this.price = price;
    this.category = category;
    this.brand = brand;
    this.tag = tag;

    this.render();
  }

  get template() {
    return `<div class="card__inner">
      <div class="card__image">
          <a href="#" class="card__link">
              <img src="${this.images[0]}" alt="">
          </a>
      </div>
      <div class="card__content">
          <div class="card__details">
              <div class="rating">
                  <span class="rating__value">${this.rating}</span>
                  <div class="rating__icon">
                    <img class="rating__icon" src="../../images/star.svg" alt="star">
                  </div>
              </div>
              <span class="card__price">$${this.price}</span>
          </div>
          <h2 class="card__title"><a href="#" class="card__link">${this.title}</a></h2>
          <p class="card__description">
            <a href="#">${this.category}</a> > <a href="#">${this.brand}</a>
            <br>
            Redesigned from scratch and completely revised.
          </p>
      </div>
    </div>
    <div class="card__button-group">
        <button class="button card__button">
            <img class="button__icon" src="../../images/heart-black.svg" alt="heart">
            <span class="button__text">wishlist</span>
        </button>
        <button class="button card__button button_primary">
            <img class="button__icon" src="../../images/shopping-bag.svg" alt="shopping bag">
            <span class="button__text">add to cart</span>
        </button>
    </div>`
  }

  render () {
    this.element = document.createElement(this.tag? this.tag : "div");
    if(this.className) this.element.className = this.className;
    if(this.id) this.element.id = this.id;
    this.element.innerHTML = this.template;
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