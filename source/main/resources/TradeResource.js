angular.module('orb.resources').factory('Trades', function (orangeboxResource, Gate) {

  return orangeboxResource(Gate.getUrl('TRADES.ROOT') + '/:tradeId', {"tradeId": "@tradeId"}, {
    'getIncoming': {
      method: 'GET',
      url: Gate.getUrl('TRADES.GET_INCOMING'),
      params: {type: 'outgoing', offset: '@offset', limit: '@limit'}
    },
    'getOutgoing': {
      method: 'GET',
      url: Gate.getUrl('TRADES.GET_OUTGOING'),
      params: {type: 'outgoing', offset: '@offset', limit: '@limit'}
    }
  });

});
