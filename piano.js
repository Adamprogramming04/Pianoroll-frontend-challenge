// Variables to track selection state
let isSelecting = false;
let selectionStartX, selectionStartY;
let selectionOverlay = document.querySelector(".selection-overlay");

// Add a click event listener to the main piano roll
const mainPianoRoll = document.querySelector(".main-piano-roll");
mainPianoRoll.addEventListener("mousedown", startSelection);

// Add mousemove and mouseup event listeners to the document
document.addEventListener("mousemove", extendSelection);
document.addEventListener("mouseup", endSelection);

function startSelection(event) {
    isSelecting = true;
    selectionStartX = event.clientX;
    selectionStartY = event.clientY;

    // Set the initial position and dimensions of the selection overlay
    selectionOverlay.style.left = selectionStartX + "px";
    selectionOverlay.style.top = selectionStartY + "px";
    selectionOverlay.style.width = "0";
    selectionOverlay.style.height = "0";

    // Show the selection overlay
    selectionOverlay.style.display = "block";
}

function extendSelection(event) {
    if (!isSelecting) return;

    // Calculate the dimensions of the selection overlay
    const currentX = event.clientX;
    const currentY = event.clientY;
    const width = currentX - selectionStartX;
    const height = currentY - selectionStartY;

    // Update the position and dimensions of the selection overlay
    selectionOverlay.style.width = Math.abs(width) + "px";
    selectionOverlay.style.height = Math.abs(height) + "px";
    selectionOverlay.style.left = (width < 0 ? currentX : selectionStartX) + "px";
    selectionOverlay.style.top = (height < 0 ? currentY : selectionStartY) + "px";
}

function endSelection(event) {
    if (!isSelecting) return;

    isSelecting = false;

    // Hide the selection overlay
    selectionOverlay.style.display = "none";

    // Capture the selection data
    const selectionData = {
        startX: selectionStartX,
        startY: selectionStartY,
        endX: event.clientX,
        endY: event.clientY,
    };

    // Calculate the number of notes within the selection (simulated here)
    const numberOfNotes = Math.floor(Math.random() * 20); // Replace with actual calculation

    // Log the selection data and number of notes
    console.log("Selection Data:", selectionData);
    console.log("Number of Notes Selected:", numberOfNotes);
}
