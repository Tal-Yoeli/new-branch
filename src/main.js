// VARIABLE DECLARATION

let counter = 0;
let itemArray = [];

const prioritySelector = document.querySelector("#prioritySelector");
const textInput = document.querySelector("#textInput");
const viewSection = document.querySelector("#view-section");
const searchBox = document.querySelector("#filter");
const counterElem = document.querySelector("#counter");
const games = document.querySelector("#games");

counterElem.innerText = counter;

// FUNCTION

//ADD TASK
function addTask(e) {
  if (itemArray.length < 5 && textInput.value !== "") {
    console.log(typeof prioritySelector.value);
    if (priorityCheck(prioritySelector.value)) {
      let sql = new Date();
      let date = dateLikeWeNeed(sql);
      let newTask = textInput.value;
      let priorityOfItem = prioritySelector.value;
      // CREATE A NEW DIVES

      let todoContainer = document.createElement("div");
      todoContainer.classList.add("todoContainer");
      todoContainer.innerHTML = `<div class="todoPriority" id="${priorityOfItem}">
              ${priorityOfItem}
              </div>
              <div class="todoCreatedAt">
                ${date}
                </div>
            <div class="todoText">
              ${newTask}
              </div>`;

      //    let checkbox = document.createElement("input");
      itemArray.push(todoContainer);
      viewSection.appendChild(todoContainer);

      counter++;

      counterElem.innerText = counter;
    } else {
      alert("You already have a task with that priority");
    }
  } else if (taskNum.textContent === "5") {
    alert("You Need To come Down, To much Tasks");
  }
  textInput.value = "";
}

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
  return itemArray.reverse();
}

// CHANGE DISPLAY

function displayByNumber(e) {
  itemArray = sort(itemArray);
  viewSection.innerText = "Your Tasks";
  for (let i = 0; i < itemArray.length; i++) {
    viewSection.appendChild(itemArray[i]);
  }
}

// SEARCH

function filterItems(e) {
  // convert text to lowercase
  let text = e.target.value.toLowerCase();
  // Get lis
  let items = document.getElementsByClassName("todoText");

  // Convert to an array
  let arr = Array.from(items);
  for (let i = 0; i < arr.length; i++) {
    let itemName = arr[i].textContent;
    if (itemName.toLowerCase().indexOf(text) !== -1) {
      arr[i].parentElement.style.display = "block";
    } else {
      arr[i].parentElement.style.display = "none";
    }
  }
}

//"HELP" FUNCTION (REMEMBER PRIORITY SELECTOR)

function priorityCheck(value) {
  for (let i = 0; i < itemArray.length; i++) {
    if (value === itemArray[i].firstChild.id) {
      return false;
    }
  }
  return true;
}

function dateLikeWeNeed(sql) {
  let date = `${sql.getFullYear()}-${sql.getMonth()}-${sql.getDate()} ${sql.getHours()}:${sql.getMinutes()}:${sql.getSeconds()}`;
  return date;
}
function replace(arr, obj) {
  let num = parseInt(prioritySelector.value);
  let sorted = sort(arr);
  sorted.splice(num - 1, obj);

  return sorted;
}

//EVENTS LISTENERS

document.querySelector("#addButton").addEventListener("click", addTask);
document
  .querySelector("#sortButton")
  .addEventListener("click", displayByNumber);
searchBox.addEventListener("keyup", filterItems);
