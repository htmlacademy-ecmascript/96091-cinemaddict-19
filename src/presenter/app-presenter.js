import {render, remove} from '../framework/render.js';
import {FilterType, SortType, UpdateType, UserAction} from '../const.js';
import {sortByDate, sortByRating} from '../utils/sort-utils.js';
import {filter} from '../utils/filter-utils.js';
import CardPresenter from './card-presenter.js';
import CardDetailsPresenter from './card-details-presenter.js';
import SortView from '../view/sort-view.js';
import MainCardContainerView from '../view/main-card-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import StatisticView from '../view/statistic-view.js';
import UserView from '../view/user-view.js';
import NoCardView from '../view/no-card-view.js';
import LoadingView from '../view/loading-view.js';

const CARDS_COUNT_PER_STEP = 5;

export default class AppPresenter {
  #pageHeaderElement = null;
  #pageMainElement = null;
  #pageStatisticsElement = null;
  #appModel = null;
  #commentsModel = null;
  #filterModel = null;
  #userComponent = null;
  #statisticComponent = null;
  #mainComponent = null;
  #showMoreButtonComponent = null;
  #sortComponent = null;
  #noCardComponent = null;
  #loadingComponent = null;
  #renderedCardCount = CARDS_COUNT_PER_STEP;
  #cardPresenter = null;
  #cardPresenterMap = new Map();
  #filteredCards = null;
  #currentSortType = SortType.DEFAULT;
  #isLoading = true;
  #isResetRenderedCardCount = true;
  #cardDetailsPresenter = null;

  constructor(
    pageHeaderElement,
    pageMainElement,
    pageStatisticsElement,
    appModel,
    commentsModel,
    filterModel
  ) {
    this.#pageHeaderElement = pageHeaderElement;
    this.#pageMainElement = pageMainElement;
    this.#pageStatisticsElement = pageStatisticsElement;

    this.#appModel = appModel;
    this.#filterModel = filterModel;
    this.#commentsModel = commentsModel;

    this.#appModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get cards() {
    const filterType = this.#filterModel.filter;
    const cards = [...this.#appModel.cards];
    if (filterType === FilterType.ALL) {
      this.#filteredCards = cards;
    } else {
      this.#filteredCards = filter[filterType](cards);
    }

    switch (this.#currentSortType) {
      case SortType.DATE:
        return this.#filteredCards.sort(sortByDate);
      case SortType.RATING:
        return this.#filteredCards.sort(sortByRating);
    }
    return this.#filteredCards;
  }

  init() {
    this.#renderCards();
  }

  #renderCards() {

    if (this.#isLoading) {
      this.#loadingComponent = new LoadingView();
      render(this.#loadingComponent, this.#pageMainElement);
      return;
    }

    this.#renderUser();

    if (this.cards.length === 0 || !this.cards) {
      this.#noCardComponent = new NoCardView(this.#filterModel.filter);
      render(this.#noCardComponent, this.#pageMainElement);
      return;
    }

    this.#renderSort();
    this.#renderCardsList();

    this.#statisticComponent = new StatisticView(this.#appModel.cards.length);
    render(this.#statisticComponent, this.#pageStatisticsElement);
  }

  #renderUser() {
    const prevUserComponent = this.#userComponent;
    this.#userComponent = new UserView(filter[FilterType.HISTORY](this.#appModel.cards).length);
    if (prevUserComponent === null) {
      render(this.#userComponent, this.#pageHeaderElement);
      return;
    }
    render(this.#userComponent, this.#pageHeaderElement);
    remove(prevUserComponent);
  }

  #renderSort() {
    this.#sortComponent = new SortView(this.#handleSortTypeChange, this.#currentSortType);

    render(this.#sortComponent, this.#pageMainElement);
  }

  #renderCardsList() {
    this.#mainComponent = new MainCardContainerView();
    render(this.#mainComponent, this.#pageMainElement);

    for (let i = 0; i < Math.min(this.cards.length, this.#renderedCardCount); i++) {
      this.#renderCard(this.cards[i]);
    }

    if (this.cards.length > this.#renderedCardCount) {
      this.#showMoreButtonComponent = new ShowMoreButtonView(this.#handleShowMoreButtonClick);
      render(this.#showMoreButtonComponent, this.#mainComponent.filmList);
    }
  }

  #renderCard(card) {
    this.#cardPresenter = new CardPresenter(
      this.#mainComponent,
      this.#showCardDetails,
      this.#handleViewAction,
      this.#commentsModel
    );
    this.#cardPresenter.init(card);
    this.#cardPresenterMap.set(card.id, this.#cardPresenter);
  }

  #showCardDetails = async (card) => {
    if (this.#cardDetailsPresenter) {
      this.#hideCardDetails();
    }
    this.#cardDetailsPresenter = new CardDetailsPresenter(
      this.#commentsModel,
      this.#handleViewAction,
      this.#hideCardDetails
    );
    this.#cardDetailsPresenter.init(card);
  };

  #hideCardDetails = () => {
    if (this.#cardDetailsPresenter) {
      this.#cardDetailsPresenter.destroy();
      this.#cardDetailsPresenter = null;
    }
  };

  #clearCards() {
    this.#cardPresenterMap.forEach((presenter) => presenter.destroy());
    this.#cardPresenterMap.clear();
    if (this.#isResetRenderedCardCount) {
      this.#renderedCardCount = CARDS_COUNT_PER_STEP;
    }
    remove(this.#userComponent);
    remove(this.#noCardComponent);
    remove(this.#sortComponent);
    remove(this.#mainComponent);
    remove(this.#showMoreButtonComponent);
    remove(this.#loadingComponent);
    remove(this.#statisticComponent);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearCards();
    this.#renderCards();
  };

  #handleShowMoreButtonClick = () => {
    this.cards
      .slice(this.#renderedCardCount, this.#renderedCardCount + CARDS_COUNT_PER_STEP)
      .forEach((card) => this.#renderCard(card));

    this.#renderedCardCount += CARDS_COUNT_PER_STEP;

    if (this.#renderedCardCount >= this.cards.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #handleViewAction = async (actionType, updateType, updatedCard) => {
    switch (actionType) {
      case UserAction.UPDATE_CARD:
        try {
          await this.#appModel.updateCard(updateType, updatedCard);
        } catch(err) {
          this.#cardPresenterMap.get(updatedCard.id).setAborting();
        }
        break;
    }
  };

  #handleModelEvent = (updateType, updatedCard) => {
    switch (updateType) {
      case UpdateType.FILTRATION:
        this.#currentSortType = SortType.DEFAULT;
        this.#isResetRenderedCardCount = true;
        this.#clearCards();
        this.#renderCards();
        break;

      case UpdateType.CARD_UPDATING:
        this.#renderUser();

        if (this.#cardDetailsPresenter) {
          this.#cardDetailsPresenter.init(updatedCard);
        }

        if (this.#filterModel.filter === FilterType.ALL) {
          this.#cardPresenterMap.get(updatedCard.id).init(updatedCard);
        } else {
          this.#isResetRenderedCardCount = false;
          this.#clearCards();
          this.#renderCards();
        }
        break;

      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderCards();
        break;
    }
  };
}
