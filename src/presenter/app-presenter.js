import {render, remove} from '../framework/render.js';
import {FilterType, SortType, UpdateType, UserAction} from '../const.js';
import {sortByDate, sortByRating} from '../utils/sort-utils.js';
import {filter} from '../utils/filter-utils.js';
import CardPresenter from './card-presenter.js';
import SortView from '../view/sort-view.js';
import MainCardContainerView from '../view/main-card-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import StatisticView from '../view/statistic-view.js';
import UserView from '../view/user-view.js';
import NoCardView from '../view/no-card-view.js';

const CARDS_COUNT_PER_STEP = 5;

export default class AppPresenter {
  #pageHeaderElement = null;
  #pageMainElement = null;
  #pageStatisticsElement = null;
  #appModel = null;
  #filterModel = null;
  #userComponent = null;
  #mainComponent = null;
  #showMoreButtonComponent = null;
  #sortComponent = null;
  #noCardComponent = null;
  #renderedCardCount = CARDS_COUNT_PER_STEP;
  #cardPresenter = null;
  #cardPresenterMap = new Map();
  #filteredCards = null;
  #currentSortType = SortType.DEFAULT;

  constructor(
    pageHeaderElement,
    pageMainElement,
    pageStatisticsElement,
    appModel,
    filterModel
  ) {
    this.#pageHeaderElement = pageHeaderElement;
    this.#pageMainElement = pageMainElement;
    this.#pageStatisticsElement = pageStatisticsElement;

    this.#appModel = appModel;
    this.#filterModel = filterModel;

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
    render(new StatisticView(this.cards.length), this.#pageStatisticsElement);
  }

  #renderCards() {
    this.#userComponent = new UserView();
    render(this.#userComponent, this.#pageHeaderElement);

    if (this.cards.length === 0 || !this.cards) {
      this.#noCardComponent = new NoCardView();
      render(this.#noCardComponent, this.#pageMainElement);
      return;
    }

    this.#renderSort();

    this.#mainComponent = new MainCardContainerView();
    render(this.#mainComponent, this.#pageMainElement);

    this.#renderCardsList();
  }

  #renderSort() {
    this.#sortComponent = new SortView(this.#handleSortTypeChange, this.#currentSortType);

    render(this.#sortComponent, this.#pageMainElement);
  }

  #renderCardsList() {
    for (let i = 0; i < Math.min(this.cards.length, CARDS_COUNT_PER_STEP); i++) {
      this.#renderCard(this.cards[i]);
    }

    if (this.cards.length > CARDS_COUNT_PER_STEP) {
      this.#showMoreButtonComponent = new ShowMoreButtonView(this.#handleShowMoreButtonClick);
      render(this.#showMoreButtonComponent, this.#mainComponent.filmList);
    }
  }

  #renderCard(card) {
    this.#cardPresenter = new CardPresenter(
      this.#mainComponent,
      this.#resetCardsDetails,
      this.#handleViewAction
    );
    this.#cardPresenter.init(card);
    this.#cardPresenterMap.set(card.id, this.#cardPresenter);
  }

  #clearCards() {
    this.#resetCardsDetails();
    this.#cardPresenterMap.forEach((presenter) => presenter.destroy());
    this.#cardPresenterMap.clear();
    this.#renderedCardCount = CARDS_COUNT_PER_STEP;
    remove(this.#userComponent);
    remove(this.#noCardComponent);
    remove(this.#sortComponent);
    remove(this.#mainComponent);
    remove(this.#showMoreButtonComponent);
  }

  #resetCardsDetails = () => {
    this.#cardPresenterMap.forEach((presenter) => presenter.resetCardDetails());
  };

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

  #handleViewAction = (actionType, updateType, updatedCard) => {
    switch (actionType) {
      case UserAction.UPDATE_CARD:
        this.#appModel.updateCard(updateType, updatedCard);
        break;
      case UserAction.UPDATE_COMMENTS:
        // TO DO
        break;
    }
  };

  #handleModelEvent = (updateType, updatedCard) => {
    switch (updateType) {
      case UpdateType.FILTRATION:
        this.#currentSortType = SortType.DEFAULT;
        this.#clearCards();
        this.#renderCards();
        break;

      case UpdateType.CARD_UPDATING:
        this.#clearCards();
        this.#renderCards();
        break;
    }
  };
}
