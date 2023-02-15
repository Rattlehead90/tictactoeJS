const grid = document.querySelector('.grid');
const cells = document.querySelectorAll('.cell');
const score = document.querySelector('.score');
const popupForm = document.querySelector('.popup-form');
const player1Name = document.querySelector('#name1');
const player2Name = document.querySelector('#name2');
const button = document.querySelector('button');
let currentPlayer = 'X';
let gamePlaying = false;
let moves = 0;
let scorePlayer1 = 0;
let scorePlayer2 = 0;


// Function to switch player
function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to check for a win
function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentPlayer);
    });
  });
}

// Function to end the game
function endGame() {
  grid.classList.add('disable');
  gamePlaying = false;
  if (currentPlayer === 'X') {
    scorePlayer1 += 1;
    score.textContent = `${player1Name.value} (${currentPlayer}) won! ${player1Name.value}: ${scorePlayer1} vs ${player2Name.value}: ${scorePlayer2}`;
  } else {
    scorePlayer2 += 1;
    score.textContent = `${player2Name.value} (${currentPlayer}) won! ${player1Name.value}: ${scorePlayer1} vs ${player2Name.value}: ${scorePlayer2}`;
  }
}

// Function to check for a draw
function checkDraw() {
  if (moves === 9) {
    grid.classList.add('disable');
    score.textContent = 'It is a draw!';
  }
}

// Function to play the game
function playGame() {
  moves = 0;
  gamePlaying = true;
  grid.classList.remove('disable');
  cells.forEach(cell => {
    cell.classList.remove('X');
    cell.classList.remove('O');
    cell.addEventListener('click', cellClicked);
  });
  score.textContent = '';
}

// Function to handle cell clicks
function cellClicked(event) {
  const cell = event.target;
  if (!cell.classList.contains('X') && !cell.classList.contains('O')) {
    cell.classList.add(currentPlayer);
    moves++;
    if (checkWin()) {
      endGame();
    } else {
      switchPlayer();
      if (gamePlaying) {
        checkDraw();
      }
    }
  }
}

// Function to start the game
function startGame(event) {
  event.preventDefault();
  if (player1Name.value !== '' && player2Name.value !== '') {
    popupForm.classList.add('hide');
    playGame();
  } else {
    alert('Please enter player names.');
  }
}

// Event listeners
button.addEventListener('click', startGame);
