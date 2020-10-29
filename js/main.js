let today = new Date();
let time = today.getHours();
let timeGreetingHeader = document.getElementById("greetingHeading"); //header tag in the greetings section
// let headerSection = document.getElementById("header");


// function timeGreeting() {
//     timeGreetingHeader = document.createElement("h3");
//     document.headerSection.appendChild(headerSection);
// };

if (time > 0 && time < 12) {
    timeGreetingHeader.innerHTML = "Good morning!";
} else if (time >= 12 && time <= 17) {
    timeGreetingHeader.innerHTML = "Good afternoon!";
} else if (time >= 17 && time <= 23) {
    timeGreetingHeader.innerHTML = "Good evening!";
}