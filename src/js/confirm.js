/**
 * Created by blakgeek on 6/21/15.
 */
(function() {

	function controller($element, $rootScope, $attrs, bgModals) {

		var modalsController = $element.inheritedData('$bgmModalsController'),
			self = this;

		self.group = modalsController.group;
		self.id = (self.group ? self.group + '.' : '') + ($attrs.bgmId || bgModals.getId());

		this.reject = function() {
			bgModals.reject(self.id);
		};

		this.accept = function() {
			bgModals.accept(self.id);
		};

		$rootScope.$on('bgm:open', function(e, id) {

			if(id === self.id) {

				$element.addClass('bgm-open');
				$rootScope.$emit('bgm:mask', self.group);
			}
		});

		$rootScope.$on('bgm:close', function(e, id) {

			if(id === self.id) {

				$element.removeClass('bgm-open');
				$rootScope.$emit('bgm:unmask', self.group);
			}
		});

		$rootScope.$on('bgm:closeall', function(e, group) {

			if(!group || this.group === group) {
				$element.removeClass('bgm-open');
			}
		});

		$rootScope.$on('bgm:toggle', function(e, id) {

			if(id === self.id) {
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
			controller: ['$element', '$rootScope', '$attrs', 'bgModals', controller]
		}
	}

	angular.module('bg.modals')
		.directive('bgmConfirm', directive);
})();