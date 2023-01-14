import {mockCards} from './card-mock.js';
import {mockComments} from './comment-mock.js';
import {getRandomArrayElement} from '../utils.js';

function getRandomCardWithComments() {
  const card = getRandomArrayElement(mockCards);
  card.comments = card.comments.map((commentId) => mockComments[commentId]);
  return card;
}

export {getRandomCardWithComments};
