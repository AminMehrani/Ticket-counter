// script.js

let count = 0;
let timerInterval;
let elapsedTime = 0; // Track elapsed time in seconds
let timerRunning = false;
let soundInterval = 15 * 60; // Default sound interval in seconds (15 minutes)

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
    document.getElementById("timerDisplay").textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Increase and decrease ticket count
document.getElementById("increase").addEventListener("click", () => {
    count++;
    updateCounter();
});

document.getElementById("decrease").addEventListener("click", () => {
    if (count > 0) {
        count--;
        updateCounter();
    }
});

document.getElementById("resetCounter").addEventListener("click", () => {
    count = 0;
    updateCounter();
});

// Update counter display and play sound
function updateCounter() {
    document.getElementById("count").textContent = count;
    localStorage.setItem("ticketCount", count);
    playSound();
    resetTimer(); // Reset the timer whenever the counter is updated
}

// Play beep sound
function playSound() {
    const beepSound = document.getElementById("beepSound");
    beepSound.play();
}

// Timer functionality
document.getElementById("startTimer").addEventListener("click", () => {
    if (!timerRunning) {
        startTimer();
    }
});

document.getElementById("stopTimer").addEventListener("click", () => {
    if (timerRunning) {
        clearInterval(timerInterval);
        timerRunning = false;
        document.getElementById("timerStatus").classList.remove("green");
    }
});

document.getElementById("resetTimer").addEventListener("click", resetTimer);

function startTimer() {
    timerRunning = true;
    timerInterval = setInterval(() => {
        elapsedTime++;
        updateTimerDisplay();

        // Play sound when elapsed time matches the set interval
        if (elapsedTime >= soundInterval) {
            playSound();
            elapsedTime = 0; // Reset the elapsed time after sound plays
        }

        localStorage.setItem("elapsedTime", elapsedTime);
    }, 1000);

    document.getElementById("timerStatus").classList.add("green");
}

// Reset the timer and stop it
function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateTimerDisplay();
    localStorage.setItem("elapsedTime", elapsedTime);
    timerRunning = false;
    document.getElementById("timerStatus").classList.remove("green");
}

// Set custom sound interval
document.getElementById("setInterval").addEventListener("click", () => {
    const inputInterval = document.getElementById("soundInterval").value;
    const minutes = parseInt(inputInterval, 10);
    if (!isNaN(minutes) && minutes > 0) {
        soundInterval = minutes * 60; // Convert minutes to seconds
        alert(`Sound will now play every ${minutes} minute(s).`);
    } else {
        alert("Please enter a valid number of minutes.");
    }
});
