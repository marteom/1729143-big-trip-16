import TypesView from './types-view';
import CitiesView from './cities-view';
import OffersView from './offers-view';
import DestinationsView from './destinations-view';
import { pointTypes } from '../mock/point-types';
import { pointCities } from '../mock/point-cities';
import dayjs from 'dayjs';
import { createElement } from '../render.js';

const createAddNewPointTemplate = (point = {}) => {
  const {
    city = '',
    dateFrom = '',
    dateTo = '',
    basePrice = 0,
    destination = [],
    offers = [],
  } = point;

  return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${TypesView.getTypesTemplate(pointTypes)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          Flight
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
        <datalist id="destination-list-1">
        ${CitiesView.getCitiesTemplate(pointCities)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom === '' ? dayjs().format('DD/MM/YY HH:mm') : dateFrom}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo === '' ? dayjs().format('DD/MM/YY HH:mm') : dateTo}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
    ${OffersView.getOffersTemplate(offers)}
    ${DestinationsView.getDestinationsTemplate(destination)}
    </section>
  </form>`;
};

export default class AddNewPointView {
  #element = null;
  #point = null;

  constructor(point) {
    this.#point = point;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createAddNewPointTemplate(this.#point);
  }

  removeElement() {
    this.#element = null;
  }
}
