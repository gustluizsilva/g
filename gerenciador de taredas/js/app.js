document.addEventListener("DOMContentLoaded", function() {
  // Armazena as tarefas
  var tasks = [];
  var completedTasks = [];

  // Referências aos elementos HTML
  var taskContainer = document.getElementById("tasksContainer");
  var completedTasksContainer = document.getElementById("completedTasksContainer");
  var taskNameInput = document.getElementById("taskName");
  var createButton = document.getElementById("createButton");
  var darkModeButton = document.getElementById("darkModeButton");

  // Função para atualizar o texto do botão de modo escuro
function updateDarkModeButton() {
  var isDarkMode = document.body.classList.contains("dark-mode");
  darkModeButton.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

  // Cria uma nova tarefa
  function createTask(name) {
    var task = {
      id: Date.now().toString(),
      name: name,
      startTime: null,
      elapsedTime: 0,
      timerInterval: null,
      element: null
    };

    tasks.push(task);
    renderTask(task);
  }

  // Renderiza uma tarefa na lista
  function renderTask(task) {
    var taskItem = document.createElement("div");
    taskItem.setAttribute("id", task.id);
    taskItem.className = "task";

    var taskName = document.createElement("span");
    taskName.className = "name";
    taskName.textContent = task.name;

    var taskTime = document.createElement("span");
    taskTime.className = "time";
    taskTime.textContent = task.elapsedTime + " seconds";

    var taskActions = document.createElement("span");
    taskActions.className = "actions";

    var startButton = document.createElement("button");
    startButton.innerHTML = '<i class="fas fa-play"></i>';
    startButton.addEventListener("click", function() {
      startTaskTimer(task);
    });

    var stopButton = document.createElement("button");
    stopButton.innerHTML = '<i class="fas fa-pause"></i>';
    stopButton.addEventListener("click", function() {
      stopTaskTimer(task);
    });

    var completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.addEventListener("click", function() {
      completeTask(task);
    });

    taskActions.appendChild(startButton);
    taskActions.appendChild(stopButton);
    taskActions.appendChild(completeButton);

    taskItem.appendChild(taskName);
    taskItem.appendChild(taskTime);
    taskItem.appendChild(taskActions);
    taskContainer.appendChild(taskItem);

    task.element = taskItem;
  }

  // Atualiza o tempo de uma tarefa na interface do usuário
  function updateTaskTime(task) {
    task.element.querySelector(".time").textContent = task.elapsedTime + " seconds";
  }

  // Inicia o temporizador de uma tarefa
  function startTaskTimer(task) {
    if (task.startTime === null) {
      task.startTime = Date.now();

      task.timerInterval = setInterval(function() {
        task.elapsedTime = Math.floor((Date.now() - task.startTime) / 1000);
        updateTaskTime(task);
      }, 1000);
    }
  }

  // Para o temporizador de uma tarefa
  function stopTaskTimer(task) {
    if (task.startTime !== null) {
      clearInterval(task.timerInterval);
      task.startTime = null;
    }
  }

  // Completa uma tarefa
  function completeTask(task) {
    stopTaskTimer(task);
    task.element.remove();

    var taskIndex = tasks.indexOf(task);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
    }

    completedTasks.push(task);
    renderCompletedTask(task);
  }

  // Renderiza uma tarefa concluída na lista
  function renderCompletedTask(task) {
    var completedTaskItem = document.createElement("div");
    completedTaskItem.setAttribute("id", task.id);
    completedTaskItem.className = "task";

    var completedTaskName = document.createElement("span");
    completedTaskName.className = "name";
    completedTaskName.textContent = task.name;

    var completedTaskTime = document.createElement("span");
    completedTaskTime.className = "time";
    completedTaskTime.textContent = task.elapsedTime + " seconds";

    completedTaskItem.appendChild(completedTaskName);
    completedTaskItem.appendChild(completedTaskTime);
    completedTasksContainer.appendChild(completedTaskItem);
  }

  // Manipulador de evento para o botão de criação de tarefa
  createButton.addEventListener("click", function(event) {
    event.preventDefault();
    var taskName = taskNameInput.value.trim();
    if (taskName !== "") {
      createTask(taskName);
      taskNameInput.value = "";
    }
  });

  // Manipulador de evento para pressionar a tecla "Enter" no campo de entrada da tarefa
  taskNameInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      createButton.click();
    }
  });

  // Manipulador de evento para alternar o modo escuro
  darkModeButton.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    updateDarkModeButton();
  });

  // Função para atualizar o texto do botão de modo escuro
  function updateDarkModeButton() {
    var isDarkMode = document.body.classList.contains("dark-mode");
    darkModeButton.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  }

  // Inicializar Sortable
  var taskList = document.getElementById("taskList");
  new Sortable(taskList, {
    animation: 150, // Velocidade da animação em milissegundos
    ghostClass: "sortable-ghost", // Classe CSS do item arrastado
  });

  // Atualizar o botão do modo escuro ao carregar a página
  updateDarkModeButton();
});
