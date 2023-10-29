import createTask from './createTask';
import Storage from './storage';
import Draw from './draw';

const storage = new Storage();
const draw = new Draw();
const loadData = storage.load();
const dataTask = {};

if (loadData === null || loadData.toDo === undefined) {
  storage.load();
} else {
  draw.actionStorage(loadData);
}

const saveStorage = document.querySelector('.save_button');
const resetStorage = document.querySelector('.reset_button');

resetStorage.addEventListener('click', () => {
  Array.from(document.querySelectorAll('.task')).forEach((item) => {
    item.remove();
  });
  storage.remove();
});

saveStorage.addEventListener('click', () => {
  const cardTodo = Array.from(document.querySelector('.todo').querySelectorAll('.task_text'));
  const cardInProgress = Array.from(document.querySelector('.in_progress').querySelectorAll('.task_text'));
  const cardDone = Array.from(document.querySelector('.done').querySelectorAll('.task_text'));
  dataTask.toDo = [];
  dataTask.inProgress = [];
  dataTask.done = [];
  cardTodo.forEach((item) => {
    dataTask.toDo.push(item.textContent);
  });
  cardInProgress.forEach((item) => {
    dataTask.inProgress.push(item.textContent);
  });
  cardDone.forEach((item) => {
    dataTask.done.push(item.textContent);
  });

  storage.save(dataTask);
});

const container = document.querySelector('.container');
let actualElement;

const btn = container.querySelectorAll('.btn');
btn.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    createTask(item);
    item.remove(item);
  });
});

function createShadowElement(element) {
  const div = document.createElement('div');
  const { width, height } = element.getBoundingClientRect();

  div.classList.add('shadow_element');

  div.style.width = `${width}px`;
  div.style.height = `${height}px`;
  return div;
}

const deletedTask = (e) => {
  const activeTask = e.target.closest('.task');
  if (activeTask) {
    const btnDelete = e.target.closest('.button_close');
    if (btnDelete) {
      btnDelete.addEventListener('click', () => {
        activeTask.remove();
      });
    }
  }
};

document.addEventListener('mousemove', deletedTask);

const onMouseMove = (evt) => {
  const { target } = evt;

  actualElement.style.top = `${evt.clientY - 20}px`;
  actualElement.style.left = `${evt.clientX - 50}px`;

  if (target.classList.contains('task') || target.classList.contains('card_tittle')) {
    const { y, height } = target.getBoundingClientRect();

    const shadowElement = createShadowElement(document.querySelector('.dragged'));
    let shadowZone;

    if ((y + height / 2) > evt.clientY && !target.classList.contains('card_tittle')) {
      if (document.querySelector('.shadow_element')) {
        document.querySelector('.shadow_element').remove();
      }
      shadowZone = evt.target.previousElementSibling.closest('.task') || evt.target.previousElementSibling.closest('.card_tittle');
      if (shadowZone) {
        shadowZone.insertAdjacentElement('afterend', shadowElement);
      }
    }
    if ((y + height / 2) < evt.clientY) {
      if (document.querySelector('.shadow_element')) {
        document.querySelector('.shadow_element').remove();
      }
      shadowZone = evt.target.nextElementSibling.closest('.task') || evt.target.nextElementSibling.closest('.btn');
      if (shadowZone) {
        shadowZone.insertAdjacentElement('beforebegin', shadowElement);
      }
    }
  }
};

const onMouseUp = (e) => {
  const mouseUpColomn = e.target.closest('.card_item');
  actualElement.style.top = null;
  actualElement.style.left = null;

  if (e.target.classList.contains('shadow_element')) {
    const shadowZone = mouseUpColomn.querySelector('.shadow_element');
    mouseUpColomn.insertBefore(actualElement, shadowZone);
  }

  actualElement.style.width = null;
  actualElement.style.height = null;

  actualElement.classList.remove('dragged');
  actualElement = undefined;

  if (document.querySelector('.shadow_element')) {
    document.querySelector('.shadow_element').remove();
  }

  document.documentElement.removeEventListener('mousemove', onMouseMove);
  document.documentElement.removeEventListener('mouseup', onMouseUp);
};

const columns = container.querySelectorAll('.card_item');
columns.forEach((col) => {
  col.addEventListener('mousedown', (e) => {
    if (e.target.closest('.task') && !e.target.closest('.button_close')) {
      e.preventDefault();
      actualElement = e.target.closest('.task');
      const { width, height } = actualElement.getBoundingClientRect();
      actualElement.classList.add('dragged');
      document.removeEventListener('mousemove', deletedTask);
      actualElement.style.top = null;
      actualElement.style.left = null;
      actualElement.style.width = `${width}px`;
      actualElement.style.height = `${height}px`;
      document.documentElement.addEventListener('mousemove', onMouseMove);
      document.documentElement.addEventListener('mouseup', onMouseUp);
    }
  });
});
