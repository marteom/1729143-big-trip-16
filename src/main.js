import SiteMenuView from '../src/view/site-menu-view';
import FiltersView from '../src/view/filters-view';
import EditPointView from '../src/view/edit-point-view';
import SortView from '../src/view/sort-view';
import NoPointView from '../src/view/no-point-view';
import RoutePointView from '../src/view/route-point-view';
import RouteListView from '../src/view/route-list-view';
import { generatePoint } from '../src/mock/point';
import {
  renderElement,
  RenderPosition,
  replaceElement
} from './helpers/render';

const POINT_COUNT = 17;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const menuElement = document.querySelector('.trip-controls__navigation');
const filtersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

renderElement(menuElement, new SiteMenuView(), RenderPosition.BEFOREEND);
renderElement(filtersElement, new FiltersView(), RenderPosition.BEFOREEND);

if (points.length === 0) {
  renderElement(tripEventsElement, new NoPointView(), RenderPosition.BEFOREEND);
}

else {
  renderElement(tripEventsElement, new SortView(), RenderPosition.BEFOREEND);
  renderElement(tripEventsElement, new RouteListView(), RenderPosition.BEFOREEND);

  const tripEventsList = document.querySelector('.trip-events__list');

  for (let i = 1; i < POINT_COUNT; i++) {
    const routePointView = new RoutePointView(points[i]);
    const editPointView = new EditPointView(points[i]);

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceElement(routePointView, editPointView);
        editPointView.element.removeEventListener('keydown', onEscKeyDown);
      }
    };

    routePointView.setEditClickHandler(() => {
      replaceElement(editPointView, routePointView);
      editPointView.element.addEventListener('keydown', onEscKeyDown);
    });

    editPointView.setFormSubmitHandler(() => {
      replaceElement(routePointView, editPointView);
    });

    editPointView.setHideClickHandler(() => {
      replaceElement(routePointView, editPointView);
    });

    renderElement(tripEventsList, routePointView, RenderPosition.BEFOREEND);
  }
}
