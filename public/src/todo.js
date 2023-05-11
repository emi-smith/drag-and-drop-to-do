    const todoInput = document.querySelector(".todo-input");
    const todoButton = document.querySelector(".todo-button");
    const taskWrap = document.getElementById("task-wrap");
    const filterOption = document.querySelector(".filter-todo");

    document.addEventListener("DOMContentLoaded", getLocalTodos);
    todoButton.addEventListener("click", addTodo);
    taskWrap.addEventListener("click", deleteCheck);
    filterOption.addEventListener("change", filterTodo);

    function addTodo(event) {
    event.preventDefault();

        // CREATE TODO DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        todoDiv.setAttribute("draggable", "true");


        // Set new task to drag and drop
        todoDiv.addEventListener("dragstart", () => {
        todoDiv.classList.add("is-dragging");
        });

        todoDiv.addEventListener("dragend", () => {
        todoDiv.classList.remove("is-dragging");
        });

                // CREATE NEW TODO INPUT
                const newTodo = document.createElement("input");
                // newTodo.innerText = todoInput.value; 
                newTodo.setAttribute("value", todoInput.value);
                newTodo.classList.add("todo-item");
                newTodo.setAttribute("type", "text");
                newTodo.setAttribute("name", "content");
                newTodo.setAttribute("readonly", "readonly");
                newTodo.setAttribute("placeholder","Text will go here");

                todoDiv.appendChild(newTodo);

                //ADDING TO LOCAL STORAGE 
                saveLocalTodos(todoInput.value);
            
            // CREATE ACTIONS CONTAINER
            const actionsContainer = document.createElement("div");
            actionsContainer.classList.add("actions-container");
            todoDiv.appendChild(actionsContainer)
            
                // CREATE FINISH TASK LABEL
                const finishedTask = document.createElement("label"); 
                finishedTask.classList.add("finished-task");
                actionsContainer.appendChild(finishedTask);

                    // CREATE CHECKBOX COMPLETE BUTTON
                    const completedButton = document.createElement("input");
                    completedButton.classList.add("complete-btn");
                    completedButton.setAttribute("type", "checkbox");
                    finishedTask.appendChild(completedButton);

                // CREATE ACTIONS DIV
                const actionsDiv = document.createElement("div");
                actionsDiv.classList.add("actions");
                actionsContainer.appendChild(actionsDiv);

                    // CREATE EDIT BUTTON
                    const editButton = document.createElement("button");
                    editButton.innerHTML = 'Edit';
                    editButton.classList.add("edit");
                    actionsDiv.appendChild(editButton);

                    // CREATE DELETE BUTTON
                    const trashButton = document.createElement("button");
                    trashButton.innerHTML = 'Delete';
                    trashButton.classList.add("delete");
                    actionsDiv.appendChild(trashButton);

                    // APPEND TASK TO TASK CONTAINER
                    taskWrap.appendChild(todoDiv);
                    todoInput.value = "";



}

    function deleteCheck(e) {
        const item = e.target;

        if(item.classList[0] === "delete") {
            const todo = item.parentElement;
            todo.classList.add("slide");

            removeLocalTodos(todo);
            todo.addEventListener("transitionend", function() {
                todo.remove();
            });
        }

        if(item.classList[0] === "complete-btn") {
            const todo = item.parentElement;
            todo.classList.toggle("completed");
        }
    }

    function filterTodo(e) {
        const todos = taskWrap.childNodes;
        todos.forEach(function(todo) {
            switch(e.target.value) {
                case "all": 
                    todo.style.display = "flex";
                    break;
                case "completed": 
                    if(todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
                case "incomplete":
                    if(!todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
            }
        });
    }

    function saveLocalTodos(todo) {
        let todos;
        if(localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function getLocalTodos() {
        let todos;
        if(localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        
        todos.forEach(function(todo) {
            // CREATE TODO DIV
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo");
            todoDiv.setAttribute("draggable", "true");
            // Set new task to drag and drop
            todoDiv.addEventListener("dragstart", () => {
            todoDiv.classList.add("is-dragging");
            });
            todoDiv.addEventListener("dragend", () => {
            todoDiv.classList.remove("is-dragging");
            });

                    // CREATE NEW TODO INPUT
                    const newTodo = document.createElement("input");
                    // newTodo.innerText = todoInput.value; 
                    newTodo.setAttribute("value", todoInput.value);
                    newTodo.classList.add("todo-item");
                    newTodo.setAttribute("type", "text");
                    newTodo.setAttribute("name", "content");
                    newTodo.setAttribute("readonly", "readonly");
                    newTodo.setAttribute("placeholder","Text will go here");
                    todoDiv.appendChild(newTodo);

                
                // CREATE ACTIONS CONTAINER
                const actionsContainer = document.createElement("div");
                actionsContainer.classList.add("actions-container");
                todoDiv.appendChild(actionsContainer)
                
                    // CREATE FINISH TASK LABEL
                    const finishedTask = document.createElement("label"); 
                    finishedTask.classList.add("finished-task");
                    actionsContainer.appendChild(finishedTask);

                        // CREATE CHECKBOX COMPLETE BUTTON
                        const completedButton = document.createElement("input");
                        completedButton.classList.add("complete-btn");
                        completedButton.setAttribute("type", "checkbox");
                        finishedTask.appendChild(completedButton);

                    // CREATE ACTIONS DIV
                    const actionsDiv = document.createElement("div");
                    actionsDiv.classList.add("actions");
                    actionsContainer.appendChild(actionsDiv);

                        // CREATE EDIT BUTTON
                        const editButton = document.createElement("button");
                        editButton.innerHTML = 'Edit';
                        editButton.classList.add("edit");
                        actionsDiv.appendChild(editButton);

                        // CREATE DELETE BUTTON
                        const trashButton = document.createElement("button");
                        trashButton.innerHTML = 'Delete';
                        trashButton.classList.add("delete");
                        actionsDiv.appendChild(trashButton);

                        // APPEND TASK TO TASK CONTAINER
                        taskWrap.appendChild(todoDiv);
                        todoInput.value = "";
                    
                });
    }

    function removeLocalTodos(todo) {
        let todos;
        if(localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }

        const todoIndex = todo.children[0].innerText;
        todos.splice(todos.indexOf(todoIndex), 1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }