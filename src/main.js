import PageHeaderPresenter from './presenter/page-header-presenter.js';
import PageMainPresenter from './presenter/page-main-presenter.js';
import PageFooterPresenter from './presenter/page-footer-presenter.js';
import CardDetailsPresenter from './presenter/card-details-presenter.js';

const pageHeaderElement = document.querySelector('.header');
const pageMainElement = document.querySelector('.main');
const pageStatisticsElement = document.querySelector('.footer__statistics');
const pageFooterElement = document.querySelector('.footer');

const pageHeaderPresenter = new PageHeaderPresenter({container: pageHeaderElement});
const pageMainPresenter = new PageMainPresenter({container: pageMainElement});
const pageFooterPresenter = new PageFooterPresenter({container: pageStatisticsElement});
const cardDetailsPresenter = new CardDetailsPresenter({container: pageFooterElement});

pageHeaderPresenter.init();
pageMainPresenter.init();
pageFooterPresenter.init();
cardDetailsPresenter.init();
