// DOM

let darkMode = localStorage.getItem("darkMode");
const themeToggleBtn = document.querySelector("#theme-toggle-btn");
const themeIcon = document.querySelector(".theme-icon");

const inputBox = document.getElementById("input-box");
const addTaskBtn = document.getElementById("add-task-btn");

const tasks = document.querySelector(".to-do-list");
const AllTasks = tasks.getElementsByTagName("li");

const clearCompletedBtn = document.getElementById("clear-completed-btn");
const navBtns = document.querySelectorAll(".nav-items li");

const items_left_count =  document.getElementById("items-left-count");

let taskList = localStorage.getItem("taskList");
let listCount = 0;
updateCount(listCount);

console.log(navBtns);

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
    updateCount(1);
    saveData();
}

// marking or unmarking tasks as complete and deleting the list items

tasks.addEventListener("click", (e) => {

    if(e.target.tagName === "LI" || e.target.tagName === "P" || e.target.tagName === "BUTTON")
    {
        e.target.parentElement.classList.toggle("checked");
        saveData();
    } else {
        e.target.parentElement.remove();
        updateCount(-1);
        saveData();
    }
})

// display no of items left in tasklist

function updateCount(item)
{
    listCount += item;
    items_left_count.textContent = listCount;
}

// Adding list to local storage

function saveData() {
    localStorage.setItem("taskList", tasks.innerHTML);
}

function displayTasks() {
    tasks.innerHTML = taskList;
    updateCount(AllTasks.length);
}

displayTasks();

// all, active, completed button events

navBtns.forEach(btn => {
    btn.addEventListener("click", () => {

    })
})


// clear completed button event

clearCompletedBtn.addEventListener("click", () => {
    clearCompletedTasks();
})

function clearCompletedTasks() {

    for(let i = 0; i < AllTasks.length; i++)
    {
        if(AllTasks[i].classList.contains("checked"))
        {
            AllTasks[i].remove();
            updateCount(-1)
        }
        saveData();
    }
}


// reordering of tasks by dragging and dropping