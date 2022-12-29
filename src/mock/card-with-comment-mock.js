import {getRandomMockCard} from './card-mock.js';
import {getmockComments} from './comment-mock.js';

function getRandomCardWithComments() {

  const randomCard = getRandomMockCard();
  const AllComments = getmockComments();


  const commentsOnCard = AllComments.filter((comment) => {
    const idCommentsOnCard = randomCard.comments;
    return idCommentsOnCard.find((idCommentOnCard) => idCommentOnCard === comment.id);
  });

  for (let i = 0; i < commentsOnCard.length; i++) {
    randomCard.comments[i] = commentsOnCard[i];
  }

  return randomCard;
}

export {getRandomCardWithComments};
