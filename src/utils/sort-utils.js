import dayjs from 'dayjs';

function sortByDate(cardA, cardB) {
  return dayjs(cardB.filmInfo.release.date).diff(dayjs(cardA.filmInfo.release.date));
}

function sortByRating(cardA, cardB) {
  return cardB.filmInfo.totalRating - cardA.filmInfo.totalRating;
}

export {sortByDate, sortByRating};
