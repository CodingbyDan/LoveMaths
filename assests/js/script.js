// Wait for the DOM to finish loading before running the game


// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function() {
    // Add the buttons into an array that can be iterrated through
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            // "this" refers to the button that was just clicked, getAttribute will then check the data type content of that button.
            if (this.getAttribute("data-type") === "submit") {
                alert("You clicked submit");
            }
            else {
                let gameType = this.getAttribute("data-type");
                alert(`You clicked ${gameType}`);
            }
        })
    }
})


function runGame() {

}

function checkAnswer() {

}

function calculateCorrectAnswer() {

}

function incrementScore() {

}

function incrementWrongAnswer() {

}

function displayAdditionQuestion() {

}

function displaySubtractQuestion() {

}

function displayMultiplyQuestion() {

}