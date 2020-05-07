// Компоненты
import BoardComponent from "./components/board.js";
import BoardController from "./controllers/board.js";
import FilterComponent from "./components/filter.js";
import SiteMenuComponent from "./components/site-menu.js";

// Утилиты
import {render, RenderPosition} from "./utils/render.js";

// Моки
import {generateFilters} from "./mock/filter.js";
import {generateTasks} from "./mock/task.js";

// Модели данных
import TasksModel from "./models/tasks.js";

// Константы
const TASK_COUNT = 20;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

// Отрисовка меню и фильтров
render(siteHeaderElement, new SiteMenuComponent(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel);

// Ортрисовка доски задач
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
boardController.render(tasks);
