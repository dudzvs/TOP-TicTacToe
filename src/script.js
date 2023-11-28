const Game = (() => {
  const board = document.getElementById('board');
  const modalSelectPlayer = document.getElementById('selectBox');
  const cellsElements = document.querySelectorAll('[data-cell]');
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
      cell.addEventListener('click', handleClick, {once:true})
    })
  }

  const handleClick = (square) => {
    console.log(square.target.id)
  }

  return {
    startGame
  }
})();

Game.startGame()
