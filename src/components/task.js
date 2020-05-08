// Компоненты
import AbstractComponent from "./abstract-component.js";

// Утилиты
import {formatTime, formatDate, isOverdueDate} from "../utils/common.js";

// Библиотеки
import {encode} from "he";

// Разметка кнопки
const createButtonMarkup = (name, isActive = true) => {
  return (
    `<button
      type="button"
      class="card__btn card__btn--${name} ${isActive ? `` : `card__btn--disabled`}"
    >
      ${name}
    </button>`
  );
};

// Шаблон карточки задачи
const createTaskTemplate = (task) => {
  const {description: notSanitizedDescription, dueDate, color, repeatingDays} = task;

  const isExpired = dueDate instanceof Date && isOverdueDate(dueDate, new Date());
  const isDateShowing = !!dueDate;

  const date = isDateShowing ? formatDate(dueDate) : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;
  const description = encode(notSanitizedDescription);

  const editButton = createButtonMarkup(`edit`);
  const archiveButton = createButtonMarkup(`archive`, !task.isArchive);
  const favoritesButton = createButtonMarkup(`favorites`, !task.isFavorite);

  const repeatClass = Object.values(repeatingDays).some(Boolean) ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  return (
    `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            ${editButton}
            ${archiveButton}
            ${favoritesButton}
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${date}</span>
                    <span class="card__time">${time}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};

// Класс
export default class Task extends AbstractComponent {
  constructor(task) {
    super();
    this._task = task;
  }

  getTemplate() {
    return createTaskTemplate(this._task);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.card__btn--edit`)
      .addEventListener(`click`, handler);
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.card__btn--favorites`)
      .addEventListener(`click`, handler);
  }

  setArchiveButtonClickHandler(handler) {
    this.getElement().querySelector(`.card__btn--archive`)
      .addEventListener(`click`, handler);
  }
}
