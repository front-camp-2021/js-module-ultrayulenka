export default class Card {
  element;

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

  createCardInner () {
    const cardInner = createNewElement({className: "card__inner"});
    cardInner.innerHTML = `
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
          <h2 class="card__title">
              <a href="#" class="card__link">${this.title}</a>
          </h2>
          <p class="card__description">Redesigned from scratch and completely revised.</p>
      </div>`;
    return cardInner;
  }

  createButtonGroup () {
    const buttons = createNewElement({className: "card__button-group"});
    buttons.innerHTML = `
      <button class="button card__button">
          <img class="button__icon" src="../../images/heart-black.svg" alt="heart">
          <span class="button__text">wishlist</span>
      </button>
      <button class="button card__button button_primary">
          <img class="button__icon" src="../../images/shopping-bag.svg" alt="shopping bag">
          <span class="button__text">add to cart</span>
      </button>`;
    return buttons;
  }

  destroy () {
    this.element.remove();
  }

  render () {
    this.element = createNewElement({className: "card", id: this.id, tag: this.tag});
    this.element.appendChild(this.createCardInner());
    this.element.appendChild(this.createButtonGroup());
    return this.element;
  }
}

const createNewElement = ({className = "", id = "", tag = ""}) => {
  const element = document.createElement(tag? tag : "div");
  if(className) element.className = className;
  if(id) element.id = id;
  return element;
}