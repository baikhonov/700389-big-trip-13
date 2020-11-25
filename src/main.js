import {createInfoCostSectionTemplate} from "./views/info-cost-section";
import {createInfoTemplate} from "./views/info";
import {createCostTemplate} from "./views/cost";
import {createMenuTemplate} from "./views/menu";
import {createFiltersTemplate} from "./views/filters";
import {createSortingTemplate} from "./views/sorting";
import {createEventsListTemplate} from "./views/events-list";
import {createFormCreateTemplate} from "./views/event-create";
import {createFormEditTemplate} from "./views/event-edit";
import {createEventTemplate} from "./views/event";

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

