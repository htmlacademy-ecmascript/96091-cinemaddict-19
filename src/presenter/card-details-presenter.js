import {render, replace, remove} from '../framework/render.js';
import CardDetailsView from '../view/card-details-view.js';
import {UserAction, UpdateType} from '../const.js';

export default class CardDetailsPresenter {
  #card = null;
  #comments = null;
  #cardDetailsComponent = null;
  #handleViewAction = null;
  #commentsModel = null;
  #hideCardDetails = null;

  constructor(
    commentsModel,
    onViewAction,
    hideCardDetails
  ) {
    this.#commentsModel = commentsModel;
    this.#handleViewAction = onViewAction;
    this.#hideCardDetails = hideCardDetails;

    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  get card() {
    return this.#card;
  }

  async init(card) {
    this.#card = card;
    await this.#commentsModel.init(card);
    this.#comments = this.#commentsModel.comments;
    const prevCardDetailsComponent = this.#cardDetailsComponent;

    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#handleEscKeyDown);

    this.#cardDetailsComponent = new CardDetailsView(
      this.#card,
      this.#comments,
      this.#hideCardDetails,
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
      const scrollPosition = prevCardDetailsComponent.getScrollPosition();
      this.#cardDetailsComponent.setScrollPosition(scrollPosition);
    }

    remove(prevCardDetailsComponent);
  }

  destroy() {
    remove(this.#cardDetailsComponent);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#handleEscKeyDown);
  }

  #handleWatchlistClick = () => {
    this.#card.userDetails.isInWatchlist = !this.#card.userDetails.isInWatchlist;
    this.#handleViewAction(UserAction.UPDATE_CARD, UpdateType.CARD_UPDATING, this.#card);
  };

  #handleWatchedClick = () => {
    this.#card.userDetails.isWatched = !this.#card.userDetails.isWatched;
    this.#handleViewAction(UserAction.UPDATE_CARD, UpdateType.CARD_UPDATING, this.#card);
  };

  #handleFavoriteClick = () => {
    this.#card.userDetails.isFavorite = !this.#card.userDetails.isFavorite;
    this.#handleViewAction(UserAction.UPDATE_CARD, UpdateType.CARD_UPDATING, this.#card);
  };

  #handleEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#hideCardDetails();
    }
  };

  #handleCommentKeyDown = (comment) => {
    this.#commentsModel.addComment(this.#card, comment);
    this.#handleViewAction(UserAction.UPDATE_CARD, UpdateType.CARD_UPDATING, this.#card);
  };

  #handleDeleteButtonClick = (id) => {
    this.#commentsModel.deleteComment(id);
    this.#handleViewAction(UserAction.UPDATE_CARD, UpdateType.CARD_UPDATING, this.#card);
  };

  #handleModelEvent = () => {
    this.init(this.#card);
  };
}
