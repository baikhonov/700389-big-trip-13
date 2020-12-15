import {SORTING_TYPES} from "../const";

const createSortingTypeTemplate = (types) => {
  if (types.length === 0) {
    return ``;
  }

  let outputTypes = [];
  let counter = 0;

  for (const type of types) {
    outputTypes.push(`
      <div class="trip-sort__item  trip-sort__item--${type.toLowerCase()}">
        <input id="sort-${type.toLowerCase()}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type.toLowerCase()}" ${counter === 0 ? `checked` : ``}>
        <label class="trip-sort__btn" for="sort-${type.toLowerCase()}">${type}</label>
      </div>
    `);
    counter++;
  }

  return outputTypes.join(``);
};

const sortingTemplate = createSortingTypeTemplate(SORTING_TYPES);

export const createSortingTemplate = () => {
  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortingTemplate}
    </form>
  `;
};
