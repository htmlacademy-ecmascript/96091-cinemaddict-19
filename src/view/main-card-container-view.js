import {createElement} from '../render.js';

function creatMainCardContainerTemplate() {
  return `
  <section class="films"></section>
  `;
}

export default class MainCardContainerView {

  getTemplate() {
    return creatMainCardContainerTemplate();
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
