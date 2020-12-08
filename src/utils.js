import {DESTINATIONS} from "./const";
import dayjs from "dayjs";

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const createEventDestinationsTemplate = () => {
  return DESTINATIONS.map((destination) => `
    <option value="${destination}"></option>
  `).join(``);
};

export const dateForForm = (incomeDate) => {
  const outputDate = incomeDate !== null
    ? dayjs(incomeDate).format(`YY/MM/DD HH:mm`)
    : ``;

  return outputDate;
};
