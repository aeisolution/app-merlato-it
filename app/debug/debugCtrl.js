// app/azienda/rubricaCtrl.js

(function () {
	'use strict';
	var controllerId = 'debugCtrl';
	angular.module('app')
				 .controller(controllerId, ['dataList', 'dataFactory', 'toastr', debugCtrl]);


	function debugCtrl(dataList, dataFactory, toastr) {
		var vm = this;
    vm.title = "Debug";
    vm.subtitle = "Tools for developement and debug";
    vm.serviceList = {};

    vm.getServiceList = getServiceList;
    vm.resetServiceList = resetServiceList;

    // ------------------------------------------------------
    // Methods


    // Service List - dataList
    function getServiceList() {
      vm.serviceList = dataList.getAll();
      toastr.info('getServiceList executed');
    }

    function resetServiceList() {
      vm.serviceList = dataList.resetAll();
      toastr.info('resetServiceList executed');
    }

  }
})();
