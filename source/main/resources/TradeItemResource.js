angular.module('orb.resources').factory('TradeItems', function (orangeboxResource, Gate) {

  return orangeboxResource(null, null, {
    getSome: {url: Gate.getUrl('TRADE_ITEMS.GET_SOME_TRADE_ITEMS'), method: 'GET', isArray: true},
    getAllByIds: {url: Gate.getUrl('TRADE_ITEMS.GET_ALL_BY_IDS'), method: 'GET' }
  });

});
