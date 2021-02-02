import MenuView from "./view/menu";
import {generateMockEvent} from "./mock/event";
import TripPresenter from "./presenter/trip";
import FilterPresenter from "./presenter/filter";
import EventsModel from "./model/events";
import FilterModel from "./model/filter";
import {render, RenderPosition} from "./utils/render";

const EVENTS_COUNT = 20;

const events = new Array(EVENTS_COUNT).fill().map(generateMockEvent);

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const filterModel = new FilterModel();

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const menuTitle = tripControlsElement.querySelector(`h2:nth-child(1)`);
const filtersTitle = tripControlsElement.querySelector(`h2:nth-child(2)`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(menuTitle, new MenuView(), RenderPosition.AFTER);

const tripPresenter = new TripPresenter(tripEventsElement, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(filtersTitle, filterModel);

filterPresenter.init();
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
});

