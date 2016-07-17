angular.module('orb.components.divider', [])
    .directive('horizontalDivider', function () {
        return {
            restrict: 'E',
            replace: false,
            template: '<div class="horizontal-divider"><hr></div>'
        };
    });
