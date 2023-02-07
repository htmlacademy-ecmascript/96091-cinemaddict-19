import {getRandomCardWithComments} from './mock/card-with-comment-mock.js';
import AppPresenter from './presenter/app-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import CardsApiService from './cards-api-service.js';

const AUTHORIZATION = 'Basic e98sdf83jdsd9ffkdw';
const END_POINT = 'https://19.ecmascript.pages.academy/cinemaddict';

import AppModel from './model/app-model.js';
import FilterModel from './model/filter-model.js';

const CARDS_COUNT = 20;

const pageHeaderElement = document.querySelector('.header');
const pageMainElement = document.querySelector('.main');
const pageStatisticsElement = document.querySelector('.footer__statistics');

const cards = Array.from({length: CARDS_COUNT}, getRandomCardWithComments);
const appModel = new AppModel({
  cardsApiService: new CardsApiService(END_POINT, AUTHORIZATION)
});
appModel.cards = cards;
const filterModel = new FilterModel();

const appPresenter = new AppPresenter(
  pageHeaderElement,
  pageMainElement,
  pageStatisticsElement,
  appModel,
  filterModel
);

const filterPresenter = new FilterPresenter(
  pageMainElement,
  filterModel,
  appModel
);

filterPresenter.init();
appPresenter.init();
