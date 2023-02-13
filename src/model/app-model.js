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

  async updateCard(updateType, updatedCard) {
    const index = this.#cards.findIndex((card) => card.id === updatedCard.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting card');
    }

    try {
      const response = await this.#cardsApiService.updateCard(updatedCard);
      const adaptedCard = adaptCardToClient(response);
      this.#cards = [
        ...this.#cards.slice(0, index),
        adaptedCard,
        ...this.#cards.slice(index + 1),
      ];
      this._notify(updateType, adaptedCard);
    } catch(err) {
      throw new Error('Can\'t update card');
    }
  }
}
