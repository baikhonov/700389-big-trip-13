import dayjs from "dayjs";

const createEventDestinationsTemplate = () => {
  const destinations = [
    `Tokyo`,
    `London`,
    `Taipei`,
    `Singapore`,
    `Barcelona`,
    `New York`,
    `Amsterdam`,
    `Sydney`,
    `Vienna`,
    `Salzburg`,
  ];

  return destinations.map((destination) => `
    <option value="${destination}"></option>
  `).join(``);
};

const createFormOffersTemplate = (offers) => {
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
  return outputOffers.join(``);
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


export const createFormCreateTemplate = (event = {}) => {
  const {
    type,
    destination,
    offers,
    description,
    images,
    beginDate,
    endDate,
    price,
    isFavorite
  } = event;

  const destinationDatalist = createEventDestinationsTemplate();
  const offersTemplate = createFormOffersTemplate(offers);
  const imagesTemplate = createFormImagesTemplate(images);

  const dateforForm = (incomeDate) => {
    const outputDate = incomeDate !== null
      ? dayjs(incomeDate).format(`YY/MM/DD HH:mm`)
      : ``;

    return outputDate;
  };

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

                <div class="event__type-item">
                  <input id="event-type-taxi-create" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-create">Taxi</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-bus-create" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-create">Bus</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-train-create" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                  <label class="event__type-label  event__type-label--train" for="event-type-train-create">Train</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-ship-create" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-create">Ship</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-transport-create" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                  <label class="event__type-label  event__type-label--transport" for="event-type-transport-create">Transport</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-drive-create" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-create">Drive</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-flight-create" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-create">Flight</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-check-in-create" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-create">Check-in</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-sightseeing-create" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-create">Sightseeing</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-restaurant-create" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-create">Restaurant</label>
                </div>
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
            <input class="event__input  event__input--time" id="event-start-time-create" type="text" name="event-start-time" value="${dateforForm(beginDate)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-create">To</label>
            <input class="event__input  event__input--time" id="event-end-time-create" type="text" name="event-end-time" value="${dateforForm(endDate)}">
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
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${offersTemplate}
            </div>
          </section>

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
