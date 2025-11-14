// --- DOM ELEMENTS ---
const gameArea = document.getElementById('game-area');
const feedbackArea = document.getElementById('feedback-area');
const startBtn = document.getElementById('start-btn');
const submitBtn = document.getElementById('submit-btn');
const answerInput = document.getElementById('answer-input');

const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const questionEl = document.getElementById('question');
const feedbackEl = document.getElementById('feedback');

// --- GAME STATE ---
let score;
let timeLeft;
let timerInterval;
let currentCorrectAnswer;

// --- 1. START GAME FUNCTION ---
function startGame() {
    // Reset state
    score = 0;
    timeLeft = 30;
    
    // Update display
    scoreEl.textContent = score;
    timerEl.textContent = timeLeft;
    feedbackEl.textContent = '';
    
    // Show the game area, hide the start button
    gameArea.classList.remove('hidden');
    feedbackArea.classList.add('hidden'); // Hide the whole feedback/start area
    
    generateQuestion();
    
    // Start the timer
    timerInterval = setInterval(updateTimer, 1000);
}

// --- 2. TIMER FUNCTION ---
function updateTimer() {
    timeLeft--;
    timerEl.textContent = timeLeft;
    
    if (timeLeft <= 0) {
        endGame();
    }
}

// --- 3. END GAME FUNCTION ---
function endGame() {
    clearInterval(timerInterval); // Stop the timer
    
    // Hide the game area, show the feedback/start area
    gameArea.classList.add('hidden');
    feedbackArea.classList.remove('hidden');
    
    // Show final score
    feedbackEl.textContent = `Time's up! Your final score is ${score}.`;
    startBtn.textContent = 'Play Again?'; // Change button text
}

// --- 4. GENERATE QUESTION ---
function generateQuestion() {
    answerInput.value = ''; // Clear input
    
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    
    questionEl.textContent = `What is ${num1} x ${num2}?`;
    currentCorrectAnswer = num1 * num2;
}

// --- 5. CHECK ANSWER ---
function checkAnswer() {
    const userAnswer = parseInt(answerInput.value, 10);
    
    if (isNaN(userAnswer)) {
        // We can give feedback, but in a timed game, 
        // it's often better to just ignore bad input
        return; 
    }

    if (userAnswer === currentCorrectAnswer) {
        score++;
        scoreEl.textContent = score;
    }
    
    // Generate a new question whether the answer was right or wrong
    generateQuestion();
}

// --- EVENT LISTENERS ---
startBtn.addEventListener('click', startGame);
submitBtn.addEventListener('click', checkAnswer);

// Allow pressing "Enter" to submit
answerInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});
