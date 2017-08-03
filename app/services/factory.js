(function () {
  'use strict';

  var app = angular.module('app');

	app.factory('dataFactory', function(webconfig, $http) {
		var urlBase = webconfig.api;
		var _Factory = {};

		// --- ACCOUNT -----
		_Factory.changePassword = function(obj) {
			return $http.post(urlBase + '/accounts/pwd/change', obj);
		};

		_Factory.resetPassword = function(obj) {
			return $http.post(urlBase + '/accounts/pwd/reset', obj);
		};

		// --- PROFILO -----
		_Factory.getProfiloUtente = function() {
			return $http.get(urlBase + '/accounts/profilo');
		};

		_Factory.updateProfiloUtente = function(username, obj) {
			return $http.post(urlBase + '/profilo/' + username, obj);
		};

    // --- PDF -----
    _Factory.downloadPdf = function(entity, id) {
      var config = {
        method: 'GET',
        url: urlBase + '/' + entity + '/' + id + '/download',
        headers: {
            'Accept': 'application/pdf'
        }
      };
      return $http(config);
    };

    _Factory.downloadFile = function(id) {
      var config = {
        method: 'GET',
        url: urlBase + '/files/' + id + '/download'
      };
      return $http(config);
    };

		//*************************************************
		// Metodi per API Base
		//*************************************************
		_Factory.baseGetPageFilter = function(entity, page, filter) {
			var p = page || '1';
			return $http.get(urlBase + '/' + entity +  '/page/' + p + '?' + filter);
		};

		_Factory.baseGetPage = function(entity, page) {
			var p = page || '1';
			return $http.get(urlBase + '/' + entity + '/page/' + p);
		};

		_Factory.baseCountPage = function(entity) {
			return $http.get(urlBase + '/' + entity + '/count/page');
		};

		_Factory.baseCount = function(entity) {
			return $http.get(urlBase + '/' + entity + '/count');
		};

		_Factory.baseGetAll = function(entity) {
			return $http.get(urlBase + '/' + entity);
		};

		_Factory.baseGetAllByFilter = function(entity, filter) {
			var f = filter || '';
			return $http.get(urlBase + '/' + entity + '/filter/' + fq);
		};

		_Factory.baseGetById = function(entity, id) {
			return $http.get(urlBase + '/' + entity + '/' + id);
		};

    _Factory.baseGetListAnag = function(entity, list) {
      var obj = {};
			obj.list = list;

			return $http.post(urlBase + '/' + entity + '/anag', obj);
		};

    _Factory.baseGetOneAnag = function(entity, id) {
			return $http.get(urlBase + '/' + entity + '/' + id + '/anag');
		};

		_Factory.basePost = function(entity, obj) {
			return $http.post(urlBase + '/' + entity, obj);
		};

		_Factory.basePut = function(entity, id, obj) {
			return $http.put(urlBase + '/' + entity + '/' + id, obj);
		};

		_Factory.baseDelete = function(entity, id) {
			return $http.delete(urlBase + '/' + entity + '/' + id);
		};

    _Factory.baseConvalida = function(entity, id, convalida) {
      var obj = {};
			obj.convalida = convalida;
			return $http.put(urlBase + '/' + entity + '/' + id + '/convalida', obj);
		};

		_Factory.baseAllegatiPut = function(entity, id, obj) {
			return $http.put(urlBase + '/' + entity + '/' + id + '/allegati', obj);
		};

		_Factory.baseAllegatiDelete = function(entity, id, allegatoId) {
			return $http.delete(urlBase + '/' + entity + '/' + id + '/allegati/' + allegatoId);
		};

		//*************************************************
		// Metodi Preview
		//*************************************************
		_Factory.filePreview = function(id) {
			return $http.get(urlBase + '/files/' + id + '/preview');
		}

		_Factory.fatturaPreview = function(id) {
			return $http.get(urlBase + '/fatture/' + id + '/preview');
		}

		// --- PUBLIC METHODS -----
		_Factory.setUserReset = function(obj) {
			return $http.post(urlBase + '/public/setUserReset', obj);
		};

		_Factory.resetPwd = function(obj) {
			console.log('_Factory.resetPwd');
			console.dir(obj);

			return $http.post(urlBase + '/public/reset/password', obj);
		};

		_Factory.checkToken = function(obj) {
			var username 	= obj.username || '',
					pec 			= obj.pec || '',
					token			= obj.token || '';

			return $http.get(urlBase + '/public/reset/'
											 + username + '/'
											 + pec + '/'
											 + token
											);
		};

		return _Factory;
	});
})();
