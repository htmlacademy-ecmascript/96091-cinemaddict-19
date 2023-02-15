import {render, replace, remove} from '../framework/render.js';
import CardDetailsView from '../view/card-details-view.js';
import {UserAction, UpdateType, SCROLL_X_POSITION, SHAKE_ANIMATION_TIMEOUT} from '../const.js';

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

    this.#cardDetailsComponent = new CardDetailsView(
      this.#card,
      this.#comments,
      this.#hideCardDetails,
      this.#handleWatchlistClick,
      this.#handleWatchedClick,
      this.#handleFavoriteClick,
      this.#handleCommentKeyDown,
      this.#handleDeleteButtonClick,
      this.#handleEscKeyDown
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

  setAbortingDetailsControls() {
    this.#cardDetailsComponent.shakeDetailsControls();
  }

  setAbortingNewComment() {
    this.#cardDetailsComponent.shakeDetailsNewComment();
  }

  setAbortingDeleteComment() {
    this.#cardDetailsComponent.shakeDeleteComment();
  }

  #handleWatchlistClick = () => {
    const copyCard = structuredClone(this.#card);
    copyCard.userDetails.isInWatchlist = !this.#card.userDetails.isInWatchlist;
    this.#handleViewAction(UserAction.UPDATE_CARD_FROM_DETAILS, UpdateType.CARD_UPDATING, copyCard);
  };

  #handleWatchedClick = () => {
    const copyCard = structuredClone(this.#card);
    copyCard.userDetails.isWatched = !this.#card.userDetails.isWatched;
    this.#handleViewAction(UserAction.UPDATE_CARD_FROM_DETAILS, UpdateType.CARD_UPDATING, copyCard);
  };

  #handleFavoriteClick = () => {
    const copyCard = structuredClone(this.#card);
    copyCard.userDetails.isFavorite = !this.#card.userDetails.isFavorite;
    this.#handleViewAction(UserAction.UPDATE_CARD_FROM_DETAILS, UpdateType.CARD_UPDATING, copyCard);
  };

  #handleEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#hideCardDetails();
    }
  };

  #handleCommentKeyDown = async (comment) => {
    const copyCard = structuredClone(this.#card);
    try {
      await this.#commentsModel.addComment(copyCard, comment);
      this.#handleViewAction(UserAction.ADD_COMMENT, UpdateType.CARD_UPDATING, copyCard);
    } catch(err) {
      this.setAbortingNewComment();
      setTimeout(() => {
        this.#handleModelEvent();
      }, SHAKE_ANIMATION_TIMEOUT);
    }
  };

  #handleDeleteButtonClick = async (id) => {
    try {
      await this.#commentsModel.deleteComment(id);
      const copyCard = structuredClone(this.#card);
      this.#handleViewAction(UserAction.DELETE_COMMENT, UpdateType.CARD_UPDATING, copyCard);
    } catch(err) {
      this.setAbortingDeleteComment();
      setTimeout(() => {
        this.#handleModelEvent();
      }, SHAKE_ANIMATION_TIMEOUT);
    }
  };

  #handleModelEvent = () => {
    this.#cardDetailsComponent.updateElement({
      isSubmitting: false,
      isDeleting: false,
      scrollPosition: this.#cardDetailsComponent.element.scrollTop
    });
    this.#cardDetailsComponent.element.scrollTo(SCROLL_X_POSITION, this.#cardDetailsComponent._state.scrollPosition);
  };
}
