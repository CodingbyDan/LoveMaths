// Wait for the DOM to finish loading before running the game


// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function() {
    // Add the buttons into an array that can be iterrated through
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            // "this" refers to the button that was just clicked, getAttribute will then check the data type content of that button.
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            }
            else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType)
            }
        })
    }

    // Listener to submit the answer by pressing Enter key
    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    }) 

    runGame("addition")
})

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {
    // Makes sure the answer box is emptied before each new question.
    document.getElementById("answer-box").value = "";
    // Makes sure the cursor is already active in the answer box (focus)
    document.getElementById("answer-box").focus();

    // whole number, randomly generated up to 25 and +1 to round up, not down.
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    }
    else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    }
    else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    }
    else if (gameType === "division") {
        displayDivideQuestion(num1, num2);
    }
        
    else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`
    }
}

/**
 * Checks the answer against the first element in the returned calculateCorrectAnswer array.
 */
function checkAnswer() {

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Hey! You got it right! :D")
        incrementScore();
    }
    else {
        alert(`Oh dear, you answered ${userAnswer}. The correct answer is ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }
    // Runs another game of the current type [1]
    runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands (the numbers) and the operator (plus, minus etc)
 * directly from the DOM, and returns the correct answer.
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    }
    else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    }
    else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    }
    else if (operator === "/") {
        return [operand1 / operand2, "division"];
    }
    else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}.Aborting!`;
    }
}

/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore() {

    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1
 */
function incrementWrongAnswer() {

    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {

    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";

}

function displaySubtractQuestion(operand1, operand2) {

    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {

    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";

}

function displayDivisionQuestion(operand1, operand2) {

    operand1 = operand1 * operand2;
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "/";
    
}