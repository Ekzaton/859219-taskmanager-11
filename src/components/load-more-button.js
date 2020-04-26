// Импорт
import AbstractComponent from "./abstract-component.js";

// Шаблон кнопки «Load more»
const createLoadMoreButtonTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

// Класс
export default class LoadMoreButton extends AbstractComponent {
  getTemplate() {
    return createLoadMoreButtonTemplate();
  }
}
