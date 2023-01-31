import AbstractView from '../framework/view/abstract-view.js';

function creatShowMoreButtonTemplate() {
  return `
  <button class="films-list__show-more">Show more</button>
  `;
}

export default class ShowMoreButtonView extends AbstractView {
  #handleShowMoreButtonClick = null;

  constructor(onShowMoreButtonClick) {
    super();
    this.#handleShowMoreButtonClick = onShowMoreButtonClick;

    this.element.addEventListener('click', this.#showMoreButtonClickHandler);
  }

  get template() {
    return creatShowMoreButtonTemplate();
  }

  #showMoreButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleShowMoreButtonClick();
  };
}
