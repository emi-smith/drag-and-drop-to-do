// Highlight task when it is being dragged
const draggables = document.querySelectorAll(".todo");
const droppables = document.querySelectorAll(".todo-list");
const taskDrag = document.querySelector(".todo")

draggables.forEach((taskDrag) => {
    taskDrag.addEventListener("dragstart", () => {
        taskDrag.classList.add("is-dragging");
    });
    taskDrag.addEventListener("dragend", () => {
        taskDrag.classList.remove("is-dragging");
    });
});

// Drop zones
droppables.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
        e.preventDefault();

        const bottomTask = insertAboveTask(zone, e.clientY);
        const curTask = document.querySelector(".is-dragging");
        if (!bottomTask) {
            zone.appendChild(curTask);
        } else {
            zone.insertBefore(curTask, bottomTask);
        }

    });
});

const insertAboveTask = (zone, mouseY) => {
    const els = zone.querySelectorAll(".todo:not(.is-dragging)");

    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    els.forEach((taskDrag) => {
        const { top } = taskDrag.getBoundingClientRect();

        const offset = mouseY - top;

        if (offset < 0 && offset > closestOffset) {
            closestOffset =  offset;
            closestTask = taskDrag
        }
    });

    return closestTask;
};