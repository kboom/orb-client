angular.module('orb.core.dialogs').service('TradeDialogs', function ($modal) {

  var openedModal = null;

  function openSuggestTradeDialog(items) {
    openedModal = $modal.open({
      templateUrl: 'modules/dialogs/suggest_trade_dialog/suggest-trade-dialog.html',
      controller: 'SuggestTradeDialogController',
      resolve: {
        tradedItems: function () {
          return items;
        }
      }
    });
    return openedModal;
  }

  function openManageTradeDialog(tradeId) {
    openedModal = $modal.open({
      templateUrl: 'modules/dialogs/manage_trade_dialog/manage-trade-dialog.html',
      controller: 'ManageTradeDialogController',
      resolve: {
        tradeId: function () {
          return tradeId;
        }
      }
    });
    return openedModal;
  }

  return {
    openSuggestTradeDialog: openSuggestTradeDialog,
    openManageTradeDialog: openManageTradeDialog
  };

});
