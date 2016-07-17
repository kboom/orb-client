angular.module('orb.components.boxedItem', [])
  .directive('boxedItem', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'components/boxed_item/boxed-item.html',
      scope: {
        itemId: '@',
        itemName: '@',
        itemDescription: '@',
        itemImagePath: '@',
        settings: '=',
        onItemImageClicked: '&',
        isSelected: '=',
        selectable: '@'
      },
      controller: function ($scope) {

      }
    };
  });
