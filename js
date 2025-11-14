// Initialize variables
let score = 0;       // Player's score
let timeLeft = 60;  // Initial time limit
let timer;          // Timer variable
let correctAnswer;  // Store the correct answer separately

// Function to generate a math question
function generateQuestion() {
    // Generate two random numbers
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    //Choose a random operator (+, -, or *)
    const operatorIndex = Math.floor(Math.random() * 3);

    // Calculate the correct answer based on the selected operator
    switch (operatorIndex) {
        case 0:
            correctAnswer = num1 + num2;
            break;
        case 1:
            correctAnswer = num1 - num2;
            break;
        case 2:
            correctAnswer = num1 * num2;
            break;
    }

    // Create the math expression and display it on the page
    const operator = ['+', '-', '*'][operatorIndex];
    const expression = `${num1} ${operator} ${num2}`;
    document.getElementById("question").textContent = expression;
}

// Function to start the timer
function startTimer() {
    timer = setInterval(function () {
        // Decrement the time left, update the displayed time, and check if time is up
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;
        if (timeLeft === 0) {
            // Stop the timer
            clearInterval(timer); 
            document.getElementById("result").textContent = `Time's up! Your final score is ${score}`;
            // Disable input field
            document.getElementById("input").disabled = true; 
            // Disable submit button
            document.getElementById("submit-button").disabled = true; 
        }
    }, 1000); // Update every 1 second
}

// Function to check the player's answer
function checkAnswer() {
    // Get the user's answer from the input field
    const userAnswer = parseFloat(document.getElementById("input").value);

    // Compare the user's answer to the correct answer
    if (userAnswer === correctAnswer) {
        score++; // Increment the score for each correct answer
        document.getElementById("score").textContent = score; // Update the displayed score
        document.getElementById("result").style.color = "Green";
        document.getElementById("result").textContent = "Correct!";
    } else {
        document.getElementById("result").style.color = "Red";
        document.getElementById("result").textContent = `Incorrect. The correct answer is ${correctAnswer}. Try again!`;
    }

    // Clear the input field and generate a new question
    document.getElementById("input").value = "";
    generateQuestion();
}

// Function to start the game
function startGame() {
    // Reset variables and UI elements to start a new game
    score = 0;
    timeLeft = 60;
    document.getElementById("input").disabled = false;
    document.getElementById("input").textContent = "";
    document.getElementById("result").textContent = "";
    document.getElementById("score").textContent = score;
    document.getElementById("time").textContent = timeLeft;

    // Start the timer, generate the first question, and begin the game
    startTimer();
    generateQuestion();
}

// Start the game when the page loads
startGame();
