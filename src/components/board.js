// Импорт
import AbstractComponent from "./abstract-component.js";

// Шаблон основного контента
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
