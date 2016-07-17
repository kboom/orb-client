angular.module('orb.resources').factory('GatheredItems', function (orangeboxResource, Gate) {

  return orangeboxResource('', null, {
    getSome: {
      url: Gate.getUrl('GATHERED_ITEMS.GET_SOME'),
      method: 'GET',
      isArray: true,
      params: {offset: '@offset', limit: '@limit'}
    }
  });

});
