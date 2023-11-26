// DOM

let darkMode = localStorage.getItem("darkMode");
const themeToggleBtn = document.querySelector("#theme-toggle-btn");
const themeIcon = document.querySelector(".theme-icon");

const inputBox = document.getElementById("input-box");
const addTaskBtn = document.getElementById("add-task-btn");

const tasks = document.querySelector(".to-do-list");
const completedTasks = document.getElementsByClassName("checked");
const AllTasks = document.querySelector(".to-do-list li");

const clearCompletedBtn = document.getElementById("clear-completed-btn");

let listCount = 0;

console.log(tasks);

// Changing theme

const enableDarkMode = () => {
    
    themeIcon.setAttribute("src", "./images/icon-sun.svg");
    document.body.classList.remove("lightTheme");
    
    localStorage.setItem("darkMode", "enabled");

}

const disableDarkMode = () => {

    themeIcon.setAttribute("src", "./images/icon-moon.svg");
    document.body.classList.add("lightTheme");

    localStorage.setItem("darkMode", "disabled");
}

if(darkMode === "enabled") {
    enableDarkMode();
} else {
    disableDarkMode();
}

themeToggleBtn.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode");
    if(darkMode !== "enabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
})

// Adding items to list

addTaskBtn.addEventListener("click", () => {
    addNewTask();
})

inputBox.addEventListener("keydown", (event) => {
    if(event.key === "Enter") {
        addTaskBtn.click();
    }
})

function addNewTask() {

    if(inputBox.value !== "") {

        let li = document.createElement("li");
        li.innerHTML = `
                        <button></button>
                        <p>${inputBox.value}</p>
                        <img src="images/icon-cross.svg" alt="Close button">
                      `
        tasks.appendChild(li);
    }

    inputBox.value = "";
}

// marking or unmarking tasks as complete and deleting the list items

tasks.addEventListener("click", (e) => {

    if(e.target.tagName === "LI" || e.target.tagName === "P" || e.target.tagName === "BUTTON")
    {
        e.target.parentElement.classList.toggle("checked");
    } else {
        e.target.parentElement.remove();
    }
})

// display no of items left in tasklist

function updateCount(item)
{


}

// all, active, completed button events

// clear completed button event

clearCompletedBtn.addEventListener("click", () => {
    clearCompletedTasks();
})

function clearCompletedTasks() {

    // not removing all completed items at once using AllTasks and removing all incomplete items as well using completedTasks
    // for(let i = 0; i < completedTasks.length - 1; i++)
    // {
    //     console.log(completedTasks[i]);
    //     completedTasks[i].remove();
    // }
    for(let i = 0; i < AllTasks.length - 1; i++)
    {
        if(AllTasks[i].classList.contains("checked"))
        {
            console.log(AllTasks[i]);
            AllTasks[i].remove();
        }
    }
}

// Adding list to local storage

// reordering of tasks by dragging and dropping