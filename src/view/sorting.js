import {SortType} from "../const";
import AbstractView from "./abstract";

const createSortingTypeTemplate = (types, currentSortType) => {
  if (types.length === 0) {
    return ``;
  }

  let outputTypes = [];

  Object
    .values(types)
    .forEach((type) => {
      outputTypes.push(`
      <div class="trip-sort__item  trip-sort__item--${type}">
        <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" ${currentSortType === type ? `checked` : ``}>
        <label class="trip-sort__btn" for="sort-${type}" data-sort-type="${type}">${type}</label>
      </div>
    `);
    });

  return outputTypes.join(``);
};

const createSortingTemplate = (currentSortType) => {
  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${createSortingTypeTemplate(SortType, currentSortType)}
    </form>
  `;
};

export default class Sorting extends AbstractView {
  constructor(currentSortType) {
    super();

    this._currentSortType = currentSortType;

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortingTemplate(this._currentSortType);
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
