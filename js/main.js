const today = new Date();
const time = today.getHours();
const date = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
const datePTag = document.getElementById("todaysDate");
const timeGreetingHeader = document.getElementById("greetingHeading"); //header tag in the greetings section
const userTextSubmission = document.getElementById("addTodo");
const inputForm = document.getElementById("formElement");
const newToDo = userTextSubmission.value;
const todoSection = document.querySelector("#todoSection");
const ulElement = document.querySelector("#ulElement");

let liveLiList = ulElement.getElementsByTagName("li");
// let listOfLiElements = [].slice.call(liveLiList);
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


// ifs and fors //

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

let dragStartIndex;
let dragindex = 0;
let dropindex = 0;
let clone = "";

function drag(e) {
    e.dataTransfer.setData("text", e.target.id);
};

// functinos to change order of todo items


function onDragStart() {
    for (let i = 0; i < liveLiList.length; i++) {
        liveLiList[i].addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text", e.currentTarget.id);
            draggedItem = liveLiList[i];
            setTimeout(function() {
                draggedItem.style.opacity = "0.5";
            }, 0);
        });
    };
};

function onDragEnd() {
    for (let i = 0; i < liveLiList.length; i++) {
        liveLiList[i].addEventListener("dragend", () => {
            setTimeout(function() {
                draggedItem.style.opacity = "1";
            }, 0)
        })
    }
};

function dragEnter(e) {
    for (let i = 0; i < liveLiList.length; i++) {
        liveLiList[i].addEventListener("dragenter", (e) => {
            e.preventDefault();
            e.currentTarget.classList.toggle("drag-over");
            // liveLiList[i].classList.toggle("drag-over")
        })
    };
};

//reset default browser behaviour to allow drop
function dragOver() {
    for (let i = 0; i < liveLiList.length; i++) {
        liveLiList[i].addEventListener("dragover", (e) => {
            e.preventDefault();
            liveLiList[i].classList.toggle("drag-over")
            console.log("exit");
        })
    }
}

//reset class when finishing the drop
function dropFinish(e) {
    for (let i = 0; i < liveLiList.length; i++) {
        liveLiList[i].addEventListener("dragleave", () => {
            liveLiList[i].classList.toggle("drag-over")
            if (e.currentTarget.class === "drag-over") {
                e.currentTarget.classList.remove("drag-over");
            }
            console.log("drag finished")
        });
    };
};

function onDrop() {
    for (let i = 0; i < liveLiList.length; i++) {
        liveLiList[i].addEventListener("drop", (e) => {
            e.preventDefault();
            const removeOnDrop = e.currentTarget; //li element that's gonna be removed later
            clone = e.currentTarget.cloneNode(true);
            let data = removeOnDrop.id = "text"; //adding an id attribute that's gonna later be used to find and delete this element
            let nodeList = ulElement.childNodes;
            for (let x = 0; x < nodeList.length; x++) {
                if (nodeList[x].id === data) {
                    dragindex = nodeList[x];
                    ulElement.replaceChild(dragindex, e.currentTarget);
                    // listOfLiElements[i].classList.remove("change-order");
                    let replacedChild = dragindex.classList.remove("drag-over");
                    dragindex.removeAttribute("id");
                    // listOfLiElements.splice(replacedChild);
                    // console.log(listOfLiElements)
                    ulElement.removeChild(dragindex);
                    ulElement.insertBefore(clone, ulElement.childNodes[dragindex]);
                    evenetListeners();
                }
            };
        });
    };
};

function reapplyEvenetListener(element) {
    element.addEventListener("load", )
}

todoSection.addEventListener("dragover", (e) => {
    e.preventDefault();
});


function printOutDate() {
    datePTag.innerHTML = date;
}
printOutDate();

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

    newLiElement.addEventListener("dragstart", evenetListeners())
    spanTag.addEventListener("dragstart", evenetListeners());
};



//event listeners 

inputForm.addEventListener("submit", () => { createNewTodo(); });
submitButon.addEventListener("click", () => { createNewTodo(); });

//event listener to change list order
for (let i = 0; i < liveLiList.length; i++) {
    liveLiList[i].addEventListener("drop", onDrop())
};

function evenetListeners(e) {
    for (let i = 0; i < liveLiList.length; i++) {
        liveLiList[i].addEventListener("dragstart", onDragStart());
        liveLiList[i].addEventListener("drop", onDrop());
        liveLiList[i].addEventListener("dragend", onDragEnd());
        liveLiList[i].addEventListener("dragenter", dragEnter());
    };
}



evenetListeners();