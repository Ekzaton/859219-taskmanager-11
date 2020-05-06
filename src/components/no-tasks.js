// Компоненты
import AbstractComponent from "./abstract-component.js";

// Шаблон сообщения-заглушки
const createNoTasksTemplate = () => {
  return (
    `<p class="board__no-tasks">
      Click «ADD NEW TASK» in menu to create your first task
    </p>`
  );
};

// Класс
export default class NoTasks extends AbstractComponent {
  getTemplate() {
    return createNoTasksTemplate();
  }
}
