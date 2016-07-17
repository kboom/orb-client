angular.module('orb.resources').factory('TagResource', function (orangeboxResource, Gate) {

  return orangeboxResource('', null, {
    findMatching: {url: Gate.getUrl('TAGS.FIND_MATCHING'), method: 'GET', isArray: true}
  });

});
