
import {
  generateValue,
  getFalseOrTrue,
  getRandomInteger,
} from '../helpers/utils.js';
import { getDestination } from './destinations';
import { pointTypes } from './point-types';
import { pointCities } from './point-cities';
import dayjs from 'dayjs';
import { getOffers } from './offers';

export const generatePoint = () => {
  const generatedType = generateValue(pointTypes);
  const generatedCity = generateValue(pointCities);
  return {
    id: getRandomInteger(1, 1000),
    type: generatedType,
    city: generatedCity,
    isFavorite: getFalseOrTrue(),
    dateFrom: dayjs().format(`YYYY-MM-DDT0${getRandomInteger(1, 9)}:${getRandomInteger(10, 59)}:ss.SSS[Z]`),
    dateTo: dayjs().format(`YYYY-MM-DDT${getRandomInteger(13, 23)}:${getRandomInteger(10, 59)}:ss.SSS[Z]`),
    basePrice: getRandomInteger(5, 1100),
    destination: getDestination(generatedCity),
    offers: getOffers(generatedType),
  };};
