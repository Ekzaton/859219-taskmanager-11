// Компоненты
import AbstractComponent from "./abstract-component.js";

// Шаблон доски задач
const createBoardTemplate = () => {
  return (
    `<section class="board container"></section>`
  );
};

// Класс
export default class Board extends AbstractComponent {
  getTemplate() {
    return createBoardTemplate();
  }
}
