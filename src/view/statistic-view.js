import {createElement} from '../render.js';

function creatStatisticTemplate() {
  return `
  <p>130 291 movies inside</p>
  `;
}

export default class StatisticView {

  getTemplate() {
    return creatStatisticTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
