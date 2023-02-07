
function adaptCardToClient(card) {
  card.userDetails = card.user_details;
  card.userDetails.isInWatchlist = card.userDetails.watchlist;
  card.userDetails.isWatched = card.userDetails.already_watched;
  card.userDetails.watchingDate = new Date(card.userDetails.watching_date);
  card.userDetails.isFavorite = card.userDetails.favorite;
  card.filmInfo = card.film_info;
  card.filmInfo.alternativeTitle = card.filmInfo.alternative_title;
  card.filmInfo.totalRating = card.filmInfo.total_rating;
  card.filmInfo.ageRating = card.filmInfo.age_rating;
  card.filmInfo.release.releaseCountry = card.filmInfo.release.release_country;
  card.filmInfo.release.date = new Date(card.filmInfo.release.date);

  delete card.user_details;
  delete card.userDetails.watchlist;
  delete card.userDetails.already_watched;
  delete card.userDetails.watching_date;
  delete card.userDetails.favorite;
  delete card.filmInfo.alternative_title;
  delete card.filmInfo.total_rating;
  delete card.filmInfo.age_rating;
  delete card.filmInfo.release.release_country;
  delete card.film_info;

  return card;
}

function adaptCardToServer(card) {
  card['user_details'] = card.userDetails;
  card.userDetails.watchlist = card.userDetails.isInWatchlist;
  card.userDetails['already_watched'] = card.userDetails.isWatched;
  card.userDetails['watching_date'] = card.userDetails.watchingDate.toISOString();
  card.userDetails.favorite = card.userDetails.isFavorite;
  card['film_info'] = card.filmInfo;
  card.filmInfo['alternative_title'] = card.filmInfo.alternativeTitle;
  card.filmInfo['total_rating'] = card.filmInfo.totalRating;
  card.filmInfo['age_rating'] = card.filmInfo.ageRating;
  card.filmInfo.release['release_country'] = card.filmInfo.release.releaseCountry;
  card.filmInfo.release.date = card.filmInfo.release.date.toISOString();

  delete card.userDetails.isInWatchlist;
  delete card.userDetails.isWatched;
  delete card.userDetails.watchingDate;
  delete card.userDetails.isFavorite;
  delete card.userDetails;
  delete card.filmInfo.alternativeTitle;
  delete card.filmInfo.totalRating;
  delete card.filmInfo.ageRating;
  delete card.filmInfo.release.releaseCountry;
  delete card.filmInfo;

  return card;
}

export {adaptCardToClient, adaptCardToServer};
