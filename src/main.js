import MenuView from "./views/menu";
import FilterView from "./views/filter";
import {generateMockEvent} from "./mock/event";
import TripPresenter from "./presenter/trip";
import {render, RenderPosition} from "./utils/render";

const EVENTS_COUNT = 20;

const events = new Array(EVENTS_COUNT).fill().map(generateMockEvent);

window.__events__ = events;

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const menuTitle = tripControlsElement.querySelector(`h2:nth-child(1)`);
const filtersTitle = tripControlsElement.querySelector(`h2:nth-child(2)`);
const tripEventsElement = document.querySelector(`.trip-events`);

const tripPresenter = new TripPresenter(tripEventsElement);

render(menuTitle, new MenuView(), RenderPosition.AFTER);
render(filtersTitle, new FilterView(), RenderPosition.AFTER);

tripPresenter.init(events);


