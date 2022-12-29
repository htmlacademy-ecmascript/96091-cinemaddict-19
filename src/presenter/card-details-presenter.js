import {render} from '../render.js';
import CardDetailsView from '../view/card-details-view.js';

export default class CardDetailsPresenter {

  constructor({card}) {
    this.card = card;
  }

  init() {
    render(new CardDetailsView({card: this.card}), document.body);
  }
}
