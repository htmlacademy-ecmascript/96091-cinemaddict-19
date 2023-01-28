import {mockCards} from './card-mock.js';
import {mockComments} from './comment-mock.js';
import {getRandomArrayElement} from '../utils/common-utils.js';
import {nanoid} from 'nanoid';

function getRandomCardWithComments() {
  const card = Object.create(getRandomArrayElement(mockCards));
  card.comments = card.comments.map((commentId) => mockComments[commentId]);
  card.id = nanoid();
  return card;
}

export {getRandomCardWithComments};

