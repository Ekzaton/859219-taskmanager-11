// Модели
import Task from "../models/task";

// Библиотеки
import {nanoid} from "nanoid";

// Проверка доступности интернета
const isOnline = () => {
  return window.navigator.onLine;
};

// Класс
export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getTasks() {
    if (isOnline()) {
      return this._api.getTasks()
        .then((tasks) => {
          const items = tasks.reduce((acc, current) => {
            return Object.assign({}, acc, {
              [current.id]: current,
            });
          }, {});

          this._store.setItems(items);

          return tasks;
        });
    }

    const storeTasks = Object.values(this._store.getItems());

    return Promise.resolve(Task.parseTasks(storeTasks));
  }

  createTask(task) {
    if (isOnline()) {
      return this._api.createTask(task)
        .then((newTask) => {
          this._store.setItem(newTask.id, newTask.toRAW());

          return newTask;
        });
    }

    const localNewTaskId = nanoid();
    const localNewTask = Task.clone(Object.assign(task, {id: localNewTaskId}));

    this._store.setItem(localNewTask.id, localNewTask.toRAW());

    return Promise.resolve(localNewTask);
  }

  updateTask(id, task) {
    if (isOnline()) {
      return this._api.updateTask(id, task)
        .then((newTask) => {
          this._store.setItem(newTask.id, newTask.toRAW());

          return newTask;
        });
    }

    const localTask = Task.clone(Object.assign(task, {id}));

    this._store.setItem(id, localTask.toRAW());

    return Promise.resolve(localTask);
  }

  deleteTask(id) {
    if (isOnline()) {
      return this._api.deleteTask(id)
        .then(() => this._store.removeItem(id));
    }

    this._store.removeItem(id);

    return Promise.resolve();
  }
}
