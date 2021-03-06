import AbstractView from "./abstract";

const createNoEventTemplate = () => {
  return `
      <p class="trip-events__msg">Click New Event to create your first point</p>
  `;
};

export default class NoTask extends AbstractView {
  getTemplate() {
    return createNoEventTemplate();
  }
}
