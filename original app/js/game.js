/*-------------------------------------------
------ UI functions change the board --------
------ object, and corresponding page -------
------ elements. page functions only --------
------ affect page elements. These ----------
------ have been bundled into an object -----
------ to limit the number of variables -----
------ present in the global scope ----------
-------------------------------------------*/

const ui = new UI();
const page = {
  showNewGame: () => {
    // Show board
    $('#start').hide();
    $('#board').show();
    $('#finish').hide();
    $('#difficultySelect').hide();

    // Activate Player 1
    $('#player1').addClass('active');
    $('#player2').removeClass('active');

    // Reset Game End Screen
    $('#finish').removeClass('screen-win-one').removeClass('screen-win-two').removeClass('screen-win-tie');
  },
  appendUserName: () => {
    ui.name = $('input').val();
    $('.board header').after($(`<span class="name">Welcome ${ui.name}</span>`));
  },
  checkForm: () => {
    // Warnings
    const nameWarning = `<span class="warn">Please Enter A Name</span>`
    const diffWarning = `<span class="warn">Please Select A Difficulty Level</span>`

    // Remove Warnings
    $('input').prev('.warn').remove();
    $('#hard').prev('.warn').remove();

    // Check for Name
    if ($('input').val() === '' || $('input').val().replace(/\s+/g,'') === '') {
      $('input').prev('.warn').remove();
      $('input').before($(nameWarning));
      return false;
    }
    // Check for Difficulty
    if ($('.diff-active').length === 0){
      $('#easy').prev('.warn').remove();
      $('#easy').before($(diffWarning));
      return false;
    }
    return true;
  }
};


/*---------------------------------------
--------- Start Screen Buttons ----------
---------------------------------------*/

// Show Start Screen
$('#start').show();
$('#board').hide();
$('#finish').hide();
$('#difficultySelect').hide();

// Two Player Game
$('.twoP').on('click', function() {
  ui.initializeBoard();
  page.showNewGame();

  // Reset Single Player Form
  $('input').val('');
  $('.diff').removeClass('diff-active');
  ui.name = undefined;
});
// One Player Game, go to difficultySelect screen
$('.oneP').on('click', function() {
  $('#start').hide();
  $('#difficultySelect').show();
  ui.initializeBoard();
  $('input').focus();
});

// Select Difficulty, apply 'diff-active' class
$('.diff').on('click', function(e) {
  $('.diff').removeClass('diff-active');
  $(e.target).addClass('diff-active');
});

// One Player Mode Form Submits with Enter
$('#difficultySelect').on('keyup', function(e) {
  if (e.keyCode === 13 && page.checkForm()) {
    ui.setDifficulty();
    page.appendUserName();
    page.showNewGame();
  }
});
// Or Button Click
$('.play').on('click', function() {
  if(page.checkForm()){
    ui.setDifficulty();
    page.appendUserName();
    page.showNewGame();
  }
});


/*-----------------------------------
------------ Box Hover --------------
-----------------------------------*/
$('.box').hover(function(e) {
  if(!UI.prototype.filled(e.target))  {
    $(e.target).css("background-image", e.type==='mouseenter'?`url(img/${board.player}.svg)`:'none');
  }
});


/*-----------------------------------
------------ Gameplay ---------------
-----------------------------------*/

// When A Box is Clicked
$('.box').on('click', function(e) {
  ui.playGame(e);
});
