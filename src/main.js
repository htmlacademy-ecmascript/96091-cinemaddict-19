import {getRandomCardWithComments} from './mock/card-with-comment-mock.js';
import AppPresenter from './presenter/app-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

import AppModel from './model/app-model.js';
import FilterModel from './model/filter-model.js';

const CARDS_COUNT = 20;

const pageHeaderElement = document.querySelector('.header');
const pageMainElement = document.querySelector('.main');
const pageStatisticsElement = document.querySelector('.footer__statistics');

const cards = Array.from({length: CARDS_COUNT}, getRandomCardWithComments);
const appModel = new AppModel();
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
