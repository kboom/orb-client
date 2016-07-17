angular.module('orb.utils')
  .factory("locationUtils", function () {

    function validateURL(textval) {
      return /.*/.test(textval);
    }

    return {
      validateURL: validateURL
    };
  });
