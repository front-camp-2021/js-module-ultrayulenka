import Search from './index.js';

describe('Search', () => {
  let search;

  beforeEach(() => {
    search = new Search();

    document.body.append(search.element);
  });

  afterEach(() => {
    search.destroy();
    search = null;
  });

  it('should be rendered correctly', () => {
    expect(search.element).toBeInTheDocument();
    expect(search.element).toBeVisible();
  });

  it('should have ability to be destroyed', () => {
    search.destroy();

    expect(search.element).not.toBeInTheDocument();
  });
});

