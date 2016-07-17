angular.module('orb.components.itemList', []).directive('itemList', function () {
  return {
    restrict: 'E',
    templateUrl: 'components/item_list/item-list.html',
    scope: {
      items : '='
    },
    controller: function ($scope) {
      $scope.removeItem = function (itemId) {
        delete $scope.items[itemId];
      };
    }
  };
});
