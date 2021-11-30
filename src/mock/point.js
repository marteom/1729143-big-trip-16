
import { generateValue, getRandomInteger, getFalseOrTrue } from '../helpers/utils.js';
import { generateDestination } from './destinations';
import { generateOffer } from './offers';
import { pointTypes } from './point-types';
import { pointCities } from './point-cities';
import dayjs from 'dayjs';

export const generatePoint = () => ({
  id: getRandomInteger(1, 100),
  type: generateValue(pointTypes),
  city: generateValue(pointCities),
  isFavorite: getFalseOrTrue(),
  dateFrom: dayjs().format(`YYYY-MM-DDT0${getRandomInteger(1, 9)}:${getRandomInteger(10, 59)}:ss.SSS[Z]`),
  dateTo: dayjs().format(`YYYY-MM-DDT${getRandomInteger(13, 23)}:${getRandomInteger(10, 59)}:ss.SSS[Z]`),
  basePrice: getRandomInteger(5, 1100),
  destination: generateDestination(),
  offers: Array(getRandomInteger(1,3)).fill().map(generateOffer),
});
