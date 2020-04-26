// Позиции для отрисовки
export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

// Создание DOM-элемента
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

// Отрисовка DOM-элемента
export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

// Замена DOM-элемента
export const replace = (parent, newElement, oldElement) => {
  parent.replaceChild(newElement, oldElement);
};

// Удаление DOM-элемента
export const remove = (element) => {
  element.remove();
};
