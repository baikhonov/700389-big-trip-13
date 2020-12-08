import {createEventDestinationsTemplate, dateForForm} from "../utils";

const createFormOffersTemplate = (offers) => {
  let outputOffers = [];
  for (const offer of offers) {
    let checkedClassName = offer.isChecked
      ? `checked`
      : ``;

    outputOffers.push(`
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.alias}-edit" type="checkbox" name="event-offer-${offer.alias}" ${checkedClassName}>
        <label class="event__offer-label" for="event-offer-${offer.alias}-edit">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
    `);
  }
  return outputOffers.join(``);
};


export const createFormEditTemplate = (event = {}) => {
  const {
    type,
    destination,
    offers,
    description,
    beginDate,
    endDate,
    price,
  } = event;

  const destinationDatalist = createEventDestinationsTemplate();
  const offersTemplate = createFormOffersTemplate(offers);

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-edit">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-edit" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

                <div class="event__type-item">
                  <input id="event-type-taxi-edit" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-edit">Taxi</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-bus-edit" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-edit">Bus</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-train-edit" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                  <label class="event__type-label  event__type-label--train" for="event-type-train-edit">Train</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-ship-edit" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-edit">Ship</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-transport-edit" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                  <label class="event__type-label  event__type-label--transport" for="event-type-transport-edit">Transport</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-drive-edit" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-edit">Drive</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-flight-edit" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-edit">Flight</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-check-in-edit" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-edit">Check-in</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-sightseeing-edit" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-edit">Sightseeing</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-restaurant-edit" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-edit">Restaurant</label>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-edit">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-edit" type="text" name="event-destination" value="${destination}" list="destination-list-edit">
            <datalist id="destination-list-edit">
              ${destinationDatalist}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-edit">From</label>
            <input class="event__input  event__input--time" id="event-start-time-edit" type="text" name="event-start-time" value="${dateForForm(beginDate)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-edit">To</label>
            <input class="event__input  event__input--time" id="event-end-time-edit" type="text" name="event-end-time" value="${dateForForm(endDate)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-edit">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-edit" type="text" name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${offersTemplate}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>
          </section>
        </section>
      </form>
    </li>
  `;
};
