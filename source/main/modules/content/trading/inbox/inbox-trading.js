angular.module('orb.modules.trading.inbox', [])
  .controller('InboxTradingHeaderController', ['$scope', function ($scope) {

  }])
  .controller('InboxTradingContentController', function ($scope, VIEWPORT_TYPES, ViewportManager, Trades, $timeout, $state) {
    var TRADE_COUNT_PER_LOAD = 50;
    ViewportManager.setViewport(VIEWPORT_TYPES.DENSITY_LOW);

    $scope.actions = {
      showTrade: function (tradeId) {
        $state.go('dialog.manageTrade', {
          tradeId: tradeId
        });
      },
      settings: [
        {
          name: 'abandon',
          onSelect: function () {
            alert('abandoned');
          }
        }
      ]
    };

    $scope.trades = [];

    $scope.loadMoreTrades = function () {
      var moreTrades = Trades.getIncoming({
        offset: $scope.trades.length,
        limit: TRADE_COUNT_PER_LOAD
      });
      var promise = moreTrades.$promise;
      promise.then(function (data) {
        Array.prototype.push.apply($scope.trades, data);
        $timeout(function () {
          $scope.loading = false;
        });
      });
      $scope.loading = true;
      return promise;
    };
  }
);
