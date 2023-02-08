import ApiService from '../framework/api-service.js';
import {adaptCardToServer} from '../utils/adapt-utils.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class CommentsApiService extends ApiService {

  getComments(card) {
    return this._load({ url: `comments/${card.id}` })
      .then(ApiService.parseResponse);
  }
}
