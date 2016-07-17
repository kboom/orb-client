angular.module('orb.components.svgControl.elements')
  .directive('svgStyle', function () {
    return {
      restrict: 'E',
      transclude: true,
      require: '^svgControl',
      scope : {
        actionId: '@',
        imageElementSelector: '@',
        imgStyle: '@'
      },
      link: function($scope, $element, $attributes, $svgControl) {

        function addClass() {
          $svgControl.resolveElement($scope.imageElementSelector).addClass($scope.imgStyle);
        }

        $svgControl.registerAction({
          actionId : $scope.actionId,
          actionFn : addClass
        });
      }
    };
  });
