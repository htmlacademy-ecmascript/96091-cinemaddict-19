import AbstractView from '../framework/view/abstract-view.js';

function creatShowMoreButtonTemplate() {
  return `
  <button class="films-list__show-more">Show more</button>
  `;
}

export default class ShowMoreButtonView extends AbstractView {
  #onShowMoreButtonClick = null;

  constructor(onShowMoreButtonClick) {
    super();
    this.#onShowMoreButtonClick = onShowMoreButtonClick;

    this.element.addEventListener('click', this.#onShowMoreButtonClick);
  }

  get template() {
    return creatShowMoreButtonTemplate();
  }
}
