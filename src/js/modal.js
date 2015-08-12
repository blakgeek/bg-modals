
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