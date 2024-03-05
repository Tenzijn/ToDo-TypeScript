import { v4 as uuidv4 } from 'uuid';

import './style.css';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.querySelector<HTMLFormElement>('#new-task-form');
const input = document.querySelector<HTMLInputElement>('#new-task-title');

const tasks: Task[] = loadTasks() || [];
tasks.forEach(addListItem);

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (input?.value == '' || input?.value == null) return;

  const newTask: Task = {
    id: uuidv4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  saveTasks();
  addListItem(newTask);
});

function addListItem(task: Task): void {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');

  const title = task.title;
  const formattedTitle =
    title.charAt(0).toUpperCase() + title.slice(1).toLowerCase() + '.';
  task.title = formattedTitle;

  if (task.completed) {
    label.classList.add('strike-through');
  }

  checkbox.addEventListener('change', (event) => {
    task.completed = checkbox.checked;
    saveTasks();
    label.classList.toggle('strike-through');
  });
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

function saveTasks(): void {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(): Task[] | void {
  const tasksString = localStorage.getItem('tasks');
  if (tasksString == null) return;
  return JSON.parse(tasksString);
}

input?.addEventListener('focus', () => {
  input.value = '';
});

loadTasks();
