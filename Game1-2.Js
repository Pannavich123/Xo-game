const boardElement = document.getElementById('board');
const winnerElement = document.getElementById('winner');
const resetButton = document.getElementById('reset');
const playerModeButton = document.getElementById('playerMode');
const aiModeButton = document.getElementById('aiMode');
const scoreElement = document.getElementById('score');

let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameOver = false;
let isVsAI = false;
let playerXScore = 0;
let playerOScore = 0;

// แสดงกระดาน
function renderBoard() {
  boardElement.innerHTML = '';
  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.textContent = cell;

    if (cell) {
      cellElement.classList.add('clicked');
    }

    cellElement.addEventListener('click', () => handleCellClick(index));
    boardElement.appendChild(cellElement);
  });
}

// การคลิกที่ช่องกระดาน
function handleCellClick(index) {
  if (board[index] || gameOver) return;

  board[index] = currentPlayer;
  renderBoard();

  if (checkWinner()) {
    winnerElement.textContent = `Player ${currentPlayer} Wins!`;
    updateScore();
    gameOver = true;
    return;
  }

  if (board.every(cell => cell)) {
    winnerElement.textContent = "It's a draw!";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  
  if (isVsAI && currentPlayer === 'O') {
    setTimeout(aiMove, 500);
  }
}

// ตรวจสอบผู้ชนะ
function checkWinner() {
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
    const [a, b, c] = combination;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

// การเดินหมากของ AI
function aiMove() {
  if (gameOver) return;

  const availableMoves = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
  const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];

  board[move] = 'O';
  renderBoard();

  if (checkWinner()) {
    winnerElement.textContent = "AI Wins!";
    updateScore();
    gameOver = true;
    return;
  }

  if (board.every(cell => cell)) {
    winnerElement.textContent = "It's a draw!";
    gameOver = true;
    return;
  }

  currentPlayer = 'X';
}

// อัปเดตคะแนน
function updateScore() {
  if (currentPlayer === 'X') {
    playerXScore++;
  } else {
    playerOScore++;
  }
  scoreElement.textContent = `Player X: ${playerXScore} - Player O: ${playerOScore}`;
}

// รีเซ็ตเกม
function resetGame() {
  board.fill(null);
  currentPlayer = 'X';
  gameOver = false;
  winnerElement.textContent = '';
  renderBoard();
}

// เลือกโหมดเล่น 2 คน
playerModeButton.addEventListener('click', () => {
  isVsAI = false;
  startGame();
});

// เลือกโหมดเล่นกับ AI
aiModeButton.addEventListener('click', () => {
  isVsAI = true;
  startGame();
});

// เริ่มเกม
function startGame() {
  board.fill(null);
  currentPlayer = 'X';
  gameOver = false;
  winnerElement.textContent = '';
  renderBoard();
}

// รีเซ็ตเกม
resetButton.addEventListener('click', resetGame);

renderBoard();
