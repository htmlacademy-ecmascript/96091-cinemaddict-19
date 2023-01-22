import AbstractView from '../framework/view/abstract-view.js';

function creatStatisticTemplate(cardsCount) {
  return `
  <p>${cardsCount} movies inside</p>
  `;
}

export default class StatisticView extends AbstractView {
  #cardsCount = null;

  constructor(cardsCount) {
    super();
    this.#cardsCount = cardsCount;
  }

  get template() {
    return creatStatisticTemplate(this.#cardsCount);
  }
}
