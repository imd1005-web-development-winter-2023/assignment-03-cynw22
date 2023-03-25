const form = document.querySelector(".form1");
const todoTextFromForm = document.querySelector("#todo-item");

const todoList = document.querySelector(".todolist1");
// const todos = ["chips"];

// //keep track of item index, 
// let oldindexarray = 0;
// let newindexarray = 0;

let todos = [];

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

  // //put old index into the exterior
  // oldindexarray = evt.oldIndex;
  // //put new index into exterior
  // newindexarray = evt.newIndex;
  // console.log("old index: ", oldindexarray);  
  // console.log("new index: ", newindexarray);
  // switchIndex();

},

// onRemove: function (/**Event*/evt) {
//   // same properties as onEnd
//   console.log("element removed", evt);
// },

// // Element is dropped into the list from another list
// onAdd: function (/**Event*/evt) {
//   // same properties as onEnd
//   console.log("element added", evt);
// },
//second list
}
);

// function switchIndex() {
//   console.log("NEW old index: ", oldindexarray);  
//   console.log("NEW new index: ", newindexarray);
  
//   //switch todo array values
//  temp = todos[newindexarray];
//  todos[newindexarray] = todos[oldindexarray];
//  todos[oldindexarray] = temp;
//   console.log("todos= ", todos);
// }

//variables
// number of list items
let numOfButtons = 0;
// holds everything inside the list
let liArray = [];
// another array to hold the done button
let doneArray = []; 
//temperary text
let tempText = ""; 
//holds if done or not
let isDone = []; 

function drawToDoList() {
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
  //allows you to not select the text, easy to move it around
 taskText.setAttribute("unselectable", "on"); 
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
