const Game = (() => {
  const board = document.getElementById('board');
  const modalSelectPlayer = document.getElementById('selectBox');
  const cellsElements = document.querySelectorAll('[data-cell]');
  const resultBox = document.getElementById('winningMessage');
  const winningMessage = document.querySelector('[data-winning-message-text]');
  const btnPlayers = document.getElementById('players');
  const restartButton = document.getElementById('restartBtn');
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  let origBoard;
  let aiPlayer;
  let Hplayer;

  const startGame = () => {
    origBoard = Array.from(Array(9).keys());
    btnPlayers.addEventListener('click', handlePlayerButtonClick);
    restartButton.addEventListener('click', resetGame);

    cellsElements.forEach(cell => {
      cell.addEventListener('click', handleCellClick, { once: true });
    });
  }

  const handlePlayerButtonClick = (e) => {
    Hplayer = e.target.value;
    aiPlayer = Hplayer === "x" ? "circle" : "x";
    modalSelectPlayer.classList.add('hide');
    board.classList.remove('hide');
  }

  const handleCellClick = (event) => {
    if (!checkWin(origBoard, Hplayer) && !checkTie()) {
      makeMove(event.target, Hplayer);
      if (!checkWin(origBoard, Hplayer) && !checkTie()) {
        setTimeout(() => {
          makeMove(cellsElements[computerMove()], aiPlayer);
        }, 500);
      } else if (checkTie()) {
        displayResult("It's a tie!");
      }
    }
  }

  const makeMove = (squareClass, player) => {
    const squareId = squareClass.id;
    origBoard[squareId] = player;
    squareClass.classList.add(player);
    let gameWon = checkWin(origBoard, player);
    if (gameWon) {
      gameOver(gameWon);
    }
  }

  const resetGame = () => {
    window.location.reload();
  }

  const checkWin = (board, player) => {
    let plays = board.reduce((a, e, i) => 
      ((e === player)) ? a.concat(i) : a, []);
    let gameWon = null;
    for(let [index, win] of winCombos.entries()) {
      if(win.every(elem => plays.indexOf(elem) > -1)) {
        resultBox.classList.add('show')
        gameWon = {player: player}
        break;
      }
    }
    return gameWon;  
  }

  const gameOver = (gameWon) => {
    if (gameWon) {
      displayResult(`${gameWon.player === "circle" ? 'O' : 'X'}'s wins!!`);
    }
  }

  const displayResult = (message) => {
    resultBox.classList.add('show');
    winningMessage.innerHTML = message;
  }

  const checkTie = () => {
    return emptySquares().length === 0;
  }

  const emptySquares = () => {
    return origBoard.filter(s => typeof s === "number")
  }

  const computerMove = () => {
    const availableSquares = emptySquares();
    const randomIndex = Math.floor(Math.random() * availableSquares.length);
    const squareId = availableSquares[randomIndex];

    return squareId;
  }

  return {
    startGame
  };
})();

Game.startGame();
