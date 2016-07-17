angular.module('orb.components.itemWall', ['orb.components.itemWall.brickItem'])
  .directive('itemWall', function () {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: 'components/item_wall/item-wall.html'
    };
  });
