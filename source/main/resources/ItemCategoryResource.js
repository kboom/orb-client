angular.module('orb.resources').factory('ItemCategory', function (orangeboxResource, Gate) {

  return orangeboxResource(null, null, {
    'getOne': {
      url: Gate.getUrl('ITEM_CATEGORY.GET_ONE'),
      method: 'GET'
    }
  });

});
