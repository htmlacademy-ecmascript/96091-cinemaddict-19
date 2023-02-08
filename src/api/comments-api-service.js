import ApiService from '../framework/api-service.js';

export default class CommentsApiService extends ApiService {

  getComments(card) {
    return this._load({ url: `comments/${card.id}` })
      .then(ApiService.parseResponse);
  }
}
