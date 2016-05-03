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

		// Navigazione Record
		vm.recordSelect = recordSelect;
		vm.recordNext = recordNext;
		vm.recordPrev = recordPrev;

		// Navigazione Pagine
		vm.pageSelect = pageSelect;
		vm.pageNext = pageNext;
		vm.pagePrev = pagePrev;

		// Actions - List
		vm.deleteList = deleteConfirm;
		vm.refreshList = getList;

		// Actions - Record
		vm.new = createNew;
		vm.refreshRecord = undoRecord;
		vm.deleteRecord = deleteConfirm;
		vm.saveRecord = save;

		//vm.select = select;


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

		function getRecord(id) {
			return dataFactory.baseGetById(vm.collection, id).then(function (data) {
				vm.record = dataList.set(controllerId, 'record', data.data);
				vm.recordNew = dataList.set(controllerId, 'recordNew', false);

				vm.listIndex = dataList.set(controllerId, 'listIndex', getIndexRecord(id));
			});
		}

		function getIndexRecord(id) {
			var index = -1;
			for(var i=0,len=vm.list.length;i<len;i++) {
				if(vm.list[i]._id == id) {
					return i;
				}
			}
			return index;
		}

		function postRecord() {
			dataFactory.basePost(vm.collection,vm.record)
				.then(
					function (data) {
						vm.recordNew = dataList.set(controllerId, 'recordNew', false);
						vm.record._id = data.data._id;
						toastr.success('record saved');

						dataFactory.baseGetOneAnag(vm.collection, data.data._id).then(function(data){
							vm.list.push(data.data);
						});
					},
					function (err) {
						toastr.error(err.data.response);
					}
			);
		}

		function putRecord() {
			dataFactory.basePut(vm.collection, vm.record._id, vm.record).then(function (data) {
				toastr.success('record updated');
			});
		}

		function deleteRecord(item) {
			var index = vm.list.indexOf(item);
			dataFactory.baseDelete(vm.collection, item._id).then(function (data) {
				vm.list.splice(index, 1);
				toastr.success('record deleted');
			});
		}

		function deleteConfirm(item) {
			var strConfirm = 	item.ragioneSociale;

			var modalInstance = $modal.open({
				templateUrl: 'app/common/modalConfirm.html',
				controller: 'modalConfirmCtrl as vm',
				resolve: {
					text: function () {
						return strConfirm;
					}
				}
			});

			modalInstance.result
				.then(
					function () {
						deleteRecord(item);
					},
					function (err) {
						toastr.error(err);
					}
				);

		}

		function save() {
			if(vm.recordNew === true) postRecord();
			else putRecord();
		}

		function createNew() {
			vm.recordNew = dataList.set(controllerId, 'recordNew', true);
			vm.record = dataList.set(controllerId, 'record', {});
		}

		function undoRecord() {
			console.log('undoRecord()');
			if(vm.recordNew === true) {
				createNew();
			} else {
				getRecord(vm.record._id);
			}
		}

		// --------------------------------------------------------
		// Navigazione Record
		function recordSelect(num) {
			// Stessa Pagina
			if(num>-1 && num<vm.listPageSize) {
					return getRecord(vm.list[num]._id);
			}

			// Pagina Precendente
			if(num==-1 && vm.listPage>1) {
				return pagePrev().then(function(data){
					return recordPageLast();
				});
			}

			// Pagina Successiva
			if(num==vm.listPageSize && vm.listPage<vm.listPageCount) {
				return pageNext().then(function(data){
					return recordPageFirst();
				});
			}
		}

		function recordNext() {
			return recordSelect(vm.listIndex + 1);
		}

		function recordPrev() {
			return recordSelect(vm.listIndex - 1);
		}

		function recordPageFirst() {
			return recordSelect(0);
		}

		function recordPageLast() {
			return recordSelect(vm.listPageSize - 1);
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
