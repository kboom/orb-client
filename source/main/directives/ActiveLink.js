angular.module('orb.directives')
    .directive('activeLink', ['$location', function (location) {

        var DEFAULT_ACTIVE_CLASS = 'active';

        return {
            restrict: 'A',
            link: function ($scope, $element, $attrs) {
                var clazz = $attrs.activeLink || DEFAULT_ACTIVE_CLASS;
                var navElement = $element.find('*[href]').first();
                var path = navElement.attr('href');
                path = path.substring(2);
                $scope.location = location;
                $scope.$watch('location.path()', function (newPath) {
                    if (path === newPath) {
                        $element.addClass(clazz);
                    } else {
                        $element.removeClass(clazz);
                    }
                });
            }
        };

    }]);