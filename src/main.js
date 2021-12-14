import { generatePoint } from '../src/mock/point';
import RouteListPresenter from '../src/presenter/route-list-presenter';

const POINT_COUNT = 17;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const menuElement = document.querySelector('.trip-controls__navigation');
const filtersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const routeListPresenter = new RouteListPresenter(tripEventsElement, menuElement, filtersElement);
routeListPresenter.init(points);
