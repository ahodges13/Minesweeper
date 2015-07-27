var domify = require('domify')
var jQuery = require('jQuery');
var bootstrap = require('bootstrap');
var angular = require('angular');


'use strict';

angular.module('minesweeperApp', [
  'ui.router',
  'underscore'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
