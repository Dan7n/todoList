const today = new Date();
const time = today.getHours();
const date = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate(); //to print out todays date
const datePTag = document.getElementById("todaysDate");
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; //using this to print out todays date
const whatDayIsIt = daysOfWeek[today.getDay()];
const timeGreetingHeader = document.getElementById("greetingHeading"); //header tag in the greetings section
const dayOfWeekContainer = document.getElementById("dayOfWeekContainer"); //div where the day of week will be printed
let listOfToDos = []; //all todos will be added to this array
const userTextSubmission = document.getElementById("addTodo");
const inputForm = document.getElementById("formElement");
const newToDo = userTextSubmission.value;
const todoSection = document.querySelector("#todoSection");
const ulElement = document.querySelector("#ulElement");
const onloadText = document.getElementById("onloadText");
let nomoreTasks = ""; //gonna be added later when there are no more tasks to show
let liveLiList = ulElement.getElementsByTagName("li");
let listOfLiElements = [].slice.call(liveLiList);
const pTagInsideUl = ulElement.getElementsByTagName("p");
const submitButon = document.getElementById("submitTodo");
const deleteButton = document.getElementsByClassName("delete");
const svgIcon = document.getElementById("svgIcon");
const svgPath = document.getElementById("svgPath");
const allLabelElements = document.getElementsByClassName("delete");
let currentElementsId;
let draggedItem;

// print out greeting based on time of day
if (time >= 0 && time < 12) {
    timeGreetingHeader.innerHTML = "Good morning!";
} else if (time >= 12 && time <= 17) {
    timeGreetingHeader.innerHTML = "Good afternoon!";
} else if (time >= 17 && time <= 23) {
    timeGreetingHeader.innerHTML = "Good evening!";
}

//functions to print out todays date
function printOutDate() {
    datePTag.innerHTML = date;
}
printOutDate();

function printOutDayOfWeek() {
    const dayPTag = document.getElementById("dayOfWeek");
    dayPTag.innerHTML = whatDayIsIt;
};
printOutDayOfWeek();



// functinos to change order of todo items --------------------------

function onDragStart(e) {
    this.style.opacity = "0.6";
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

//class to create new objects
class TodoMaker {
    constructor(inputedText, uniqueId) {
        this.inputedText = inputedText;
        this.statusChecked = false;
        this.uniqueId = uniqueId;
    }
};

let num = 0;
//defining a few tasks, then adding them to an array of tasks
const task_1 = new TodoMaker("Learn Javascript", num++);
const task_2 = new TodoMaker("Reherse for upcoming gig", num++);
const task_3 = new TodoMaker("Finish up homework", num++);
listOfToDos.push(task_1, task_2, task_3);
loopAndShowOnScreen();

//create new object, add it to the array
function createNewTodo() {
    if (userTextSubmission.value === "") {
        alert("Please write something")
    } else {
        const newTaskObject = new TodoMaker(userTextSubmission.value, num++);
        listOfToDos.push(newTaskObject)
        loopAndShowOnScreen()
    };
};

function loopAndShowOnScreen() {
    //remove onload text
    if (ulElement.contains(onloadText)) {
        onloadText.remove();
        document.querySelector("#ulElement").innerHTML = "";
    };
    removeIfExists()

    //loop through the array and print out any new task
    for (let i = 0; i < listOfToDos.length; i++) {
        const newLiElement = document.createElement("li");
        newLiElement.classList.add("list-item");
        newLiElement.setAttribute("draggable", "true");
        const spanTag = document.createElement("span");
        spanTag.classList.add("fas");
        spanTag.classList.add("fa-bars");
        newLiElement.appendChild(spanTag);
        //create the div container and the p and span tags inside it
        const containerDiv = document.createElement("div");
        containerDiv.classList.add("todo-item");
        newLiElement.appendChild(containerDiv);
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");
        containerDiv.appendChild(checkbox);
        const pElement = document.createElement("p");
        pElement.innerText = listOfToDos[i].inputedText;
        containerDiv.appendChild(pElement);
        const deleteIcon = document.createElement("label");
        // listOfToDos.push({ this deleteIcon });
        deleteIcon.setAttribute("for", "delete");
        deleteIcon.classList.add("delete");
        deleteIcon.innerHTML = '<i class="fas fa-trash"></i>';
        deleteIcon.id = listOfToDos[i].uniqueId;
        const btnElement = document.createElement("input");
        btnElement.type = "button";
        btnElement.classList.add("btn");
        btnElement.setAttribute("name", "delete");
        deleteIcon.appendChild(btnElement);
        containerDiv.appendChild(deleteIcon);
        newLiElement.appendChild(containerDiv);
        ulElement.appendChild(newLiElement);
        userTextSubmission.value = "";
        console.log(listOfToDos);

        //when user presses delete icon
        deleteIcon.addEventListener("click", (event) => {
            spliceObject()
            containerDiv.classList.add("deleted");
            spanTag.classList.add("deleted")
            ulElement.addEventListener("animationend", () => {
                newLiElement.remove();
                checkIfEmpty();
                console.log(listOfToDos);
            });
        });

        //when user marks task as "completed"
        checkbox.addEventListener("click", () => {
            if (checkbox.checked === true) {
                pElement.classList.add("completed");
                deleteIcon.classList.add("label-completed");

            } else {
                pElement.classList.remove("completed");
                deleteIcon.classList.remove("label-completed");
            };
        });
        //fire the event listeners right after creating a new li element to activate the drag&drop sotring functionality
        evenetListeners();
    }
};

//find the object that has the same unique ID as the label being clicked on, then remove it from the array
function spliceObject() {
    let currentElementsId = event.target.parentNode.id;
    let objectToBeDeleted = listOfToDos.filter(object => {
        return object.uniqueId == currentElementsId;
    });
    listOfToDos.splice(objectToBeDeleted, 1);
};


//function to check if ul element is empty and create <p> tag if it is
function checkIfEmpty() {
    if (ulElement.innerHTML === "") {
        nomoreTasks = document.createElement("p");
        nomoreTasks.classList.add("onload-text");
        nomoreTasks.id = "nomoreTasks";
        nomoreTasks.innerHTML = "Woho! Looks like you're all done for today!";
        ulElement.appendChild(nomoreTasks);
    };
};

// remove the "you're done for today" text if it exists
function removeIfExists() {
    if (ulElement.hasChildNodes("#nomoreTasks")) {
        ulElement.innerHTML = "";
    };
};


//event listeners 

inputForm.addEventListener("submit", () => { createNewTodo(), false; });
submitButon.addEventListener("click", () => { createNewTodo(), false; });

submitButon.addEventListener("mouseover", () => {
    svgIcon.setAttribute("height", "1.4rem");
    svgIcon.setAttribute("width", "1.4rem");
    svgPath.setAttribute("fill", "#00509d");
});
submitButon.addEventListener("mouseout", () => {
    svgIcon.setAttribute("height", "1.3rem");
    svgIcon.setAttribute("width", "1.3rem");
    svgPath.setAttribute("fill", "black");
});

function deleteIconEventListeners() {
    let deletes = document.getElementsByClassName("delete");
    for (let i = 0; i < deletes.length; i++) {
        listOfToDos.splice(i, 1);

    }
}

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
//print out pre-defined tasks
// listOfToDos.forEach(task => createNewTodo);


function numberIncruments() {
    let startNumber = 4;
    return startNumber + 1;
};