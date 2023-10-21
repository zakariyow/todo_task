const readline = require('readline');
const { addTask, updateTask, deleteTask, loadTodoList } = require('./todo');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function printTodoList(todoList) {
  console.log('Todo List:');
  todoList.forEach((task, index) => {
    console.log(`${index + 1}. [${task.completed ? 'x' : ' '}] ${task.task}`);
  });
  console.log();
}

function promptAddTask() {
  rl.question('Enter a new task: ', (task) => {
    addTask(task);
    console.log('Task added successfully.');
    showMenu();
  });
}

function promptUpdateTask() {
  rl.question('Enter the task number to update: ', (index) => {
    const todoList = loadTodoList();
    if (index >= 1 && index <= todoList.length) {
      rl.question('Enter the new task: ', (newTask) => {
        updateTask(index - 1, newTask);
        console.log('Task updated successfully.');
        showMenu();
      });
    } else {
      console.log('Invalid task number.');
      showMenu();
    }
  });
}

function promptDeleteTask() {
  rl.question('Enter the task number to delete: ', (index) => {
    const todoList = loadTodoList();
    if (index >= 1 && index <= todoList.length) {
      deleteTask(index - 1);
      console.log('Task deleted successfully.');
      showMenu();
    } else {
      console.log('Invalid task number.');
      showMenu();
    }
  });
}

function showMenu() {
  console.log('Menu:');
  console.log('1. Add a new task');
  console.log('2. Update a task');
  console.log('3. Delete a task');
  console.log('4. Exit');
  console.log();

  rl.question('Enter your choice: ', (choice) => {
    switch (choice) {
      case '1':
        promptAddTask();
        break;
      case '2':
        promptUpdateTask();
        break;
      case '3':
        promptDeleteTask();
        break;
      case '4':
        rl.close();
        break;
      default:
        console.log('Invalid choice.');
        showMenu();
        break;
    }
  });
}

// Start the application
showMenu();