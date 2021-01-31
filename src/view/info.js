import dayjs from "dayjs";
import AbstractView from "./abstract";

const createInfoTemplate = (events) => {

  const MIN_EVENTS_COUNT = 3;

  const firstDateOfTrip = events[0].beginDate;
  const lastDateOfTrip = events[events.length - 1].endDate;
  const outputFirstDate = dayjs(firstDateOfTrip).format(`MMM DD`);
  const outputLastDate = dayjs(lastDateOfTrip).format(`MMM DD`);
  const firstDestination = events[0].destination;
  const middleDestination = (events.length === MIN_EVENTS_COUNT) ? events[1].destination : `...`;
  const lastDestination = events[events.length - 1].destination;

  return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">${firstDestination} &mdash; ${middleDestination} &mdash; ${lastDestination}</h1>

      <p class="trip-info__dates">${outputFirstDate}&nbsp;&mdash;&nbsp;${outputLastDate}</p>
    </div>
  `;
};

export default class Info extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createInfoTemplate(this._events);
  }
}

