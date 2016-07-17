angular.module('orb.directives').directive('navigateOnClick', function ($location) {
    return function (scope, element, attrs) {
        var path;

        attrs.$observe('navigateOnClick', function (val) {
            path = val + '/';
        });

        element.bind('click', function () {
            scope.$apply(function () {
                $location.path(path);
            });
        });
    };
});
