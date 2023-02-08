import {FilterType} from '../const.js';

const NoCardsTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITES]: 'There are no favorite movies now'
};

import AbstractView from '../framework/view/abstract-view.js';

function creatNoCardTemplate(filterType) {

  return `<section class="films">
  <section class="films-list">
    <h2 class="films-list__title">${NoCardsTextType[filterType]}</h2>
  </section>
</section>`;
}

export default class NoCardView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return creatNoCardTemplate(this.#filterType);
  }
}
