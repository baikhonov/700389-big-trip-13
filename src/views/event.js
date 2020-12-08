import dayjs from "dayjs";

const createEventOffersTemplate = (offers) => {
  let outputOffers = [];
  for (const offer of offers) {
    outputOffers.push(`
      <li class="event__offer">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </li>
    `);
  }
  return outputOffers.join(``);
};

export const createEventTemplate = (event) => {
  const {
    type,
    destination,
    offers,
    beginDate,
    endDate,
    price,
    isFavorite
  } = event;

  const offersTemplate = createEventOffersTemplate(offers);

  const date = (incomeDate) => {
    const outputDate = incomeDate !== null
      ? dayjs(incomeDate).format(`MMM D`)
      : ``;

    return outputDate;
  };


  const dateForMachine = (incomeDate) => {
    const outputDate = incomeDate !== null
      ? dayjs(incomeDate).format(`YYYY-MM-DD`)
      : ``;

    return outputDate;
  };

  const time = (incomeDate) => {
    const outputDate = incomeDate !== null
      ? dayjs(incomeDate).format(`HH:mm`)
      : ``;

    return outputDate;
  };

  const timeForMachine = (incomeDate) => {
    const outputDate = incomeDate !== null
      ? dayjs(incomeDate).format(`YYYY-MM-DDTHH:mm`)
      : ``;

    return outputDate;
  };

  const calculateDuration = (firstDate, secondDate) => {
    const date1 = dayjs(firstDate);
    const date2 = dayjs(secondDate);
    const diff = date2.diff(date1, `minute`);
    const days = Math.floor(diff / 1440) > 0 ? Math.floor(diff / 1440) : ``;
    let outputDays = days > 0 ? days + `D` : ``;
    if (days < 10 && days !== ``) {
      outputDays = `0` + outputDays;
    }
    const hours = Math.floor((diff - days * 1440) / 60) > 0 ? Math.floor((diff - days * 1440) / 60) : ``;
    let outputHours = hours > 0 ? hours + `H` : ``;
    if (hours < 10 && hours !== ``) {
      outputHours = `0` + outputHours;
    }
    const minutes = (diff - days * 1440 - hours * 60) > 0 ? diff - days * 1440 - hours * 60 : ``;
    let outputMinutes = minutes > 0 ? minutes + `M` : ``;
    if (minutes < 10 && minutes !== ``) {
      outputMinutes = `0` + outputMinutes;
    }
    return `${outputDays} ${outputHours} ${outputMinutes}`;
  };

  const favoriteClassName = isFavorite
    ? `event__favorite-btn--active`
    : `event__favorite-btn`;

  return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateForMachine(beginDate)}">${date(beginDate)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${timeForMachine(beginDate)}">${time(beginDate)}</time>
            &mdash;
            <time class="event__end-time" datetime="${timeForMachine(endDate)}">${time(endDate)}</time>
          </p>
          <p class="event__duration">${calculateDuration(beginDate, endDate)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersTemplate}
        </ul>
        <button class="event__favorite-btn ${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
};
