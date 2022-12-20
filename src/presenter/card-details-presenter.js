import {render} from '../render.js';
import CardDetailsView from '../view/card-details-view.js';

export default class CardDetailsPresenter {
  init() {
    render(new CardDetailsView(), document.body);
  }
}
