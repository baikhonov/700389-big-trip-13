import {createEventDestinationsTemplate, dateForForm, createElement} from "../utils";
import {EVENT_TYPES} from "../const";

const createFormOffersTemplate = (offers) => {
  if (offers.length === 0) {
    return ``;
  }

  let outputOffers = [];
  for (const offer of offers) {
    let checkedClassName = offer.isChecked
      ? `checked`
      : ``;

    outputOffers.push(`
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.alias}-create" type="checkbox" name="event-offer-${offer.alias}" ${checkedClassName}>
        <label class="event__offer-label" for="event-offer-${offer.alias}-create">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
    `);
  }
  return `
    <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
        ${outputOffers.join(``)}
    </div>
</section>
  `;
};

const createFormImagesTemplate = (images) => {
  let outputImages = [];
  for (const image of images) {
    outputImages.push(`
      <img class="event__photo" src="${image}" alt="Event photo">
    `);
  }
  return outputImages.join(``);
};

const createEventTypesTemplate = (types) => {
  let outputTypes = [];
  for (const type of types) {
    outputTypes.push(`
      <div class="event__type-item">
        <input id="event-type-taxi-create" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
        <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-taxi-create">${type}</label>
      </div>
    `);
  }
  return outputTypes.join(``);
};


const createFormCreateTemplate = (event = {}) => {
  const {
    type,
    destination,
    offers,
    description,
    images,
    beginDate,
    endDate,
    price,
  } = event;

  const destinationDatalist = createEventDestinationsTemplate();
  const offersTemplate = createFormOffersTemplate(offers);
  const imagesTemplate = createFormImagesTemplate(images);
  const typesTemplate = createEventTypesTemplate(EVENT_TYPES);

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-create">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-create" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

                ${typesTemplate}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-create">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-create" type="text" name="event-destination" value="${destination}" list="destination-list-create">
            <datalist id="destination-list-create">
              ${destinationDatalist}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-create">From</label>
            <input class="event__input  event__input--time" id="event-start-time-create" type="text" name="event-start-time" value="${dateForForm(beginDate)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-create">To</label>
            <input class="event__input  event__input--time" id="event-end-time-create" type="text" name="event-end-time" value="${dateForForm(endDate)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-create">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-create" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
            ${offersTemplate}

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${imagesTemplate}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>
  `;
};

export default class EditCreate {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createFormCreateTemplate(this._event);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
