angular.module('orb.components.svgControl.elements')
  .directive('svgSwitch', function () {
    return {
      restrict: 'E',
      transclude: true,
      require: '^svgControl',
      scope: {
        actionId: '@',
        imgSrc: '@'
      },
      link: function ($scope, $element, $attribute, $svgControl) {

        function swapImage() {
          $svgControl.resolvePlaceholder().attr('data', $scope.imgSrc);
        }

        $svgControl.registerAction({
          actionId: $scope.actionId,
          actionFn: swapImage,
          whenReady: false
        });

      }
    };
  });
