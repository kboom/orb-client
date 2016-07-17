angular.module('orb.components.itemSelector', [])
  .directive('itemSelector', function () {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        selectable: '@',
        isSelected: '='
      },
      templateUrl: 'components/item_selector/item-selector.html',
      controller: function($scope) {
        $scope.toggleSelect = function() {
          if($scope.selectable) {
            $scope.isSelected = !$scope.isSelected;
          }
        };
      }
    };
  });
