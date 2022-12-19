import {render} from '../render.js';
import StatisticView from '../view/statistic-view.js';

export default class PageFooterPresenter {

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(new StatisticView(), this.container);
  }
}
