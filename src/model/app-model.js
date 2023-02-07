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
    const index = this.#cards.findIndex((card) => card.id === updatedCard.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting card');
    }

    this.#cards = [
      ...this.#cards.slice(0, index),
      updatedCard,
      ...this.#cards.slice(index + 1),
    ];

    this._notify(updateType, updatedCard);
  }

  // addCard(updateType, update) {
  //   this.#cards = [
  //     update,
  //     ...this.#cards,
  //   ];

  //   this._notify(updateType, update);
  // }

  // deleteCard(updateType, update) {
  //   const index = this.#cards.findIndex((card) => card.id === update.id);

  //   if (index === -1) {
  //     throw new Error('Can\'t delete unexisting card');
  //   }

  //   this.#cards = [
  //     ...this.#cards.slice(0, index),
  //     ...this.#cards.slice(index + 1),
  //   ];

  //   this._notify(updateType);
  // }
}
