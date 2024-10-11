// script.js

let count = 0;
let timerInterval;
let elapsedTime = 0; // Track elapsed time in seconds
let soundElapsedTime = 0; // Track elapsed time for sound interval
let timerRunning = false;
let soundInterval = 15 * 60; // Default sound interval in seconds (15 minutes)

// Load previous count and timer from local storage
document.addEventListener("DOMContentLoaded", () => {
    const storedCount = localStorage.getItem("ticketCount");
    const storedTime = localStorage.getItem("elapsedTime");
    const storedSoundInterval = localStorage.getItem("soundInterval");

    if (storedCount) {
        count = parseInt(storedCount, 10);
        document.getElementById("count").value = count; // Update the input field with the stored count
    }

    if (storedTime) {
        elapsedTime = parseInt(storedTime, 10);
        updateTimerDisplay();
    }

    if (storedSoundInterval) {
        soundInterval = parseInt(storedSoundInterval, 10);
        document.getElementById("soundInterval").value = soundInterval / 60; // Set initial value in input
        updateSoundTimerDisplay(soundInterval); // Initialize sound timer display with the stored sound interval
    }
});

// Function to update the displayed timer in hh:mm:ss format
function updateTimerDisplay() {
    const hours = Math.floor(elapsedTime / 3600); // Calculate hours
    const minutes = Math.floor((elapsedTime % 3600) / 60); // Calculate minutes
    const seconds = elapsedTime % 60; // Calculate seconds

    document.getElementById("timerDisplay").textContent = 
        `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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

// Update the counter display and local storage when the input changes
document.getElementById("count").addEventListener("input", (event) => {
    const newCount = parseInt(event.target.value, 10);
    if (!isNaN(newCount) && newCount >= 0) {
        count = newCount;
        localStorage.setItem("ticketCount", count); // Store the updated count
    } else {
        event.target.value = count; // Reset to the current count if invalid
    }
});

// Update counter display and reset sound timer
function updateCounter() {
    document.getElementById("count").value = count; // Update input field with the current count
    localStorage.setItem("ticketCount", count);
    soundElapsedTime = soundInterval; // Reset sound timer to the current interval
    updateSoundTimerDisplay(soundElapsedTime); // Update the sound timer display
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
    timerRunning = true; // Set the timer running state to true
    document.getElementById("timerStatus").classList.remove("orange"); // Remove orange when starting
    document.getElementById("timerStatus").classList.add("green"); // Add green class

    // Reset soundElapsedTime and update the sound timer display with the current interval
    soundElapsedTime = soundInterval; // Start sound timer at the full sound interval
    updateSoundTimerDisplay(soundElapsedTime); // Initialize sound timer with the current sound interval

    // Start the timer interval if it's not already running
    timerInterval = setInterval(() => {
        elapsedTime++;
        soundElapsedTime--; // Decrement sound elapsed time
        updateTimerDisplay();

        // Play sound when elapsed time matches the set interval
        if (soundElapsedTime <= 0) {
            playSound();
            soundElapsedTime = soundInterval; // Reset sound timer to full interval after sound plays
        }

        localStorage.setItem("elapsedTime", elapsedTime);
        updateSoundTimerDisplay(soundElapsedTime); // Update sound timer display
    }, 1000);
}

// Reset the timer and stop it
function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0; // Reset only the main timer
    soundElapsedTime = soundInterval; // Reset sound timer to full interval
    updateTimerDisplay();
    updateSoundTimerDisplay(soundElapsedTime); // Reset sound timer display to the full sound interval
    localStorage.setItem("elapsedTime", elapsedTime);
    timerRunning = false;
    timerInterval = null; // Reset timerInterval
    document.getElementById("timerStatus").classList.remove("green");
    document.getElementById("timerStatus").classList.add("orange"); // Set to orange when reset
}

// Play beep sound
function playSound() {
    const beepSound = document.getElementById("beepSound");
    beepSound.currentTime = 0; // Reset sound to start
    beepSound.play(); // Play sound
}

// Set sound interval based on user input
document.getElementById("setSoundInterval").addEventListener("click", () => {
    const soundIntervalInput = document.getElementById("soundInterval").value; // Use correct input ID
    soundInterval = Math.max(parseInt(soundIntervalInput, 10), 1) * 60; // Convert minutes to seconds
    localStorage.setItem("soundInterval", soundInterval); // Store sound interval in local storage
    soundElapsedTime = soundInterval; // Reset sound elapsed time
    updateSoundTimerDisplay(soundElapsedTime); // Start countdown with the new interval

    // Update the sound timer to ensure it starts with the new interval
    clearInterval(timerInterval); // Clear any existing timer
    startTimer(); // Restart the timer with the new interval
});

// Function to update the sound timer display in MM:SS format
function updateSoundTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    document.getElementById("soundTimerDisplay").textContent =
        `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Initialize sound timer display when loading the page
updateSoundTimerDisplay(soundInterval);
