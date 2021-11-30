import { createSiteMenuTemplate } from '../src/view/site-menu-view';
import { createFiltersTemplate } from '../src/view/filters-view';
import { createEditPointTemplate } from '../src/view/edit-point-view';
import { createSortTemplate } from '../src/view/sort-view';
import { createRoutePointTemplate } from '../src/view/route-point-view';
import { createRouteListTemplate } from '../src/view/route-list-view';
import { generatePoint } from '../src/mock/point';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const POINT_COUNT = 17;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const menuElement = document.querySelector('.trip-controls__navigation');
const filtersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(menuElement, createSiteMenuTemplate(), 'beforeend');
render(filtersElement, createFiltersTemplate(), 'beforeend');
render(tripEventsElement, createSortTemplate(), 'beforeend');
render(tripEventsElement, createRouteListTemplate(), 'beforeend');

const tripEventsList = document.querySelector('.trip-events__list');

render(tripEventsList, createEditPointTemplate(points[0]), 'beforeend');

for (let i = 1; i < POINT_COUNT; i++) {
  render(tripEventsList, createRoutePointTemplate(points[i]), 'beforeend');
}

