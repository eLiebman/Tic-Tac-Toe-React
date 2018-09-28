function UI(name) {
  this.name = name;
}

UI.prototype.initializeBoard = () => {
  this.board = new Board();
  $('.box')
    .removeClass('box-filled-1')
    .removeClass('box-filled-2')
    .css('background-image', 'none');
  $('.board header').next('.name').remove();
  return board;
}

UI.prototype.filled = (box) => {
  return $(box).hasClass('box-filled-1') || $(box).hasClass('box-filled-2');
}

UI.prototype.fillBox = (box) => {
    if(this.board.player === 'O') {
      $(box).addClass('box-filled-1').css('background-image', 'url("img/o.svg")');
    } else {
      $(box).addClass('box-filled-2').css('background-image', "url('img/x.svg')");
    }
    this.board.fillBox($(box).index());
}

UI.prototype.changePlayer = () => {
  this.board.changePlayer();
  if (this.board.player === 'X') {
    $('#player1').removeClass('active');
    $('#player2').addClass('active');
  } else {
    $('#player1').addClass('active');
    $('#player2').removeClass('active');
  }
}

UI.prototype.computerOn = (diff) => {
  this.board.computerOn();
  this.board.setDifficulty(diff);
}

UI.prototype.computersTurn = () => {
  return (this.board.player === 'X' && board.computer);
}

UI.prototype.computerPlay = () => {
  const boxIndex = this.board.play();
  const box = $('.box')[boxIndex];
  UI.prototype.fillBox(box);
}

UI.prototype.setDifficulty = () => {
  let diff = $('.diff-active').attr('id');
  UI.prototype.computerOn(diff);
}

UI.prototype.checkForWin = () => {
  if (this.board.winner() || this.board.tie()) {
    $('#board').hide();
    $('#finish').show();
    if (this.board.winner()) {
      if (this.board.player === 'O') {
        $('p.message').text('Winner!');
        $('#finish').addClass('screen-win-one');
        if (ui.name) {
          $('p.message').text(`Congratulations ${ui.name}`);
        }
      } else {
        $('p.message').text('Winner!');
        $('#finish').addClass('screen-win-two');
        if (ui.name) {
          $('p.message').text(`Better Luck Next Time, ${ui.name}`)
        }
      }
    } else {
      $('p.message').text('It\'s A Tie!');
      $('#finish').addClass('screen-win-tie');
    }
  }
  return this.board.winner() || this.board.tie();
}

UI.prototype.playGame = (e) => {
  let box = e.target;
  // Make sure the move is legal
  if (UI.prototype.computersTurn()) return;
  if (UI.prototype.filled(box)) return;

  // Play
  UI.prototype.fillBox(box);
  if (UI.prototype.checkForWin()) return;
  UI.prototype.changePlayer();

  // Computer play
  if (UI.prototype.computersTurn()) {
    setTimeout(() => {
      UI.prototype.computerPlay();
      if (!UI.prototype.checkForWin()) {
        UI.prototype.changePlayer();
      }
    }, 1300);
  }
}
