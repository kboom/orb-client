angular.module('orb.core.security').factory('userSessionInterceptor', ['UserSessionHolder',
  function (UserSessionHolder) {
    return {
      request: function (request) {
        if (UserSessionHolder.isAuthenticated()) {
          request.headers['X-Auth-Token'] = UserSessionHolder.getToken();
        }
        return request;
      }
    };
  }]);
