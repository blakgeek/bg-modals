/**
 * Created by blakgeek on 6/21/15.
 */
(function() {


	function controller($scope, $element, $attrs) {

	}

	function directive() {

		return {
			scope: {},
			restrict: 'E',
			transclude: true,
			templateUrl: '/templates/bgmAlert.html',
			controller: controller
		}
	}

	angular.module('bg.modals')
		.directive('bgmAlert', directive);
})();