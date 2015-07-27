'use strict';

angular.module('minesweeperApp')
  .controller('MainCtrl', function ($scope, logic, $timeout) {

    //Set up the game
    var game={};
    $scope.height = 10;
    $scope.width = 10;
    $scope.gameOver = false;
    game.height = $scope.height;
    game.width = $scope.width;
    var bombs = 0;
    $scope.counter = logic.getCounter();

    //Update grid if height changes
    $scope.$watch('height', function() {
      game.height = $scope.height;
      $scope.random();
    });

    //Update grid if width changes
    $scope.$watch('width', function() {
      if($scope.width<=50){
        game.width = $scope.width;
        $scope.random();
      }
    });

    //Check if the user has won the game yet
    $scope.$watch('counter', function() {
      if((bombs + $scope.counter) == ($scope.height * $scope.width)){
        $timeout(alert("You win!!!"), 1000);
      }
    });

    //Repaint the blank grid
    $scope.clear = function() {
      game.grid = logic.startGame(game.height, game.width);
      $scope.grid = game.grid;
    }

    //Reveal what's behind a cell
    $scope.toggle = function(row, col){
      //if this cell does not have any bomb neighbors
      if(game.grid[row][col].neighbors == 0){
        //make sure this cell hasn't been already played
        if(game.grid[row][col].isPlayed != true){
          //call logic funtion to reveal this cell and it's neighbors recursively, then update game accordingly
          game.grid = logic.revealNeighbors(game.grid, row, col);
          $scope.grid = game.grid;
          $scope.counter = logic.getCounter();
        }
      }
      //else reveal that cell, if the cell is not a bomb
      else if(game.grid[row][col].bomb != true){
        //make sure this cell hasn't been already played
        if(game.grid[row][col].isPlayed != true){
          //reveal this cell and update game accordingly
          game.grid[row][col].isPlayed = true;
          logic.onePlayed();
          $scope.grid = game.grid;
          $scope.counter = logic.getCounter();
        }
      }
      //reveal entire grid, if the cell is a bomb
      else {
        game.grid = logic.revealAll(game.grid);
        $scope.grid = game.grid;
        $scope.gameOver = true;
      }
    };

    //set up the game board with a random set and spread of bombs
    $scope.random = function(){
      //makre sure to reset counter, incase we've played before
      logic.resetCounter();
      //clear the board
      $scope.clear();
      //calculate bombs to place
      bombs = _.random(1,(game.height * game.width)/4);
      //randomly assign bombs
      _.times(bombs, function(){
        (game.grid[_.random(0,game.height-1)][_.random(0,game.width-1)]).bomb = true;
      });
      //populate bomb neighbor numbers
      game = logic.countBombs(game);
      //reset value, incase we've played before
      $scope.gameOver = false;
    };

    //marking a bomb you think you've found
    $scope.setFlag = function(row, col){
      game.grid[row][col].flag = true;
    };

  });
