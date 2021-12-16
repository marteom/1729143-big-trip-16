import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

const sortAsNumber = (numA, numB) => {
  if (numB > numA) {
    return 1;
  }
  if (numB < numA) {
    return -1;
  }

  return 0;
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const generateValue = (inputArr) => {
  const randomIndex = getRandomInteger(0, inputArr.length - 1);
  return inputArr[randomIndex];
};

export const getFalseOrTrue = () => getRandomInteger(0, 1) !== 0;

export const getTypeIcon = (type) => `../img/icons/${type}.png`;

export const getHumanizeDate = (dateFrom, dateTo) => ({
  date: dayjs(dateFrom).format('MMM DD'),
  dateTime: dayjs(dateFrom).format('YYYY-MM-DD'),
  dateTimeFrom: dayjs(dateFrom).format('YYYY-MM-DDTHH:mm'),
  dateTimeTo: dayjs(dateTo).format('YYYY-MM-DDTHH:mm'),
  shedule: {
    from: dayjs(dateFrom).format('HH:mm'),
    to: dayjs(dateTo).format('HH:mm'),
  },
  duration: function () {
    dayjs.extend(duration);
    const from = dayjs(dateFrom);
    const to = dayjs(dateTo);
    const durationFromTo = dayjs.duration(to.diff(from));

    if(Number(durationFromTo.hours()) < 1){
      return durationFromTo.format('mm[m]');
    }
    else if(Number(durationFromTo.hours()) > 1 && Number(durationFromTo.hours()) < 24){
      return durationFromTo.format('HH[h] mm[m]');
    }
    else{
      return durationFromTo.format('DD[d] HH[h] mm[m]');
    }
  }()
});

export const updateArrayItem = (items, updatedItem) => {
  const index = items.findIndex((item) => item.id === updatedItem.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    updatedItem,
    ...items.slice(index + 1),
  ];
};

export const sortByDuration = (pointA, pointB) => {
  dayjs.extend(duration);
  const fromA = dayjs(pointA.dateFrom);
  const toA = dayjs(pointA.dateTo);

  const fromB = dayjs(pointB.dateFrom);
  const toB = dayjs(pointB.dateTo);

  const durationA = dayjs.duration(toA.diff(fromA)).asMilliseconds();
  const durationB = dayjs.duration(toB.diff(fromB)).asMilliseconds();

  return sortAsNumber(durationA, durationB);
};

export const sortByPrice = (pointA, pointB) => sortAsNumber(pointA.basePrice, pointB.basePrice);
