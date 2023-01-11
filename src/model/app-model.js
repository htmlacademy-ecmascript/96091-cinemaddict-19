export default class AppModel {
  #cards = [];

  set cards(cards) {
    this.#cards = cards;
  }

  get cards() {
    return this.#cards;
  }
}
