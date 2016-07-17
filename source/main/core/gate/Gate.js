angular.module('orb.core.gate').provider('Gate',
  function () {

    var routeMap = {};

    function readRoutes(url) {
      var routes = $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        data: {},
        async: false
      }).responseJSON;
      angular.extend(routeMap, routes);
    }


    // cache links on load

    function getUrl(name) {
      return 'http://localhost:5000/api' + name.split('.').reduce(function (obj, i) {
          return obj[i];
        }, routeMap);
    }

    readRoutes("http://localhost:5000/api/api");


    this.$get = function () {
      return {
        getUrl: getUrl
      };
    };

  });
