//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.

/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [6, 4, 2],
  [0, 4, 8]
];

/*---------------------------- Variables (state) ----------------------------*/

let board = ['','','','','','','','',''];
let turn = 'X';
let winner = false;
let tie = false;

/*------------------------ Cached Element References ------------------------*/

const squareEls = Array.from(document.getElementsByClassName('sqr'));
const messageEl = document.getElementById('message');
const resetBtn = document.getElementById('reset-btn');


/*----------------------------- Functions -----------------------------*/

 const render = () => {
  board.forEach((square, index) => {
    squareEls[index].textContent = square
  })

  if (winner) {
    messageEl.textContent = `${winner} wins!`;
  } else if (tie) {
    messageEl.textContent = "It's a tie!";
  } else {
    messageEl.textContent = `Player ${turn}'s turn`;
  }
}

// Click Handler
const handleClick = (event) => {
  const index = squareEls.indexOf(event.target);
  if (board[index] === '' && !winner) {
    board[index] = turn;
    checkWin();
    turn = turn === 'X' ? 'O' : 'X';
    render();
  }
}

// Checking Game Winner
const checkWin = () => {
  winningCombos.forEach(combo => {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
    }
  });
  if (!board.includes('') && !winner) {
    tie = true;
  }
}

// Game init 
const init = () => {
  render();
}
init();

//Game Reset
const resetGame = () => {
  board = ['','','','','','','','',''];
  turn = 'X';
  winner = false;
  tie = false;
  render();
}


/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(squareEl => {
  squareEl.addEventListener('click', handleClick);
});

resetBtn.addEventListener('click', resetGame);


