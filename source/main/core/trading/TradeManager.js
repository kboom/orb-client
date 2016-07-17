angular.module('orb.core.trading').service('TradeManager', ['Trades', function (Trades) {

  var trade = null;

  function initTrade() {
    trade = {
      tradedItemsIds: [],
      message: ''
    };
  }

  function getTrade() {
    return trade;
  }

  function createTrade() {
    return Trades.save(trade);
  }

  function getTradedItemsIds() {
    return trade.tradedItemsIds;
  }

  function isAtLeastOneItemTraded() {
    return trade && trade.tradedItemsIds.length > 0;
  }

  function addItemToTrade(itemId) {
    trade.tradedItemsIds.push(itemId);
  }

  function isItemTraded(itemId) {
    return trade && itemId && getTradeIndexForItem(itemId) >= 0;
  }

  function getTradeIndexForItem(itemId) {
    return trade.tradedItemsIds.indexOf(itemId);
  }

  function removeItemFromTrade(itemId) {
    var selectedItemTradeIndex = getTradeIndexForItem(itemId);
    trade.tradedItemsIds.splice(selectedItemTradeIndex, 1);
  }

  function isTradeValid() {
    return isAtLeastOneItemTraded();
  }

  return {
    trade: trade,
    initTrade: initTrade,
    getTrade: getTrade,
    createTrade: createTrade,
    getTradedItemsIds: getTradedItemsIds,
    isAtLeastOneItemTraded: isAtLeastOneItemTraded,
    addItemToTrade: addItemToTrade,
    isItemTraded: isItemTraded,
    removeItemFromTrade: removeItemFromTrade,
    isTradeValid: isTradeValid
  };

}]);
