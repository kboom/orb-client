angular.module('orb.components.textTab', [])
    .directive('textTab', function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            require: '^sectionTab',
            scope: true,
            template: '<a class="text-tab" ng-class="{ active : isActive() }" ng-click="selectOption()" ng-transclude></a>',
            controller: function ($scope) {
                $scope.selectOption = function () {
                    $scope.$sectionTabCtrl.activate();
                };
                $scope.isActive = function () {
                    return $scope.$sectionTabCtrl.isActive();
                };
            },
            link: function ($scope, $element, $attrs, $sectionTabCtrl) {
                $scope.$sectionTabCtrl = $sectionTabCtrl;
            }
        };
    });
