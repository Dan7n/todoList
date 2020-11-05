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
const hardcodedLiElements = document.querySelectorAll(".list-item") //chose querySelectorAll so that I can use a forEach loop with it
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
let draggedItem = null;

console.log(typeof pTagInsideUl);



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

function dragStart() {
    // console.log('Event: ', 'dragstart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

// let dragindex = 0;

// loop(s) to change order of todo items

hardcodedLiElements.forEach(draggableLi => {
    draggableLi.addEventListener("dragstart", () => {
        draggedItem = draggableLi;
        draggableLi.classList.add("change-order");
        setTimeout(function() {
            draggedItem.style.display = "none"
        }, 0)

    });
});

hardcodedLiElements.forEach(draggableLi => {
    draggableLi.addEventListener("dragend", () => {
        draggableLi.classList.remove("change-order");
        setTimeout(function() {
            draggedItem.style.display = "grid"
            draggedItem = null;
        }, 0)

    });
});

hardcodedLiElements.forEach(draggableLi => {
    draggableLi.addEventListener("dragover", (e) => {
        e.preventDefault();
        // console.log("dragover");
    });
});

hardcodedLiElements.forEach(draggableLi => {
    draggableLi.addEventListener("dragenter", (e) => {
        e.preventDefault();
        draggableLi.classList.add("drag-over")
            // console.log("dragenter");
    });
});

hardcodedLiElements.forEach(draggableLi => {
    draggableLi.addEventListener("dragleave", (e) => {
        e.preventDefault();
        // console.log("dragleave");
        draggableLi.classList.remove("drag-over")
    });
});


hardcodedLiElements.forEach(draggableLi => {
    draggableLi.addEventListener("drop", (e) => {
        e.preventDefault();
        switchOnDrop();
    });
});

function switchOnDrop() {
    const liBeingDragged = document.querySelector(".change-order");
    const liDroppedTo = document.querySelector(".drag-over");
    liBeingDragged.after(liDroppedTo);
    // ulElement.insertAfter(liBeingDragged, liDroppedTo);
};


todoSection.addEventListener("dragover", (e) => {
    e.preventDefault();
    // const afterElements = mousePosition(ulElement, e.clientY);
    // const itemBeingDragged = document.querySelector(".change-order"); //select the item currently being dragged
});

// function mousePosition(container, yPosition) {
//     const otherDraggableLiElements = [...ulElement.querySelectorAll('li:not(.change-order)')];
//     // otherDraggableLiElements.reduce(closest, child)



//     otherDraggableLiElements.reduce(closest, child) => {}

//     return draggableElements.reduce((closest, child) => {

//     }, { offset: Number.NEGATIVE_INFINITY }).element
// }
// }
// mousePosition();


// ulElement.addEventListener("drop", function(e) {
//     e.stopPropagation();
//     console.log("test")
//     if (dragSrcEl !== this) {
//         dragSrcEl.innerHTML = this.innerHTML;
//         this.innerHTML = e.dataTransfer.getData('text/html');
//     }
//     return false;
// });

// ulElement.addEventListener("dragstart", function(e) {
//     dragSrcEl = this;
//     e.dataTransfer.effectAllowed = 'move';
//     e.dataTransfer.setData('text/html', this.innerHTML);
// });


// ulElement.addEventListener("drop", function(e) {
//     e.preventDefault();
//     console.log("test");
// })


// hardcodedLiElements.forEach(draggableLi => {
//     draggableLi.addEventListener("dragover", function(e) {
//         e.preventDefault();
//         console.log("test")
//     });

//     draggableLi.addEventListener("dragenter", function(e) {
//         e.preventDefault();
//         console.log("test")

//     });

// })


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

    newLiElement.addEventListener("dragstart", () => {
        console.log("this works")
    })

};



//event listeners 

inputForm.addEventListener("submit", () => { createNewTodo(); });
submitButon.addEventListener("click", () => { createNewTodo(); });