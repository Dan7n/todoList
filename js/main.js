const today = new Date();
const time = today.getHours();
const date = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
const datePTag = document.getElementById("todaysDate");
const timeGreetingHeader = document.getElementById("greetingHeading"); //header tag in the greetings section
const userTextSubmission = document.getElementById("addTodo");
const inputForm = document.getElementById("formElement");
const newToDo = userTextSubmission.value;
const ulElement = document.getElementById("ulElement");
const submitButon = document.getElementById("submitTodo");
const deleteButton = document.getElementsByClassName("delete");
let closestLiElement;
const array = [].slice.call(deleteButton); //convery deleteButton to an array
const checkBoxes = document.getElementsByClassName("checkbox");
const checkBoxesArray = [].slice.call(checkBoxes); //checkboxes converted to an array
// const todoSection = document.getElementById("todoSection");
// const pTags = document.body.todoSection

// console.log(todoSection);


// ifs and fors 

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
        const closestContainer = array[i].closest(".todo-item").classList.add("deleted");
        ulElement.addEventListener("animationend", () => {
            closestLiElement = array[i].closest("li");
            closestLiElement.remove();
        });
    });
};

for (let i = 0; i < checkBoxesArray.length; i++) {
    let closestPTag = checkBoxesArray[i].nextElementSibling;
    checkBoxesArray[i].addEventListener("click", () => {
        if (checkBoxesArray[i].checked === true) {
            closestPTag.classList.add("completed");
            closestPTag.nextElementSibling.classList.add("completed");
        } else if (checkBoxesArray[i].checked === false) {
            closestPTag.classList.remove("completed");
            closestPTag.nextElementSibling.classList.remove("completed");
        };
    });
};
//functions

function printOutDate() {
    datePTag.innerHTML = date;
}
printOutDate();

function createNewTodo() {
    event.preventDefault();
    const newLiElement = document.createElement("li"); //create li
    newLiElement.classList.add("list-item");
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
        ulElement.addEventListener("animationend", () => {
            newLiElement.remove();
        });
    });

    //when user checks a spacific task
    checkbox.addEventListener("click", () => {
        if (checkbox.checked === true) {
            pElement.classList.add("completed");
            deleteIcon.classList.add("completed");
        } else {
            pElement.classList.remove("completed");
            deleteIcon.classList.remove("completed");
        };
    });
};

//event listeners 

inputForm.addEventListener("submit", () => { createNewTodo(); });
submitButon.addEventListener("click", () => { createNewTodo(); })