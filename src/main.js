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
import {render, RenderPosition, replace} from "./utils/render";

const EVENTS_COUNT = 20;

const events = new Array(EVENTS_COUNT).fill().map(generateMockEvent);

const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);

  const replaceEventToForm = () => {
    replace(eventEditComponent, eventComponent);
  };

  const replaceFormToEvent = () => {
    replace(eventComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.setEditClickHandler(() => {
    replaceEventToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setFormSubmitHandler(() => {
    replaceFormToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setFormCloseHandler(() => {
    replaceFormToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventListElement, eventComponent, RenderPosition.BEFOREEND);
};

const renderEventsList = () => {
  if (events.length === 0) {
    render(tripEventsElement, new NoEventView(), RenderPosition.BEFOREEND);
  } else {
    render(tripMainElement, new InfoCostView(), RenderPosition.AFTERBEGIN);

    const tripInfoCostSectionElement = tripMainElement.querySelector(`.trip-info`);

    render(tripInfoCostSectionElement, new InfoView(events), RenderPosition.BEFOREEND);
    render(tripInfoCostSectionElement, new CostView(events), RenderPosition.BEFOREEND);

    render(tripEventsElement, new SortingView(), RenderPosition.BEFOREEND);

    const EventsListComponent = new EventsListView();

    render(tripEventsElement, EventsListComponent, RenderPosition.BEFOREEND);
    for (let i = 0; i < EVENTS_COUNT; i++) {
      renderEvent(EventsListComponent, events[i]);
    }
  }
};

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const menuTitle = tripControlsElement.querySelector(`h2:nth-child(1)`);
const filtersTitle = tripControlsElement.querySelector(`h2:nth-child(2)`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(menuTitle, new MenuView(), RenderPosition.AFTER);
render(filtersTitle, new FilterView(), RenderPosition.AFTER);
renderEventsList();


