import AbstractView from '../framework/view/abstract-view.js';
import {humanizeReleaseDate, reduceDescription} from '../utils/card-utils.js';

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
        <span class="film-card__genre">${filmInfo.genre[0]}</span>
      </p>
      <img src="${filmInfo.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${reduceDescription(filmInfo.description)}</p>
      <span class="film-card__comments">${comments.length} comments</span>
    </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item ${userDetails.isInWatchlist ? 'film-card__controls-item--active' : ''} film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
    <button class="film-card__controls-item ${userDetails.isWatched ? 'film-card__controls-item--active' : ''} film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
    <button class="film-card__controls-item ${userDetails.isFavorite ? 'film-card__controls-item--active' : ''} film-card__controls-item--favorite" type="button">Mark as favorite</button>
  </div>
</article>
  `;
}

export default class CardView extends AbstractView {
  #card = null;
  #handleCardLinkClick = null;
  #handleWatchlistClick = null;
  #handleWatchedClick = null;
  #handleFavoriteClick = null;

  constructor(
    card,
    onWatchlistClick,
    onWatchedClick,
    onFavoriteClick,
    onCardLinkClick,
  ) {
    super();
    this.#card = card;
    this.#handleWatchlistClick = onWatchlistClick;
    this.#handleWatchedClick = onWatchedClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.#handleCardLinkClick = onCardLinkClick;

    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchlistClickHandler);
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#watchedClickHandler);
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
    this.element.querySelector('.film-card__link').addEventListener('click', this.#cardLinkClickHandler);
  }

  get template() {
    return creatCardTemplate(this.#card);
  }

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleWatchlistClick();
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleWatchedClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };

  #cardLinkClickHandler = () => {
    this.#handleCardLinkClick(this.#card);
  };
}
