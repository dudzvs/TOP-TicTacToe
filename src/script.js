const Game = (() => {
  const board = document.getElementById('board');
  const modalSelectPlayer = document.getElementById('selectBox');
  const cellsElements = document.querySelectorAll('[data-cell]');
  const resultBox = document.getElementById('winningMessage');
  const winningMessage = document.querySelector('[data-winning-message-text]')
  const btnPlayers = document.getElementById('players');
  const winCombos =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  let origBoard;
  let aiPlayer;
  let Hplayer;
  let currentPlayer = "x";

  const startGame = () => {
    origBoard = Array.from(Array(9).keys());
    btnPlayers.addEventListener('click', (e) => {
      Hplayer = e.target.value;
      modalSelectPlayer.classList.add('hide');
      board.classList.remove('hide');
    })

    cellsElements.forEach(cell => {
      cell.addEventListener('click', handleClick, {once:true});
    })
  }

  const handleClick = (square) => {
    turn(square.target,square.target.id, Hplayer);
  }

  const turn = (squareClass,squareId, player) => {
    origBoard[squareId] = player;
    squareClass.classList.add(player);
    let gameWon = checkWin(origBoard, player);

    if(gameWon) gameOver(gameWon)
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
    winningMessage.innerHTML = `${gameWon.player === "circle" ? 'O' : 'X'}'s wins!!`
  }

  return {
    startGame
  }
})();

Game.startGame()
