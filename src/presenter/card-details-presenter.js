import {render, RenderPosition} from '../render.js';
import CardDetailsView from '../view/card-details-view.js';

export default class CardDetailsPresenter {

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(new CardDetailsView(), this.container, RenderPosition.AFTEREND);
  }
}
