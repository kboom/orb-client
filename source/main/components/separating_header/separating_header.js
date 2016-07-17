angular.module('orb.components.separatingHeader', [])
    .directive('separatingHeader', function () {

        var DEFAULT_ICON_CLASS = 'glyphicon glyphicon-question-sign';

        return {
            restrict: 'E',
            replace: true,
            scope: {
                title: '@',
                description: '@',
                details: '@',
                headerIconClass: '@',
                helpIconClass: '@'
            },
            templateUrl: 'components/separating_header/separating-header.html',
            controller: function ($scope) {

            },
            compile: function(element, attrs){
                attrs.helpIconClass = attrs.helpIconClass || DEFAULT_ICON_CLASS;

                return function ($scope, $element, $attrs) {
                    $scope.helpIconClass = $scope.helpIconClass || DEFAULT_ICON_CLASS;
                };
            }
        };
    });
