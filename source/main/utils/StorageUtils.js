// if localstorage limit is exceeded (or the thing is too large) store it in dynamically created input
angular.module('orb.utils')
  .service('storageUtils', function () {
    // add compression on / off - there must be a callback then
    var inMemoryStorage = {};
    localStorage.clear();


    function calculateRemainingSpace() {
      return 1024 * 1024 * 5 - unescape(encodeURIComponent(JSON.stringify(localStorage))).length;
    }

    function calculateSize(item) {
      return unescape(encodeURIComponent(JSON.stringify(item))).length;
    }

    function putItem(key, value) {
      var itemSize = calculateSize(value);
      if (itemSize > calculateRemainingSpace()) {
        inMemoryStorage[key] = value;
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    }

    function getItem(key) {
      return JSON.parse(localStorage.getItem(key) || inMemoryStorage[key]);
    }

    function removeItem(key) {

    }

    return {
      putItem: putItem,
      getItem: getItem,
      removeItem: removeItem,
      clear: localStorage.clear
    };
  });
