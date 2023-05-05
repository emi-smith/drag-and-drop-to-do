// Add a new task
const form = document.getElementById("to-do-form");
const input = document.getElementById("to-do-input");
const toDoDecks = document.getElementById("to-do");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value;

    if (!value) return;

    const newTask = document.createElement("p");
    newTask.classList.add("tasks");
    newTask.setAttribute("draggable", "true");
    newTask.innerText = value;

    // Set new task to drag and drop
    newTask.addEventListener("dragstart", () => {
        newTask.classList.add("is-dragging");
    });

        newTask.addEventListener("dragend", () => {
        newTask.classList.remove("is-dragging");
    });

// clear input fields
    toDoDecks.appendChild(newTask);

    input.value = ""
});

// Get tasks from local storage 
window.addEventListener('load', () => {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
});


// Add task to deck selected with radio input