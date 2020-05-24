// Компоненты
import BoardComponent from "./components/board.js";
import SiteMenuComponent, {MenuItem} from "./components/site-menu.js";
import StatisticsComponent from "./components/statistics.js";

// Контроллеры
import BoardController from "./controllers/board.js";
import FilterController from "./controllers/filter.js";

// Утилиты
import {render, RenderPosition} from "./utils/render.js";

// Константы
const AUTHORIZATION = `Basic vi34jggjggxs60gkjpgke7`;

// API
import API from "./api.js";

// Модели данных
import TasksModel from "./models/tasks.js";

const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();
const api = new API(AUTHORIZATION);
const tasksModel = new TasksModel();

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
render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();

// Переключение пунктов меню
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

// Получение задач
api.getTasks()
  .then((tasks) => {
    tasksModel.setTasks(tasks);
    boardController.render();
  });
