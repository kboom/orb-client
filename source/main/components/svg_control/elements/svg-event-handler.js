angular.module('orb.components.svgControl.elements')
  .directive('svgEventHandler', function () {
    return {
      restrict: 'E',
      transclude: true,
      require: '^svgControl',
      scope: {
        imgKeys: '@',
        imgElementId: '@',
        triggerEvent: '@',
        triggerActions: '@'
      },
      controller: function ($scope) {

      },
      link: function ($scope, $element, $attributes, $svgControl) {

        function triggerActions() {
          $svgControl.triggerActions.apply(this, $scope.triggerActions.split(','));
        }

        function attachCallback(svgElement) {
          svgElement.on($scope.triggerEvent, triggerActions);
        }

        $svgControl.whenReady(function () {
          attachCallback($svgControl.resolveElement($scope.imgElementId));
        });

      }
    };
  });
