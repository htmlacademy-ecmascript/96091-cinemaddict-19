import AbstractView from '../framework/view/abstract-view.js';

function creatFilterTemplate(filters) {
  return `<nav class="main-navigation">
  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
  ${filters.map(({name, count}) => (
    `<a href="#favorites" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`
  )).join('')}
</nav>`;
}

export default class FilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return creatFilterTemplate(this.#filters);
  }
}
