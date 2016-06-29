// app/azienda/profiloCtrl.js

(function () {
	'use strict';
	var controllerId = 'profiloCtrl';
	angular.module('app')
				 .controller(controllerId, ['dataFactory', '$stateParams', '$state', '$scope', '$filter', '$uibModal', 'toastr', profiloCtrl]);


	function profiloCtrl(dataFactory, $stateParams, $state, $scope, $filter, $modal, toastr) {
		var vm = this;
		vm.title = 'Profilo';
		vm.subtitle = 'Veterinario';
		vm.collection = 'veterinari';

		//ACTIVATE *****************************************
		init();

		//****************************************************
		// METODI
		//****************************************************
		function init() {
			return dataFactory.getProfiloUtente().then(function (data) {
				vm.record = data.data;
			},
			function (err) {
				toastr.error(err.data.response);
			});
		}

	}
})();
