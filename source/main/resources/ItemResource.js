angular.module('orb.resources').factory('Items', function (orangeboxResource, Gate) {

  return orangeboxResource(Gate.getUrl('ITEMS.ROOT') + '/:itemId', null, {
  });

});
