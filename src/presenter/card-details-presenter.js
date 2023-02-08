import {render, replace, remove} from '../framework/render.js';
import CardDetailsView from '../view/card-details-view.js';

export default class CardDetailsPresenter {
  #card = null;
  #comments = null;
  #cardDetailsComponent = null;
  #handleCardDetailsCloseClick = null;
  #handleWatchlistClick = null;
  #handleWatchedClick = null;
  #handleFavoriteClick = null;

  constructor(
    onCardDetailsCloseClick,
    onWatchlistClick,
    onWatchedClick,
    onFavoriteClick
  ) {
    this.#handleCardDetailsCloseClick = onCardDetailsCloseClick;
    this.#handleWatchlistClick = onWatchlistClick;
    this.#handleWatchedClick = onWatchedClick;
    this.#handleFavoriteClick = onFavoriteClick;
  }

  init(card, comments) {
    this.#card = card;
    this.#comments = comments;
    const prevCardDetailsComponent = this.#cardDetailsComponent;

    document.body.classList.add('hide-overflow');

    this.#cardDetailsComponent = new CardDetailsView(
      this.#card,
      this.#comments,
      this.#handleCardDetailsCloseClick,
      this.#handleWatchlistClick,
      this.#handleWatchedClick,
      this.#handleFavoriteClick
    );

    if (prevCardDetailsComponent === null) {
      render(this.#cardDetailsComponent, document.body);
      return;
    }

    if (document.body.contains(prevCardDetailsComponent.element)) {
      replace(this.#cardDetailsComponent, prevCardDetailsComponent);
    }

    remove(prevCardDetailsComponent);
  }

  destroy() {
    remove(this.#cardDetailsComponent);
  }
}
