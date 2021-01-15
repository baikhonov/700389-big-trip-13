import InfoCostView from "../views/info-cost";
import InfoView from "../views/info";
import CostView from "../views/cost";
import SortingView from "../views/sorting";
import EventsListView from "../views/events-list";
import NoEventView from "../views/no-events";
import EventPresenter from "./event";
import {updateItem} from "../utils/common";
import {render, RenderPosition} from "../utils/render";
import {sortTimeDown, sortPriceDown, sortDayUp} from "../utils/event";
import {SORTING_TYPES} from "../const";

const EVENTS_COUNT = 20;
const tripMainElement = document.querySelector(`.trip-main`);

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._eventPresenter = {};
    this._currentSortType = SORTING_TYPES.DEFAULT;

    this._InfoCostViewComponent = new InfoCostView();
    this._sortComponent = new SortingView();
    this._eventsListComponent = new EventsListView();
    this._noEventComponent = new NoEventView();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(events) {
    this._events = events.slice().sort(sortDayUp);
    // сохраняем исходный массив точек
    this._sourceEvents = events.slice().sort(sortDayUp);
    this._InfoViewComponent = new InfoView(this._events);
    this._CostViewComponent = new CostView(this._events);
    this._renderEvents();
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleEventChange(updatedEvent) {
    this._events = updateItem(this._events, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SORTING_TYPES.TIME:
        this._events.sort(sortTimeDown);
        break;
      case SORTING_TYPES.PRICE:
        this._events.sort(sortPriceDown);
        break;
      default:
        this._events = this._sourceEvents.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortEvents(sortType);
    this._clearEventsList();
    this._renderEventsList();
  }

  _renderInfoCost() {
    render(tripMainElement, this._InfoCostViewComponent, RenderPosition.AFTERBEGIN);

    const tripInfoCostSectionElement = tripMainElement.querySelector(`.trip-info`);

    render(tripInfoCostSectionElement, this._InfoViewComponent, RenderPosition.BEFOREEND);
    render(tripInfoCostSectionElement, this._CostViewComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventsListComponent, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderNoEvents() {
    render(this._tripContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _clearEventsList() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }

  _renderEventsList() {
    render(this._tripContainer, this._eventsListComponent, RenderPosition.BEFOREEND);
    for (let i = 0; i < EVENTS_COUNT; i++) {
      this._renderEvent(this._events[i]);
    }
  }

  _renderEvents() {
    if (this._events.length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderInfoCost();
    this._renderSort();
    this._renderEventsList();
  }
}
