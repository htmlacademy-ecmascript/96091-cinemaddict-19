import Observable from '../framework/observable.js';
import {adaptCardToClient} from '../utils/adapt-utils.js';

export default class AppModel extends Observable {
  #cards = [];
  #cardsApiService = null;

  constructor({cardsApiService}) {
    super();
    this.#cardsApiService = cardsApiService;

    this.#cardsApiService.cards.then((cards) => {
      console.log(cards.map(adaptCardToClient));
    });
  }

  set cards(cards) {
    this.#cards = cards;
  }

  get cards() {
    return this.#cards;
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
