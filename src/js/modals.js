
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
