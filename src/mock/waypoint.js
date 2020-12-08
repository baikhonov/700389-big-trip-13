import dayjs from "dayjs";

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

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
  const destinations = [
    `Tokyo`,
    `London`,
    `Taipei`,
    `Singapore`,
    `Barcelona`,
    `New York`,
    `Amsterdam`,
    `Sydney`,
    `Vienna`,
    `Salzburg`,
  ];

  const randomIndex = getRandomInteger(0, destinations.length - 1);

  return destinations[randomIndex];
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

  const randomLength = getRandomInteger(0, 5);

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
  const daysGap = getRandomInteger(-maxDaysGap, 0);
  const hourGap = getRandomInteger(-maxHourGap, 0);
  const minuteGap = getRandomInteger(-maxMinuteGap, 0);

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

export const generateWaypoint = () => {
  return {
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

// Точка маршрута (waypoint)
// - тип точки (type)
// - пункт назначения (destination)
// - доп. опции (options) - список
//    - название, цена
// - информация о месте назначения
//    - описание
//    - фотографии
// - дата и время начала события
// - дата и время окончания события
// - стоимость
// - является ли избранной
