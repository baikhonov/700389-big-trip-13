import dayjs from "dayjs";
import {getRandomInteger} from "../utils/common";
import {DESTINATIONS} from "../const";
import {nanoid} from 'nanoid';

const generateId = () => nanoid();

const generateType = () => {
  const types = [
    `Taxi`,
    `Bus`,
    `Train`,
    `Ship`,
    `Transport`,
    `Drive`,
    `Flight`,
    `Check-in`,
    `Sightseeing`,
    `Restaurant`
  ];

  const randomIndex = getRandomInteger(0, types.length - 1);

  return types[randomIndex];
};

const generateDestination = () => {
  const randomIndex = getRandomInteger(0, DESTINATIONS.length - 1);

  return DESTINATIONS[randomIndex];
};

const generateOffers = () => {
  const offersTitleList = [
    {
      alias: `luggage`,
      title: `Add luggage`,
    },
    {
      alias: `comfort`,
      title: `Switch to comfort`,
    },
    {
      alias: `meal`,
      title: `Add meal`,
    },
    {
      alias: `seats`,
      title: `Choose seats`,
    },
    {
      alias: `train`,
      title: `Travel by train`,
    }
  ];

  const randomLength = getRandomInteger(0, 5);

  let offers = [];
  for (let i = 0; i < randomLength; i++) {
    const randomIndex = getRandomInteger(0, offersTitleList.length - 1);
    const randomElement = offersTitleList.splice(randomIndex, 1);
    const randomOffer = {
      alias: randomElement[0].alias,
      title: randomElement[0].title,
      price: getRandomInteger(0, 100),
      isChecked: Boolean(getRandomInteger(0, 1))
    };
    offers.push(randomOffer);
  }

  return offers;
};

const generateDescription = () => {
  const sentences = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
  ];

  const randomLength = getRandomInteger(1, 5);

  let description = [];
  for (let i = 0; i < randomLength; i++) {
    const randomIndex = getRandomInteger(0, sentences.length - 1);
    description.push(sentences[randomIndex]);
  }

  return description;
};

const generateImages = () => {
  const image = `http://picsum.photos/248/152?r=`;
  const randomLength = getRandomInteger(0, 5);

  let images = [];
  for (let i = 0; i < randomLength; i++) {
    const randomNumber = getRandomInteger(1, 100);
    images.push(image + randomNumber);
  }

  return images;
};

const generateBeginDate = () => {
  const maxDaysGap = 7;
  const maxHourGap = 24;
  const maxMinuteGap = 60;
  const daysGap = getRandomInteger(-maxDaysGap, -1);
  const hourGap = getRandomInteger(-maxHourGap, -1);
  const minuteGap = getRandomInteger(-maxMinuteGap, -1);

  return dayjs().add(daysGap, `day`).add(hourGap, `hour`).add(minuteGap, `minute`).toDate();
};

const generateEndDate = () => {
  const maxDaysGap = 7;
  const maxHourGap = 24;
  const maxMinuteGap = 60;
  const daysGap = getRandomInteger(0, maxDaysGap);
  const hourGap = getRandomInteger(-maxHourGap, 0);
  const minuteGap = getRandomInteger(-maxMinuteGap, 0);

  return dayjs().add(daysGap, `day`).add(hourGap, `hour`).add(minuteGap, `minute`).toDate();
};

const generatePrice = () => {
  return getRandomInteger(1, 1000);
};

export const generateMockEvent = () => {
  return {
    id: generateId(),
    type: generateType(),
    destination: generateDestination(),
    offers: generateOffers(),
    description: generateDescription(),
    images: generateImages(),
    beginDate: generateBeginDate(),
    endDate: generateEndDate(),
    price: generatePrice(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
