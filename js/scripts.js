//Business Logic
function Player(playerName) {
  this.playerName = playerName;
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
  if (this.scoreTotal >= 100) {
    console.log(this.playerName + " WINS!!")
  };
}

//User Interface Logic
let player1 = new Player;
let player2 = new Player;

$(document).ready(function() {
  $("#playerOneScoreTotal").text(" " + player1.scoreTotal);
  $("#playerTwoScoreTotal").text(" " + player2.scoreTotal);
  $("#playerOneCurrentRoll").text(" " + player1.currentRoll);
  $("#playerTwoCurrentRoll").text(" " + player2.currentRoll);
  $("#playerOneCurrentTotal").text(" " + player1.currentTotal);
  $("#playerTwoCurrentTotal").text(" " + player2.currentTotal);

  $("#rules").click(function() {
    $(".rulesText").toggle();
  });

  $("#startGame").click(function(event) {
    event.preventDefault();
    $("#startGame").hide();
    $("#playerOneCurrentRoll").hide();
    $("#playerOneCurrentTotal").hide();
    $("#playerTwoCurrentRoll").hide();
    $("#playerTwoCurrentTotal").hide();
    $(".playerOneWin").hide();
    $(".playerTwoWin").hide();
    $("#player1PlayField").toggle();
    $("#player2PlayField").hide();
  });

  $("#playerOneRoll").click(function(event) {
    event.preventDefault();
    $("#playerOneCurrentRoll").show();
    $("#playerOneCurrentTotal").show();
    player1.rollDie();
    $(".dice").hide();
    if (player1.currentRoll === 1) {
      $("#playerOneRoll").hide();
      $("#one").show();
    } else if (player1.currentRoll === 2) {
      $("#two").show();
    } else if (player1.currentRoll === 3) {
      $("#three").show();
    } else if (player1.currentRoll === 4) {
      $("#four").show();
    } else if (player1.currentRoll === 5) {
      $("#five").show();
    } else if (player1.currentRoll === 6) {
      $("#six").show();
    };
    player1.currentScoreAdd();
    $("#playerOneCurrentRoll").text(" " + player1.currentRoll);
    $("#playerOneCurrentTotal").text(" " + player1.currentTotal);
  });

  $("#playerOneHold").click(function(event) {
    event.preventDefault();
    player1.holdScore();
    $(".dice").hide();
    $("#playerOneRoll").show();
    $("#player1PlayField").hide();
    $("#player2PlayField").show();
    $("#playerOneScoreTotal").text(" " + player1.scoreTotal);
    $("#playerOneCurrentRoll").hide();
    $("#playerOneCurrentTotal").hide();
    if (player1.scoreTotal >= 20) {
      $(".playerOneWin").show();
      $("#player1PlayField").hide();
      $("#player2PlayField").hide();
      $("#newGame").show();
    };
  });

  $("#playerTwoRoll").click(function(event) {
    event.preventDefault();
    $("#playerTwoCurrentRoll").show();
    $("#playerTwoCurrentTotal").show();
    player2.rollDie();
    $(".dice").hide();
    if (player2.currentRoll === 1) {
      $("#playertwoRoll").hide();
      $("#playerTwoOne").show();
    } else if (player2.currentRoll === 2) {
      $("#playerTwoTwo").show();
    } else if (player2.currentRoll === 3) {
      $("#playerTwoThree").show();
    } else if (player2.currentRoll === 4) {
      $("#playerTwoFour").show();
    } else if (player2.currentRoll === 5) {
      $("#playerTwoFive").show();
    } else if (player2.currentRoll === 6) {
      $("#playerTwoSix").show();
    };
    player2.currentScoreAdd();
    $("#playerTwoCurrentRoll").text(" " + player2.currentRoll);
    $("#playerTwoCurrentTotal").text(" " + player2.currentTotal);
  });

  $("#playerTwoHold").click(function(event) {
    event.preventDefault();
    player2.holdScore();
    $(".dice").hide();
    $("#playerTwoRoll").show();
    $("#player1PlayField").show();
    $("#player2PlayField").hide();
    $("#playerTwoScoreTotal").text(" " + player2.scoreTotal);
    $("#playerTwoCurrentRoll").hide();
    $("#playerTwoCurrentTotal").hide();
    if (player2.scoreTotal >= 20) {
      $(".playerTwoWin").show();
      $("#player1PlayField").hide();
      $("#player2PlayField").hide();
      $("#newGame").show();
    };
  });

  $('#newGame').click(function(event) {
    event.preventDefault();
    location.reload();
});

})