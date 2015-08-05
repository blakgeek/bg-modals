/**
 * Created by blakgeek on 6/21/15.
 */
(function() {


	function controller($element, $rootScope, $transclude, bgModals) {

		var bgmId = this.bgmId || bgModals.getId();

		this.close = function() {
			$rootScope.$emit('bgm:rejected', bgmId);
			$rootScope.$emit('bgm:close', bgmId);
		};

		$rootScope.$on('bgm:open', function(e, id) {

			if(id === bgmId) {

				$element.addClass('bgm-open');
				$rootScope.$emit('bgm:mask');
			}
		});

		$rootScope.$on('bgm:close', function(e, id) {

			if(id === bgmId) {

				$element.removeClass('bgm-open');
				$rootScope.$emit('bgm:unmask');
			}
		});

		$rootScope.$on('bgm:closeall', function(e, id) {

			$element.removeClass('bgm-open');
		});

		$rootScope.$on('bgm:toggle', function(e, id) {

			if(id === bgmId) {

				$element.toggleClass('bgm-open');
			}
		});
	}

	function directive() {

		return {
			scope: true,
			controllerAs: 'bgmConfirm',
			bindToController: {
				title: "@bgmTitle",
				bgmId: '@',
				yep: '@bgmYepText',
				nope: '@bgmNopeText'
			},
			restrict: 'E',
			transclude: true,
			require: '^bgmModals',
			templateUrl: '/templates/bgmConfirm.html',
			controller: ['$element', '$rootScope', '$transclude', 'bgModals', controller]
		}
	}

	angular.module('bg.modals')
		.directive('bgmConfirm', directive);
})();