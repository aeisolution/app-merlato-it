(function() {
  'use strict';

  var app = angular.module('app');
  app.service('dataList', function() {
    var self = this;

    self.ctrl = {};

    // INIT
    var initCtrl = function(name, ctrl, collection) {
      if(!self.ctrl[name]) {
        self.ctrl[name] = defaults(collection);
      }
      integrateObject(ctrl, self.ctrl[name]);
    };

    // GET
    var getProp = function(name, prop) {
      var vm = self.ctrl[name];
      return vm[prop];
    };

    // SET
    var setProp = function(name, prop, value) {
      var vm = self.ctrl[name];
      return vm[prop] = value;
    };

    // --------------------------------------------
    // Service Methods
    var getCtrls = function() {
      return self.ctrl;
    }

    // Reset All and one controller
    var reset = function(name) {
      delete self.ctrl[name];
      return self.ctrl[name] || {};
    }

    var resetCtrls = function() {
      return self.ctrl = {};
    }

    // *******************************************
    // Return Service Methods
    return {
      init: initCtrl,
      get: getProp,
      set: setProp,
      // Service Methods
      getAll: getCtrls,
      reset: reset,
      resetAll: resetCtrls
    }
  });

  // Generic Functions
  function defaults(coll) {
    var vm = {};

    if(coll) {
      vm.collection = coll;
    }

    // Entity List
		vm.list = [];
		vm.listCount = 0;
    vm.listIndex = -1;
    vm.listPage = 1;
    vm.listPageCount = 0;
    vm.listPageSize = 0;
    vm.listPageLabel = '';


		// Entity Record
		vm.record = {};
		vm.recordNew = false;

		// Filter
		vm.filter = {};

    return vm;
  }

  // Union Object: start from objSource
  // will be updated/integrated with objForce
  function integrateObject(objSource, objAdd) {
      for (var prop in objAdd) {
          objSource[prop] = objAdd[prop];
      }

      return objSource;
  }

}());
