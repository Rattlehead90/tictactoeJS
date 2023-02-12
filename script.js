const popUpForm = document.querySelector('.popup-form');
const button = document.querySelector('button');
const firstPlayerNameInput = document.getElementById('name1');
const secondPlayerNameInput = document.getElementById('name2');
const scoreBoard = document.querySelector('.score');

const playerFactory = (name, mark, winCount) => {
  return { name, mark, winCount };
}

const Board = () => {
  let board = Array(9).fill(0);
  let isWon = false;
  const winning_combinations = [
    [0, 4, 8], [2, 4, 6], [0, 1, 2],
    [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8]
  ];
}

const middleCell = document.querySelector('.cell:nth-child(5)');
console.log(middleCell);

// Name input on start

popUpForm.classList.add('animate-on-load');

button.addEventListener('click', () => {
  player1 = playerFactory(firstPlayerNameInput.value, './assets/cross.png', 0);
  player2 = playerFactory(secondPlayerNameInput.value, './assets/circle.png', 0);
  popUpForm.style.display = 'none';
  scoreBoard.textContent = `${player1.name} ${player1.winCount} | ${player2.winCount} ${player2.name}`
});