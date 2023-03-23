const form = document.querySelector(".form1");
const todoTextFromForm = document.querySelector("#todo-item");

const todoList = document.querySelector(".todolist1");
// const todos = ["chips"];

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

const todonelist = document.querySelector(".todonelist1");
// const todos = ["chips"];

let sortable2 = Sortable.create(todonelist, // Element dragging ended
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
  console.log(evt); // this todoarray has 4 things, have to reorder the array based on the old index and new index, take that item, move it where the new and old items to the new place, tempary variable, getold to new, copy new destination
  //into attempt variable, and where cofee was what had temp into the coffe, update arraym everything run perfectly
  //temp, new into into temp, take cofee take into new, temp into old index
  let temp = todos[evt.newIndex]; //copy of newIndex
  todos[evt.newIndex] = todos[evt.oldIndex];
  todos[evt.oldIndex] = temp;
  console.log(todos);
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


const todos = [];

const doneTodos = [];

function drawToDoList() {
  // Clear all of the entries in the list
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }

  for (let i = 0; i < todos.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = todos[i].text;

    if (todos[i].isDone === true) {
      listItem.classList.add("done");
    }

    const todoDeleteButton = document.createElement("button");
    todoDeleteButton.textContent = "Delete";
    todoDeleteButton.classList.add("todoDeleteButton");

    todoDeleteButton.dataset.index = i;

    todoDeleteButton.addEventListener("click", deleteTodo);

    const todoDoneButton = document.createElement("button");

    if (todos[i].isDone === true) {
      todoDoneButton.textContent = "UnDone";
      //push one element off and then splice command similar to delete to new list
      //arr.splice(doneTodos[i], 1, todos[i]);

    } else {
      todoDoneButton.textContent = "Done";
    }

    todoDoneButton.dataset.index = i;

    todoDoneButton.addEventListener("click", doneTodo);

    listItem.appendChild(todoDoneButton);
    listItem.appendChild(todoDeleteButton);

    todoList.appendChild(listItem);
  }
}

function doneTodo(event) {
  console.log("Marked as done");

  todoDeleteIndex = event.target.dataset.index;

  console.log("INDEX: ", todoDeleteIndex);

  todos[todoDeleteIndex].isDone = !todos[todoDeleteIndex].isDone;

  console.log(todos);

  drawToDoList();
}

function deleteTodo(event) {
  console.log("Delete button index", event.target.dataset.index);

  todoDeleteIndex = event.target.dataset.index;

  todos.splice(todoDeleteIndex, 1);

  drawToDoList();
}

function addTodo(event) {
  event.preventDefault();

  todoTextFromForm.value;

  // todos.push(todoTextFromForm.value);

  todos.push({
    text: todoTextFromForm.value,
    isDone: false,
  });

  console.log(todos);

  form.reset();

  drawToDoList();
}

form.addEventListener("submit", addTodo);

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
