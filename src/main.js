// Компоненты
import BoardComponent from "./components/board.js";
import SiteMenuComponent, {MenuItem} from "./components/site-menu.js";
import StatisticsComponent from "./components/statistics.js";

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

const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();
const tasks = generateTasks(TASK_COUNT);
const tasksModel = new TasksModel();

tasksModel.setTasks(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const siteMenuComponent = new SiteMenuComponent();
const boardComponent = new BoardComponent();
const statisticsComponent = new StatisticsComponent({tasks: tasksModel, dateFrom, dateTo});

const boardController = new BoardController(boardComponent, tasksModel);
const filterController = new FilterController(siteMainElement, tasksModel);

// Отрисовка
render(siteHeaderElement, siteMenuComponent, RenderPosition.BEFOREEND);
filterController.render();
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
boardController.render();
render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();

// Создание новой задачи
siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      siteMenuComponent.setActiveItem(MenuItem.TASKS);
      statisticsComponent.hide();
      boardController.createTask();
      boardController.show();
      break;
    case MenuItem.STATISTICS:
      boardController.hide();
      statisticsComponent.show();
      break;
    case MenuItem.TASKS:
      statisticsComponent.hide();
      boardController.show();
      break;
  }
});
