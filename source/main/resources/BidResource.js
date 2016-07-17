angular.module('orb.resources').factory('BidResource', function (orangeboxResource, Gate) {

  return orangeboxResource('', null, {
    'getLatest': {
      url: Gate.getUrl('BIDS.GET_LATEST'),
      method: 'GET',
      params: {
        'type': 'latest'
      }
    }
  });

});
