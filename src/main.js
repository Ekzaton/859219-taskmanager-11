// Компоненты
import BoardComponent from "./components/board.js";
import SiteMenuComponent, {MenuItem} from "./components/site-menu.js";

// Контроллеры
import BoardController from "./controllers/board.js";
import FilterController from "./controllers/filter.js";

// Утилиты
import {render, RenderPosition} from "./utils/render.js";

// Моки
import {generateTasks} from "./mock/task.js";

// Модели данных
import TasksModel from "./models/tasks.js";

// Константы
const TASK_COUNT = 20;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const siteMenuComponent = new SiteMenuComponent();

// Отрисовка меню
render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);

const tasks = generateTasks(TASK_COUNT);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

// Отрисовка фильтров
const filterController = new FilterController(siteMainElement, tasksModel);
filterController.render();

const boardComponent = new BoardComponent();

// Ортрисовка доски задач
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);

const boardController = new BoardController(boardComponent, tasksModel);
boardController.render(tasks);

siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      siteMenuComponent.setActiveItem(MenuItem.TASKS);
      boardController.createTask();
      break;
  }
});
