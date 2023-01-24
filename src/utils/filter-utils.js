import {FilterType} from '../const.js';

const filter = {
  [FilterType.WATCHLIST]: (cards) => cards.filter((card) => card.userDetails.isInWatchlist),
  [FilterType.HISTORY]: (cards) => cards.filter((card) => card.userDetails.isWatched),
  [FilterType.FAVORITES]: (cards) => cards.filter((card) => card.userDetails.isFavorite)
};

export {filter};
