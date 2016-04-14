(function () {
    'use strict';

    var app = angular.module('app');
		app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

			//$httpProvider.interceptors.push('TokenInterceptor');

      $urlRouterProvider.otherwise("/login");

      $stateProvider
          // Page *****************************************
          .state('login', {
              url: '/login',
              templateUrl: 'pages/login.html'
          })
          // MasterPage *****************************************
          .state('root', {
              templateUrl: 'pages/root.html'
          })
          // Main Commands *****************************************
          .state('root.dashboard', {
              url: '/dashboard',
              templateUrl: 'views/dashboard.html'
          })
          .state('root.fatture', {
              url: '/fatture',
              templateUrl: 'views/fatture.html'
          })
          .state('root.referti', {
              url: '/referti',
              templateUrl: 'views/referti.html'
          })
          // Settings *****************************************
          .state('root.profilo', {
              url: '/profilo',
              templateUrl: 'views/profilo.html'
          })
          .state('root.cambiopassword', {
              url: '/cambiopassword',
              templateUrl: 'views/cambiopassword.html'
          });

		});

})();
