const form = document.querySelector(".form1");
const todoTextFromForm = document.querySelector("#todo-item");

const todoList = document.querySelector(".todolist1");
// const todos = ["chips"];

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

},
}
);

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
//
let numRemainding = 0;

function drawToDoList() {
  //adds hidden class to the tempState class
  document.querySelector(".tempState").classList.add("hidden"); 
  //remaking entire button is clicked sequence
  console.log("button is clicked");
  //screenlog();
  //creates li container
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

  liArray[numOfButtons].appendChild(doneArray[numOfButtons]);
  liArray[numOfButtons].appendChild(todoDeleteButton);
  liArray[numOfButtons].appendChild(taskText);
  
  numOfButtons++;
  numRemainding++;
}

function deleteClick(buttonIndex){
  console.log("delete click: ", buttonIndex);
  //screenlog();
  todoList.removeChild(liArray[buttonIndex]);
  liArray[buttonIndex] = "removed";
  numRemainding--;
  console.log("num Remainding: ", numRemainding);
  if (numRemainding == 0){
    console.log("hi");
    document.querySelector(".tempState").classList.remove("hidden"); 
  }

}

function doneClick(buttonIndex){
  console.log("done click: ", buttonIndex);
  screenlog();
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
  document.querySelector(".tempState").classList.remove("hidden"); 

  console.log("liArray", liArray);

  for (let i=0; liArray.length > i; i++ )
  {
    if (liArray[i] != "removed")
    {
      deleteClick(i);
      numOfButtons = 0;
    }
  }
  console.log("clear all");
  //screenlog();
  numRemainding = 0;
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

function screenlog(){
  const pElem = document.getElementById("show-button-click");
  pElem.innerText= "add todo clicked";

}
form.addEventListener("submit", addTodo);
