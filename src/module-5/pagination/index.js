export default class Pagination {
  element;
  start = 0;
  pageIndex = 0;

  constructor({
    totalPages = 10,
    page = 1,
  } = {}) {
    this.totalPages = totalPages;
    this.pageIndex = page - 1;

    // ... your logic
  }

  goToPrevPage () {
    // ... your logic
  }

  goToNextPage () {
    // ... your logic
  }

  remove () {
    // ... your logic
  }

  destroy () {
    // ... your logic
  }
}
