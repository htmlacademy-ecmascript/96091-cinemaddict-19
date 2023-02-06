import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const.js';

function createFilterTemplate(filters, currentFilterType) {
  return `<nav class="main-navigation">
  <a
  href="#all"
  class="main-navigation__item ${FilterType.ALL === currentFilterType ? 'main-navigation__item--active' : ''}"
  data-filter-type="all">
  All movies
  </a>
  ${filters.map(({type, name, count}) => (
    `<a
    href="#${type}"
    class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}"
    data-filter-type="${type}">
    ${name}<span class="main-navigation__item-count" data-filter-type="${type}">${count}</span>
    </a>`
  )).join('')}
</nav>`;
}

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilterType = null;
  #handleFilterTypeChange = null;

  constructor(filters, currentFilterType, onFilterTypeChange) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilterType);
  }

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A' && evt.target.tagName !== 'SPAN') {
      return;
    }
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.dataset.filterType);
  };
}
