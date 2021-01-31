import MenuView from "./view/menu";
import FilterView from "./view/filter";
import {generateMockEvent} from "./mock/event";
import TripPresenter from "./presenter/trip";
import EventsModel from "./model/events";
import {render, RenderPosition} from "./utils/render";

const EVENTS_COUNT = 20;

const events = new Array(EVENTS_COUNT).fill().map(generateMockEvent);

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const menuTitle = tripControlsElement.querySelector(`h2:nth-child(1)`);
const filtersTitle = tripControlsElement.querySelector(`h2:nth-child(2)`);
const tripEventsElement = document.querySelector(`.trip-events`);

const tripPresenter = new TripPresenter(tripEventsElement, eventsModel);

render(menuTitle, new MenuView(), RenderPosition.AFTER);
render(filtersTitle, new FilterView(), RenderPosition.AFTER);

tripPresenter.init();


