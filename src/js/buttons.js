(function() {


	function controller($element, $attrs) {

	}

	function directive() {

		return {
			scope: {},
			restrict: 'E',
			transclude: true,
			templateUrl: '/templates/bgmButtons.html',
			controller: controller
		}
	}

	angular.module('bg.modals')
		.directive('bgmButtons', directive);
})();