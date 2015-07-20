'use strict';

angular.module('minesweeperApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'main.html',
        controller: 'MainCtrl'
      });
  });
