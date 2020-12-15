import {createInfoCostSectionTemplate} from "./views/info-cost-section";
import {createInfoTemplate} from "./views/info";
import {createCostTemplate} from "./views/cost";
import SiteMenuView from "./views/menu";
import {createFiltersTemplate} from "./views/filters";
import {createSortingTemplate} from "./views/sorting";
import {createEventsListTemplate} from "./views/events-list";
import {createFormCreateTemplate} from "./views/event-create";
import {createFormEditTemplate} from "./views/event-edit";
import {createEventTemplate} from "./views/event";
import {generateMockEvent} from "./mock/event";
import {renderTemplate, renderElement, RenderPosition} from "./utils";

const EVENTS_COUNT = 20;

const events = new Array(EVENTS_COUNT).fill().map(generateMockEvent);



const tripMainElement = document.querySelector(`.trip-main`);

renderTemplate(tripMainElement, createInfoCostSectionTemplate(), `afterbegin`);

const tripInfoCostSectionElement = tripMainElement.querySelector(`.trip-info`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const menuTitle = tripControlsElement.querySelector(`h2:nth-child(1)`);
const filtersTitle = tripControlsElement.querySelector(`h2:nth-child(2)`);
const tripEventsElement = document.querySelector(`.trip-events`);

renderTemplate(tripInfoCostSectionElement, createInfoTemplate(events));
renderTemplate(tripInfoCostSectionElement, createCostTemplate(events));
renderElement(menuTitle, new SiteMenuView().getElement(), RenderPosition.AFTER);
renderTemplate(tripControlsElement, createFiltersTemplate());
renderTemplate(tripEventsElement, createSortingTemplate());
renderTemplate(tripEventsElement, createEventsListTemplate());

const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

renderTemplate(tripEventsListElement, createFormCreateTemplate(events[0]));
renderTemplate(tripEventsListElement, createFormEditTemplate(events[1]));
for (let i = 2; i < EVENTS_COUNT; i++) {
  renderTemplate(tripEventsListElement, createEventTemplate(events[i]));
}

