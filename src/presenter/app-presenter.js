import {render} from '../render.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import MainCardContainerView from '../view/main-card-container-view.js';
import CardView from '../view/card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import StatisticView from '../view/statistic-view.js';
import UserView from '../view/user-view.js';
import AppModel from '../model/app-model.js';
import {getRandomCardWithComments} from '../mock/card-with-comment-mock.js';
import CardDetailsView from '../view/card-details-view.js';

const CARDS_COUNT = 5;

export default class AppPresenter {
  #cards = null;
  #pageMainElement = null;
  #pageStatisticsElement = null;
  #pageHeaderElement = null;
  #appModel = null;
  #mainComponent = null;
  #cardDetailsPresenter = null;

  constructor({pageMainElement, pageStatisticsElement, pageHeaderElement}) {
    this.#pageMainElement = pageMainElement;
    this.#pageStatisticsElement = pageStatisticsElement;
    this.#pageHeaderElement = pageHeaderElement;
    const cards = Array.from({length: CARDS_COUNT}, getRandomCardWithComments);
    this.#appModel = new AppModel();
    this.#appModel.cards = cards;
  }

  init() {
    this.#cards = [...this.#appModel.cards];
    this.#mainComponent = new MainCardContainerView();

    render(new UserView(), this.#pageHeaderElement);

    render(new FilterView(), this.#pageMainElement);
    render(new SortView(), this.#pageMainElement);
    render(this.#mainComponent, this.#pageMainElement);

    for (let i = 0; i < this.#cards.length; i++) {
      this.#renderCard(this.#cards[i]);
    }

    render(new ShowMoreButtonView(), this.#mainComponent.filmList);

    render(new StatisticView(), this.#pageStatisticsElement);
  }

  #renderCard(card) {
    const cardComponent = new CardView(card);
    const cardDetailsComponent = new CardDetailsView(card);

    const addCardDetails = () => {
      document.body.classList.add('hide-overflow');
      document.body.appendChild(cardDetailsComponent.element);
    };

    const removeCardDetails = () => {
      document.body.classList.remove('hide-overflow');
      document.body.removeChild(cardDetailsComponent.element);
    };

    const onKeyDownEsc = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        removeCardDetails();
        document.removeEventListener('keydown', onKeyDownEsc);
      }
    };

    cardComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
      addCardDetails();
      document.addEventListener('keydown', onKeyDownEsc);
    });

    cardDetailsComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      removeCardDetails();
      document.removeEventListener('keydown', onKeyDownEsc);
    });

    render(cardComponent, this.#mainComponent.filmListContainer);


  }
}
