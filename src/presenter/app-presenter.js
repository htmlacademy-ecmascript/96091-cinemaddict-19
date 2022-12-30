import {render} from '../render.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import MainCardContainerView from '../view/main-card-container-view.js';
import CardView from '../view/card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import StatisticView from '../view/statistic-view.js';
import UserView from '../view/user-view.js';
import CardDetailsPresenter from './card-details-presenter.js';
import AppModel from '../model/app-model.js';
import {getRandomCardWithComments} from '../mock/card-with-comment-mock.js';

const CARDS_COUNT = 6;

export default class AppPresenter {

  constructor({pageMainElement, pageStatisticsElement, pageHeaderElement}) {
    this.pageMainElement = pageMainElement;
    this.pageStatisticsElement = pageStatisticsElement;
    this.pageHeaderElement = pageHeaderElement;
    const cards = Array.from({length: CARDS_COUNT}, getRandomCardWithComments);
    this.appModel = new AppModel();
    this.appModel.setCards(cards);
  }

  init() {
    this.cards = [...this.appModel.getCards()];
    this.mainComponent = new MainCardContainerView();

    this.cardDetailsPresenter = new CardDetailsPresenter(this.cards[0]);
    this.cardDetailsPresenter.init();

    render(new UserView(), this.pageHeaderElement);

    render(new FilterView(), this.pageMainElement);
    render(new SortView(), this.pageMainElement);
    render(this.mainComponent, this.pageMainElement);

    for (let i = 1; i < this.cards.length; i++) {
      render(new CardView(this.cards[i]), this.mainComponent.getFilmListContainer());
    }

    render(new ShowMoreButtonView(), this.mainComponent.getFilmList());

    render(new StatisticView(), this.pageStatisticsElement);
  }
}
