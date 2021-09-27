export default class Card {
  element;

  constructor ({
    id = '',
    images = [],
    title = '',
    rating = 0,
    price = 0,
    category = '',
    brand = ''
  } = {}) {
    this.id = id;
    this.images = images;
    this.title = title;
    this.rating = rating;
    this.price = price;
    this.category = category;
    this.brand = brand;

    this.render();
  }

  getTemplate () {
    return `<div class="os-product-card">
      <div class="os-product-img" style="background-image: url(${this.images[0]});"></div>

      <div class="os-product-content">
        <div class="os-product-price-wrapper">
          <div class="os-product-rating">
            <span>${this.rating}</span>
            <i class="bi bi-star"></i>
          </div>

          <div class="os-product-price">${this.price}</div>
        </div>

        <h5 class="os-product-title">${this.brand}</h5>
        <p class="os-product-description">${this.title}</p>
      </div>

      <footer class="os-product-footer">
        <button class="os-btn-default">
          <i class="bi bi-heart os-product-wish-icon"></i>
          Wishlist
        </button>

        <button class="os-btn-primary">
          <i class="bi bi-box-seam os-product-shopping-bag"></i>
          Add To Cart
        </button>
      </footer>
    </div>`
  }

  render () {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.getTemplate();

    this.element = wrapper.firstElementChild;
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
