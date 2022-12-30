export default class AppModel {
  cards = [];

  setCards(cards) {
    this.cards = cards;
  }

  getCards() {
    return this.cards;
  }
}
