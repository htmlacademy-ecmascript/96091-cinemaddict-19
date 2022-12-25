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

  getTemplate() {
    return creatMainCardContainerTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  getFilmList() {
    return this.element.querySelector('.films-list');
  }

  getFilmListContainer() {
    return this.element.querySelector('.films-list__container');
  }

  removeElement() {
    this.element = null;
  }
}
