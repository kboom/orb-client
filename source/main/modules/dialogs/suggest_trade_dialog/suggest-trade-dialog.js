angular.module('orb.modules.suggestTradeDialog', [])
  .config(function ($stateProvider) {
    var modalInstance = null;
    $stateProvider.state('dialog.suggestTrade', {
      url: '/trade?items',
      onEnter: function ($stateParams, $state, TradeDialogs, $previousState) {
        $previousState.memo("modalInvoker");
        modalInstance = TradeDialogs.openSuggestTradeDialog($stateParams.items);
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
  .controller('SuggestTradeDialogController', ['$scope', 'tradedItems', 'TradeItems',
    function ($scope, tradedItems, TradeItems) {

      function loadTradedItems(items) {
        TradeItems.getAllByIds({ids: items}).$promise.then(function (tradeItems) {
          $scope.tradedItems = tradeItems;
        });
      }

      loadTradedItems(tradedItems);

    }]);
