let today = new Date();
let time = today.getHours();
let date = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
let datePTag = document.getElementById("todaysDate");
let timeGreetingHeader = document.getElementById("greetingHeading"); //header tag in the greetings section
let userTextSubmission = document.getElementById("addTodo");
let inputForm = document.getElementById("formElement");
let newToDo = userTextSubmission.value;
let ulElement = document.getElementById("ulElement");
let submitButon = document.getElementById("submitTodo");
let deleteButton = document.getElementsByClassName("delete");
let closestLiElement;
let array = [].slice.call(deleteButton); //convery deleteButton to an array


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
            // console.log(array);
            closestLiElement.remove();
            // console.log("is this working");

        });

    });
}
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
    deleteIcon.addEventListener("click", () => {
        containerDiv.classList.add("deleted");
        ulElement.addEventListener("animationend", () => {
            newLiElement.remove();
        });
    });
};

//event listeners 

inputForm.addEventListener("submit", () => { createNewTodo(); });
submitButon.addEventListener("click", () => { createNewTodo(); })