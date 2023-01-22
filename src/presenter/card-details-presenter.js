import {render} from '../framework/render.js';
import CardDetailsView from '../view/card-details-view.js';

export default class CardDetailsPresenter {
  #card = null;

  constructor(card) {
    this.#card = card;
  }

  init() {
    render(new CardDetailsView(this.#card), document.body);
  }
}
