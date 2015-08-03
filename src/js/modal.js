(function() {

	function controller($element, $rootScope, $transclude, bgModals) {

		var bgmId = this.bgmId || bgModals.getId();

		$transclude(function(content) {

			var main = $element.find('main');

			for(var i=0; i<content.length; i++) {

				if(content[i].tagName === 'BGM-BUTTONS') {
					$element.append(content[i]);
				} else {
					main.appendChild(content[i]);
				}
			}
		});

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
			controllerAs: 'bgmModal',
			bindToController: {
				title: "@",
				bgmId: '@'
			},
			restrict: 'E',
			transclude: true,
			require: '^bgmModals',
			templateUrl: '/templates/bgmModal.html',
			controller: ['$element', '$rootScope', '$transclude', 'bgModals', controller]
		}
	}

	angular.module('bg.modals')
		.directive('bgmModal', directive);

})();
