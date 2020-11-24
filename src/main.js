import {createInfoCostSectionTemplate} from "./views/info-cost-section.js";
import {createTripInfoTemplate} from "./views/info.js";
import {createTripCostTemplate} from "./views/cost.js";
import {createTripMenuTemplate} from "./views/menu.js";
import {createTripFiltersTemplate} from "./views/filters.js";
import {createTripSortingTemplate} from "./views/sorting.js";
import {createTripEventsListTemplate} from "./views/events-list.js";
import {createTripFormCreateTemplate} from "./views/event-create.js";
import {createTripFormEditTemplate} from "./views/event-edit.js";
import {createTripEventTemplate} from "./views/event.js";

const EVENT_COUNT = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);

render(tripMainElement, createInfoCostSectionTemplate(), `afterbegin`);

const tripInfoCostSectionElement = tripMainElement.querySelector(`.trip-info`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripInfoCostSectionElement, createTripInfoTemplate());
render(tripInfoCostSectionElement, createTripCostTemplate());
render(tripControlsElement, createTripMenuTemplate());
render(tripControlsElement, createTripFiltersTemplate());
render(tripEventsElement, createTripSortingTemplate());
render(tripEventsElement, createTripEventsListTemplate());

const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

render(tripEventsListElement, createTripFormCreateTemplate());
render(tripEventsListElement, createTripFormEditTemplate());
for (let i = 0; i < EVENT_COUNT; i++) {
  render(tripEventsListElement, createTripEventTemplate());
}

