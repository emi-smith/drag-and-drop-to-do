
//NOTE MODALS
//Modal items
const noteModal = document.getElementById("note-id");

const openNoteBtn = document.querySelector("#notify-btn-id");


const closeNoteBtn = document.querySelector(".close-note-btn");

//Click events
// Main Note
openNoteBtn.addEventListener("click", () => {
	noteModal.style.display = "block";
});

//Close
closeNoteBtn.addEventListener("click", () => {
	noteModal.style.display = "none";
});

window.addEventListener("click", (e) => {
	if (e.target === noteModal) {
		noteModal.style.display = "none";
	}
});