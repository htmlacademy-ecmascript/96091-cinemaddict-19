import AbstractView from '../framework/view/abstract-view.js';

function creatShowMoreButtonTemplate() {
  return `
  <button class="films-list__show-more">Show more</button>
  `;
}

export default class ShowMoreButtonView extends AbstractView {
  #onClickshowMoreButton = null;

  constructor(onClickshowMoreButton) {
    super();
    this.#onClickshowMoreButton = onClickshowMoreButton;

    this.element.addEventListener('click', this.#onClickshowMoreButton);
  }

  get template() {
    return creatShowMoreButtonTemplate();
  }
}
