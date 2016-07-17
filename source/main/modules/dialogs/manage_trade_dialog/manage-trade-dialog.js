angular.module('orb.modules.manageTradeDialog', [])
  .config(function ($stateProvider) {
    var modalInstance = null;
    $stateProvider.state('dialog.manageTrade', {
      url: '/trades/:tradeId',
      onEnter: function ($stateParams, $state, TradeDialogs, $previousState) {
        $previousState.memo("modalInvoker");
        modalInstance = TradeDialogs.openManageTradeDialog($stateParams.tradeId);
        modalInstance.result.then(function () {
            $previousState.go("modalInvoker");
          },
          function () {
            $previousState.go("modalInvoker");
          }
        );
      },
      onExit: function () {
        modalInstance.close();
      }
    });
  })
  .controller('ManageTradeDialogController', ['$scope', 'tradeId', 'BidResource', 'Items', 'TradeItems', '$modalInstance', '_', 'TRADED_ITEM_STATUSES',
    function ($scope, tradeId, BidResource, Items, TradeItems, $modalInstance, _, TRADED_ITEM_STATUSES) {

      var ACCEPTED_STATUS = 'ACCEPTED';
      var REJECTED_STATUS = 'REJECTED';
      var BLOCKED_STATUS = 'BLOCKED';
      var IRRELEVANT_STATUS = 'IRRELEVANT';

      var OFFERED = 'offered';
      var REQUESTED = 'requested';

      var previousEvaluationMap = {};
      previousEvaluationMap[OFFERED] = {};
      previousEvaluationMap[REQUESTED] = {};

      var currentEvaluationMap = {};
      currentEvaluationMap[OFFERED] = {};
      currentEvaluationMap[REQUESTED] = {};

      $scope.currentlyEvaluated = null;

      function selectItem(itemId) {
        Items.getItem({'itemId': itemId}).$promise.then(function (item) {
          $scope.selectedItem = item;
        });
      }

      function selectOfferedItem(itemId) {
        selectItem(itemId);
        $scope.currentlyEvaluated = OFFERED;
        $scope.currentItemEvaluation = currentEvaluationMap[OFFERED][itemId];
      }

      function selectRequestedItem(itemId) {
        selectItem(itemId);
        $scope.currentlyEvaluated = REQUESTED;
        $scope.currentItemEvaluation = currentEvaluationMap[REQUESTED][itemId];
      }

      function close() {
        $modalInstance.dismiss('cancel');
      }

      function reevaluate() {
        switch ($scope.currentItemEvaluation.status) {
          case ACCEPTED_STATUS:
            $scope.currentItemEvaluation.status = REJECTED_STATUS;
            break;
          case REJECTED_STATUS:
            $scope.currentItemEvaluation.status = BLOCKED_STATUS;
            break;
          case BLOCKED_STATUS:
            $scope.currentItemEvaluation.status = ACCEPTED_STATUS;
            break;
          case IRRELEVANT_STATUS:
            $scope.currentItemEvaluation.status = ACCEPTED_STATUS;
            break;
          default:
            throw "Unknown item evaluation";
        }
      }

      function getReevaluationMsg() {
        switch ($scope.currentItemEvaluation.status) {
          case ACCEPTED_STATUS:
            return 'Reject this item';
          case REJECTED_STATUS:
            return 'Block this item';
          case BLOCKED_STATUS:
            return 'Accept this item';
          case IRRELEVANT_STATUS:
            return 'Request this item';
          default:
            throw "Unknown item evaluation";
        }
      }

      function bidAndClose() {
        BidResource.save({});
        close();
      }

      function isRequestedItemSelected(itemId) {
        return $scope.currentlyEvaluated === REQUESTED && $scope.selectedItem && $scope.selectedItem.id === itemId;
      }

      function isOfferedItemSelected(itemId) {
        return $scope.currentlyEvaluated === OFFERED && $scope.selectedItem && $scope.selectedItem.id === itemId;
      }

      function getBidStateFor(itemId, type) {
        var previousStatus = previousEvaluationMap[type][itemId].status;
        if (previousStatus === IRRELEVANT_STATUS) {
          return TRADED_ITEM_STATUSES.NEUTRAL;
        } else {
          var currentStatus = currentEvaluationMap[type][itemId].status;
          return currentStatus === previousStatus ? TRADED_ITEM_STATUSES.AGREED : TRADED_ITEM_STATUSES.DISAGREED;
        }
      }

      function getRequestedItemBidState(itemId) {
        return getBidStateFor(itemId, REQUESTED);
      }

      function getOfferedItemBidState(itemId) {
        return getBidStateFor(itemId, OFFERED);
      }

      angular.extend($scope, {
        close: close,
        getRequestedItemBidState: getRequestedItemBidState,
        getOfferedItemBidState: getOfferedItemBidState,
        isRequestedItemSelected: isRequestedItemSelected,
        isOfferedItemSelected: isOfferedItemSelected,
        selectRequestedItem: selectRequestedItem,
        selectOfferedItem: selectOfferedItem,
        reevaluate: reevaluate,
        getReevaluationMsg: getReevaluationMsg,
        bidAndClose: bidAndClose,
        getRequestedItemStatus: function (itemId) {
          return currentEvaluationMap[REQUESTED][itemId].status;
        },
        getOfferedItemStatus: function (itemId) {
          return currentEvaluationMap[OFFERED][itemId].status;
        }
      });

      function init() {

        $scope.offeredItemsSlickOptions = {};
        $scope.requestedItemsSlickOptions = {};
        $scope.thisBid = {
          message: ''
        };

        BidResource.getLatest({tradeId: tradeId}, function (latestBid) {
          $scope.otherBid = latestBid;
          TradeItems.getSome({boxId: latestBid.sourceBox}, function (tradeItems) {
            $scope.requestedItems = tradeItems;
            _.each(tradeItems, function (item) {
              var itemId = item.id;
              var offer = _.find(latestBid.offers, function (e) {
                return e.id === itemId;
              });
              var requestedItemEval = previousEvaluationMap.requested[itemId] = {
                status: offer ? offer.status : IRRELEVANT_STATUS
              };
              currentEvaluationMap.requested[itemId] = _.clone(requestedItemEval);
            });
            selectRequestedItem($scope.requestedItems[0].id);
          });
          TradeItems.getSome({boxId: latestBid.targetBox}, function (tradeItems) {
            $scope.offeredItems = tradeItems;
            _.each(tradeItems, function (item) {
              var itemId = item.id;
              var request = _.find(latestBid.requests, function (e) {
                return e.id === itemId;
              });
              var offeredItemEval = previousEvaluationMap.offered[itemId] = {
                status: request ? request.status : IRRELEVANT_STATUS
              };
              currentEvaluationMap.offered[itemId] = _.clone(offeredItemEval);
            });
          });
        });

        $scope.$watch('selectedItem', function (newItem) {
          if (newItem) {
            switch ($scope.currentlyEvaluated) {
              case OFFERED:
                $scope.offeredItemsSlickOptions.currentIndex = $scope.offeredItems.map(function (e) {
                  return e.id;
                }).indexOf(newItem.id);
                break;
              case REQUESTED:
                $scope.requestedItemsSlickOptions.currentIndex = $scope.requestedItems.map(function (e) {
                  return e.id;
                }).indexOf(newItem.id);
                break;
              default:
                throw 'Unknown item origin';
            }
          }
        });

        $scope.$watch('currentlyEvaluated', function (newEvaluation) {
          if (newEvaluation) {
            switch (newEvaluation) {
              case OFFERED:
                var offeredIndex = $scope.offeredItemsSlickOptions.currentIndex;
                if (offeredIndex) {
                  selectOfferedItem(offeredIndex);
                }
                break;
              case REQUESTED:
                var requestedIndex = $scope.requestedItemsSlickOptions.currentIndex;
                if (requestedIndex) {
                  selectRequestedItem(requestedIndex);
                }
                break;
              default:
                throw "Unknown evaluation mode";
            }
          }
        });

      }

      init();

    }]);
