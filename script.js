// DOM

let darkMode = localStorage.getItem("darkMode");
const themeToggleBtn = document.querySelector("#theme-toggle-btn");
const themeIcon = document.querySelector(".theme-icon");

const inputBox = document.getElementById("input-box");
const addTaskBtn = document.getElementById("add-task-btn");

const tasks = document.querySelector(".to-do-list");
const AllTasks = tasks.getElementsByTagName("li");

const clearCompletedBtn = document.getElementById("clear-completed-btn");
const navBtns = document.querySelectorAll(".nav-items li button");

const items_left_count =  document.getElementById("items-left-count");

let taskList = localStorage.getItem("taskList");
let listCount = 0;
updateCount(listCount);


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
        li.setAttribute("draggable", "true");
        li.innerHTML = `
                        <button></button>
                        <p>${inputBox.value}</p>
                        <img src="images/icon-cross.svg" alt="Close button">
                      `
        tasks.appendChild(li);
        inputBox.value = "";
        updateCount(1);
        saveData();
    } 
    
}

// marking or unmarking tasks as complete and deleting the list items

tasks.addEventListener("click", (e) => {

    if(e.target.tagName === "P" || e.target.tagName === "BUTTON")
    {
        e.target.parentElement.classList.toggle("checked");
        saveData();
    } else if(e.target.tagName === "IMG") {
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

function markInactive() {
    navBtns.forEach(btn => {
        if(btn.innerHTML === "All")
        {
            btn.style.color = "var(--Very-Dark-Grayish-Blue-1)";
        }
        btn.classList.remove("active");
    })
}

navBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        markInactive();
        if(btn.innerHTML === e.target.id) {
            btn.classList.add("active");
        } 
        if(btn.innerHTML === "All") {
            btn.style.color = "var(--BrightBlue)"
        }
        filterList(e.target.id); 
    })
})

function filterList(id) {

    const allTasks = document.querySelectorAll(".to-do-list li");

    switch(id) 
    {
        case "All":
            allTasks.forEach(task => {
                task.style.display = "flex";
            })
            break;

        case "Active":
            allTasks.forEach(task => {

                if(task.classList.contains("checked")) {
                    task.style.display = "none";
                } else {
                    task.style.display = "flex";
                }

            })

            break;

        case "Completed":
            allTasks.forEach((task) => {

                if(task.classList.contains("checked")) {
                    task.style.display = "flex";
                } else {
                    task.style.display = "none";
                }
            })
            break;

    }
}


// clear completed button event

clearCompletedBtn.addEventListener("click", () => {
    clearCompletedTasks();
})

function clearCompletedTasks() {
    const completedTasks = document.querySelectorAll(".to-do-list li.checked");

    completedTasks.forEach((task) => {

        task.remove();
        updateCount(-1);
        saveData();

    })

}

// reordering of tasks by dragging and dropping

const draggables = document.querySelectorAll("[draggable = 'true']");
draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
        saveData();
    })

    draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
        saveData();
    })
})

tasks.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(tasks, e.clientY); //e.clientY returns the current Y position of our mouse
    console.log(afterElement);
    const draggingTask = document.querySelector(".dragging");
    if(afterElement == null) {
        tasks.appendChild(draggingTask);
        saveData();
    } else {
        tasks.insertBefore(draggingTask, afterElement);
        saveData();
    }

})

function getDragAfterElement(tasks, y) {
    const draggableElements = [...tasks.querySelectorAll("[draggable = 'true']:not(.dragging)")];

    return draggableElements.reduce((closest, listItem) => {

        const box = listItem.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if(offset < 0 && offset > closest.offset) {
            return { offset : offset, element : listItem };
        } else {
            return closest;
        }

    }, { offset: Number.NEGATIVE_INFINITY }).element

}