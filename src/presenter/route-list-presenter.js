import SiteMenuView from '../view/site-menu-view';
import FiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import NoPointView from '../view/no-point-view';
import RouteListView from '../view/route-list-view';
import RoutePointPresenter from './route-point-presenter';
import {
  renderElement,
  RenderPosition,
} from '../helpers/render';
import { updateArrayItem } from '../helpers/utils';

export default class RouteListPresenter {
    #tripEventsContainer = null;
    #menuElementContainer = null;
    #filtersElement = null;
    #routePointPresenter = new Map();
    #sourcedPoints = [];

    #points = [];

    constructor(tripEventsContainer, menuElementContainer, filtersElement) {
      this.#tripEventsContainer = tripEventsContainer;
      this.#menuElementContainer = menuElementContainer;
      this.#filtersElement = filtersElement;
    }

    init = (points) => {
      this.#points = this.#sourcedPoints = [...points];
      this.#renderMenu();

      if (this.#points.length === 0) {
        this.#renderNoPoint();
      }

      else {
        this.#renderSort();
        this.#renderPointList();
        this.#renderFilters();
      }
    }

    #renderSort = () => {
      renderElement(this.#tripEventsContainer, new SortView(), RenderPosition.BEFOREEND);
    }

    #renderMenu = () => {
      renderElement(this.#menuElementContainer, new SiteMenuView(), RenderPosition.BEFOREEND);
    }

    #renderFilters = () => {
      renderElement(this.#filtersElement, new FiltersView(), RenderPosition.BEFOREEND);
    }

    #renderPoint = (tripEventsList, routePoint) => {
      const routePointPresenter = new RoutePointPresenter(tripEventsList, this.#handleRoutePointChange, this.#handleModeChange);
      routePointPresenter.init(routePoint);
      this.#routePointPresenter.set(routePoint.id, routePointPresenter);
    }

    #renderPointList = () => {
      renderElement(this.#tripEventsContainer, new RouteListView(), RenderPosition.BEFOREEND);

      const tripEventsList = document.querySelector('.trip-events__list');

      for (let i = 1; i < this.#points.length; i++) {
        this.#renderPoint(tripEventsList, this.#points[i]);
      }
    }

    #renderNoPoint = () => {
      renderElement(this.#tripEventsContainer, new NoPointView(), RenderPosition.BEFOREEND);
    }

    #handleRoutePointChange = (updatedPoint) => {
      this.#points = updateArrayItem(this.#points, updatedPoint);
      this.#sourcedPoints = updateArrayItem(this.#sourcedPoints, updatedPoint);
      this.#routePointPresenter.get(updatedPoint.id).init(updatedPoint);
    }

    #handleModeChange = () => {
      this.#routePointPresenter.forEach((presenter) => presenter.resetView());
    }
}
