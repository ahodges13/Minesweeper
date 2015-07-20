var myModule = angular.module('minesweeperApp', []);
myModule.factory('cell', function() {
  var cellInstance;
  cellInstance.bomb = false;
  cellInstance.neighbors = 0;
  return cellInstance;
});
