// VARIABLE DECLARATION

const itemArray = [];
const prioritySelector = document.querySelector("#prioritySelector");
const textInput = document.querySelector("#textInput");
const viewSection = document.querySelector("#view-section");

// FUNCTION

function addTask(e) {
  if (itemArray.length < 5) {
    let sql = new Date();
    let newTask = textInput.value;
    console.log(newTask);
    let priorityOfItem = priorityCheck(prioritySelector.value);

    // CREATE A NEW DIV WITH ALL THE ELEMENTS AND CLASSES

    let containerDiv = document.createElement("div");
    let taskText = document.createElement("div");
    let createdAt = document.createElement("div");
    let priority = document.createElement("div");

    containerDiv.className = "todoContainer";
    taskText.className = "todoText";
    createdAt.className = "todoCreatedAt";
    priority.className = "priority";

    //APPEND

    priority.innerText = priorityOfItem;
    createdAt.innerText = sql;
    taskText.innerText = newTask;
    containerDiv.appendChild(taskText);
    containerDiv.appendChild(createdAt);
    containerDiv.appendChild(priority);

    viewSection.appendChild(containerDiv);
  }
}

//HELP FUNCTION (REMEMBER PRIORITY SELECTOR)

function priorityCheck(num) {
  return 1;
}

//EVENTS LISTENERS

document.querySelector("#addButton").addEventListener("click", addTask);
