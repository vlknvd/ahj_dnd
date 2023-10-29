export default class Draw {
  constructor() {
    this.cardTodo = document.querySelector('.todo');
    this.cardInProgress = document.querySelector('.in_progress');
    this.cardDone = document.querySelector('.done');
  }

  static renderingTextTask(card, text) {
    const containerTask = document.createElement('div');
    const textTask = document.createElement('p');

    containerTask.classList.add('task');
    textTask.classList.add('task_text');

    textTask.textContent = text;

    card.querySelector('.btn').parentNode.insertBefore(containerTask, card.querySelector('.btn'));
    containerTask.prepend(textTask);
  }

  actionStorage(data) {
    data.toDo.forEach((element) => {
      Draw.renderingTextTask(this.cardTodo, element);
    });
    data.inProgress.forEach((element) => {
      Draw.renderingTextTask(this.cardInProgress, element);
    });
    data.done.forEach((element) => {
      Draw.renderingTextTask(this.cardDone, element);
    });
  }
}
