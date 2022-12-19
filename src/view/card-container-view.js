import {createElement} from '../render.js';

function creatCardContainerTemplate() {
  return `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      </section>`;
}

export default class CardContainerView {

  getTemplate() {
    return creatCardContainerTemplate();
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
