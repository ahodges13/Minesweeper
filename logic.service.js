'use strict';

angular.module('minesweeperApp')
  .service('logic', function (_) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    //neighbour values
    var TOP_LEFT = [-1, -1];
    var TOP = [-1, 0];
    var TOP_RIGHT = [-1, 1];
    var MIDDLE_LEFT = [0, -1];
    var MIDDLE_RIGHT = [0, 1];
    var BOTTOM_LEFT = [1, -1];
    var BOTTOM = [1, 0];
    var BOTTOM_RIGHT = [1, 1];

    var NEIGHBORS = [TOP_LEFT, TOP, TOP_RIGHT, MIDDLE_LEFT, MIDDLE_RIGHT, BOTTOM_LEFT, BOTTOM, BOTTOM_RIGHT];

    //Build the grid, based on specs
    this.startGame = function(height, width) {
      var setFalse = function () { return {bomb:false, neighbors:-1, isPlayed:false, flag:false} }
      return _.times(height, function () { return _.times(width, setFalse) })
    }

    //Calculate bomb neighbors, and assign numbers accordingly
    this.countBombs = function(game) {
      //Assume this is the last iteration, until a cell stays alive or is born
      // game.stillAlive = false;
      //Repaint the new board, after the iteration is complete
      game.grid = _(game.grid).map(function (v, i) {
        return _(v).map(function (cell, k) {
          //If cell is a bomb, no need to count neighbors
          //If cell isn't a bomb, count the neighbors that are bombs, assign number
          cell.neighbors = cell.bomb ? null : this.countNeighbors(game, i, k);
          return cell;
        }, this);
      }, this);
      return game;
    };

    //Check how many neighbors of a cell are bombs
    this.countNeighbors = function(game, row, col) {
      var count = this.getNeighbours(game, row, col);
      console.log("count = "+count);
      return count;
    };

    //Count how many neighbours of this cell are a bomb
    this.getNeighbours = function(game, row, col) {
      return _.filter(NEIGHBORS, function(neighbour){
        return this.validCell(game, neighbour[0]+row, neighbour[1]+col);
      }, this).length;
    };

    //Check that a cell is within the bounds of the grid, and if so, is it a bomb
    this.validCell = function(game, row, col) {
      if(row>=0 && row<game.grid.length && col>=0 && col<game.grid[0].length){
        if(game.grid[row][col].bomb){
          return true;
        }
      }
      return false;
    };

    //A bomb was clicked, so we must reveal the entire game grid
    this.revealAll = function(grid) {
      grid = _(grid).map(function (v, i) {
        return _(v).map(function (cell, k) {
          cell.isPlayed = true;
          return cell;
        }, this);
      }, this);
      return grid;
    };

    //A cell was clicked that had zero bomb neighbors, so recursively reveal cells around it
    this.revealNeighbors = function(grid, row, col){
      //reveal neighbors
      _.filter(NEIGHBORS, function(neighbour){
        //check if neighbour is a valid cell
        var currentRow = neighbour[0]+row;
        var currentCol = neighbour[1]+col;
        if(currentRow>=0 && currentRow<grid.length && currentCol>=0 && currentCol<grid[0].length){
          //reveal that cell
          grid[currentRow][currentCol].isPlayed = true;
          //if neighbour has no bomb neighbors, call revealNeighbors on it
          if(grid[currentRow][currentCol].neighbors > 0){
            this.revealNeighbors(grid, currentRow, currentCol);
          }
        }
      }, this).length;
      //
      return grid;
    };

  });
