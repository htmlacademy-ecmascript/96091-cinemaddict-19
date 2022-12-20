import {render} from './render.js';
import UserView from './view/user-view.js';
import PageMainPresenter from './presenter/page-main-presenter.js';
import CardDetailsPresenter from './presenter/card-details-presenter.js';

const pageHeaderElement = document.querySelector('.header');
const pageMainElement = document.querySelector('.main');
const pageStatisticsElement = document.querySelector('.footer__statistics');
const pageFooterElement = document.querySelector('.footer');

const pageMainPresenter = new PageMainPresenter({
  pageMainContainer: pageMainElement,
  pageFooterContainer: pageStatisticsElement
});

const cardDetailsPresenter = new CardDetailsPresenter({container: pageFooterElement});

render(new UserView(), pageHeaderElement);
pageMainPresenter.init();
cardDetailsPresenter.init();
