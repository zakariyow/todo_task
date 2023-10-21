const fs = require('fs');

 
function loadTodoList() {
  try {
    const data = fs.readFileSync('todo.txt', 'utf8');
    return JSON.parse(data);
  } catch (error) {
     
    return [];
  }
}


function saveTodoList(todoList) {
  fs.writeFileSync('todo.txt', JSON.stringify(todoList));
}


function addTask(task) {
  const todoList = loadTodoList();
  todoList.push({ task, completed: false });
  saveTodoList(todoList);
}


function updateTask(index, newTask) {
  const todoList = loadTodoList();
  if (index >= 0 && index < todoList.length) {
    todoList[index].task = newTask;
    saveTodoList(todoList);
  }
}


function deleteTask(index) {
  const todoList = loadTodoList();
  if (index >= 0 && index < todoList.length) {
    todoList.splice(index, 1);
    saveTodoList(todoList);
  }
}

module.exports = { addTask, updateTask, deleteTask, loadTodoList };