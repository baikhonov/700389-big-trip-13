import {createElement} from "../utils";

const createCostTemplate = (events) => {
  let totalSum = 0;
  events.forEach((item) => {
    totalSum += item.price;
  });

  return `
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalSum}</span>
    </p>
  `;
};

export default class Cost {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createCostTemplate(this._events);
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
