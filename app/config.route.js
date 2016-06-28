(function () {
    'use strict';

    var app = angular.module('app');
		app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

			$httpProvider.interceptors.push('TokenInterceptor');

      $urlRouterProvider.otherwise("/login");

      $stateProvider
          // Page *****************************************
          .state('login', {
              url: '/login',
              templateUrl: 'pages/login.html',
              controller: 'LoginCtrl as vm'
          })
          // MasterPage *****************************************
          .state('root', {
              templateUrl: 'pages/root.html'
          })
          // Main Commands *****************************************
          .state('root.dashboard', {
              url: '/dashboard',
              templateUrl: 'app/dashboard/dashboard.html',
              controller: 'dashboardCtrl as vm',
              access: { requiredLogin: true }
          })
          // Archivi *****************************************
          .state('root.fatture', {
              url: '/fatture',
              templateUrl: 'app/fattura/fattura.html',
              controller: 'fatturaCtrl as vm',
              access: { requiredLogin: true }
          })
          .state('root.referti', {
              url: '/referti',
              templateUrl: 'app/referto/referto.html',
              access: { requiredLogin: true }
          })
          // Archivi - Rubrica ***********************************
          .state('root.rubrica', {
              url: '/rubrica',
              templateUrl: 'app/rubrica/rubrica.html',
              controller: 'rubricaCtrl as vm',
              access: { requiredLogin: true }
          })
          .state('root.contatti', {
              url: '/rubrica/:id',
              templateUrl: 'app/rubrica/contatto.html',
              controller: 'rubricaCtrl as vm',
              access: { requiredLogin: true }
          })
          // Account - Utente****************************************
          .state('root.profilo', {
              url: '/account/profilo',
              templateUrl: 'app/account/profilo.html',
              //controller: 'dashboardCtrl as vm',
              access: { requiredLogin: true }
          })
          .state('root.cambioPassword', {
              url: '/account/cambioPassword',
              templateUrl: 'app/account/cambioPassword.html',
              controller: 'cambioPasswordCtrl as vm',
              access: { requiredLogin: true }
          })    
          // Settings *****************************************
          .state('root.debug', {
              url: '/debug',
              templateUrl: 'app/debug/debug.html',
              controller: 'debugCtrl as vm',
              access: { requiredLogin: true }
          });

		});

})();
