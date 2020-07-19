// VARIABLE DECLARATION

let itemArray = [];
const prioritySelector = document.querySelector("#prioritySelector");
const textInput = document.querySelector("#textInput");
const viewSection = document.querySelector("#view-section");
const taskNum = document.querySelector("#tasks-number");

// FUNCTION

//ADD TASK
function addTask(e) {
  if (itemArray.length < 5) {
    let sql = new Date();
    let date = dateLikeWeNeed(sql);
    let newTask = textInput.value;
    let priorityOfItem = prioritySelector.value;
    // CREATE A NEW DIV WITH ALL THE ELEMENTS AND CLASSES

    let containerDiv = document.createElement("div");
    let taskText = document.createElement("div");
    let createdAt = document.createElement("div");
    let priority = document.createElement("div");

    containerDiv.className = "todoContainer";
    taskText.className = "todoText";
    createdAt.className = "todoCreatedAt";
    priority.className = "priority";
    priority.id = prioritySelector.value;
    //console.log(priority);

    //APPEND

    priority.innerText = priorityOfItem;
    createdAt.innerText = date;
    taskText.innerText = newTask;
    containerDiv.appendChild(taskText);
    containerDiv.appendChild(createdAt);
    containerDiv.appendChild(priority);

    viewSection.appendChild(containerDiv);

    itemArray.push(containerDiv);

    taskNum.innerText = `${itemArray.length} TODOs`;

    //priorityCheck(prioritySelector.value);
  } else {
    alert("You Need To come Down, To much Tasks");
  }
  textInput.value = "";
}
// SORT

function sort(itemArray) {
  for (let i = itemArray.length - 1; i >= 0; i--) {
    //console.log(itemArray[i]);
    for (let j = 0; j < i; j++) {
      if (
        parseInt(itemArray[j].lastChild.id) >
        parseInt(itemArray[j + 1].lastChild.id)
      ) {
        let temp = itemArray[j];
        itemArray[j] = itemArray[j + 1];
        itemArray[j + 1] = temp;
      }
    }
  }
  return itemArray;
}

// CHANGE DISPLAY

function displayByNumber(e) {
  itemArray = sort(itemArray);
  viewSection.innerHTML = "Your Tasks";
  for (let i = 0; i < itemArray.length; i++) {
    viewSection.appendChild(itemArray[i]);
  }
}

//"HELP" FUNCTION (REMEMBER PRIORITY SELECTOR)

function priorityCheck(value) {
  document.getElementById(`${value}`).style.display = "none";
}

function dateLikeWeNeed(sql) {
  let date = `${sql.getFullYear()}-${sql.getMonth()}-${sql.getDate()} ${sql.getHours()}:${sql.getMinutes()}:${sql.getSeconds()}`;
  return date;
}

//EVENTS LISTENERS

document.querySelector("#addButton").addEventListener("click", addTask);
document
  .querySelector("#sort-button")
  .addEventListener("click", displayByNumber);
