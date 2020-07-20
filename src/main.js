// VARIABLE DECLARATION

let counter = 0;
let itemArray = [];

const prioritySelector = document.querySelector("#prioritySelector");
const textInput = document.querySelector("#textInput");
const viewSection = document.querySelector("#view-section");
const searchBox = document.querySelector("#filter");
const counterElem = document.querySelector("#counter");
const games = document.querySelector("#games");
const color = document.querySelector("#color");

counterElem.innerText = counter;

// FUNCTION

//ADD TASK
function addTask(e) {
  if (itemArray.length < 5 && textInput.value !== "") {
    // games.classList.add("color-pick");
    // color.classList.add("color-div");
    if (priorityCheck(prioritySelector.value)) {
      let sql = new Date();
      let date = dateLikeWeNeed(sql);
      let newTask = textInput.value;
      let priorityOfItem = prioritySelector.value;
      console.log(priorityOfItem);
      // CREATE A NEW DIVES

      let todoContainer = document.createElement("div");
      //todoContainer.id = priorityOfItem + "-div";
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

      // CREATING DELETE BUTTON

      let deleteButton = document.createElement("button");
      deleteButton.classList.add("delete");
      deleteButton.innerText = "X";
      deleteButton.addEventListener("click", deleteTask);

      //APPEND TO CONTAINER

      todoContainer.appendChild(deleteButton);

      // ADD PRIORITY
      itemArray.push(todoContainer);

      viewSection.appendChild(todoContainer);

      // ADDING TO COUNTER

      counter++;
      counterElem.innerText = counter;

      // CLEANING TASK

      textInput.value = "";

      // CLEANNIG PRIORITY

      arrange(priorityOfItem);
    } else {
      alert("You already have a task with that priority");
    }
  } else if (counterElem.textContent === "5") {
    alert("You Need To come Down, To much Tasks");
  }
}

function sortElem(itemArray) {
  itemArray.sort((a, b) => {
    return parseInt(a.firstChild.id) - parseInt(b.firstChild.id);
  });

  return itemArray.reverse();
}

// CHANGE DISPLAY

function displayByNumber(e) {
  itemArray = sortElem(itemArray);
  viewSection.innerHTML = `<h4 id="task-head">Your Tasks</h4>`;
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

// PRIORITY FUNC - CHECK

function priorityCheck(value) {
  for (let i = 0; i < itemArray.length; i++) {
    if (value === itemArray[i].firstChild.id) {
      return false;
    }
  }
  return true;
}
// PRIORITY - ARRANGE

function arrange(pri) {
  let arr = [];
  let newOption = document.createElement("option");
  let options = document.querySelectorAll("option");
  options = Array.from(options);

  // DILL WITH EDGE CASES - IF WE PICK THE GREATEST ONE
  let theLast = options[options.length - 1];

  let isLast = theLast.value === pri;

  if (isLast) options.length--;
  // DEALING WITH NORMAL CASES
  else {
    for (let i = 0; i < options.length; i++) {
      if (pri === options[i].value) {
        options.splice(i, 1);
      }
    }
  }
  options.forEach((element) => {
    arr.push(parseInt(element.value)); // to find the biggest priority possible
  });

  prioritySelector.innerHTML = "";
  options.forEach((element) => {
    prioritySelector.appendChild(element);
  });
  // ADDING ANOTHER OPTION TO LIST
  if (isLast) {
    var newText = Math.max.apply(Math, arr) + 2;
  } else {
    var newText = Math.max.apply(Math, arr) + 1;
  }

  newOption.innerText = newText.toString();
  newOption.value = newText.toString();
  options.push(newOption);
  prioritySelector.appendChild(newOption);
}

// PRIORITY DELETE
function returningToLastPoint(num, options) {
  let newOption = document.createElement("option");

  newOption.value = num;
  newOption.innerHTML = `${num}`;
  options = Array.from(options);
  options.push(newOption);
  //   options.forEach((element) => {
  //     console.log(element);
  //   });
  option = options.sort((a, b) => {
    console.log(a.textContent);
    return parseInt(a.textContent) - parseInt(b.textContent);
  });
  options.forEach((element) => {
    console.log(element);
  });

  options.pop();

  prioritySelector.innerHTML = "";
  for (let i = 0; i < options.length; i++) {
    prioritySelector.appendChild(options[i]);
  }
}

// DATE FUNC

function dateLikeWeNeed(sql) {
  let date = `${sql.getFullYear()}-${sql.getMonth()}-${sql.getDate()} ${sql.getHours()}:${sql.getMinutes()}:${sql.getSeconds()}`;
  return date;
}

// DELETE TASK FUNC

function deleteTask(e) {
  counter--;
  counterElem.innerText = counter;

  // REMOVE FROM ARRAY

  itemArray = itemArray.filter((task) => task !== e.target.parentElement);

  //REMOVE TASK FROM DOC

  //PRIORUTY
  let parent = e.target.parentElement;
  e.target.parentElement.remove();
  let options = document.querySelectorAll("option");
  returningToLastPoint(parseInt(parent.firstChild.id), options);
}

// MISSION COLOR

function missionColor(e) {
  let red = e.offsetY;
  let blue = e.offsetX;
  color.style.backgroundColor = `rgb(${red},${blue},40)`;
}

// PICK COLOR

function pickColor(e) {
  e.target.style.backgroundColor = `rgb(${e.offsetX},${e.offsetX},40)`;
  //div.style.backgroundColor = e.target.style.backgroundColor;
}

//EVENTS LISTENERS

document.querySelector("#addButton").addEventListener("click", addTask);
document.querySelector("#addButton").addEventListener("enter", addTask);
document
  .querySelector("#sortButton")
  .addEventListener("click", displayByNumber);
searchBox.addEventListener("keyup", filterItems);
color.addEventListener("mousemove", missionColor);
color.addEventListener("click", pickColor);

//   for (let i = itemArray.length - 1; i >= 0; i--) {
//     for (let j = 0; j < i; j++) {
//       if (
//         parseInt(itemArray[j].firstChild.id) > // FIRST CHILD - PRIORITY
//         parseInt(itemArray[j + 1].firstChild.id)
//       ) {
//         let temp = itemArray[j];
//         itemArray[j] = itemArray[j + 1];
//         itemArray[j + 1] = temp;
//       }
//     }
//   }

//COLOR PICKING

//   color.addEventListener("enter", pickColor);
//   todoContainer.style.backgroundColor = color.style.backgroundColor;
// APPEND TO DOM
//   color.addEventListener("click", () => {
//     let currentDiv = document.getElementById(priorityOfItem + "-div");
//     currentDiv.style.backgroundColor = color.style.backgroundColor;
//     color.classList.remove("color-div");
//     games.classList.remove("color-pick");
//   });
