import MenuView from "./view/menu";
import StatisticsView from "./view/statistics";
import {generateMockEvent} from "./mock/event";
import TripPresenter from "./presenter/trip";
import FilterPresenter from "./presenter/filter";
import EventsModel from "./model/events";
import FilterModel from "./model/filter";
import {render, RenderPosition, remove} from "./utils/render";
import {MenuItem, UpdateType, FilterType} from "./const";

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

const siteMenuComponent = new MenuView();

render(menuTitle, siteMenuComponent, RenderPosition.AFTER);

const tripPresenter = new TripPresenter(tripEventsElement, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(filtersTitle, filterModel);

const handleEventNewFormClose = () => {
  siteMenuComponent.getElement().querySelector(`[data-tab=${MenuItem.TABLE}]`).disabled = false;
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
};

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:

      remove(statisticsComponent);
      tripPresenter.init();
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      statisticsComponent = new StatisticsView(eventsModel.getEvents());
      render(tripEventsElement, statisticsComponent, RenderPosition.AFTER);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
tripPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  remove(statisticsComponent);
  tripPresenter.destroy();
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  tripPresenter.init();
  tripPresenter.createEvent(handleEventNewFormClose);
  siteMenuComponent.getElement().querySelector(`[data-tab=${MenuItem.TABLE}]`).disabled = true;
});

