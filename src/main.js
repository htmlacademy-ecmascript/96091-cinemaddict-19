import AppPresenter from './presenter/app-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import CardsApiService from './api/cards-api-service.js';
import CommentsApiService from './api/comments-api-service.js';
import AppModel from './model/app-model.js';
import CommentsModel from './model/comments-model.js';
import FilterModel from './model/filter-model.js';

const pageHeaderElement = document.querySelector('.header');
const pageMainElement = document.querySelector('.main');
const pageStatisticsElement = document.querySelector('.footer__statistics');

const AUTHORIZATION = 'Basic e98sdf83jdsd9ffkdw';
const END_POINT = 'https://19.ecmascript.pages.academy/cinemaddict';

const appModel = new AppModel({cardsApiService: new CardsApiService(END_POINT, AUTHORIZATION)});
const commentsModel = new CommentsModel({commentsApiService: new CommentsApiService(END_POINT, AUTHORIZATION)});
const filterModel = new FilterModel();

const appPresenter = new AppPresenter(
  pageHeaderElement,
  pageMainElement,
  pageStatisticsElement,
  appModel,
  commentsModel,
  filterModel
);

const filterPresenter = new FilterPresenter(
  pageMainElement,
  filterModel,
  appModel
);

appModel.init();
filterPresenter.init();
appPresenter.init();
