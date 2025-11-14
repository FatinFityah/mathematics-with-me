// 1. GET ELEMENTS FROM THE DOM
const questionEl = document.getElementById('question');
const answerInput = document.getElementById('answer-input');
const submitBtn = document.getElementById('submit-btn');
const scoreEl = document.getElementById('score');
const feedbackEl = document.getElementById('feedback');

// 2. STATE VARIABLES
let score = 0;
let currentCorrectAnswer;

// 3. GENERATE A NEW QUESTION
function generateQuestion() {
    // Clear previous feedback and input
    feedbackEl.textContent = '';
    feedbackEl.className = '';
    answerInput.value = '';
    
    // Generate two random numbers (1-10)
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    
    // Randomly pick an operation: 0 = addition, 1 = multiplication
    const operationType = Math.floor(Math.random() * 2);

    if (operationType === 0) {
        // Addition
        questionEl.textContent = `What is ${num1} + ${num2}?`;
        currentCorrectAnswer = num1 + num2;
    } else {
        // Multiplication
        questionEl.textContent = `What is ${num1} x ${num2}?`;
        currentCorrectAnswer = num1 * num2;
    }
}

// 4. CHECK THE USER'S ANSWER
function checkAnswer() {
    // Get the user's answer from the input box
    const userAnswer = parseInt(answerInput.value, 10);

    // Check if the answer is valid (not empty)
    if (isNaN(userAnswer)) {
        feedbackEl.textContent = 'Please enter a number!';
        feedbackEl.className = 'wrong';
        return; // Stop the function here
    }

    // Check if the answer is correct
    if (userAnswer === currentCorrectAnswer) {
        // Feedback for correct answer
        feedbackEl.textContent = 'Correct!';
        feedbackEl.className = 'correct';
        
        // Update score
        score++;
        scoreEl.textContent = score;
    } else {
        // Feedback for wrong answer
        feedbackEl.textContent = `Wrong! The correct answer was ${currentCorrectAnswer}.`;
        feedbackEl.className = 'wrong';
    }

    // Generate a new question after a short delay
    setTimeout(generateQuestion, 1200);
}

// 5. EVENT LISTENERS
// Run checkAnswer when the button is clicked
submitBtn.addEventListener('click', checkAnswer);

// Allow user to press "Enter" key to submit
answerInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

// 6. INITIALIZE GAME
// Show the first question when the page loads
generateQuestion();
