import Observable from '../framework/observable.js';
import {adaptCommentsToClient} from '../utils/adapt-utils.js';

export default class CommentsModel extends Observable {
  #comments = [];
  #commentsApiService = null;

  constructor({commentsApiService}) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  set comments(comments) {
    this.#comments = comments;
  }

  get comments() {
    return this.#comments;
  }

  async init(card) {
    try {
      const comments = await this.#commentsApiService.getComments(card);
      this.#comments = comments.map(adaptCommentsToClient);
    } catch(err) {
      this.#comments = [];
    }
  }
}
