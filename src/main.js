import {createInfoCostSectionTemplate} from "./views/info-cost-section.js";
import {createInfoTemplate} from "./views/info.js";
import {createCostTemplate} from "./views/cost.js";
import {createMenuTemplate} from "./views/menu.js";
import {createFiltersTemplate} from "./views/filters.js";
import {createSortingTemplate} from "./views/sorting.js";
import {createEventsListTemplate} from "./views/events-list.js";
import {createFormCreateTemplate} from "./views/event-create.js";
import {createFormEditTemplate} from "./views/event-edit.js";
import {createEventTemplate} from "./views/event.js";

const EVENT_COUNT = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);

render(tripMainElement, createInfoCostSectionTemplate(), `afterbegin`);

const tripInfoCostSectionElement = tripMainElement.querySelector(`.trip-info`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripInfoCostSectionElement, createInfoTemplate());
render(tripInfoCostSectionElement, createCostTemplate());
render(tripControlsElement, createMenuTemplate());
render(tripControlsElement, createFiltersTemplate());
render(tripEventsElement, createSortingTemplate());
render(tripEventsElement, createEventsListTemplate());

const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

render(tripEventsListElement, createFormCreateTemplate());
render(tripEventsListElement, createFormEditTemplate());
for (let i = 0; i < EVENT_COUNT; i++) {
  render(tripEventsListElement, createEventTemplate());
}

