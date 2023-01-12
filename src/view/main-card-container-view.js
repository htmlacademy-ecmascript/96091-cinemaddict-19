import {createElement} from '../render.js';

function creatMainCardContainerTemplate() {
  return `
  <section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container"></div>
    </section>
  </section>
  `;
}

export default class MainCardContainerView {
  #element = null;

  get template() {
    return creatMainCardContainerTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get filmList() {
    return this.#element.querySelector('.films-list');
  }

  get filmListContainer() {
    return this.#element.querySelector('.films-list__container');
  }

  removeElement() {
    this.#element = null;
  }
}
