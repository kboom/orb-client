angular.module('orb.filters').filter('asInteger', function () {
  return function (input) {
    return parseInt(input, 10);
  };
});
