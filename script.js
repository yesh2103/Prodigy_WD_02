// Selecting elements
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const stopwatchDisplay = document.getElementById('stopwatchDisplay');
const lapList = document.getElementById('lapList');

// Variables to track time
let startTime;
let elapsedTime = 0;
let timerInterval;

// Start button click event
startBtn.addEventListener('click', function() {
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
});

// Pause button click event
pauseBtn.addEventListener('click', function() {
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    clearInterval(timerInterval);
});

// Reset button click event
resetBtn.addEventListener('click', function() {
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    lapList.innerHTML = '';
});

// Lap button click event
lapBtn.addEventListener('click', function() {
    const currentTime = elapsedTime;
    const formattedTime = formatTime(currentTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapList.children.length + 1}: ${formattedTime}`;
    lapList.appendChild(lapItem);
});

// Function to update time and display
function updateTime() {
    const currentMs = Date.now();
    elapsedTime = currentMs - startTime;
    updateDisplay();
}

// Function to update the stopwatch display
function updateDisplay() {
    stopwatchDisplay.textContent = formatTime(elapsedTime);
}

// Function to format time as hh:mm:ss
function formatTime(milliseconds) {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}
