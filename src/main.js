// VARIABLE DECLARATION
let counter = 0;
let itemArray = [];
const prioritySelector = document.querySelector("#prioritySelector");
const textInput = document.querySelector("#textInput");
const viewSection = document.querySelector("#view-section");
const taskNum = document.querySelector("#tasks-number");
const list = document.querySelector("#item-list");

// FUNCTION

//ADD TASK
function addTask(e) {
  if (itemArray.length < 5) {
    let sql = new Date();
    let date = dateLikeWeNeed(sql);
    let newTask = textInput.value;
    let priorityOfItem = prioritySelector.value;
    // CREATE A NEW DIV WITH ALL THE ELEMENTS AND CLASSES

    let bullet = document.createElement("li");
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
    containerDiv.appendChild(priority);
    containerDiv.appendChild(createdAt);
    containerDiv.appendChild(taskText);

    itemArray.push(containerDiv);

    bullet.appendChild(containerDiv);
    list.appendChild(bullet);

    taskNum.innerText = `${itemArray.length}`;

    //priorityCheck(prioritySelector.value);
  } else {
    alert("You Need To come Down, To much Tasks");
  }
  textInput.value = "";
}
// SORT BY ID

function sort(itemArray) {
  for (let i = itemArray.length - 1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (
        parseInt(itemArray[j].firstChild.id) > // FIRST CHILD - PRIORITY
        parseInt(itemArray[j + 1].firstChild.id)
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
  list.innerText = "";
  for (let i = 0; i < itemArray.length; i++) {
    let bullet = document.createElement("li");
    bullet.appendChild(itemArray[i]);
    list.appendChild(bullet);
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
