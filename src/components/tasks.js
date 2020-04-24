// Импорт
import {createElement} from "../utils.js";

// Шаблон списка карточек
const createTasksTemplate = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};

// Класс
export default class Tasks {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTasksTemplate();
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
