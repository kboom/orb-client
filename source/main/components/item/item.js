angular.module('orb.components.item', [
  'orb.components.item.itemCover',
  'orb.components.item.itemDetails'
]).directive('item', ['$compile', '$parse', function ($compile, $parse) {

  var SELECTED_VIEW_KEY = 'selectedViewKey';
  var KEY_ATTRIBUTE = 'item-view-key';
  var ICON_ATTRIBUTE = 'item-view-icon';
  var TOOLTIP_ATTRIBUTE = 'item-view-tooltip';

  return {
    restrict: 'E',
    scope: {
      name: '@itemName',
      selectedViewKey: '='
    },
    transclude: true,
    templateUrl: 'components/item/item.html',
    controller: function ($scope) {

      function selectView(key) {
        $scope[SELECTED_VIEW_KEY] = key;
      }

      function isViewSelected(key) {
        return $scope[SELECTED_VIEW_KEY] === key;
      }

      angular.extend($scope, {
        isViewSelected : isViewSelected,
        selectView : selectView
      });
    },
    link: function ($scope, $element, $attributes, $ctrl, $transclude) {
      var switches = $scope.switches = [];

      function createItemViewScope() {
        return $scope.$parent.$new();
      }

      function registerSwitch(vsElement) {
        var ivKey = vsElement.attr(KEY_ATTRIBUTE);
        switches.push({
          key: ivKey,
          icon: vsElement.attr(ICON_ATTRIBUTE),
          tooltip: vsElement.attr(TOOLTIP_ATTRIBUTE)
        });
        return ivKey;
      }

      $transclude(createItemViewScope(), function (content) {
        var itemViewElements = content.filter('[item-view-key]');
        var itemViewPlaceholder = $element.find('.item-view-placeholder');
        angular.forEach(itemViewElements, function (ivDom) {
          var ivElement = angular.element(ivDom);
          var ivKey = registerSwitch(ivElement);
          if (!$scope[SELECTED_VIEW_KEY]) {
            $scope[SELECTED_VIEW_KEY] = ivKey;
          }
          var showWrapper = angular.element('<div ng-show="' + SELECTED_VIEW_KEY + ' == \'' + ivKey + '\'"></div>');
          var compiledShowWrapper = $compile(showWrapper)($scope);
          compiledShowWrapper.append(ivElement);
          itemViewPlaceholder.append(compiledShowWrapper);
        });
      });
    }
  };
}]);
