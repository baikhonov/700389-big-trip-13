import {DESTINATIONS} from "./const";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

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

export const date = (incomeDate) => {
  const outputDate = incomeDate !== null
    ? dayjs(incomeDate).format(`MMM D`)
    : ``;

  return outputDate;
};


export const dateForMachine = (incomeDate) => {
  const outputDate = incomeDate !== null
    ? dayjs(incomeDate).format(`YYYY-MM-DD`)
    : ``;

  return outputDate;
};

export const time = (incomeDate) => {
  const outputDate = incomeDate !== null
    ? dayjs(incomeDate).format(`HH:mm`)
    : ``;

  return outputDate;
};

export const timeForMachine = (incomeDate) => {
  const outputDate = incomeDate !== null
    ? dayjs(incomeDate).format(`YYYY-MM-DDTHH:mm`)
    : ``;

  return outputDate;
};

export const calculateDuration = (firstDate, secondDate) => {
  const date1 = dayjs(firstDate);
  const date2 = dayjs(secondDate);
  const diff = dayjs.duration(date2.diff(date1));

  const days = diff.$d.days;
  let outputDays = days > 0 ? days + `D` : ``;
  if (days < 10 && days !== 0) {
    outputDays = `0` + outputDays;
  }

  const hours = diff.$d.hours;
  let outputHours = hours > 0 ? hours + `H` : ``;
  if (hours < 10 && hours !== 0) {
    outputHours = `0` + outputHours;
  }

  const minutes = diff.$d.minutes;
  let outputMinutes = minutes > 0 ? minutes + `M` : ``;
  if (minutes < 10 && minutes !== 0) {
    outputMinutes = `0` + outputMinutes;
  }
  return `${outputDays} ${outputHours} ${outputMinutes}`;
};
