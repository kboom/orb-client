angular.module('orb.directives')
  .directive('activeWhenPath', function ($location) {

    var DEFAULT_ACTIVE_CLASS = 'active';

    return {
      restrict: 'A',
      link: function ($scope, $element, $attr) {
        var clazz = $attr.activeClass || DEFAULT_ACTIVE_CLASS;
        var pathRegex = new RegExp($attr.activeWhenPath);
        $scope.$watch(function () {
          return $location.path();
        }, function (newPath) {
          if (pathRegex.test(newPath)) {
            $element.addClass(clazz);
          } else {
            $element.removeClass(clazz);
          }
        });
      }
    };
  });
