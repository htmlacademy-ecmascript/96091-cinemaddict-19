import {render} from '../framework/render.js';
import CardView from '../view/card-view.js';
import CardDetailsView from '../view/card-details-view.js';

export default class CardPresenter {
  #mainComponent = null;
  #cardComponent = null;
  #cardDetailsComponent = null;

  constructor(cardContainer) {
    this.#mainComponent = cardContainer;
  }

  #showCardDetails = (card) => {
    this.#cardDetailsComponent = new CardDetailsView(card, this.#handleCardDetailsCloseClick);
    document.body.classList.add('hide-overflow');
    document.body.appendChild(this.#cardDetailsComponent.element);
    document.addEventListener('keydown', this.#handleEscKeyDown);
  };

  #hideCardDetails = () => {
    document.body.classList.remove('hide-overflow');
    document.body.removeChild(this.#cardDetailsComponent.element);
    document.removeEventListener('keydown', this.#handleEscKeyDown);
  };

  #handleEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#hideCardDetails();
    }
  };

  #handleCardLinkClick = (card) => {
    this.#showCardDetails(card);
  };

  #handleCardDetailsCloseClick = () => {
    this.#hideCardDetails();
  };

  init(card) {
    this.#cardComponent = card;
    this.#cardComponent = new CardView(card, this.#handleCardLinkClick);
    render(this.#cardComponent, this.#mainComponent.filmListContainer);
  }
}
