angular.module('orb.components.itemWall.brickItem', [])
  .directive('brickItem', function () {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      templateUrl: 'components/item_wall/brick_item/brick-item.html'
    };
  });
