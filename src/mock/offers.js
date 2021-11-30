import { generateValue, getRandomInteger } from '../helpers/utils.js';

const pointOffers = [
  'Rent a car',
  'Lunch',
  'Buying water',
];

export const generateOffer = () => ({
  id: getRandomInteger(1,100),
  title: generateValue(pointOffers),
  price: getRandomInteger(1, 50),
});
