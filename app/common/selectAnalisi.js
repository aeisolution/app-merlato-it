(function () {
	'use strict';
	var controllerId = 'selectAnalisiCtrl';
	angular.module('app').controller(controllerId, ['dataFactory', '$modalInstance', 'filter', 'add', selectAnalisiCtrl]);

	function selectAnalisiCtrl(dataFactory, $modalInstance, filter, functionAdd) {
		var vm = this;
		vm.elenco = [];
		vm.page = 1;
		vm.numRecords = 0;

		vm.filter = filter;

		vm.refresh = getPage;


		vm.select = function (item) {
			//$modalInstance.close(item._id);
			functionAdd(item._id);
		};

		vm.modalCancel = function () {
			$modalInstance.dismiss('cancel');
		};

		// **********************************************
		// Init Elenco
		getPage();

		// **********************************************
		// Metodi
		function getPageFilter() {
			var filter = "";
			if(vm.filter.nome) {
				filter += "nome=" + vm.filter.nome + "&";
			}

			if(vm.filter.specie) {
				filter += "specie=" + vm.filter.specie + "&";
			}


			dataFactory.baseGetPageFilter('analisi', vm.page, filter).then(function (data) {
				vm.elenco = data.data.list;
				vm.numRecords = data.data.pager.count;
			});
		}

		function getPage() {
			if(vm.filter) {
				return getPageFilter();
			}

			dataFactory.baseGetPage('analisi', vm.page).then(function (data) {
				vm.elenco = data.data.list;
				vm.numRecords = data.data.pager.count;
			});
		}

	}
})();
