import AbstractView from '../framework/view/abstract-view.js';

function getUserRank(userCount) {
  if (userCount === 0) {
    return '';
  } else if (userCount > 0 && userCount <= 10){
    return 'Novice';
  } else if (userCount > 10 && userCount <= 20){
    return 'Fan';
  } else if (userCount > 20){
    return 'Movie Buff';
  }
}

function creatUserTemplate(userCount) {
  return `<section class="header__profile profile">
  <p class="profile__rating">${getUserRank(userCount)}</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
}


export default class UserView extends AbstractView {
  #userCount = null;

  constructor(userCount) {
    super();
    this.#userCount = userCount;
  }

  get template() {
    return creatUserTemplate(this.#userCount);
  }
}
