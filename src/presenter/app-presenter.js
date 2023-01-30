import {render, remove} from '../framework/render.js';
import AppModel from '../model/app-model.js';
import {getRandomCardWithComments} from '../mock/card-with-comment-mock.js';
import {generateFilter} from '../mock/filter-mock.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import MainCardContainerView from '../view/main-card-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import StatisticView from '../view/statistic-view.js';
import UserView from '../view/user-view.js';
import NoCardView from '../view/no-card-view.js';
import CardPresenter from './card-presenter.js';
import {updateItem} from '../utils/common-utils.js';
import {SortType} from '../const.js';
import {sortByDate, sortByRating} from '../utils/sort-utils.js';

const CARDS_COUNT = 12;
const CARDS_COUNT_PER_STEP = 5;

export default class AppPresenter {
  #cards = null;
  #pageMainElement = null;
  #pageStatisticsElement = null;
  #pageHeaderElement = null;
  #appModel = null;
  #mainComponent = null;
  #showMoreButtonComponent = null;
  #sortComponent = null;
  #renderedCardCount = CARDS_COUNT_PER_STEP;
  #filters = null;
  #cardPresenter = null;
  #cardPresenterMap = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedCards = [];

  constructor({pageMainElement, pageStatisticsElement, pageHeaderElement}) {
    this.#pageMainElement = pageMainElement;
    this.#pageStatisticsElement = pageStatisticsElement;
    this.#pageHeaderElement = pageHeaderElement;
    const cards = Array.from({length: CARDS_COUNT}, getRandomCardWithComments);
    this.#appModel = new AppModel();
    this.#appModel.cards = cards;
  }

  #handleShowMoreButtonClick = (evt) => {
    evt.preventDefault();
    this.#cards
      .slice(this.#renderedCardCount, this.#renderedCardCount + CARDS_COUNT_PER_STEP)
      .forEach((card) => this.#renderCard(card));

    this.#renderedCardCount += CARDS_COUNT_PER_STEP;

    if (this.#renderedCardCount >= this.#cards.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  init() {
    this.#cards = [...this.#appModel.cards];
    this.#sourcedCards = [...this.#appModel.cards];

    this.#renderCards();
  }

  #handleCardChange = (updatedCard) => {
    this.#cards = updateItem(this.#cards, updatedCard);
    this.#sourcedCards = updateItem(this.#cards, updatedCard);

    this.#cardPresenterMap.get(updatedCard.id).init(updatedCard);
  };

  #handleHideCardDetails = () => {
    this.#cardPresenterMap.forEach((presenter) => presenter.resetCardDetailsView());
  };

  #renderCard(card) {
    this.#cardPresenter = new CardPresenter(
      this.#mainComponent,
      this.#handleCardChange,
      this.#handleHideCardDetails
    );
    this.#cardPresenter.init(card);
    this.#cardPresenterMap.set(card.id, this.#cardPresenter);
  }

  #renderCards() {
    render(new UserView(), this.#pageHeaderElement);
    this.#renderFilter(this.#cards);

    if (this.#cards.length === 0 || !this.#cards) {
      render(new NoCardView, this.#pageMainElement);
      return;
    }

    this.#renderSort();
    this.#renderCardsList();
    render(new StatisticView(this.#cards.length), this.#pageStatisticsElement);
  }

  #renderFilter(cards) {
    this.#filters = generateFilter(cards);

    render(new FilterView(this.#filters), this.#pageMainElement);
  }

  #sortCards(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this.#cards.sort(sortByDate);
        break;
      case SortType.RATING:
        this.#cards.sort(sortByRating);
        break;
      default:
        this.#cards = [...this.#sourcedCards];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortCards(sortType);
    // - Очищаем список
    // - Рендерим список заново
  };

  #renderSort() {
    this.#sortComponent = new SortView(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#pageMainElement);
  }

  #clearCards() {
    this.#cardPresenterMap.forEach((presenter) => presenter.destroy());
    this.#cardPresenterMap.clear();
    this.#renderedCardCount = CARDS_COUNT_PER_STEP;
    remove(this.#mainComponent);
    remove(this.#showMoreButtonComponent);
  }

  #renderCardsList() {
    this.#mainComponent = new MainCardContainerView();

    render(this.#mainComponent, this.#pageMainElement);

    for (let i = 0; i < Math.min(this.#cards.length, CARDS_COUNT_PER_STEP); i++) {
      this.#renderCard(this.#cards[i]);
    }

    if (this.#cards.length > CARDS_COUNT_PER_STEP) {
      this.#showMoreButtonComponent = new ShowMoreButtonView(this.#handleShowMoreButtonClick);
      render(this.#showMoreButtonComponent, this.#mainComponent.filmList);
    }
  }
}
