import ApiService from '../framework/api-service.js';
import {Method} from '../const.js';

export default class CommentsApiService extends ApiService {

  getComments(card) {
    return this._load({ url: `comments/${card.id}` })
      .then(ApiService.parseResponse);
  }

  addComment(card, comment) {
    return this._load({
      url: `comments/${card.id}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({ 'Content-Type': 'application/json' })
    })
      .then(ApiService.parseResponse);
  }

  deleteComment(id) {
    return this._load({
      url: `comments/${id}`,
      method: Method.DELETE
    });
  }
}
