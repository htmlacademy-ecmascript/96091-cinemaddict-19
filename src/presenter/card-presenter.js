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
  #commentsModel = null;

  constructor(
    cardContainer,
    resetCardsDetails,
    onViewAction,
    commentsModel
  ) {
    this.#mainComponent = cardContainer;
    this.#resetCardsDetails = resetCardsDetails;
    this.#handleViewAction = onViewAction;
    this.#commentsModel = commentsModel;

    this.#commentsModel.addObserver(this.#handleModelEvent);
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
      const comments = this.#commentsModel.comments;
      this.#cardDetailsPresenter.init(card, comments);
    }

    remove(prevCardComponent);
  }

  destroy() {
    remove(this.#cardComponent);
  }

  async #showCardDetails(card) {
    await this.#commentsModel.init(card);
    const comments = this.#commentsModel.comments;
    this.#cardDetailsPresenter = new CardDetailsPresenter(
      this.#handleCardDetailsCloseClick,
      this.#handleWatchlistClick,
      this.#handleWatchedClick,
      this.#handleFavoriteClick,
      this.#handleCommentKeyDown,
      this.#handleDeleteButtonClick
    );
    this.#cardDetailsPresenter.init(card, comments);
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

  #handleCommentKeyDown = (comment) => {
    this.#commentsModel.addComment(this.#card, comment);
  };

  #handleDeleteButtonClick = (id) => {
    this.#commentsModel.deleteComment(id);
  };

  #handleModelEvent = () => {
    this.init(this.#card);
  };
  //   switch (updateType) {
  //     case UpdateType.FILTRATION:
  //       this.#currentSortType = SortType.DEFAULT;
  //       this.#isResetRenderedCardCount = true;
  //       this.#clearCards();
  //       this.#renderCards();
  //       break;

  //     case UpdateType.CARD_UPDATING:
  //       this.#renderUser();
  //       if (this.#filterModel.filter === FilterType.ALL) {
  //         this.#cardPresenterMap.get(updatedCard.id).init(updatedCard);
  //       } else if (filter[this.#filterModel.filter](this.#updatedCards).length) {
  //         this.#cardPresenterMap.get(updatedCard.id).init(updatedCard);
  //       } else {
  //         this.#isResetRenderedCardCount = false;
  //         this.#clearCards();
  //         this.#renderCards();
  //       }
  //       break;
  //   }
  // };
}
