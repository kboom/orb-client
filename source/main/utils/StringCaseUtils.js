angular.module('orb.utils')
  .factory("stringCaseUtils", function () {

    function camel2constant(str) {
      return str.replace(/[A-Z]/, function (g) {
        return '_' + g;
      }).toUpperCase();
    }

    function snake2constant(str) {
      return str.replace(/-/g, '_');
    }

    return {
      camel2constant: camel2constant,
      snake2constant: snake2constant
    };
  });
