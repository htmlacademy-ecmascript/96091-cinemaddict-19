import {render, replace, remove} from '../framework/render.js';
import CardView from '../view/card-view.js';
import CardDetailsView from '../view/card-details-view.js';

export default class CardPresenter {
  #mainComponent = null;
  #card = null;
  #cardComponent = null;
  #cardDetailsComponent = null;
  #handleDataChange = null;

  constructor(cardContainer, onCardChange) {
    this.#mainComponent = cardContainer;
    this.#handleDataChange = onCardChange;
  }

  #showCardDetails = () => {
    document.body.classList.add('hide-overflow');
    document.body.appendChild(this.#cardDetailsComponent.element);
    document.addEventListener('keydown', this.#handleEscKeyDown);
  };

  #hideCardDetails = () => {
    document.body.classList.remove('hide-overflow');
    document.body.removeChild(this.#cardDetailsComponent.element);
    document.removeEventListener('keydown', this.#handleEscKeyDown);
  };

  #handleEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#hideCardDetails();
    }
  };

  #handleCardLinkClick = (card) => {
    this.#showCardDetails(card);
  };

  #handleCardDetailsCloseClick = () => {
    this.#hideCardDetails();
  };

  #handleWatchlistClick = () => {
    this.#card.userDetails.isInWatchlist = !this.#card.userDetails.isInWatchlist;
    this.#handleDataChange(this.#card);
  };

  #handleWatchedClick = () => {
    this.#card.userDetails.isWatched = !this.#card.userDetails.isWatched;
    this.#handleDataChange(this.#card);
  };

  #handleFavoriteClick = () => {
    this.#card.userDetails.isFavorite = !this.#card.userDetails.isFavorite;
    this.#handleDataChange(this.#card);
  };

  init(card) {
    this.#card = card;
    const prevCardComponent = this.#cardComponent;
    const prevCardDetailsComponent = this.#cardDetailsComponent;

    this.#cardComponent = new CardView(
      this.#card,
      this.#handleCardLinkClick,
      this.#handleWatchlistClick,
      this.#handleWatchedClick,
      this.#handleFavoriteClick
    );

    this.#cardDetailsComponent = new CardDetailsView(
      this.#card,
      this.#handleCardDetailsCloseClick,
      this.#handleWatchlistClick,
      this.#handleWatchedClick,
      this.#handleFavoriteClick
    );

    if (prevCardComponent === null || prevCardDetailsComponent === null) {
      render(this.#cardComponent, this.#mainComponent.filmListContainer);
      return;
    }

    if (this.#mainComponent.filmListContainer.contains(prevCardComponent.element)) {
      replace(this.#cardComponent, prevCardComponent);
    }

    if (document.body.contains(prevCardDetailsComponent.element)) {
      replace(this.#cardDetailsComponent, prevCardDetailsComponent);
    }

    remove(prevCardComponent);
    remove(prevCardDetailsComponent);
  }

  destroy() {
    remove(this.#cardComponent);
  }
}
