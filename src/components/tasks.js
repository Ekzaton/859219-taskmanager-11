// Компоненты
import AbstractComponent from "./abstract-component.js";

// Шаблон списка карточек
const createTasksTemplate = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};

// Класс
export default class Tasks extends AbstractComponent {
  getTemplate() {
    return createTasksTemplate();
  }
}
