angular.module('orb.components.tag', [])
    .directive('tag', function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                removable: '=',
                removeTag: '&onRemove'
            },
            templateUrl: 'components/tag/tag.html',
            controller: function ($scope) {

            },
            link: function ($scope, $element, $attrs) {

            }
        };
    });
