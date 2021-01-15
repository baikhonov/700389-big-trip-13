import {SORTING_TYPES} from "../const";
import AbstractView from "./abstract";

const createSortingTypeTemplate = (types) => {
  if (types.length === 0) {
    return ``;
  }

  let outputTypes = [];
  let counter = 0;

  Object
    .values(types)
    .forEach((type) => {
      outputTypes.push(`
      <div class="trip-sort__item  trip-sort__item--${type}">
        <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}"   ${counter === 0 ? `checked` : ``}>
        <label class="trip-sort__btn" for="sort-${type}" data-sort-type="${type}">${type}</label>
      </div>
    `);
      counter++;
    });

  return outputTypes.join(``);
};

const sortingTemplate = createSortingTypeTemplate(SORTING_TYPES);

const createSortingTemplate = () => {
  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortingTemplate}
    </form>
  `;
};

export default class Sorting extends AbstractView {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortingTemplate();
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `LABEL`) {
      return;
    }

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
