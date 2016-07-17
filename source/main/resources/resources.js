// http://djds4rce.wordpress.com/2013/08/13/understanding-angular-http-interceptors/ <- make global error notifications out of this
// http://stackoverflow.com/questions/7486825/javascript-inheritance
angular.module('orb.resources', ['ngResource', 'ngCookies']).config(function ($httpProvider) {
  $httpProvider.interceptors.push('getPathParamsArrayInterceptor');
  $httpProvider.interceptors.push('userSessionInterceptor');
  $httpProvider.interceptors.push('serverErrorInterceptor');
}).provider('orangeboxResource', function () {
  var providerConfig = this;
  providerConfig.defaultReponseTransformers = [];

  function unwrapPayload(data) {
    return data.payload;
  }

  this.$get = ["$resource", "_", function ($resource, _) {

    function orangeboxResourceFactory(url, paramDefaults, actions, options) {

      var DEFAULT_ACTIONS = {
        'get':    {method:'GET'},
        'save':   {method:'POST'},
        'query':  {method:'GET', isArray:true},
        'remove': {method:'DELETE'},
        'delete': {method:'DELETE'}
      };

      function enhanceActions(actions) {
        var allActions = _.extend({}, DEFAULT_ACTIONS, actions);
        return _.each(allActions, function (action) {
          action.transformResponse = action.transformResponse || _.clone(providerConfig.defaultReponseTransformers);
          action.transformResponse.push(unwrapPayload);
        });
      }

      function enhanceUrl(url) {
        return url;
      }

      function enhanceOptions(options) {
        return options;
      }

      function enhanceParamDefaults(paramDefaults) {
        return paramDefaults;
      }

      return $resource.call(this,
        enhanceUrl(url),
        enhanceParamDefaults(paramDefaults),
        enhanceActions(actions),
        enhanceOptions(options)
      );
    }

    return orangeboxResourceFactory;
  }];
}).factory('serverErrorInterceptor', function () {
  return {
    request: function (request) {
      return request;
    }
  };
}).factory('getPathParamsArrayInterceptor', function () {
  return {
    request: function(request) {
      if(request.method === 'GET') {
        angular.forEach(request.params, function(value, key) {
          if(value instanceof Array) {
            request.params[key] = value.join(',');
          }
        });
      }
      return request;
    }
  };
}).config(['$httpProvider', 'orangeboxResourceProvider', function ($httpProvider, orangeboxResourceProvider) {
  orangeboxResourceProvider.defaultReponseTransformers = $httpProvider.defaults.transformResponse;
}]);
