angular.module('example', ['bg.modals']).controller('ExampleCtrl', function($scope, bgModals) {


	$scope.title = 'Testing';

	$scope.showModal = function(id) {
		bgModals.open(id).then(function() {
			console.log('closed ' + id);
		}).catch(function() {
			console.log('rejected ' + id);
		});
	};
	$scope.hideModal = function(id) {
		bgModals.close(id);
	};

	$scope.closeAll = function() {
		bgModals.closeAll();
	};

	$scope.sup = function() {

		console.log('sup?');
	};

	$scope.hey = function() {
		console.log('hey')
	};
});