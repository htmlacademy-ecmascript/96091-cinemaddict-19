import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizeReleaseDate, humanizeCommentDate} from '../utils/card-utils.js';
import {X_COORD, EMOJI_IMAGES_SRC} from '../const.js';

function creatCardDetailsTemplate(card) {
  const {comments, filmInfo, userDetails, emojis, emojiTemplate, isEmojiChecked} = card;
  return `
  <section class="film-details">
    <div class="film-details__inner">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${filmInfo.poster}" alt="">

            <p class="film-details__age">${filmInfo.ageRating}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${filmInfo.title}</h3>
                <p class="film-details__title-original">Original: ${filmInfo.alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${filmInfo.totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${filmInfo.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${filmInfo.writers.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${filmInfo.actors.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${humanizeReleaseDate(filmInfo.release.date, true)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Duration</td>
                <td class="film-details__cell">${filmInfo.duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${filmInfo.genre.length > 1 ? 'Genres' : 'Genre'}</td>
                <td class="film-details__cell">${filmInfo.genre.map((genre) => (`<span class="film-details__genre">${genre}</span>`)).join('')}</td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${filmInfo.description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button ${userDetails.isInWatchlist ? 'film-details__control-button--active' : ''} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button ${userDetails.isWatched ? 'film-details__control-button--active' : ''} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button ${userDetails.isFavorite ? 'film-details__control-button--active' : ''} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${comments.map((comment) => (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${EMOJI_IMAGES_SRC[comment.emotion]}" width="55" height="55" alt="emoji-${comment.emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${humanizeCommentDate(comment.date)}</span>
          <button class="film-details__comment-delete" data-id="${comment.id}">Delete</button>
        </p>
      </div>
    </li>`
  )).join('')}
          </ul>

          <form class="film-details__new-comment" action="" method="get">
            <div class="film-details__add-emoji-label">${isEmojiChecked ? emojiTemplate : ''}</div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              ${emojis.map((emoji) => (`
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
              <label class="film-details__emoji-label" for="emoji-${emoji}">
                <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
              </label>
              `)).join('')}
            </div>
          </form>
        </section>
      </div>
    </div>
  </section>
  `;
}

export default class CardDetailsView extends AbstractStatefulView {
  #handleCardDetailsCloseClick = null;
  #handleWatchlistClick = null;
  #handleWatchedClick = null;
  #handleFavoriteClick = null;
  #handleCommentKeyDown = null;
  #handleDeleteButtonClick = null;

  constructor(
    card,
    comments,
    onCardDetailsCloseClick,
    onWatchlistClick,
    onWatchedClick,
    onFavoriteClick,
    onCommentKeyDown,
    onDeleteButtonClick
  ) {
    super();
    this._setState(CardDetailsView.parseCardToState({...card, comments}));
    this.#handleCardDetailsCloseClick = onCardDetailsCloseClick;
    this.#handleWatchlistClick = onWatchlistClick;
    this.#handleWatchedClick = onWatchedClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.#handleCommentKeyDown = onCommentKeyDown;
    this.#handleDeleteButtonClick = onDeleteButtonClick;
    this._restoreHandlers();
  }

  get template() {

    return creatCardDetailsTemplate(this._state);
  }

  _restoreHandlers() {
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#cardDetailsCloseClickHandler);

    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchlistClickHandler);
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#watchedClickHandler);
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);

    this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#emojiListClickHandler);
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#commentInputHandler);
    this.element.querySelector('.film-details__comment-input').addEventListener('keydown', this.#commentKeyDownHandler);

    this.element.querySelector('.film-details__comments-list').addEventListener('click', this.#deleteButtonClickHandler);
  }

  #cardDetailsCloseClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCardDetailsCloseClick();
  };

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

  #emojiListClickHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.updateElement({
      emojiTemplate: `<img src="./images/emoji/${evt.target.value}.png" width="55" height="55" alt="emoji-smile">`,
      isEmojiChecked: true,
      scrollPosition: this.element.scrollTop
    });

    this.element.scrollTo(X_COORD, this._state.scrollPosition);

    this.element.querySelectorAll('.film-details__emoji-item').forEach(
      (element) => {
        if (element.value === evt.target.value) {
          element.checked = 'true';
        }
      }
    );

    this._setState({comment: { ...this._state.comment, emotion: evt.target.value}});
  };

  #commentInputHandler = (evt) => {
    this._setState({comment: { ...this._state.comment, comment: evt.target.value.trim()}});
  };

  #commentKeyDownHandler = (evt) => {
    if (evt.key === 'Enter' && evt.ctrlKey) {
      this.#handleCommentKeyDown(this._state.comment);
    }
  };

  #deleteButtonClickHandler = (evt) => {
    if (evt.target.tagName !== 'BUTTON') {
      return;
    }
    evt.preventDefault();
    this.#handleDeleteButtonClick(evt.target.dataset.id);
  };

  static parseCardToState(card){
    return {
      ...card,
      emojis: ['smile', 'sleeping', 'puke', 'angry'],
      emojiTemplate: null,
      isEmojiChecked: false,
      comment: { comment: '', emotion: '' }
    };
  }

  static parseStateToCard(state){
    const card = {state};

    delete card.emojis;
    delete card.emojiTemplate;
    delete card.isEmojiChecked;
    return card;
  }
}
