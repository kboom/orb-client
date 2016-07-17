angular.module('orb.core.security')
  .constant('USER_SESSION_HOLDER_EVENTS', {
    SESSION_CREATED: 'session-on',
    SESSION_DESTROYED: 'session-off'
  })
  .service('UserSessionHolder',
  function (privileges, _, $rootScope, USER_SESSION_HOLDER_EVENTS) {

    function createDefaultSession() {
      return {
        username: null,
        authenticated: false,
        privileges: [
          privileges.SIGN_IN,
          privileges.SIGN_UP,
          privileges.BROWSE_HUNT,
          privileges.BROWSE_GATHER
        ],
        boxId: 1
      };
    }

    var currentSession = null;

    return {
      getSession: function () {
        return _.clone(currentSession);
      },
      applySession: function (session) {
        currentSession = session;
        $rootScope.$broadcast(USER_SESSION_HOLDER_EVENTS.SESSION_CREATED);
      },
      clearSession: function () {
        currentSession = createDefaultSession();
        $rootScope.$broadcast(USER_SESSION_HOLDER_EVENTS.SESSION_DESTROYED);
      },
      isAuthenticated: function () {
        return currentSession.authenticated;
      },
      getToken: function () {
        return currentSession.token;
      },
      getUserId: function () {
        return currentSession.login;
      },
      getBoxId: function () {
        return currentSession.boxId;
      }
    };

  });
