import EventView from "../view/event";
import EventEditView from "../view/event-edit";
import {render, RenderPosition, replace, remove} from "../utils/render";
import {UserAction, UpdateType} from "../const";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Event {
  constructor(eventsListContainer, changeData, changeMode) {
    this._eventsListContainer = eventsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmitClick = this._handleFormSubmitClick.bind(this);
    this._handleFormCloseClick = this._handleFormCloseClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(event) {
    this._event = event;

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventView(event);
    this._eventEditComponent = new EventEditView(event);

    this._eventComponent.setEditClickHandler(this._handleEditClick);
    this._eventComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmitClick);
    this._eventEditComponent.setFormCloseHandler(this._handleFormCloseClick);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._eventsListContainer, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }


    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToEvent();
    }
  }

  _replaceEventToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToEvent() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._eventEditComponent.reset(this._event);
      this._replaceFormToEvent();
    }
  }

  _handleEditClick() {
    this._replaceEventToForm();
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_EVENT,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._event,
            {
              isFavorite: !this._event.isFavorite
            }
        )
    );
  }

  _handleFormSubmitClick(update) {
    this._changeData(
        UserAction.UPDATE_EVENT,
        UpdateType.MINOR,
        update);
    this._replaceFormToEvent();
  }

  _handleFormCloseClick() {
    this._replaceFormToEvent();
  }

  _handleDeleteClick(event) {
    this._changeData(
        UserAction.DELETE_EVENT,
        UpdateType.MINOR,
        event
    );
  }
}

