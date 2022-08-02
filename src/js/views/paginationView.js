import icons from 'url:../../img/icons.svg'; // Parsel 2
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    // Page 1, and there are othe pages
    if (curPage === 1 && numPages > 1) {
      return this._rightButtonHTML(curPage + 1);
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._leftButtonHTML(curPage - 1);
    }
    // Other page
    if (curPage < numPages) {
      return (
        this._leftButtonHTML(curPage - 1) + this._rightButtonHTML(curPage + 1)
      );
    }
    // Page 1, and there are No othe pages
    return '';
  }

  _leftButtonHTML(page) {
    return `
        <button data-goto="${page}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${page}</span>
        </button>`;
  }

  _rightButtonHTML(page) {
    return `
      <button data-goto="${page}" class="btn--inline pagination__btn--next">
        <span>Page ${page}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
        </button>`;
  }
}

export default new PaginationView();
