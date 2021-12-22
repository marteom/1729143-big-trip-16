import {
  generateValue,
  getRandomInteger
} from '../helpers/utils.js';

const pointOffers = {
  'taxi': ['taxi', 'taxi-2', 'taxi-3'],
  'bus': ['Bus', 'Bus-2'],
  'train': ['train', 'train-2'],
  'ship': ['ship', 'ship-2'],
  'drive': ['drive', 'drive-2'],
  'flight': ['flight'],
  'check-in': ['check-in', 'check-in-2'],
  'sightseeing': ['sightseeing-1'],
  'restaurant': ['restaurant-1', 'restaurant-2', 'restaurant-3']
};

const generateOffer = (type) => ({
  id: getRandomInteger(1, 100),
  title: generateValue(pointOffers[type]),
  price: getRandomInteger(1, 50),
});

export const getOffers = (type) => Array(getRandomInteger(1, 3)).fill().map(() => generateOffer(type));
