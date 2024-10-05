// script.js

let count = 0;
let timerInterval;
let elapsedTime = 0; // Track elapsed time in seconds
let timerRunning = false;

// Load previous count and timer from local storage
document.addEventListener("DOMContentLoaded", () => {
    const storedCount = localStorage.getItem("ticketCount");
    const storedTime = localStorage.getItem("elapsedTime");

    if (storedCount) {
        count = parseInt(storedCount, 10);
        document.getElementById("count").textContent = count;
    }

    if (storedTime) {
        elapsedTime = parseInt(storedTime, 10);
        updateTimerDisplay();
    }
});

// Function to update the displayed timer
function updateTimerDisplay() {
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    document.getElementById("timerDisplay").textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Increase ticket count
document.getElementById("increase").addEventListener("click", () => {
    count++;
    document.getElementById("count").textContent = count;
    localStorage.setItem("ticketCount", count);
});

// Decrease ticket count
document.getElementById("decrease").addEventListener("click", () => {
    if (count > 0) {
        count--;
        document.getElementById("count").textContent = count;
        localStorage.setItem("ticketCount", count);
    }
});

// Reset counter
document.getElementById("resetCounter").addEventListener("click", () => {
    count = 0;
    document.getElementById("count").textContent = count;
    localStorage.setItem("ticketCount", count);
});

// Start timer
document.getElementById("startTimer").addEventListener("click", () => {
    if (!timerRunning) {
        timerRunning = true;
        document.getElementById("timerStatus").classList.remove("yellow");
        document.getElementById("timerStatus").classList.add("green");
        timerInterval = setInterval(() => {
            elapsedTime++;
            updateTimerDisplay();
            localStorage.setItem("elapsedTime", elapsedTime); // Save to local storage

            // Play beep sound every 15 minutes (900 seconds)
            if (elapsedTime % 900 === 0 && elapsedTime > 0) {
                document.getElementById("beepSound").play();
            }
        }, 1000);
    }
});

// Stop timer
document.getElementById("stopTimer").addEventListener("click", () => {
    timerRunning = false;
    clearInterval(timerInterval);
    document.getElementById("timerStatus").classList.remove("green");
    document.getElementById("timerStatus").classList.add("yellow");
});

// Reset timer
document.getElementById("resetTimer").addEventListener("click", () => {
    elapsedTime = 0;
    updateTimerDisplay();
    localStorage.setItem("elapsedTime", elapsedTime); // Reset in local storage
});
