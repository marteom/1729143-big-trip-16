import { generateValue, getRandomInteger } from '../helpers/utils.js';

const description = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const imageDescription = [
  'Description-1',
  'Description-2',
  'Description-3',
  'Description-4',
];

const name = [
  'name-1',
  'name-2',
  'name-3',
  'name-4',
];

export const generateDestination = () => ({
  description: Array(getRandomInteger(1,5)).fill().map(() => generateValue(description)),
  name: generateValue(name),
  pictures: [
    {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 999)}`,
      description: generateValue(imageDescription),
    }
  ]
});
