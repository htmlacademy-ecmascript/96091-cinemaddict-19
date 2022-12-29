import AppPresenter from './presenter/app-presenter.js';
import AppModel from './model/app-model.js';

const pageHeaderElement = document.querySelector('.header');
const pageMainElement = document.querySelector('.main');
const pageStatisticsElement = document.querySelector('.footer__statistics');

const appModel = new AppModel();

const appPresenter = new AppPresenter({
  pageMainElement,
  pageStatisticsElement,
  pageHeaderElement,
  appModel
});

appPresenter.init();


