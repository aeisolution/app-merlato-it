// app/azienda/fatturaCtrl.js

(function () {
	'use strict';
	var controllerId = 'fatturaCtrl';
	angular.module('app')
				 .controller(controllerId, ['dataList', 'dataFactory', '$stateParams', '$state', '$scope', '$filter', '$uibModal', 'toastr', fatturaCtrl]);


	function fatturaCtrl(dataList, dataFactory, $stateParams, $state, $scope, $filter, $modal, toastr) {
		var vm = this;
		vm.title = 'Fatture';
		vm.subtitle = 'Veterinario e Clienti';
		vm.collection = 'fatture';
		vm.params = $stateParams;

		// DataList init
		dataList.init(controllerId, vm, vm.collection);

		// Filter
    vm.setFilter = setFilter;
		vm.getFilter = getFilter;
		vm.checkFilter = checkFilter;
		vm.applyFilter = applyFilter;
		vm.resetFilter = resetFilter;

		// Navigazione Pagine
		vm.pageSelect = pageSelect;
		vm.pageNext = pageNext;
		vm.pagePrev = pagePrev;

		// Actions - List
		vm.refreshList = getList;


		//ACTIVATE *****************************************
		init();
		//getPage();

		//****************************************************
		// METODI
		//****************************************************
		function init() {
			if(!vm.params.id) {
				if(vm.list.length==0) {
					getList();
				}
			} else {
				if(vm.params.id=='new') {
					createNew();
				} else {
					getRecord(vm.params.id);
				}
			}
		}

		// ----------------------------------------------------
		// Filter
		function setFilter(key, value) {
			if(!vm.filter) {
				vm.filter = {};
			}
			vm.filter[key] = value;

			applyFilter();
		}

		function getFilter(key) {
			if(!vm.filter || !vm.filter[key] ) {
				return '';
			}
			return vm.filter[key];
		}

		function checkFilter(key, value) {
			var gF = getFilter(key);
			return gF == value || '';
		}

		function applyFilter() {
			// reset page before getList
			vm.listPage = dataList.set(controllerId, 'listPage', 1);
			getList();
		}

		function resetFilter() {
			vm.filter = dataList.set(controllerId, 'filter', {});
			applyFilter();
		}

		// Get List ----------------------------------------
		function getList() {
			if(!vm.filter.search && !vm.filter.tipo) {
				return dataFactory.baseGetPage(vm.collection, vm.listPage).then(function (data) {
					vm.list 					= dataList.set(controllerId, 'list', data.data.list);
					vm.listIndex 			= dataList.set(controllerId, 'listIndex', -1);
					vm.listCount 			= dataList.set(controllerId, 'listCount', data.data.pager.count);
					vm.listPage 			= dataList.set(controllerId, 'listPage', data.data.pager.page);
					vm.listPageCount 	= dataList.set(controllerId, 'listPageCount', data.data.pager.pageCount);
					vm.listPageSize 	= dataList.set(controllerId, 'listPageSize', data.data.pager.pageSize);

					calcPageLabel();
				});
			} else {

				var filter = "";
				if(vm.filter.search) {
					filter += "destinatario=" + vm.filter.search + "&";
				}

				return dataFactory.baseGetPageFilter(vm.collection, vm.listPage, filter).then(function (data) {
					vm.list 					= dataList.set(controllerId, 'list', data.data.list);
					vm.listIndex 			= dataList.set(controllerId, 'listIndex', -1);
					vm.listCount 			= dataList.set(controllerId, 'listCount', data.data.pager.count);
					vm.listPage 			= dataList.set(controllerId, 'listPage', data.data.pager.page);
					vm.listPageCount 	= dataList.set(controllerId, 'listPageCount', data.data.pager.pageCount);
					vm.listPageSize 	= dataList.set(controllerId, 'listPageSize', data.data.pager.pageSize);

					calcPageLabel();
				});
			}
		}

		// --------------------------------------------------------
		// Navigazione Pagine
		function pageSelect(num) {
			if(num>0 && num<=vm.listPageCount) {
					vm.listPage = num;
					return getList();
			} else {
				toastr.error("Numero pagina: " + num + " non valido");
			}
		}

		function pageNext() {
			return pageSelect(vm.listPage + 1);
		}

		function pagePrev() {
			return pageSelect(vm.listPage - 1);
		}

		function calcPageLabel() {
			var start = ((vm.listPage - 1) * vm.listPageSize) + 1;
			var endPage = vm.listPage * vm.listPageSize;
			var end = endPage < vm.listCount ? endPage : vm.listCount;

			vm.listPageLabel = dataList.set(controllerId, 'listPageLabel', start + '-' + end + '/' + vm.listCount);
		}

	}
})();
