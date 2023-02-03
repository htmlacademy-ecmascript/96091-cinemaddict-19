import Observable from '../framework/observable.js';

export default class AppModel extends Observable {
  #cards = [];

  set cards(cards) {
    this.#cards = cards;
  }

  get cards() {
    return this.#cards;
  }
}
