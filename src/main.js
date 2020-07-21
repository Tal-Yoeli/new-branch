// VARIABLE DECLARATION

let counter = 0;
let itemArray = [];
let doneCounter = 0;

const prioritySelector = document.querySelector("#prioritySelector");
const textInput = document.querySelector("#textInput");
const viewSection = document.querySelector("#view-section");
const searchBox = document.querySelector("#filter");
const counterElem = document.querySelector("#counter");
const games = document.querySelector("#games");
const color = document.querySelector("#color");
const doneSpan = document.querySelector("#done");

counterElem.innerText = counter;

// FUNCTION

//ADD TASK
function addTask(e) {
  if (textInput.value !== "") {
    if (priorityCheck(prioritySelector.value)) {
      let sql = new Date();
      let date = dateLikeWeNeed(sql);
      let newTask = textInput.value;
      let priorityOfItem = prioritySelector.value;
      // CREATE A NEW DIVES

      let todoContainer = document.createElement("div");
      todoContainer.id = priorityOfItem + "-div";
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

      // CREATING COLOR BUTTON

      let colorButton = document.createElement("button");
      colorButton.classList.add("color-button");
      colorButton.innerText = "Color";
      colorButton.addEventListener("click", addColor);

      // CREATING DON BUTTON

      let done = document.createElement("button");
      done.classList.add("done");
      done.innerText = "V";
      done.addEventListener("click", taskDone);

      //APPEND TO CONTAINER

      todoContainer.appendChild(done);
      todoContainer.appendChild(deleteButton);
      todoContainer.appendChild(colorButton);

      // ADD PRIORITY
      itemArray.push(todoContainer);

      viewSection.appendChild(todoContainer);

      // ADDING TO COUNTER

      // ADDING TO LOCAL STORAGE
      let id = prioritySelector.value;
      localStorage.setItem(`priority ${id}`, id);
      localStorage.setItem(`date ${id}`, date);
      localStorage.setItem(`task ${id}`, newTask);

      counter++;
      counterElem.innerText = counter;

      // CLEANING TASK

      textInput.value = "";

      // CLEANNIG PRIORITY

      arrange(priorityOfItem);
    } else alert("You already have a task with that priority");
  }
}

function sortElem(itemArray) {
  itemArray.sort((a, b) => {
    return parseInt(b.firstChild.id) - parseInt(a.firstChild.id);
  });

  return itemArray;
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
  // Get all the items
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

  // DILL WITH EDGE CASES - IF WE PICK THE BIGGEST ONE
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

  //ADD NEW ELEM TO ARRAY
  options = Array.from(options);
  options.push(newOption);

  //SORT ARRAY BY SIZE
  option = options.sort((a, b) => {
    return parseInt(a.textContent) - parseInt(b.textContent);
  });

  //GET READ OF BIGGEST
  options.pop();

  //ADD TO DOM
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
  if (counter > 0 && !e.target.parentElement.classList.contains("task-done")) {
    counter--;
    counterElem.innerText = counter;
  }

  // REMOVE FROM ARRAY

  itemArray = itemArray.filter((task) => task !== e.target.parentElement);

  //REMOVE TASK FROM DOC

  // ADD PRIORITY BACK TO OPTIONS
  let parent = e.target.parentElement;
  e.target.parentElement.remove();
  let options = document.querySelectorAll("option");
  returningToLastPoint(parseInt(parent.firstChild.id), options);
}

// MISSION COLOR

function missionColor(e) {
  let yellow = e.offsetY;
  let blue = e.offsetX;
  color.style.backgroundColor = `rgb(40,${blue},${yellow})`;
}

// PICK COLOR

function pickColor(e) {
  e.target.style.backgroundColor = `rgb(${e.offsetX},${e.offsetX},40)`;
}

function addColor(e) {
  games.classList.add("color-pick");
  color.classList.add("color-div");
  color.innerText = "Pick A Color";
  let div = e.target.parentElement;
  color.addEventListener("mousemove", missionColor);
  color.addEventListener("click", (e) => {
    if (div) {
      div.style.backgroundColor = `rgb(40,${e.offsetX},${e.offsetY})`;
      games.classList.remove("color-pick");
      color.classList.remove("color-div");
      color.innerHTML = "";
    }
    div = "";
  });
}

// MISSION DONE

function taskDone(e) {
  e.target.parentElement.classList.add("task-done");
  e.target.parentElement.children[2].innerText += " (DONE!)";
  //e.target.parentElement.children[2].style.fontSize = "15px";
  e.target.style.display = "none";
  e.target.parentElement.children[5].style.display = "none";
  counter--;
  counterElem.innerHTML = counter;
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

// LOCAL STORAGE

// function addFromLocalStorage() {
//   let divToLocalStorage = document.createElement("div");
//   divToLocalStorage.classList.add("todoContainer");
//   for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i);
//     const value = localStorage.getItem(key);
//     let divToAdd = document.createElement("div");
//     for (let j = 0; j < 11; j++) {
//       if (key == "Apriority " + `${j}`) {
//         divToAdd.classList.add("todoPriority");
//         console.log(divToAdd.classList);
//       }
//       if (key == "Adate " + `${j}`) {
//         divToAdd.classList.add("todoCreatedAt");
//       }
//       if (key == "task " + `${j}`) {
//         divToAdd.classList.add("todoText");
//       }
//     }
//     divToAdd.innerText = value;
//     divToLocalStorage.appendChild(divToAdd);
//   }
//   viewSection.appendChild(divToLocalStorage);
// }
