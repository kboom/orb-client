angular.module('orb.resources').factory('AuthResource', function (orangeboxResource, Gate) {

  return orangeboxResource(Gate.getUrl('AUTH.ROOT'), null, {});

});
