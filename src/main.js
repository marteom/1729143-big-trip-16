import { createSiteMenuTemplate } from '../src/view/site-menu-view';
import { createFiltersTemplate } from '../src/view/filters-view';
import { createEditPointTemplate } from '../src/view/edit-point-view';
import { createSortTemplate } from '../src/view/sort-view';
import { createAddNewPointTemplate } from '../src/view/add-new-point-view';
import { createRoutePointTemplate } from '../src/view/route-point-view';
import { createRouteListTemplate } from '../src/view/route-list-view';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const POINT_COUNT = 3;

const menuElement = document.querySelector('.trip-controls__navigation');
const filtersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(menuElement, createSiteMenuTemplate(), 'beforeend');
render(filtersElement, createFiltersTemplate(), 'beforeend');
render(tripEventsElement, createSortTemplate(), 'beforeend');
render(tripEventsElement, createRouteListTemplate(), 'beforeend');

const tripEventsList = document.querySelector('.trip-events__list');

render(tripEventsList, createEditPointTemplate(), 'beforeend');

for (let i = 0; i < POINT_COUNT; i++) {
  render(tripEventsList, createRoutePointTemplate(), 'beforeend');
}


render(tripEventsList, createAddNewPointTemplate(), 'beforeend');
