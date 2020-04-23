// Импорт
import {createElement} from "../utils.js";

// Шаблон основного контента
const createBoardTemplate = () => {
  return (
    `<section class="board container"></section>`
  );
};

// Класс
export default class Board {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBoardTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
