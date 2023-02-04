import {render, replace, remove} from '../framework/render.js';
import CardView from '../view/card-view.js';
import CardDetailsPresenter from './card-details-presenter.js';
import {UserAction, UpdateType} from '../const.js';

export default class CardPresenter {
  #mainComponent = null;
  #card = null;
  #cardComponent = null;
  #cardDetailsPresenter = null;
  #handleViewAction = null;
  #isCardDetailsShow = false;
  #resetCardsDetails = null;

  constructor(
    cardContainer,
    resetCardsDetails,
    onViewAction
  ) {
    this.#mainComponent = cardContainer;
    this.#resetCardsDetails = resetCardsDetails;
    this.#handleViewAction = onViewAction;
  }

  init(card) {
    this.#card = card;
    const prevCardComponent = this.#cardComponent;

    this.#cardComponent = new CardView(
      this.#card,
      this.#handleWatchlistClick,
      this.#handleWatchedClick,
      this.#handleFavoriteClick,
      this.#handleCardLinkClick
    );

    if (prevCardComponent === null) {
      render(this.#cardComponent, this.#mainComponent.filmListContainer);
      return;
    }

    if (this.#mainComponent.filmListContainer.contains(prevCardComponent.element)) {
      replace(this.#cardComponent, prevCardComponent);
    }

    if (this.#cardDetailsPresenter !== null) {
      this.#cardDetailsPresenter.init(card);
    }

    remove(prevCardComponent);
  }

  destroy() {
    remove(this.#cardComponent);
  }

  #showCardDetails(card) {
    this.#cardDetailsPresenter = new CardDetailsPresenter(
      this.#handleCardDetailsCloseClick,
      this.#handleWatchlistClick,
      this.#handleWatchedClick,
      this.#handleFavoriteClick
    );
    this.#cardDetailsPresenter.init(card);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#isCardDetailsShow = true;
  }

  #hideCardDetails() {
    document.body.classList.remove('hide-overflow');
    this.#cardDetailsPresenter.destroy();
    this.#cardDetailsPresenter = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#isCardDetailsShow = false;
  }

  resetCardDetails() {
    if (this.#isCardDetailsShow) {
      this.#hideCardDetails();
    }
  }

  #handleWatchlistClick = () => {
    this.#card.userDetails.isInWatchlist = !this.#card.userDetails.isInWatchlist;
    this.#handleViewAction(UserAction.UPDATE_CARD, UpdateType.PATCH, this.#card);
  };

  #handleWatchedClick = () => {
    this.#card.userDetails.isWatched = !this.#card.userDetails.isWatched;
    this.#handleViewAction(UserAction.UPDATE_CARD, UpdateType.PATCH, this.#card);
  };

  #handleFavoriteClick = () => {
    this.#card.userDetails.isFavorite = !this.#card.userDetails.isFavorite;
    this.#handleViewAction(UserAction.UPDATE_CARD, UpdateType.PATCH, this.#card);
  };

  #handleCardLinkClick = (card) => {
    this.#resetCardsDetails();
    this.#showCardDetails(card);
  };

  #handleCardDetailsCloseClick = () => {
    this.#hideCardDetails();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#hideCardDetails();
    }
  };
}
