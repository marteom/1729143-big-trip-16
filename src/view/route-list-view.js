import {createElement} from '../render.js';

const createRouteListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class RouteListView {
    #element = null;

    get element() {
      if (!this.#element) {
        this.#element = createElement(this.template);
      }

      return this.#element;
    }

    get template() {
      return createRouteListTemplate();
    }

    removeElement() {
      this.#element = null;
    }
}
