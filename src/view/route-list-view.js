import AbstractView from './abstract-view.js';

const createRouteListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class RouteListView extends AbstractView {
  get template() {
    return createRouteListTemplate();
  }
}
