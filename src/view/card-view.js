import {createElement} from '../render.js';
import {humanizeReleaseDate, reduceDescription} from '../utils.js';

function getCardClassName(isActive) {
  return (
    isActive
      ? 'film-card__controls-item--active'
      : ''
  );
}

function creatCardTemplate(card) {
  const {comments, filmInfo, userDetails} = card;
  return `
  <article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${filmInfo.title}</h3>
      <p class="film-card__rating">${filmInfo.totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${humanizeReleaseDate(filmInfo.release.date)}</span>
        <span class="film-card__duration">${filmInfo.duration}</span>
        <span class="film-card__genre">${filmInfo.genres[0]}</span>
      </p>
      <img src="${filmInfo.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${reduceDescription(filmInfo.description)}</p>
      <span class="film-card__comments">${comments.length} comments</span>
    </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item ${getCardClassName(userDetails.isInWatchlist)} film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
    <button class="film-card__controls-item ${getCardClassName(userDetails.isWatched)} film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
    <button class="film-card__controls-item ${getCardClassName(userDetails.isFavorite)} film-card__controls-item--favorite" type="button">Mark as favorite</button>
  </div>
</article>
  `;
}

export default class CardView {

  constructor({card}) {
    this.card = card;
  }

  getTemplate() {
    return creatCardTemplate(this.card);
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
