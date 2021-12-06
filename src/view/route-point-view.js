import { getTypeIcon, getHumanizeDate } from '../helpers/utils';
import AbstractView from './abstract-view.js';

const getOffers = (offers) => {
  let offerList = '';
  offers.forEach((offer) => {offerList += `
  <li class="event__offer">
  <span class="event__offer-title">${offer.title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${offer.price}</span>
</li>  
    `;});
  return offerList;
};

const createRoutePointTemplate = (point) => {
  const { type, city, isFavorite, dateFrom, dateTo, basePrice, offers } = point;
  const isFavoriteActive = isFavorite ? 'event__favorite-btn--active' : '';
  const humanizeDate = getHumanizeDate(dateFrom, dateTo);

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${humanizeDate.dateTime}">${humanizeDate.date}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="${getTypeIcon(type)}" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${city}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${humanizeDate.dateTimeFrom}">${humanizeDate.shedule.from}</time>
          &mdash;
          <time class="event__end-time" datetime="${humanizeDate.dateTimeTo}">${humanizeDate.shedule.to}</time>
        </p>
        <p class="event__duration">${humanizeDate.duration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${getOffers(offers)}
      </ul>
      <button class="event__favorite-btn ${isFavoriteActive}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;};

export default class RoutePointView extends AbstractView {
    #point = null;

    constructor(point) {
      super();
      this.#point = point;
    }

    get template() {
      return createRoutePointTemplate(this.#point);
    }

    setEditClickHandler = (callback) => {
      this._callback.editClick = callback;
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    }

    #editClickHandler = (evt) => {
      evt.preventDefault();
      this._callback.editClick();
    }
}
