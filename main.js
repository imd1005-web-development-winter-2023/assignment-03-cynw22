const form = document.querySelector(".form1");
const todoTextFromForm = document.querySelector("#todo-item");

const todoList = document.querySelector(".todolist1");
// const todos = ["chips"];

// //keep track of item index
let oldindexarray = 0;
let newindexarray = 0;

let sortable = Sortable.create(todoList, // Element dragging ended
{onEnd: function (/**Event*/evt) {
  let itemEl = evt.item;  // dragged HTMLElement
  evt.to;    // target list
  evt.from;  // previous list
  evt.oldIndex;  // element's old index within old parent
  evt.newIndex;  // element's new index within new parent
  evt.oldDraggableIndex; // element's old index within old parent, only counting draggable elements
  evt.newDraggableIndex; // element's new index within new parent, only counting draggable elements
  evt.clone // the clone element
  evt.pullMode;  // when item is in another sortable: `"clone"` if cloning, `true` if moving
  console.log(evt); 
  //reorder array based on old index and new index
  let temp = todos[evt.newIndex]; //copy of newIndex
  todos[evt.newIndex] = todos[evt.oldIndex];
  todos[evt.oldIndex] = temp;
  console.log(todos);

  //put old index into the exterior
  oldindexarray = evt.oldIndex;
  //put new index into exterior
  newindexarray = evt.newIndex;
  console.log("old index: ", oldindexarray);  
  console.log("new index: ", newindexarray);

  switchIndex();
},

onRemove: function (/**Event*/evt) {
  // same properties as onEnd
  console.log("element removed", evt);
},

// Element is dropped into the list from another list
onAdd: function (/**Event*/evt) {
  // same properties as onEnd
  console.log("element added", evt);
},

//second list
}
);

function switchIndex() {
  console.log("NEW old index: ", oldindexarray);  
  console.log("NEW new index: ", newindexarray);
  
  //switch todo array values
 temp = todos[newindexarray];
 todos[newindexarray] = todos[oldindexarray];
 todos[oldindexarray] = temp;
  console.log("todos= ", todos);
}

let buttonsArray = [];


////////////////////////////////////////////////////////////////////////////////////////
// const todonelist = document.querySelector(".todonelist1");
// // const todos = ["chips"];

// let sortable2 = Sortable.create(todonelist, // Element dragging ended
// {onEnd: function (/**Event*/evt) {
//   let itemEl = evt.item;  // dragged HTMLElement
//   evt.to;    // target list
//   evt.from;  // previous list
//   evt.oldIndex;  // element's old index within old parent
//   evt.newIndex;  // element's new index within new parent
//   evt.oldDraggableIndex; // element's old index within old parent, only counting draggable elements
//   evt.newDraggableIndex; // element's new index within new parent, only counting draggable elements
//   evt.clone // the clone element
//   evt.pullMode;  // when item is in another sortable: `"clone"` if cloning, `true` if moving
//   console.log(evt); 
//   //reorder array based on old index and new index
//   let temp = todos[evt.newIndex]; //copy of newIndex
//   todos[evt.newIndex] = todos[evt.oldIndex];
//   todos[evt.oldIndex] = temp;
//   console.log(todos);
// },

// onRemove: function (/**Event*/evt) {
//   // same properties as onEnd
//   console.log("element removed", evt);
// },

// // Element is dropped into the list from another list
// onAdd: function (/**Event*/evt) {
//   // same properties as onEnd
//   console.log("element added", evt);
// },

// //second list
// }
// );

/*
remake whole todo funciton

*/

///////////////////////////////////////////////////////////////////////////////////////////////
let todos = [];

let doneTodos = [];

let numOfButtons = 0;
let liArray = [];
let doneArray = [];
let tempText = "";
let isDone = [];

function drawToDoList() {
  // // Clear all of the entries in the list
  // while (todoList.firstChild) {
  //   todoList.removeChild(todoList.firstChild);
  // }

  // for (let i = 0; i < todos.length; i++) {
  //   const listItem = document.createElement("li");
  //   //listItem.textContent = todos[i].text;
  //   const taskText = document.createElement("span");
  //   taskText.textContent = todos[i].text;

  //   if (todos[i].isDone === true) {
  //     listItem.classList.add("done");
  //   }

  //   const todoDeleteButton = document.createElement("button");
  //   todoDeleteButton.textContent = "Delete";
  //   todoDeleteButton.classList.add("todoDeleteButton");

  //   todoDeleteButton.dataset.index = i;

  //   todoDeleteButton.addEventListener("click", deleteTodo);

  //   const todoDoneButton = document.createElement("button");

  //   todoDoneButton.classList.add("doneButton");

  //   if (todos[i].isDone === true) {
  //     todoDoneButton.textContent = "UnDone";
  //     //push one element off and then splice command similar to delete to new list
  //     //arr.splice(new, 1replace, old);

  //   } else {
  //     todoDoneButton.textContent = "Done";
  //   }

  //   todoDoneButton.dataset.index = i;

  //   todoDoneButton.addEventListener("click", doneTodo);

  //   listItem.appendChild(todoDoneButton);
  //   listItem.appendChild(todoDeleteButton);
  //   listItem.appendChild(taskText);

  //   todoList.appendChild(listItem);
  // }

  //remaking entire button is clicked sequence
  console.log("button is clicked");
  liArray[numOfButtons] = document.createElement("li");
  
  //delete button
  const todoDeleteButton = document.createElement("button");
  todoDeleteButton.textContent = "Delete";
  todoDeleteButton.classList.add("todoDeleteButton");
  todoDeleteButton.setAttribute("onclick", "deleteClick("+numOfButtons+")"); 

  //done button
  doneArray[numOfButtons] = document.createElement("button");
  doneArray[numOfButtons].classList.add("doneButton");
  doneArray[numOfButtons].textContent = "Done";
  doneArray[numOfButtons].setAttribute("onclick", "doneClick("+numOfButtons+")"); 
  isDone[numOfButtons] = 1;

  //text
  const taskText = document.createElement("span");
  taskText.textContent = tempText;
  
  //appending
  todoList.appendChild(liArray[numOfButtons]);
  liArray[numOfButtons].appendChild(todoDeleteButton);
  liArray[numOfButtons].appendChild(doneArray[numOfButtons]);
  liArray[numOfButtons].appendChild(taskText);
  
  numOfButtons++;
}

function deleteClick(buttonIndex){
  console.log("delete click: ", buttonIndex);
  todoList.removeChild(liArray[buttonIndex]);
}

function doneClick(buttonIndex){
  console.log("done click: ", buttonIndex);
  if (isDone[buttonIndex] == 1) {
    //either one works
    liArray[buttonIndex].classList.add("done");
    //doneArray[buttonIndex].classList.add("done");
    doneArray[buttonIndex].textContent = "UnDone";
    isDone[buttonIndex] *= -1;
  }
  else{
    liArray[buttonIndex].classList.remove("done");
    //doneArray[buttonIndex].classList.remove("done");
    doneArray[buttonIndex].textContent = "Done";
    isDone[buttonIndex] *= -1;
  }
}

function clearAll()
{
  console.log("liArray", liArray);

  for (let i=0; liArray.length > i; i++ )
  {
    deleteClick(i);
    numOfButtons = 0;
  }
  console.log("clear all");
}

///////////////////////////////////////////////////////////////////////////////
// function doneTodo(event) {
//   console.log("Marked as done");

//   todoDeleteIndex = event.target.dataset.index;

//   console.log("INDEX: ", todoDeleteIndex);

//   todos[todoDeleteIndex].isDone = !todos[todoDeleteIndex].isDone;

//   console.log(todos);

//   drawToDoList();
// }

// function deleteTodo(event) {
//   console.log("Delete button index", event.target.dataset.index);

//   todoDeleteIndex = event.target.dataset.index;

//   todos.splice(todoDeleteIndex, 1);

//   drawToDoList();
// }

function addTodo(event) {
  event.preventDefault();

  tempText = todoTextFromForm.value;

  // todos.push(todoTextFromForm.value);

  // todos.push({
  //   text: todoTextFromForm.value,
  //   isDone: false,
  // });

  console.log(todos);

  form.reset();

  drawToDoList();
}

form.addEventListener("submit", addTodo);

/////////////////////////////////////////////////////////////////////////////////////////

//  You may remove the code below - it's just boilerplate
//

//
// Variables
//

// Constants
// const appID = "app";
// const headingText = "YET ANOTHER CHANGE. FROM MY MACHINE. To do. To done. ✅";

// // Variables

// // DOM Elements
// let appContainer = document.getElementById(appID);

// //
// // Functions
// //

// // Add a heading to the app container
// function inititialise() {
//   // If anything is wrong with the app container then end
//   if (!appContainer) {
//     console.error("Error: Could not find app contianer");
//     return;
//   }

//   // Create an h1 and add it to our app
//   const h1 = document.createElement("h1");
//   h1.innerText = headingText;
//   appContainer.appendChild(h1);

//   // Init complete
//   console.log("App successfully initialised");
// }

// //
// // Inits & Event Listeners
// //

// inititialise();
