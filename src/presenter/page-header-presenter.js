import {render} from '../render.js';
import UserView from '../view/user-view.js';

export default class PageHeaderPresenter {

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(new UserView(), this.container);
  }
}
