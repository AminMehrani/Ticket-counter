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
    const storedSoundInterval = localStorage.getItem("soundInterval");

    if (storedCount) {
        count = parseInt(storedCount, 10);
        document.getElementById("count").textContent = count;
    }

    if (storedTime) {
        elapsedTime = parseInt(storedTime, 10);
        updateTimerDisplay();
    }

    if (storedSoundInterval) {
        soundInterval = parseInt(storedSoundInterval, 10);
        document.getElementById("soundIntervalInput").value = soundInterval / 60; // Set initial value in input
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

// Update counter display
function updateCounter() {
    document.getElementById("count").textContent = count;
    localStorage.setItem("ticketCount", count);
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
        document.getElementById("timerStatus").classList.add("orange"); // Set to orange when stopped
    }
});

document.getElementById("resetTimer").addEventListener("click", resetTimer);

function startTimer() {
    timerRunning = true;
    document.getElementById("timerStatus").classList.remove("orange"); // Remove orange when starting
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
    document.getElementById("timerStatus").classList.add("orange"); // Set to orange when reset
}

// Play beep sound
function playSound() {
    const beepSound = document.getElementById("beepSound");
    beepSound.currentTime = 0; // Reset sound to the beginning
    beepSound.play();
}

// Set custom sound interval
document.getElementById("setSoundInterval").addEventListener("click", () => {
    const inputInterval = document.getElementById("soundIntervalInput").value;
    const minutes = parseInt(inputInterval, 10);
    if (!isNaN(minutes) && minutes > 0) {
        soundInterval = minutes * 60; // Convert minutes to seconds
        localStorage.setItem("soundInterval", soundInterval); // Save to local storage
        alert(`Sound will now play every ${minutes} minute(s).`);
    } else {
        alert("Please enter a valid number of minutes.");
    }
});
