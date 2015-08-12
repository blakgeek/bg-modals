angular.module('bg.modals', []);
/**
 * Created by blakgeek on 6/21/15.
 */
(function() {

	function controller($element, $rootScope, $attrs, bgModals) {

		var modalsController = $element.inheritedData('$bgmModalsController'),
			self = this;

		self.group = modalsController.group;
		self.id = (self.group ? self.group + '.' : '') + ($attrs.bgmId || bgModals.getId());

		this.close = function() {
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

			if(!group || self.group === group) {
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
			controllerAs: 'bgmAlert',
			bindToController: {
				title: "@bgmTitle",
				bgmId: '@',
				gotIt: '@bgmOkText'
			},
			restrict: 'E',
			transclude: true,
			require: '^bgmModals',
			templateUrl: '/templates/bgmAlert.html',
			controller: ['$element', '$rootScope', '$attrs', 'bgModals', controller]
		}
	}

	angular.module('bg.modals')
		.directive('bgmAlert', directive);
})();
(function() {


	function controller($element, $attrs) {

	}

	function directive() {

		return {
			scope: {},
			restrict: 'E',
			transclude: true,
			templateUrl: '/templates/bgmButtons.html',
			controller: ['$element', '$attrs', controller]
		}
	}

	angular.module('bg.modals')
		.directive('bgmButtons', directive);
})();
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

(function() {

    function controller($element, $rootScope, $attrs, $transclude, bgModals, $bgmModalsController) {

        var modalsController = $element.inheritedData('$bgmModalsController'),
            self = this;

        self.group = modalsController.group;
        self.id = (self.group ? self.group + '.' : '') + ($attrs.bgmId || bgModals.getId());

        $transclude(function(content) {

            var main = $element.find('main');

            for(var i = 0; i < content.length; i++) {

                if(content[i].tagName === 'BGM-BUTTONS') {
                    $element.append(content[i]);
                } else {
                    main.append(content[i]);
                }
            }
        });

        this.close = function() {
            $rootScope.$emit('bgm:rejected', self.id);
            $rootScope.$emit('bgm:close', self.id);
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

            if(!group || self.group === group) {
                $element.removeClass('bgm-open');
            }
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
                title: "@bgmTitle"
            },
            restrict: 'E',
            transclude: true,
            require: '^bgmModals',
            templateUrl: '/templates/bgmModal.html',
            controller: ['$element', '$rootScope', '$attrs', '$transclude', 'bgModals', controller]
        }
    }

    angular.module('bg.modals')
        .directive('bgmModal', directive);

})();

(function() {

    function controller($rootScope, $element, $attrs) {

        var self = this;

        $rootScope.$on('bgm:mask', function(e, group) {

            if(self.group === group) {
                $element.addClass('bgm-modal-masked');
            }
        });

        $rootScope.$on('bgm:unmask', function(e, group) {

            if(self.group === group) {
                $element.removeClass('bgm-modal-masked');
            }
        });

        $rootScope.$on('bgm:closeall', function(e, group) {

            if(!group || self.group === group) {
                $element.removeClass('bgm-modal-masked');
            }
        });
    }

    function directive() {

        return {
            scope: true,
            bindToController: {
                group: '@bgmGroup'
            },
            controllerAs: 'bgmModals',
            restrict: 'E',
            transclude: true,
            templateUrl: '/templates/bgmModals.html',
            controller: ['$rootScope', '$element', '$attrs', controller]
        }
    }

    angular.module('bg.modals')
        .directive('bgmModals', directive);
})();;

(function() {
	angular.module('bg.modals').factory('bgModals', [
		'$rootScope', '$q', function bgModals($rootScope, $q) {

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

			function closeAll(group) {

				$rootScope.$emit('bgm:closeall', group);
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
		}
	]);
})();
angular.module('bg.modals').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/templates/bgmAlert.html',
    "<div class=\"bgm-modal bgm-alert\"><header><h2>{{bgmAlert.title}}</h2><span ng-click=\"bgmAlert.close()\" class=\"bgm-btn-close\"></span></header><main><ng-transclude></ng-transclude></main><footer><button ng-click=\"bgmAlert.close()\">{{bgmAlert.gotIt}}</button></footer></div>"
  );


  $templateCache.put('/templates/bgmBody.html',
    "<main><ng-transclude></ng-transclude></main>"
  );


  $templateCache.put('/templates/bgmButtons.html',
    "<ng-transclude></ng-transclude>"
  );


  $templateCache.put('/templates/bgmConfirm.html',
    "<div class=\"bgm-modal bgm-confirm\"><header><h2>{{bgmConfirm.title}}</h2><span ng-click=\"bgmConfirm.reject()\" class=\"bgm-btn-close\"></span></header><main><ng-transclude></ng-transclude></main><footer><button ng-click=\"bgmConfirm.reject()\">{{bgmConfirm.nope}}</button> <button ng-click=\"bgmConfirm.accept()\">{{bgmConfirm.yep}}</button></footer></div>"
  );


  $templateCache.put('/templates/bgmModal.html',
    "<header><h2>{{bgmModal.title}}</h2><span ng-click=\"bgmModal.close()\" class=\"bgm-btn-close\"></span></header><main></main>"
  );


  $templateCache.put('/templates/bgmModals.html',
    "<div class=\"bgm-modals\"><ng-transclude></ng-transclude><div class=\"bgm-mask\"></div></div>"
  );

}]);
