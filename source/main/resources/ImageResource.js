angular.module('orb.resources').factory('Images', function (orangeboxResource, Gate) {

    return orangeboxResource(Gate.getUrl('IMAGES.ROOT'), null, {});

});
