const today = new Date();
const time = today.getHours();
const date = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
const datePTag = document.getElementById("todaysDate");
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; //using this to print out todays date using the 
const timeGreetingHeader = document.getElementById("greetingHeading"); //header tag in the greetings section
const userTextSubmission = document.getElementById("addTodo");
const inputForm = document.getElementById("formElement");
const newToDo = userTextSubmission.value;
const todoSection = document.querySelector("#todoSection");
const ulElement = document.querySelector("#ulElement");
let liveLiList = ulElement.getElementsByTagName("li");
let listOfLiElements = [].slice.call(liveLiList);
const hardcodedLiElements = document.querySelectorAll(".list-item") //using querySelectorAll so that I can use a forEach loop with it
const pTagInsideUl = ulElement.getElementsByTagName("p");
const submitButon = document.getElementById("submitTodo");
const deleteButton = document.getElementsByClassName("delete");
let closestLiElement;
const array = [].slice.call(deleteButton); //convery deleteButton to an array
const checkBoxes = document.getElementsByClassName("checkbox");
const checkBoxesArray = [].slice.call(checkBoxes); //checkboxes converted to an array
const filterButton = document.getElementById("options");
const filterButtonOptions = filterButton.querySelectorAll("option");
const allTodoDivs = document.getElementsByClassName("todo-item");
let draggedItem;


// ifs and fors ------------------------------

if (time >= 0 && time < 12) {
    timeGreetingHeader.innerHTML = "Good morning!";
} else if (time >= 12 && time <= 17) {
    timeGreetingHeader.innerHTML = "Good afternoon!";
} else if (time >= 17 && time <= 23) {
    timeGreetingHeader.innerHTML = "Good evening!";
}

//loop to add event listener to all delete buttons
for (let i = 0; i < array.length; i++) {
    array[i].addEventListener("click", () => {
        closestLiElement = array[i].closest("li");
        closestLiElement.firstElementChild.classList.add("deleted");
        const closestContainer = array[i].closest(".todo-item").classList.add("deleted");
        ulElement.addEventListener("animationend", () => {
            closestLiElement.remove();
        });
    });
};

//mark created tasks as complete
for (let i = 0; i < checkBoxesArray.length; i++) {
    let closestPTag = checkBoxesArray[i].nextElementSibling;
    checkBoxesArray[i].addEventListener("click", () => {
        if (checkBoxesArray[i].checked === true) {
            closestPTag.classList.add("completed");
            closestPTag.nextElementSibling.classList.add("label-completed");

        } else if (checkBoxesArray[i].checked === false) {
            closestPTag.classList.remove("completed");
            closestPTag.nextElementSibling.classList.remove("label-completed");

        };
    });
};

//function to print out todays date
function printOutDate() {
    datePTag.innerHTML = date;
}
printOutDate();



// functinos to change order of todo items --------------------------

function onDragStart(e) {
    this.style.opacity = "0.4";
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", this.innerHTML);
};
//prevent browser's default behaviour and add a class to style the li element
function dragEnter(e) {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
};
//remove the class when the drag event leaves the element
function onDragLeave(e) {
    e.stopPropagation();
    e.currentTarget.classList.remove("drag-over");
};

function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    return false;
}

function onDragDrop(e) {
    if (dragSrcEl != this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData("text/html");
    }
    return false;
};

function onDragEnd(e) {
    let listItems = liveLiList;
    [].forEach.call(listItems, function(item) {
        item.classList.remove("drag-over");
    });
    this.style.opacity = "1";
};

function dropFinish(e) {
    this.classList.toggle("drag-over")
    if (e.currentTarget.class === "drag-over") {
        e.currentTarget.classList.remove("drag-over");
    }
};

todoSection.addEventListener("dragover", (e) => {
    e.preventDefault();
});


function createNewTodo() {
    event.preventDefault();
    const newLiElement = document.createElement("li"); //create li
    newLiElement.classList.add("list-item");
    newLiElement.setAttribute("draggable", "true");
    const spanTag = document.createElement("span");
    spanTag.classList.add("fas");
    spanTag.classList.add("fa-bars");
    newLiElement.appendChild(spanTag);
    const containerDiv = document.createElement("div");
    containerDiv.classList.add("todo-item");
    newLiElement.appendChild(containerDiv);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    containerDiv.appendChild(checkbox);
    const pElement = document.createElement("p");
    pElement.innerText = userTextSubmission.value;
    containerDiv.appendChild(pElement);
    const deleteIcon = document.createElement("label");
    deleteIcon.setAttribute("for", "delete");
    deleteIcon.classList.add("delete");
    deleteIcon.innerHTML = '<i class="fas fa-trash"></i>';
    array.push(deleteIcon);
    const btnElement = document.createElement("input");
    btnElement.type = "button";
    btnElement.classList.add("btn");
    btnElement.setAttribute("name", "delete");
    deleteIcon.appendChild(btnElement);
    containerDiv.appendChild(deleteIcon);
    newLiElement.appendChild(containerDiv);
    ulElement.appendChild(newLiElement);
    userTextSubmission.value = "";

    //when user presses delete icon
    deleteIcon.addEventListener("click", () => {
        containerDiv.classList.add("deleted");
        spanTag.classList.add("deleted")
        ulElement.addEventListener("animationend", () => {
            newLiElement.remove();
        });
    });

    //when user checks a spacific task
    checkbox.addEventListener("click", () => {
        if (checkbox.checked === true) {
            pElement.classList.add("completed");
            deleteIcon.classList.add("label-completed");
        } else {
            pElement.classList.remove("completed");
            deleteIcon.classList.remove("label-completed");
        };
    });
    //fire the event listeners right after creating a new li element
    evenetListeners();
};


//event listeners 

inputForm.addEventListener("submit", () => { createNewTodo(); });
submitButon.addEventListener("click", () => { createNewTodo(); });

//event listener to change list order
function evenetListeners(e) {
    for (let i = 0; i < liveLiList.length; i++) {
        liveLiList[i].addEventListener("dragstart", onDragStart, false);
        liveLiList[i].addEventListener("dragenter", dragEnter, false);
        liveLiList[i].addEventListener("dragleave", onDragLeave, false);
        liveLiList[i].addEventListener("dragover", dragOver, false);
        liveLiList[i].addEventListener("drop", onDragDrop, false);
        liveLiList[i].addEventListener("dragend", onDragEnd, false);
    };
}
//fire the event listeners on page load
evenetListeners();