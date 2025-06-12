const WORK_MINUTES = 25;
const SHORT_BREAK_MINUTES = 5;
const LONG_BREAK_MINUTES = 15;

let time = WORK_MINUTES * 60;
let isRunning = false;
let interval;
let currentMode = 'work';

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    document.getElementById('timeDisplay').textContent = formatTime(time);
    document.getElementById('status').textContent = 
        currentMode === 'work' ? '作業時間' : 
        currentMode === 'shortBreak' ? '短い休憩' : 
        '長い休憩';
}

function startTimer() {
    if (!isRunning) {
        interval = setInterval(() => {
            if (time > 0) {
                time--;
                updateDisplay();
            } else {
                switchMode();
            }
        }, 1000);
        isRunning = true;
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(interval);
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(interval);
    time = currentMode === 'work' ? WORK_MINUTES * 60 : 
           currentMode === 'shortBreak' ? SHORT_BREAK_MINUTES * 60 : 
           LONG_BREAK_MINUTES * 60;
    isRunning = false;
    updateDisplay();
}

function switchMode() {
    if (currentMode === 'work') {
        currentMode = 'shortBreak';
        time = SHORT_BREAK_MINUTES * 60;
    } else if (currentMode === 'shortBreak') {
        currentMode = 'work';
        time = WORK_MINUTES * 60;
    }
    updateDisplay();
}

// ボタンのイベントリスナーを設定
document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);

// 初期表示
updateDisplay();
