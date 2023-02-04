import Observable from '../framework/observable.js';

export default class AppModel extends Observable {
  #cards = [];

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

  addCard(updateType, update) {
    this.#cards = [
      update,
      ...this.#cards,
    ];

    this._notify(updateType, update);
  }

  deleteCard(updateType, update) {
    const index = this.#cards.findIndex((card) => card.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting card');
    }

    this.#cards = [
      ...this.#cards.slice(0, index),
      ...this.#cards.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
