angular.module('orb.components.svgControl.elements')
  .directive('svgTransform', function () {
    return {
      restrict: 'E',
      transclude: true,
      require: '^svgControl',
      controller: function ($scope) {

      }
    };
  });
