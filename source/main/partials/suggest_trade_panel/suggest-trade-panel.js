angular.module('orb.partials.suggestTradePanel', [])
  .controller('SuggestTradePanelController',
  function ($timeout, $scope, TradeItems, Items, _, TradeManager) {

    function isCurrentItemTraded() {
      var selectedItemId = $scope.getSelectedItemId();
      return TradeManager.isItemTraded(selectedItemId);
    }

    function isItemSelected(itemId) {
      return $scope.getSelectedItemId() === itemId;
    }

    function addSelectedItemToTrade() {
      var selectedItemId = $scope.getSelectedItemId();
      TradeManager.addItemToTrade(selectedItemId);
    }

    function removeSelectedItemFromTrade() {
      var selectedItemId = $scope.getSelectedItemId();
      TradeManager.removeItemFromTrade(selectedItemId);
    }

    function toggleItemTrade() {
      var selectedItemId = $scope.getSelectedItemId();
      if (TradeManager.isItemTraded(selectedItemId)) {
        removeSelectedItemFromTrade();
      } else {
        addSelectedItemToTrade();
      }
    }

    function reorderTradeItems(boxedItems) {
      var selectedItemId = $scope.getSelectedItemId();
      var selectedBoxedItemIndex = boxedItems.map(function (e) {
        return e.id;
      }).indexOf(selectedItemId);
      boxedItems[0] = boxedItems.splice(selectedBoxedItemIndex, 1, boxedItems[0])[0];
    }

    function getTradeMessage() {
      if (isCurrentItemTraded()) {
        return 'Not interested in this item';
      } else {
        if (TradeManager.isAtLeastOneItemTraded()) {
          return 'Trade this item as well';
        } else {
          return 'Trade this item';
        }
      }
    }

    angular.extend($scope, {
      isItemSelected: isItemSelected,
      isCurrentItemTraded: isCurrentItemTraded,
      toggleItemTrade: toggleItemTrade,
      getTradeMessage: getTradeMessage
    });

    function init() {
      TradeManager.initTrade();
      $scope.boxedItemSlickOptions = {};
      Items.query({boxId: 1}, function (tradeItems) {
        var boxItems = $scope.boxItems = tradeItems;
        reorderTradeItems(boxItems);
        $scope.$watch('selectedItem', function (newItem) {
          $scope.boxedItemSlickOptions.currentSlickIndex = boxItems.map(function (e) {
            return e.id;
          }).indexOf(newItem.id);
        });
      });
    }

    init();

  });
