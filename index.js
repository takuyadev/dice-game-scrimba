// Create variables for the game state
let player1Score = 0
let player2Score = 0
let dice = 1;
let player1Turn = true

// New variables
let turnCount = 0;
let playerTurn = 1;

// Create variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const message = document.getElementById("message")
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")
const randomNumber = () => Math.floor(Math.random() * 6) + 1;
rollBtn.style.display = "block";

function renderActive() {
    if (playerTurn === 1) {
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
    } else {
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
    }
}

function renderPlayerOne() {
    if (player1Score === 0) {
        player1Dice.textContent = `-`;
    }
    else {
        player1Dice.textContent = dice;
    }
    renderActive();
    player1Scoreboard.textContent = player1Score
    message.textContent = "Player 2 Turn"
}

function renderPlayerTwo() {
    if (player2Score === 0) {
        player2Dice.textContent = `-`;
    }
    else {
        player2Dice.textContent = dice;
    }
    renderActive();
    player2Scoreboard.textContent = player2Score
    message.textContent = "Player 1 Turn"
}

const checkWinCondition = () => {
    if (player1Score >= 20 || player2Score >= 20) {
        if (player1Score > player2Score) {
            message.textContent = "Player 1 Wins!";
        } else if (player2Score > player1Score) {
            message.textContent = "Player 2 Wins!";
        } else {
            message.textContent = "It's a draw!";
        }
        
        showDisplayButton();
    }
}

function showDisplayButton() {
    if (rollBtn.style.display === "block") {
        rollBtn.style.display = "none"
        resetBtn.style.display = "block"
    } else {
        resetBtn.style.display = "none"
        rollBtn.style.display = "block"
    }
}

function updateScore(num) {
    dice = num;
    if (num === 0) {
        player1Score = 0
        player2Score = 0
        playerTurn = 1;
    }
    else if (playerTurn === 1) {
        player1Score += num
        renderPlayerOne()
        playerTurn = 2;
    } else {
        player2Score += num
        renderPlayerTwo()
        playerTurn = 1;
        checkWinCondition()
    }
}

function reset() {
    updateScore(0)
    renderPlayerOne(0)
    renderPlayerTwo(0)
    playerTurn = 2;
    renderActive();
    showDisplayButton();
}

//Game will end when first person to get 20 points

/* Hook up a click event listener to the Roll Dice Button. */
rollBtn.addEventListener("click", function () {
    updateScore(randomNumber())
})

resetBtn.addEventListener("click", function () {
    reset()
})

