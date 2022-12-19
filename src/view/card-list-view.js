import {createElement} from '../render.js';

function creatCardListTemplate() {
  return `
  <div class="films-list__container"></div>
  `;
}

export default class CardListView {

  getTemplate() {
    return creatCardListTemplate();
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
