import AppPresenter from './presenter/app-presenter.js';

const pageHeaderElement = document.querySelector('.header');
const pageMainElement = document.querySelector('.main');
const pageStatisticsElement = document.querySelector('.footer__statistics');
const pageFooterElement = document.querySelector('.footer');

const appPresenter = new AppPresenter({
  pageMainElement,
  pageStatisticsElement,
  pageHeaderElement,
  pageFooterElement
});

appPresenter.init();


