import TypesView from './types-view';
import CitiesView from './cities-view';
import OffersView from './offers-view';
import DestinationsView from './destinations-view';
import { pointTypes } from '../mock/point-types';
import { pointCities } from '../mock/point-cities';
import dayjs from 'dayjs';
import { getOffers } from '../mock/offers';
import { getDestination } from '../mock/destinations';
import SmartView from './smart-view.js';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const createEditPointTemplate = (data) => {
  const { type, city, dateFrom, dateTo, basePrice, destination, offers } = data;
  return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
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
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
        <datalist id="destination-list-1">
        ${CitiesView.getCitiesTemplate(pointCities)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
    ${OffersView.getOffersTemplate(offers)}
    ${DestinationsView.getDestinationsTemplate(destination)}
    </section>
  </form>`;
};

export default class EditPointView extends SmartView {
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor(point) {
    super();
    this._data = EditPointView.parsePointToData(point);

    this.#setInnerHandlers();
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  get template() {
    return createEditPointTemplate(this._data);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.addEventListener('submit', this.#formSubmitHandler);
  }

  reset = (point) => {
    this.updateData(
      EditPointView.parsePointToData(point),
    );
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditPointView.parseDataToPoint(this._data));
  }

  setHideClickHandler = (callback) => {
    this._callback.hideClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#hideClickHandler);
  }

  #hideClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.hideClick();
  }

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-list').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__field-group--destination').addEventListener('change', this.#cityChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#basePriceChangeHandler);
    this.element.querySelector('#event-start-time-1').addEventListener('change', this.#dateFromChangeHandler);
    this.element.querySelector('#event-end-time-1').addEventListener('change', this.#dateToChangeHandler);

    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        'dateFormat': 'd/m/Y H:i',
        'enableTime': true,
        'defaultDate': this._data.dateFrom,
        'time_24hr': true,
      },
    );

    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        'dateFormat': 'd/m/Y H:i',
        'enableTime': true,
        'defaultDate': this._data.dateTo,
        'time_24hr': true,
      },
    );
  }

  #dateFromChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      dateFrom: evt.target.value,
    }, true);
  }

  #dateToChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      dateTo: evt.target.value,
    }, true);
  }

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
      offers: getOffers(evt.target.value),
    });
  }

  #cityChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      city: evt.target.value,
      destination: getDestination(evt.target.value),
    });
  }

  #basePriceChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      basePrice: evt.target.value,
    }, true);
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setHideClickHandler(this._callback.hideClick);
  }

  static parsePointToData = (point) => ({...point,
    dateFrom: dayjs(point.dateFrom).format('DD/MM/YY HH:mm'),
    dateTo: dayjs(point.dateTo).format('DD/MM/YY HH:mm'),
  });

  static parseDataToPoint = (data) => {
    const point = { ...data };
    return point;
  }

}
