import EditPointView from '../view/edit-point-view';
import RoutePointView from '../view/route-point-view';

import {
  renderElement,
  RenderPosition,
  replaceElement,
  removeElement,
} from '../helpers/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class RoutePointPresenter {
    #tripEventsContainer = null;

    #routePointComponent = null;
    #routePointEditComponent = null;

    #routePoint = null;
    #changeData = null;
    #changeMode = null;
    #mode = Mode.DEFAULT

    constructor(tripEventsContainer, changeData, changeMode) {
      this.#tripEventsContainer = tripEventsContainer;
      this.#changeData = changeData;
      this.#changeMode = changeMode;
    }

    init = (routePoint) => {
      this.#routePoint = routePoint;

      const prevRoutePointComponent = this.#routePointComponent;
      const prevRoutePointEditComponent = this.#routePointEditComponent;

      this.#routePointComponent = new RoutePointView(routePoint);
      this.#routePointEditComponent = new EditPointView(routePoint);

      this.#routePointComponent.setEditClickHandler(this.#handleEditClick);
      this.#routePointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
      this.#routePointEditComponent.setHideClickHandler(this.#handleHideClick);
      this.#routePointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);

      if (prevRoutePointComponent === null || prevRoutePointEditComponent === null) {
        renderElement(this.#tripEventsContainer, this.#routePointComponent, RenderPosition.BEFOREEND);
        return;
      }

      if (this.#mode === Mode.DEFAULT) {
        replaceElement(this.#routePointComponent, prevRoutePointComponent);
      }

      if (this.#mode === Mode.EDITING) {
        replaceElement(this.#routePointEditComponent, prevRoutePointEditComponent);
      }

      removeElement(prevRoutePointComponent);
      removeElement(prevRoutePointEditComponent);
    }

    #handleHideClick = () => {
      this.#replaceFormToPoint();
    }

    #handleEditClick = () => {
      this.#replacePointToForm();
      this.#routePointEditComponent.element.addEventListener('keydown', this.#onEscKeyDown);
    }

    #handleFormSubmit = () => {
      this.#replaceFormToPoint();
    }

    #handleFavoriteClick = () => {
      this.#changeData({ ...this.#routePoint, isFavorite: !this.#routePoint.isFavorite });
    }

    #onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        this.#replaceFormToPoint();
        this.#routePointEditComponent.element.removeEventListener('keydown', this.#onEscKeyDown);
      }
    };

    #replacePointToForm = () => {
      replaceElement(this.#routePointEditComponent, this.#routePointComponent);
      this.#changeMode();
      this.#mode = Mode.EDITING;
    }

    #replaceFormToPoint = () => {
      replaceElement(this.#routePointComponent, this.#routePointEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    destroy = () => {
      removeElement(this.#routePointComponent);
      removeElement(this.#routePointEditComponent);
    }

    resetView = () => {
      if (this.#mode !== Mode.DEFAULT) {
        this.#replaceFormToPoint();
      }
    }
}
