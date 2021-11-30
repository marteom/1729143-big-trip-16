import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

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
