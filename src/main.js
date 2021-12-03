import SiteMenuView from '../src/view/site-menu-view';
import createFiltersTemplate from '../src/view/filters-view';
import EditPointView from '../src/view/edit-point-view';
import SortView from '../src/view/sort-view';
import RoutePointView from '../src/view/route-point-view';
import RouteListView from '../src/view/route-list-view';
import { generatePoint } from '../src/mock/point';
import { renderElement, RenderPosition } from './render';

const POINT_COUNT = 17;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const menuElement = document.querySelector('.trip-controls__navigation');
const filtersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

renderElement(menuElement, new SiteMenuView().element, RenderPosition.BEFOREEND);
renderElement(filtersElement, new createFiltersTemplate().element, RenderPosition.BEFOREEND);
renderElement(tripEventsElement, new SortView().element, RenderPosition.BEFOREEND);
renderElement(tripEventsElement, new RouteListView().element, RenderPosition.BEFOREEND);

const tripEventsList = document.querySelector('.trip-events__list');

for (let i = 1; i < POINT_COUNT; i++) {
  const routePointViewElement = new RoutePointView(points[i]).element;
  const editPointViewElement = new EditPointView(points[i]).element;

  routePointViewElement.querySelector('.event__rollup-btn').addEventListener('click', () => {
    tripEventsList.replaceChild(editPointViewElement, routePointViewElement);
  });

  editPointViewElement.addEventListener('submit', (e) => {
    e.preventDefault();
    tripEventsList.replaceChild(routePointViewElement, editPointViewElement);
  });

  renderElement(tripEventsList, routePointViewElement, RenderPosition.BEFOREEND);
}

