angular.module('bg.modals').factory('bgModals', ['$rootScope', '$q', function bgModals($rootScope, $q) {

	var modalCtr = 0,
		promises = {};

	$rootScope.$on('bgm:rejected', function(e, id, data) {

		if(promises[id]) {
			promises[id].reject(data);
			delete promises[id];
		}
	});
	$rootScope.$on('bgm:accepted', function(e, id, data) {

		promises[id].resolve(data);
		delete promises[id];
	});

	function open(id) {
		$rootScope.$emit('bgm:open', id);
		promises[id] = $q.defer();

		return promises[id].promise;
	}

	function close(id) {
		$rootScope.$emit('bgm:close', id);
	}

	function closeAll() {

		$rootScope.$emit('bgm:closeall');
	}

	function accept(id, data) {

		close(id);

		if(promises[id]) {
			promises[id].resolve(data);
			delete promises[id];
		}
	}

	function reject(id, data) {

		close(id);

		if(promises[id]) {
			promises[id].reject(data);
			delete promises[id];
		}
	}

	function clear() {
		promises = {};
	}

	function getId() {
		return 'bgm' + modalCtr++;
	}

	return {
		open: open,
		close: close,
		closeAll: closeAll,
		reject: reject,
		accept: accept,
		getId: getId,
		clear: clear

	};
}]);