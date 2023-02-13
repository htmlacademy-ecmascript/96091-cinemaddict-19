const EMOJI_IMAGES_SRC = {
  smile: './images/emoji/smile.png',
  sleeping: './images/emoji/sleeping.png',
  puke: './images/emoji/puke.png',
  angry: './images/emoji/angry.png'
};

const DESCRIPTION_MAX_LENGTH = 140;

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const UserAction = {
  UPDATE_CARD: 'UPDATE_CARD',
  UPDATE_CARD_FROM_DETAILS: 'UPDATE_CARD_FROM_DETAILS',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT'
};

const UpdateType = {
  FILTRATION: 'FILTRATION',
  SORTING: 'SORTING',
  CARD_UPDATING: 'CARD_UPDATING',
  INIT: 'INIT',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

export {
  EMOJI_IMAGES_SRC,
  DESCRIPTION_MAX_LENGTH,
  FilterType,
  SortType,
  UserAction,
  UpdateType,
  Method
};
