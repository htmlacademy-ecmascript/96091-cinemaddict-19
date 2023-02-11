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
  #handleCommentKeyDown = null;
  #handleDeleteButtonClick = null;

  constructor(
    onCardDetailsCloseClick,
    onWatchlistClick,
    onWatchedClick,
    onFavoriteClick,
    onCommentKeyDown,
    onDeleteButtonClick
  ) {
    this.#handleCardDetailsCloseClick = onCardDetailsCloseClick;
    this.#handleWatchlistClick = onWatchlistClick;
    this.#handleWatchedClick = onWatchedClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.#handleCommentKeyDown = onCommentKeyDown;
    this.#handleDeleteButtonClick = onDeleteButtonClick;
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
      this.#handleFavoriteClick,
      this.#handleCommentKeyDown,
      this.#handleDeleteButtonClick

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
