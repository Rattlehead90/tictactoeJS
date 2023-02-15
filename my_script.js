// Variables declaration

const popUpForm = document.querySelector('.popup-form');
const popUpRetry = document.querySelector('.popup-retry');
const button = document.querySelector('.popup-form button');
const buttonRetry = document.querySelector('.popup-retry button');
const firstPlayerNameInput = document.getElementById('name1');
const secondPlayerNameInput = document.getElementById('name2');
const scoreBoard = document.querySelector('.score');
const grid = document.querySelector('.grid');
const cells = grid.querySelectorAll('.cell');
let turn = 0;
let currentPlayer = null;

// Factory functions

const playerFactory = (name, mark, winCount) => {
  return { name, mark, winCount };
}

const Board = () => {
  let board = Array(9).fill(0);
  let isWon = false;
  const winningCombinations = [
    [0, 4, 8], [2, 4, 6], [0, 1, 2],
    [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8]
  ];
  const checkWin = () => {
    return winningCombinations.some(combination => {
      return combination.every(index => {
        return cells[index].firstChild?.classList.contains(currentPlayer.mark);
      });
    });
  }

  return { isWon, checkWin }
}

// Functions

function initializeGame() {
  player1 = playerFactory(firstPlayerNameInput.value, 'cross', 0);
  player2 = playerFactory(secondPlayerNameInput.value, 'circle', 0);
  currentPlayer = player1;
  popUpForm.style.display = 'none';
  reloadScoreBoard();
  board = Board();
}

function reloadScoreBoard() {
  scoreBoard.textContent = `${player1.name} ${player1.winCount} | ${player2.winCount} ${player2.name}`;
}

function switchPlayer() {
  currentPlayer = currentPlayer === player1 ? player2 : player1; 
}

function markCell() {
if (!board.isWon && this.childElementCount === 0) {
  const markImage = document.createElement('img');
  markImage.classList.add(`${currentPlayer.mark}`);
  markImage.src = `./assets/${currentPlayer.mark}.png`;
  this.appendChild(markImage);
  turn++;
  if (board.checkWin()) {
    endGame();
  } else {
    if (turn === 9) {
      drawGame();
    }
    switchPlayer();
  } 
}
}

function endGame() {
  popUpRetry.childNodes[1].textContent = `${currentPlayer.name} has won the game!`;
  currentPlayer.winCount++;
  reloadScoreBoard();
  board.isWon = true;
  popUpRetry.style.display = 'flex';
}

function restartGame() {
  popUpRetry.style.display = 'none';
  board.isWon = false;
  turn = 0;
  cells.forEach((cell) => {
    if (cell.firstChild) {
      cell.removeChild(cell.firstChild);
    };
  });
  currentPlayer = player1;
}

function drawGame() {
  popUpRetry.childNodes[1].textContent = 'Draw!'
  popUpRetry.style.display = 'flex';
}


// Popup initialization

popUpForm.classList.add('animate-on-load');

// Event listeners

button.addEventListener('click', initializeGame);

buttonRetry.addEventListener('click', restartGame);

cells.forEach((cell) => {
  cell.addEventListener('click', markCell);
})
