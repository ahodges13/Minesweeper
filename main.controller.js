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

    $scope.$watch('height', function() {
      game.height = $scope.height;
      $scope.random();
    });

    $scope.$watch('width', function() {
      if($scope.width<=50){
        game.width = $scope.width;
        $scope.random();
      }
    });

    //Repaint the blank grid
    $scope.clear = function() {
      game.grid = logic.startGame(game.height, game.width);
      $scope.grid = game.grid;
    }

    //Reveal what's behind a cell
    $scope.toggle = function(row, col){
      //reveal that cell, if the cell is not a bomb
      if(game.grid[row][col].neighbors == 0){
        //reveal the current cell
        game.grid[row][col].isPlayed = true;
        //reveal it's neighbors
        game.grid = logic.revealNeighbors(game.grid, row, col);
        $scope.grid = game.grid;
      }
      else if(game.grid[row][col].bomb != true){
        game.grid[row][col].isPlayed = true;
        $scope.grid = game.grid;
      }
      //reveal entire grid, if the cell is a bomb
      else {
        game.grid = logic.revealAll(game.grid);
        $scope.grid = game.grid;
        $scope.gameOver = true;
      }
    };

    $scope.random = function(){
      console.log("got into random");
      $scope.clear();
      var times = _.random(1,(game.height * game.width)/2);
      //randomly assign bombs
      _.times(times, function(){
        (game.grid[_.random(0,game.height-1)][_.random(0,game.width-1)]).bomb = true;
      });
      //populate bomb neighbor numbers
      game = logic.countBombs(game);
      // $scope.grid = game.grid;
      $scope.gameOver = false;
    };

    $scope.setFlag = function(row, col){
      game.grid[row][col].flag = true;
    };

    // //Start the game
    // $scope.play = function() {
    //   game.stillAlive = true;
    //   continuous();
    // };

    // //Stop the game
    // $scope.stop = function() {
    //   game.stillAlive = false;
    // };

    // //Continuously loop through the steps until there are no more alive cells
    // function continuous() {
    //   if (game.stillAlive) {
    //     console.log("got into the if statement");
    //     game = logic.iterate(game);
    //     $scope.grid = game.grid;
    //     $timeout(continuous, 1000);
    //   }
    // }

    //Set up the grid when the page loads
    // $scope.clear();
    // console.log("original game.grid = "+game.grid);
    //Set up the mines
    // $scope.random();
  });
