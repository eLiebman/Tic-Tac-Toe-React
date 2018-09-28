function Board(board, player) {
  this.player = player?player:'O';
  this.computer = false;
  this.difficulty = 'easy';
  this.board = board?board:[
    [new Box(), new Box(), new Box()],
    [new Box(), new Box(), new Box()],
    [new Box(), new Box(), new Box()]
  ];
}

Board.prototype.winningCombinations = [
  // Horizontal Wins
  [[0,0],[1,0],[2,0]],
  [[0,1],[1,1],[2,1]],
  [[0,2],[1,2],[2,2]],
  // Vertical Wins
  [[0,0],[0,1],[0,2]],
  [[1,0],[1,1],[1,2]],
  [[2,0],[2,1],[2,2]],
  // Diagonal Wins
  [[0,0],[1,1],[2,2]],
  [[0,2],[1,1],[2,0]]
];
// Coordinates of each box indexed to match the UL in the HTML
Board.prototype.key = [
  [0,0],
  [0,1],
  [0,2],
  [1,0],
  [1,1],
  [1,2],
  [2,0],
  [2,1],
  [2,2]
];
// Use key to return box coordinates as object {x, y}
Board.prototype.getCoordinates = function(index) {
  const x = this.key[index][0];
  const y = this.key[index][1];

  return {x, y};
}
// Does box(object) contain current Player?
Board.prototype.checkBox = function(box) {
  const x = box.x;
  const y = box.y;

  return this.board[x][y].check(this.player);
}

Board.prototype.fillBox = function(boxIndex) {
  const box = this.getCoordinates(boxIndex);
  const x = box.x;
  const y = box.y;

  if (this.board[x][y].check(false)){
    this.board[x][y].fill(this.player);
  }
}

Board.prototype.clearBox = function(index) {
  const box = this.getCoordinates(index);
  const x = box.x;
  const y = box.y;

  this.board[x][y].fill(false);
}

Board.prototype.changePlayer = function() {
  if (this.player === 'X') {
    this.player = 'O';
  } else if (this.player === 'O') {
    this.player = 'X';
  }
}

Board.prototype.setDifficulty = function(diff) {
  this.difficulty = diff;
}

Board.prototype.computerOn = function() {
  this.computer = true;
}

Board.prototype.computerOff = function() {
  this.computer = false;
}

// Return an array containing indices of all empty boxes
Board.prototype.possibleMoves = function(){
  const flatBoard = this.board.reduce((all, current) => all.concat(current), []);
  const empties = [];
  for (i = 0; i < flatBoard.length; i++){
    let box = flatBoard[i];
    if(box.filled === false){
      empties.push(i);
    }
  }
  return empties;
}
// Checks one winning combination from possibleWins array for current player
Board.prototype.checkWin = function(winningCombination) {
  for (let i = 0; i < winningCombination.length; i++) {
    const box = winningCombination[i];
    const x = box[0];
    const y = box[1];

    if (!this.checkBox({x, y})) {
      return false;
    }
  }
  return true;
}
// Check each winning combination
Board.prototype.winner = function() {
  let index = 0
  let won = false;
  while (!won && index < 8) {
    won = this.checkWin(this.winningCombinations[index]);
    index++;
  }
  return won;
}
// Is the board full?
Board.prototype.tie = function() {
  const flatBoard = this.board.reduce((arr, current) => arr.concat(current), []);
  for (i = 0; i < flatBoard.length; i++) {
    if (!flatBoard[i].filled){
      return false;
    }
  }
  return true;
}
// Computer fills a random square
Board.prototype.randomPlay = function() {
  const possibleMoves = this.possibleMoves();
  const randomBox = Math.floor(Math.random() * possibleMoves.length);
  const box = possibleMoves[randomBox];
  this.fillBox(box);
  return box;
  }
// Computer looks at next move to determine
// how to win, or block the opponent's win
Board.prototype.smartPlay = function(){
  const moves = this.possibleMoves();
  const test = new Board(this.board, this.player);
  const opponentWins = [];

  for (i = 0; i < moves.length; i++){
      test.fillBox(moves[i]);
      // If next move can win, play winning move
      if (test.winner()){
        return moves[i];
      }
      test.clearBox(moves[i]);
  }

  test.changePlayer();

  for (i = 0; i < moves.length; i++){
    test.fillBox(moves[i]);
    if (test.winner()){
      opponentWins.push(moves[i]);
    }
    test.clearBox(moves[i]);
  }
  // If next opponent move can win, block it
  if (opponentWins.length >= 1) {
    this.fillBox(opponentWins[0]);
    return opponentWins[0];
  }
  // If no win is imminent, play at random
  else {
    return this.randomPlay();
  }
}
// Randomly choose smart vs. random move based on difficulty level
Board.prototype.pickMove = function() {
  if (this.difficulty === 'hard'){
    // hard = 90% smart moves
    return (Math.random() <= .9);
  } else if (this.difficulty === 'medium') {
    // medium = 70% smart moves
    return (Math.random() <= .7);
  } else if (this.difficulty === 'easy') {
    // easy = 50% smart moves
    return (Math.random() <= .5);
  }
}
// Play the smart or random move
Board.prototype.play = function() {
  if(this.pickMove()) {
    return this.smartPlay();
  } else {
    return this.randomPlay();
  }
}
