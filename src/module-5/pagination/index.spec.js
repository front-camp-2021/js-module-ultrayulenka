import Pagination from './solution';

describe('Pagination', () => {
  let pagination;

  beforeEach(() => {
    pagination = new Pagination({
      totalPages: 10,
      page: 1,
    });

    document.body.append(pagination.element);
  });

  afterEach(() => {
    pagination.destroy();
    pagination = null;
  });

  it('should be rendered correctly', () => {
    expect(pagination.element).toBeInTheDocument();
    expect(pagination.element).toBeVisible();
  });

  it('should have ability to be destroyed', () => {
    pagination.destroy();

    expect(pagination.element).not.toBeInTheDocument();
  });
});

