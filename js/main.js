let today = new Date();
let time = today.getHours();
let timeGreetingHeader = document.getElementById("greetingHeading"); //header tag in the greetings section
let userTextSubmission = document.getElementById("addTodo");
let inputForm = document.getElementById("formElement");
let newToDo = userTextSubmission.value;
let ulElement = document.getElementById("ulElement");

if (time > 0 && time < 12) {
    timeGreetingHeader.innerHTML = "Good morning!";
} else if (time >= 12 && time <= 17) {
    timeGreetingHeader.innerHTML = "Good afternoon!";
} else if (time >= 17 && time <= 23) {
    timeGreetingHeader.innerHTML = "Good evening!";
}


inputForm.addEventListener("submit", () => {
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
    deleteIcon.classList.add("delete");
    deleteIcon.setAttribute("for", "delete");
    deleteIcon.innerHTML = '<i class="fas fa-trash"></i>';
    const btnElement = document.createElement("input");
    btnElement.type = "button";
    btnElement.setAttribute("name", "delete");
    deleteIcon.appendChild(btnElement);
    containerDiv.appendChild(deleteIcon);
    newLiElement.appendChild(containerDiv);
    ulElement.appendChild(newLiElement);
    userTextSubmission.value = "";

    //testing 
    console.log("This is working");
});



//textbox onfocus, remove placeholder and fram around
//add some color animation to send button