import Card from '../../module-2/card/index.js';
import CardsList from './index.js';
import { products } from '../../fixtures/products.js';

describe('CardsList', () => {
  let cardsList;

  beforeEach(() => {
    cardsList = new CardsList({
      data: products,
      Component: Card
    });

    document.body.append(cardsList.element);
  });

  afterEach(() => {
    cardsList.destroy();
    cardsList = null;
  });

  it('should be rendered correctly', () => {
    expect(cardsList.element).toBeInTheDocument();
    expect(cardsList.element).toBeVisible();
  });

  it('should have ability to be updated', () => {
    const [firstProduct, secondProduct] = products;
    const cardsList = new CardsList({
      data:[firstProduct],
      Component: Card
    });

    cardsList.update([secondProduct]);

    const body = cardsList.element.querySelector('[data-element="body"]');

    expect(cardsList.data).toEqual([secondProduct]);
    expect(body).toHaveTextContent(secondProduct.title);
    expect(body).toHaveTextContent(secondProduct.rating);
    expect(body).toHaveTextContent(secondProduct.price);
    expect(body).toHaveTextContent(secondProduct.category);
    expect(body).toHaveTextContent(secondProduct.brand);
  });

  it('should have ability to be destroyed', () => {
    cardsList.destroy();

    expect(cardsList.element).not.toBeInTheDocument();
  });
});

