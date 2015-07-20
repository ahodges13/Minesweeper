var domify = require('domify')
var jQuery = require('jQuery');
var bootstrap = require('bootstrap');
var angular = require('angular');
// var angular-ui-router = require('angular-ui-router');


'use strict';

angular.module('minesweeperApp', [
  // 'ngCookies',
  // 'ngResource',
  // 'ngSanitize',
  'ui.router',
  // 'ui.bootstrap',
  'underscore'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });

// document.body.appendChild( domify('Hello World') )
