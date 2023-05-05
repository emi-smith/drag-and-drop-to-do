// Highlight task when it is being dragged
const draggables = document.querySelectorAll(".tasks");
const droppables = document.querySelectorAll(".cards");

draggables.forEach((tasks) => {
    tasks.addEventListener("dragstart", () => {
        tasks.classList.add("is-dragging");
    });
    tasks.addEventListener("dragend", () => {
        tasks.classList.remove("is-dragging");
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
    const els = zone.querySelectorAll(".tasks:not(.is-dragging)");

    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    els.forEach((tasks) => {
        const { top } = tasks.getBoundingClientRect();

        const offset = mouseY - top;

        if (offset < 0 && offset > closestOffset) {
            closestOffset =  offset;
            closestTask = tasks
        }
    });

    return closestTask;
};