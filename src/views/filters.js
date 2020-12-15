import {FILTER_TYPES} from "../const";

const createFilterTemplate = (filters) => {
  if (filters.length === 0) {
    return ``;
  }

  let outputFilters = [];
  let counter = 0;

  for (const filter of filters) {
    outputFilters.push(`
      <div class="trip-filters__filter">
        <input id="filter-${filter.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.toLowerCase()}" ${counter === 0 ? `checked` : ``}>
        <label class="trip-filters__filter-label" for="filter-${filter.toLowerCase()}">${filter}</label>
      </div>
    `);
    counter++;
  }

  return outputFilters.join(``);
};

const filterTemplate = createFilterTemplate(FILTER_TYPES);

export const createFiltersTemplate = () => {

  return `
    <form class="trip-filters" action="#" method="get">
      ${filterTemplate}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
};
