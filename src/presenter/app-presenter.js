import {render} from '../framework/render.js';
import AppModel from '../model/app-model.js';
import {getRandomCardWithComments} from '../mock/card-with-comment-mock.js';
import {generateFilter} from '../mock/filter-mock.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import MainCardContainerView from '../view/main-card-container-view.js';
import CardView from '../view/card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import StatisticView from '../view/statistic-view.js';
import UserView from '../view/user-view.js';
import CardDetailsView from '../view/card-details-view.js';
import NoCardView from '../view/no-card-view.js';

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
  #cardComponent = null;
  #cardDetailsComponent = null;
  #renderedCardCount = CARDS_COUNT_PER_STEP;
  #filters = null;

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

    this.#renderCards();
  }

  #renderCards() {
    this.#mainComponent = new MainCardContainerView();

    render(new UserView(), this.#pageHeaderElement);

    this.#renderFilter(this.#cards);

    if (this.#cards.length === 0 || !this.#cards) {
      render(new NoCardView, this.#pageMainElement);
    } else {

      render(new SortView(), this.#pageMainElement);
      render(this.#mainComponent, this.#pageMainElement);

      for (let i = 0; i < Math.min(this.#cards.length, CARDS_COUNT_PER_STEP); i++) {
        this.#renderCard(this.#cards[i]);
      }

      if (this.#cards.length > CARDS_COUNT_PER_STEP) {
        this.#showMoreButtonComponent = new ShowMoreButtonView(this.#handleShowMoreButtonClick);
        render(this.#showMoreButtonComponent, this.#mainComponent.filmList);
      }
    }

    render(new StatisticView(this.#cards.length), this.#pageStatisticsElement);
  }

  #showCardDetails = (card) => {
    this.#cardDetailsComponent = new CardDetailsView(card, this.#handleCardDetailsCloseClick);
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

  #renderCard(card) {
    this.#cardComponent = new CardView(card, this.#handleCardLinkClick);
    render(this.#cardComponent, this.#mainComponent.filmListContainer);
  }

  #renderFilter(cards) {
    this.#filters = generateFilter(cards);

    render(new FilterView(this.#filters), this.#pageMainElement);
  }
}
