import {filter} from '../utils/filter-utils.js';

function generateFilter(cards) {
  return Object.entries(filter).map(
    ([filterName, filterCards]) => ({
      name: filterName,
      count: filterCards(cards).length
    })
  );
}

export {generateFilter};
