//Business Logic
//Game constructor and methods:
function Game(playerOne, playerTwo){
  this.playerOne = playerOne;
  this.playerTwo = playerTwo;
  this.activePlayer;
}

Game.prototype.switchActivePlayer = function() {
  if(this.playerOne.hasDice === true) {
    this.playerOne.hasDice = false;
    this.playerTwo.hasDice = true;
    this.activePlayer = this.playerTwo;
  } else if (this.playerTwo.hasDice === true) {
    this.playerTwo.hasDice = false;
    this.playerOne.hasDice = true;
    this.activePlayer = this.playerOne
  } else {
    this.activePlayer = this.playerOne;
    this.playerOne.hasDice = true;
  }
};

//Player constructor and methods:
function Player(playerName) {
  this.playerName = playerName;
  this.hasDice = false;
  this.scoreTotal = 0;
  this.currentTotal = 0;
  this.currentRoll = 0;
}

Player.prototype.rollDie = function(){
  this.currentRoll = Math.floor(Math.random() * 6) + 1;
}

Player.prototype.currentScoreAdd = function() {
  if (this.currentRoll === 1) {
    return this.currentTotal = 0;
  } else return this.currentTotal += this.currentRoll;
}

Player.prototype.holdScore = function () {
  this.scoreTotal += this.currentTotal;
  this.currentTotal = 0;
  // if (this.scoreTotal >= 100) {
  //   console.log(this.playerName + " WINS!!")
  // };
}

//User Interface Logic
function switchCurrentPlayer(game){
  if(currentGame.playerOne.hasDice === true) {
    $("#player1PlayField").hide();
    $("#player2PlayField").show();
    currentGame.activePlayer = playerTwo;
    currentGame.playerTwo.hasDice = true;
    currentGame.playerOne.hasDice = false;
  } else if (currentGame.playerTwo.hasDice === true) {
    $("#player1PlayField").show();
    $("#player2PlayField").hide();
    currentGame.activePlayer = playerOne;
    currentGame.playerOne.hasDice = true;
    currentGame.playerTwo.hasDice = false;
  } else {
    currentGame.playerOne.hasDice = true;
    $("#player1PlayField").hide();
    $("#player2PlayField").show();
    currentGame.activePlayer = playerOne;
  }
};

function rollButton(currentGame) {
  if (currentGame.activePlayer === playerOne) {
    currentGame.playerOne.rollDie();
    if (currentGame.playerOne.currentRoll === 1) {
      $(".roll").hide();
    };
    playerOne.currentScoreAdd();
    $("#playerOneCurrentRoll").show();
    $("#playerOneCurrentTotal").show();
    $("#playerOneCurrentRoll").text(" " + currentGame.playerOne.currentRoll);
    $("#playerOneCurrentTotal").text(" " + currentGame.playerOne.currentTotal);
  } else if (currentGame.activePlayer === playerTwo) {
    currentGame.playerTwo.rollDie();
    if (currentGame.playerTwo.currentRoll === 1) {
      $(".roll").hide();
    };
    currentGame.playerTwo.currentScoreAdd();
    $("#playerTwoCurrentRoll").show();
    $("#playerTwoCurrentTotal").show();
    $("#playerTwoCurrentRoll").text(" " + currentGame.playerTwo.currentRoll);
    $("#playerTwoCurrentTotal").text(" " + currentGame.playerTwo.currentTotal);
  }
};

function displayDice(currentGame) {
  $(".dice").hide();
  if (currentGame.activePlayer === playerOne) {
    if (currentGame.playerOne.currentRoll === 1) {
      $("#one").show();
    } else if (currentGame.playerOne.currentRoll === 2) {
      $("#two").show();
    } else if (currentGame.playerOne.currentRoll === 3) {
      $("#three").show();
    } else if (currentGame.playerOne.currentRoll === 4) {
      $("#four").show();
    } else if (currentGame.playerOne.currentRoll === 5) {
      $("#five").show();
    } else if (currentGame.playerOne.currentRoll === 6) {
      $("#six").show();
    };
  } else if (currentGame.activePlayer === playerTwo){
    if (currentGame.playerTwo.currentRoll === 1) {
      $("#playerTwoOne").show();
    } else if (currentGame.playerTwo.currentRoll === 2) {
      $("#playerTwoTwo").show();
    } else if (currentGame.playerTwo.currentRoll === 3) {
      $("#playerTwoThree").show();
    } else if (currentGame.playerTwo.currentRoll === 4) {
      $("#playerTwoFour").show();
    } else if (currentGame.playerTwo.currentRoll === 5) {
      $("#playerTwoFive").show();
    } else if (currentGame.playerTwo.currentRoll === 6) {
      $("#playerTwoSix").show();
    };
  }
}

function holdButton(currentGame) {
  if (currentGame.activePlayer === playerOne){
    currentGame.playerOne.holdScore();
    $(".roll").show();
    $("#playerOneScoreTotal").text(" " + currentGame.playerOne.scoreTotal);
    $("#playerOneCurrentRoll").hide();
    $("#playerOneCurrentTotal").hide();
    $("#player1PlayField").hide();
    $("#player2PlayField").show();
    if (currentGame.playerOne.scoreTotal >= 100) {
      $(".playerOneWin").show();
      $("#player1PlayField").hide();
      $("#player2PlayField").hide();
      $("#newGame").show();
    };
  } else {
    currentGame.playerTwo.holdScore();
    $(".roll").show();
    $("#playerTwoScoreTotal").text(" " + currentGame.playerTwo.scoreTotal);
    $("#playerTwoCurrentRoll").hide();
    $("#playerTwoCurrentTotal").hide();
    $("#player1PlayField").show();
    $("#player2PlayField").hide();
    if (currentGame.playerTwo.scoreTotal >= 100) {
      $(".playerTwoWin").show();
      $("#player1PlayField").hide();
      $("#player2PlayField").hide();
      $("#newGame").show();
    };
  };
}

$(document).ready(function() {
  playerOne = new Player("player 1");
  playerTwo = new Player("player 2");
  currentGame = new Game (playerOne, playerTwo);

  $("#playerOneScoreTotal").text(" " + currentGame.playerOne.scoreTotal);
  $("#playerTwoScoreTotal").text(" " + currentGame.playerTwo.scoreTotal);
  $("#playerOneCurrentRoll").text(" " + currentGame.playerOne.currentRoll);
  $("#playerTwoCurrentRoll").text(" " + currentGame.playerTwo.currentRoll);
  $("#playerOneCurrentTotal").text(" " + currentGame.playerOne.currentTotal);
  $("#playerTwoCurrentTotal").text(" " + currentGame.playerTwo.currentTotal);

  $("#rules").click(function() {
    $(".rulesText").toggle();
  });

  $("#startGame").click(function(event) {
    event.preventDefault();
    switchCurrentPlayer(currentGame);
    $("#startGame").hide();
    $("#playerOneCurrentRoll").hide();
    $("#playerOneCurrentTotal").hide();
    $("#playerTwoCurrentRoll").hide();
    $("#playerTwoCurrentTotal").hide();
    $(".playerOneWin").hide();
    $(".playerTwoWin").hide();
    $("#player1PlayField").show();
    $("#player2PlayField").hide();
  });

  $(".roll").click(function(event) {
    event.preventDefault();
    rollButton(currentGame);
    displayDice(currentGame);
  });

  $(".hold").click(function(event) {
    event.preventDefault();    
    holdButton(currentGame);
    switchCurrentPlayer(currentGame);
    $(".dice").hide();
  });

  $('#newGame').click(function(event) {
    event.preventDefault();
    location.reload();
  })
})