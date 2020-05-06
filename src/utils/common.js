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
