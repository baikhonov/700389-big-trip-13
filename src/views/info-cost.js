import {createElement} from "../utils";

const createInfoCostSectionTemplate = () => {
  return `
    <section class="trip-main__trip-info  trip-info">
    </section>
  `;
};

export default class InfoCost {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createInfoCostSectionTemplate();
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
