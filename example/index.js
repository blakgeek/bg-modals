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

	$scope.confirmIt = function() {
		bgModals.open('confirm').then(function() {
			console.log('Hola');
		}).catch(function() {
			console.log('nothing good can come of this');
		})
	};

	$scope.alertIt = function() {
		bgModals.open('alert').then(function() {
			console.log('gotcha');
		});
	};
});