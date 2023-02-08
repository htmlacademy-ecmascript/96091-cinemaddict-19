import Observable from '../framework/observable.js';
import {adaptCardToClient} from '../utils/adapt-utils.js';
import {UpdateType} from '../const.js';

export default class AppModel extends Observable {
  #cards = [];
  #cardsApiService = null;

  constructor({cardsApiService}) {
    super();
    this.#cardsApiService = cardsApiService;
  }

  set cards(cards) {
    this.#cards = cards;
  }

  get cards() {
    return this.#cards;
  }

  async init() {
    try {
      const cards = await this.#cardsApiService.cards;
      this.#cards = cards.map(adaptCardToClient);
    } catch(err) {
      this.#cards = [];
    }
    this._notify(UpdateType.INIT);
  }

  updateCard(updateType, updatedCard) {
    return this.#cardsApiService.updateCard(updatedCard)
      .then((response) => {
        const adaptedCard = adaptCardToClient(response);

        this.#cards = this.#cards.map((card) => card.id === adaptedCard.id ? adaptedCard : card);

        this._notify(updateType, updatedCard);
      });
  }
}
