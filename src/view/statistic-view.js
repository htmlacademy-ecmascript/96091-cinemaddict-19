import {createElement} from '../render.js';

function creatStatisticTemplate() {
  return `
  <p>130 291 movies inside</p>
  `;
}

export default class StatisticView {
  #element = null;

  get template() {
    return creatStatisticTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
