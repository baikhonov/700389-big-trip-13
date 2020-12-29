import AbstractView from "./abstract";

const createInfoCostSectionTemplate = () => {
  return `
    <section class="trip-main__trip-info  trip-info">
    </section>
  `;
};

export default class InfoCost extends AbstractView {
  getTemplate() {
    return createInfoCostSectionTemplate();
  }
}
