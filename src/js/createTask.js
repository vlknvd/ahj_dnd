export default function createTask(item) {
  const addingCard = document.createElement('div');
  addingCard.classList.add('add_card_container');

  const textarea = document.createElement('textarea');
  textarea.classList.add('textarea');
  textarea.placeholder = 'Введите задание...';

  const buttonAdd = document.createElement('button');
  buttonAdd.classList.add('button_add');
  buttonAdd.textContent = 'Добавить';

  const buttonClose = document.createElement('button');
  buttonClose.classList.add('button_close');

  addingCard.append(textarea, buttonAdd, buttonClose);
  item.closest('.card_item').append(addingCard);

  const closedCreateTask = () => {
    addingCard.closest('.card_item').appendChild(item);
    addingCard.remove(addingCard);
  };

  buttonClose.addEventListener('click', closedCreateTask);

  buttonAdd.addEventListener('click', () => {
    const newTask = document.createElement('div');
    newTask.classList.add('task');

    addingCard.closest('.card_item').appendChild(newTask);

    const taskText = document.createElement('p');
    taskText.classList.add('task_text');
    taskText.textContent = textarea.value;

    const taskDelete = document.createElement('button');
    taskDelete.classList.add('button_close');

    newTask.append(taskText, taskDelete);

    closedCreateTask();
  });
}
