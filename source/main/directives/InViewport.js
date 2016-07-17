angular.module('orb.directives')
    .directive('inViewportTop', ['$timeout', function ($timeout) {

        var DEFAULT_IN_VIEWPORT_CLASS = "in-viewport";

        var DEFAULT_OUT_OF_VIEWPORT_CLASS = "out-of-viewport";

        var DEFAULT_IN_VIEWPORT_TOP_PX = 50;

        function isInViewport($scope, $element) {
            return withinViewport($element[0], {top: $scope.offsetTop, sides: 'top'});
        }

        function markInViewport($element) {
            $element.children().removeClass(DEFAULT_OUT_OF_VIEWPORT_CLASS);
            $element.children().addClass(DEFAULT_IN_VIEWPORT_CLASS);
        }

        function markOutOfViewport($element) {
            $element.children().removeClass(DEFAULT_IN_VIEWPORT_CLASS);
            $element.children().addClass(DEFAULT_OUT_OF_VIEWPORT_CLASS);
        }

        function notifyInsideViewport($scope) {
            if(!$scope.inViewport) {
                $timeout(function() {
                    $scope.$apply();
                });
            }
        }

        function notifyOutsideViewport($scope) {
            if($scope.inViewport) {
                $timeout(function() {
                    $scope.$apply();
                });
            }
        }

        function updateViewport($scope, $element) {
            var withinBounds = isInViewport($scope, $scope.elementToWatchFor);
            if (withinBounds) {
                markInViewport($element);
                notifyInsideViewport($scope);
                $scope.inViewport = true;
            } else {
                markOutOfViewport($element);
                notifyOutsideViewport($scope);
                $scope.inViewport = false;
            }
        }

        return {
            restrict: 'E',
            replace: false,
            scope: {
                watchFor: '@',
                offsetTop: '@',
                inViewport: '='
            },
            link: function ($scope, $element) {
                $scope.elementToWatchFor = $scope.watchFor ? $($scope.watchFor) : $($element);
                $scope.offsetTop = $scope.offsetTop || DEFAULT_IN_VIEWPORT_TOP_PX;
                $scope.inViewport = !isInViewport($scope, $scope.elementToWatchFor);
                updateViewport($scope, $element);
                $(document).on("scroll", function () {
                    updateViewport($scope, $element);
                });
            }
        };

    }]);