export default class OffersView {
  static getOffersTemplate(offers) {
    if(offers.length === 0) {return '';}
    let offersList = `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">`;
    offers.forEach((offer) => {offersList += `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
      <label class="event__offer-label" for="event-offer-seats-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;});

    offersList += '</div></section>';

    return offersList;
  }
}
