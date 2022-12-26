import {getRandomCardWithComments} from '../mock/card-with-comment-mock.js';

const AMOUNT_CARD = 6;

export default class AppModel {
  cards = Array.from({length: AMOUNT_CARD}, getRandomCardWithComments);

  getCards() {
    return this.cards;
  }
}
