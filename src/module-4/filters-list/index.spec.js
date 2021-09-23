import FiltersList from './index.js';

describe('FiltersList', () => {
  let filtersList;

  beforeEach(() => {
    filtersList = new FiltersList();

    document.body.append(filtersList.element);
  });

  afterEach(() => {
    filtersList.destroy();
    filtersList = null;
  });

  it('should be rendered correctly', () => {
    expect(filtersList.element).toBeInTheDocument();
    expect(filtersList.element).toBeVisible();
  });

  it('should have ability to be destroyed', () => {
    filtersList.destroy();

    expect(filtersList.element).not.toBeInTheDocument();
  });
});
