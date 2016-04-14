(function() {
  'use strict';

  var app = angular.module('app',['ui.router']);

  app.run(function ($state,$rootScope) {
    $rootScope.$state = $state;
  });
}());
