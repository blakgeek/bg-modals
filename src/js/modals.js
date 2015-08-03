(function() {


	function controller($rootScope, $element, $attrs) {

		$rootScope.$on('bgm:mask', function(e) {

			$element.addClass('bgm-modal-masked');
		});

		$rootScope.$on('bgm:unmask', function(e) {

			$element.removeClass('bgm-modal-masked');
		});

		$rootScope.$on('bgm:closeall', function(e) {

			$element.removeClass('bgm-modal-masked');
		});
	}

	function directive() {

		return {
			scope: true,
			bindToController: {},
			controllerAs: 'bgmModals',
			restrict: 'E',
			transclude: true,
			templateUrl: '/templates/bgmModals.html',
			controller: ['$rootScope', '$element', '$attrs', controller]
		}
	}

	angular.module('bg.modals')
		.directive('bgmModals', directive);
})();
