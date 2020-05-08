// Библиотеки
import moment from "moment";

// Формат времени
export const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

// Формат даты
export const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
};

// Повторяющаяся задача
export const isRepeating = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean);
};

// Просроченная задача
export const isOverdueDate = (dueDate, date) => {
  return dueDate < date && !isOneDay(date, dueDate);
};

// Задача на сегодня
export const isOneDay = (dateA, dateB) => {
  const a = moment(dateA);
  const b = moment(dateB);
  return a.diff(b, `days`) === 0 && dateA.getDate() === dateB.getDate();
};
