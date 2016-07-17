angular.module('orb.modules.box.items', [])
  .controller('BoxItemsHeaderController', ['$scope', function ($scope) {

  }])
  .controller('BoxItemsActionsController', function ($scope, $state, selectionManager) {

    function tradeItem() {
      $state.go('dialog.suggestTrade', {
        items: selectionManager.getSelected()
      });
      selectionManager.stopSelecting();
    }

    function removeItem() {
      selectionManager.stopSelecting();
    }

    var cancelOption = {
      name: 'Cancel',
      callback: function (control) {
        control.abandonAction();
        selectionManager.clearSelections();
      }
    };

    $scope.actions = {
      available: {
        tradeItem: {
          name: 'Trade',
          index: 2,
          count: selectionManager.getCount,
          startCallback: selectionManager.startSelecting,
          endCallback: tradeItem,
          options: [cancelOption]
        },
        removeItem: {
          name: 'Remove',
          index: 1,
          count: selectionManager.getCount,
          startCallback: selectionManager.startSelecting,
          endCallback: removeItem,
          options: [cancelOption]
        }
      },
      active: false
    };
  })
  .controller('BoxItemsContentController',
  function ($scope, $state, VIEWPORT_TYPES, ViewportManager, selectionManager, BoxedItems, $timeout, BOX_BROWSING_MODE) {
    var ITEM_COUNT_PER_LOAD = 10;
    ViewportManager.setViewport(VIEWPORT_TYPES.DENSITY_LOW);

    function loadMoreItems() {
      var moreItems = BoxedItems.getSome({
        boxId: $scope.boxId,
        offset: $scope.items.length,
        limit: ITEM_COUNT_PER_LOAD
      });
      var promise = moreItems.$promise;
      promise.then(function (data) {
        Array.prototype.push.apply($scope.items, data);
        $timeout(function () {
          $scope.loading = false;
        });
      });
      $scope.loading = true;
      return promise;
    }

    angular.extend($scope, {
      selections: selectionManager.state,
      items: [],
      loadMoreItems: loadMoreItems,
      itemActions: {

        openSettings: function (itemId) {

        },

        openTrade: function (itemId) {
          $state.go('dialog.suggestTrade', {
            itemId: itemId
          });
        },

        showDetails: function (itemId) {
          switch ($scope.browsingMode) {
            case BOX_BROWSING_MODE.OWNER:
              $state.go('dialog.manageItem', {
                itemId: itemId
              });
              break;
            case BOX_BROWSING_MODE.VISITOR:
              $state.go('dialog.examineItem', {
                itemId: itemId
              });
              break;
            default:
              throw "Unknown browsing mode";
          }

        },

        settings: [
          {
            name: 'report',
            onSelect: function () {

            }
          }
        ]
      }
    });

  });
