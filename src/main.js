import {createTripInfoTemplate} from "./views/trip-info.js";
import {createTripCostTemplate} from "./views/trip-cost.js";
import {createTripMenuTemplate} from "./views/trip-menu.js";
import {createTripFiltersTemplate} from "./views/trip-filters.js";
import {createTripSortingTemplate} from "./views/trip-sorting.js";
import {createTripEventsListTemplate} from "./views/trip-events-list.js";
import {createTripFormEditTemplate} from "./views/trip-event-edit.js";
import {createTripEventTemplate} from "./views/trip-event.js";

const EVENT_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);
const tripInfoElement = tripMainElement.querySelector(`.trip-info`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripInfoElement, createTripInfoTemplate(), `beforeend`);
render(tripInfoElement, createTripCostTemplate(), `beforeend`);
render(tripControlsElement, createTripMenuTemplate(), `beforeend`);
render(tripControlsElement, createTripFiltersTemplate(), `beforeend`);
render(tripEventsElement, createTripSortingTemplate(), `beforeend`);
render(tripEventsElement, createTripEventsListTemplate(), `beforeend`);

const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

render(tripEventsListElement, createTripFormEditTemplate(), `beforeend`);
for (let i = 0; i < EVENT_COUNT; i++) {
  render(tripEventsListElement, createTripEventTemplate(), `beforeend`);
}

