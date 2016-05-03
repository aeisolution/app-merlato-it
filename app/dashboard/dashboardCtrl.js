// app/ingegnere/ingegnereCtrl.js

(function () {
	'use strict';
	var controllerId = 'dashboardCtrl';
	angular.module('app').controller(controllerId, ['dataFactory', dashboardCtrl]);

	function dashboardCtrl(dataFactory) {
		var vm = this;
		vm.title = 'Dashboard';
    vm.subtitle = 'Pannello di Controllo';
		vm.counts = {};

		//ACTIVATE *****************************************
		getCounts();

		//****************************************************
		// METODI
		//****************************************************
		function getCounts() {
			count('clienti').then(function(result){
				vm.counts.clienti = result;
			});

			count('veterinari').then(function(result){
				vm.counts.veterinari = result;
			});

			count('referti').then(function(result){
				vm.counts.referti = result;
			});

			count('fatture').then(function(result){
				vm.counts.fatture = result;
			});
		}

		function count(entities) {
			return dataFactory.baseCount(entities).then(function (data) {
				return data.data;
			});
		}
	}
})();
