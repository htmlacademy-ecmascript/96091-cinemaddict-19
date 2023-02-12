import dayjs from 'dayjs';
import {DESCRIPTION_MAX_LENGTH} from '../const.js';

const FULL_DATE_FORMAT = 'DD MMMM YYYY';
const SHORT_DATE_FORMAT = 'YYYY';
const COMMENT_DATE_FORMAT = 'YYYY/MM/DD HH:mm';

function humanizeReleaseDate(date, isFullFormat = false) {
  if (isFullFormat) {
    return dayjs(date).format(FULL_DATE_FORMAT);
  }
  return dayjs(date).format(SHORT_DATE_FORMAT);
}

function humanizeCommentDate(date) {
  const currentDate = dayjs().toDate();
  const diffDate = dayjs(currentDate).diff(date, 'day');

  switch (diffDate) {
    case 0:
      return 'Today';
    case 1:
      return '1 day ago';
    case 2:
      return '2 days ago';
    default:
      return dayjs(date).format(COMMENT_DATE_FORMAT);
  }
}

function reduceDescription(description, length = DESCRIPTION_MAX_LENGTH) {
  if (description.length <= length) {
    return description;
  }
  return `${description.slice(0, length - 1)}…`;
}

export {humanizeReleaseDate, reduceDescription, humanizeCommentDate};
