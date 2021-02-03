import InfoCostView from "../view/info-cost";
import InfoView from "../view/info";
import CostView from "../view/cost";
import SortingView from "../view/sorting";
import EventsListView from "../view/events-list";
import LoadingView from "../view/loading";
import NoEventView from "../view/no-events";
import EventPresenter from "./event";
import EventNewPresenter from "./event-new";
import {render, RenderPosition, remove} from "../utils/render";
import {sortTimeDown, sortPriceDown, sortDayUp} from "../utils/event";
import {filter} from "../utils/filter.js";
import {SortType, UpdateType, UserAction} from "../const";

const tripMainElement = document.querySelector(`.trip-main`);

export default class Trip {
  constructor(tripContainer, eventsModel, filterModel) {
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._tripContainer = tripContainer;
    this._eventPresenter = {};
    this._currentSortType = SortType.DEFAULT;
    this._isLoading = true;

    this._sortComponent = null;

    this._InfoCostViewComponent = new InfoCostView();
    this._eventsListComponent = new EventsListView();
    this._noEventComponent = new NoEventView();
    this._loadingComponent = new LoadingView();


    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);


    this._eventNewPresenter = new EventNewPresenter(this._eventsListComponent, this._handleViewAction);
  }

  init() {
    this._InfoViewComponent = new InfoView(this._getEvents().slice().sort(sortDayUp));
    this._CostViewComponent = new CostView(this._getEvents());

    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderBoard();
  }

  destroy() {
    this._clearBoard({resetSortType: true});

    remove(this._eventsListComponent);
    remove(this._InfoViewComponent);
    remove(this._CostViewComponent);

    this._eventsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createEvent(callback) {
    this._eventNewPresenter.init(callback);
  }

  _getEvents() {
    const filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filteredTasks = filter[filterType](events);

    switch (this._currentSortType) {
      case SortType.TIME:
        return filteredTasks.sort(sortTimeDown);
      case SortType.PRICE:
        return filteredTasks.sort(sortPriceDown);
    }

    return filteredTasks.sort(sortDayUp);
  }

  _handleModeChange() {
    this._eventNewPresenter.destroy();
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this._eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this._eventsModel.deleteEvent(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetSortType: true});
        this._renderBoard();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderBoard();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard();
    this._renderBoard();
  }

  _renderInfoCost() {
    render(tripMainElement, this._InfoCostViewComponent, RenderPosition.AFTERBEGIN);

    const tripInfoCostSectionElement = tripMainElement.querySelector(`.trip-info`);

    render(tripInfoCostSectionElement, this._InfoViewComponent, RenderPosition.BEFOREEND);
    render(tripInfoCostSectionElement, this._CostViewComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortingView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventsListComponent, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderEvents(events) {
    events.forEach((event) => this._renderEvent(event));
  }

  _renderLoading() {
    render(this._tripContainer, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  _renderNoEvents() {
    render(this._tripContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _clearBoard({resetSortType = false} = {}) {
    this._eventNewPresenter.destroy();
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};

    remove(this._sortComponent);
    remove(this._noEventComponent);
    remove(this._loadingComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderBoard() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const events = this._getEvents();
    const eventsCount = events.length;
    if (eventsCount === 0) {
      this._renderNoEvents();
      // remove(this._InfoCostViewComponent);
      // remove(this._CostViewComponent);
      // remove(this._InfoViewComponent);
      return;
    }

    this._renderInfoCost();
    this._renderSort();
    render(this._tripContainer, this._eventsListComponent, RenderPosition.BEFOREEND);
    this._renderEvents(events);
  }
}
