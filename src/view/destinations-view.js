const getDestinationPictures = (destinationPictures) => {
  if (destinationPictures.length === 0) {return '';}

  let destinationPicturesList = `<div class="event__photos-container">
    <div class="event__photos-tape">`;
  destinationPictures.forEach((destinationPicture) => {destinationPicturesList += `<img class="event__photo" src="${destinationPicture.src}" alt="${destinationPicture.description}">`;});

  destinationPicturesList += '</div></div>';
  return destinationPicturesList;
};

export const createDestinationsTemplate = (destination) => {
  if (destination.length === 0) {return '';}
  let destinationsList = `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description}</p>
    ${getDestinationPictures(destination.pictures)}`;


  destinationsList += '</section>';

  return destinationsList;
};
