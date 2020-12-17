import InfoCostView from "./views/info-cost";
import InfoView from "./views/info";
import CostView from "./views/cost";
import MenuView from "./views/menu";
import FilterView from "./views/filter";
import SortingView from "./views/sorting";
import EventsListView from "./views/events-list";
import NoEventView from "./views/no-events";
import EventEditView from "./views/event-edit";
import EventView from "./views/event";
import {generateMockEvent} from "./mock/event";
import {render, RenderPosition} from "./utils";

const EVENTS_COUNT = 20;

const events = new Array(EVENTS_COUNT).fill().map(generateMockEvent);

const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);

  const replaceEventToForm = () => {
    eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToEvent = () => {
    eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceEventToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    replaceFormToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderEventsList = () => {
  if (events.length === 0) {
    render(tripEventsElement, new NoEventView().getElement(), RenderPosition.BEFOREEND);
  } else {
    render(tripMainElement, new InfoCostView().getElement(), RenderPosition.AFTERBEGIN);

    const tripInfoCostSectionElement = tripMainElement.querySelector(`.trip-info`);

    render(tripInfoCostSectionElement, new InfoView(events).getElement(), RenderPosition.BEFOREEND);
    render(tripInfoCostSectionElement, new CostView(events).getElement(), RenderPosition.BEFOREEND);

    render(tripEventsElement, new SortingView().getElement(), RenderPosition.BEFOREEND);

    const EventsListComponent = new EventsListView();

    render(tripEventsElement, EventsListComponent.getElement(), RenderPosition.BEFOREEND);
    for (let i = 0; i < EVENTS_COUNT; i++) {
      renderEvent(EventsListComponent.getElement(), events[i]);
    }
  }
};

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const menuTitle = tripControlsElement.querySelector(`h2:nth-child(1)`);
const filtersTitle = tripControlsElement.querySelector(`h2:nth-child(2)`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(menuTitle, new MenuView().getElement(), RenderPosition.AFTER);
render(filtersTitle, new FilterView().getElement(), RenderPosition.AFTER);
renderEventsList();


