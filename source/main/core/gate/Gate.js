angular.module('orb.core.gate').provider('Gate',
  function () {

    var routeMap = {};

    this.$get = function (server) {

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

      function getRoute(name) {
        return _.find(routeMap.resources, 'name', name);
      }

      function getUrl(name) {
        var route = getRoute(name);
        return server.gatewayUrl + route.url;
      }

      readRoutes(server.gatewayUrl);

      return {
        getUrl: getUrl
      };

    };

  });
