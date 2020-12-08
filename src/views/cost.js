export const createCostTemplate = (events) => {
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
