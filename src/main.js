// Компоненты
import {createBoardTemplate} from "./components/board.js";
import {createFilterTemplate} from "./components/filter.js";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createTaskEditTemplate} from "./components/task-edit.js";
import {createTaskTemplate} from "./components/task.js";

// Моки
import {generateFilters} from "./mock/filter.js";
import {generateTasks} from "./mock/task.js";

// Константы
const TASK_COUNT = 20;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

// Отрисовка шаблона
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

// Отрисовка меню, фильтров и сортировки
render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createFilterTemplate(filters), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
const boardElement = siteMainElement.querySelector(`.board`);

// Отрисовка формы
render(taskListElement, createTaskEditTemplate(tasks[0]), `beforeend`);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

// Отрисовка карточек
tasks.slice(1, showingTasksCount)
  .forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

// Отрисовка кнопки
render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);

const loadMoreButton = boardElement.querySelector(`.load-more`);

// Обработчик для кнопки
loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
