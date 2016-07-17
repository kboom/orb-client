angular.module('orb.core.security').service('UserSessionManager', [
  'AuthResource',
  'UserSessionHolder',
  function (AuthResource, UserSessionHolder) {

    function signIn(username, password, onSuccess, onFailure) {
      var currentSession = AuthResource.save({
        login: username,
        password: password
      }, onSuccess, onFailure);

      currentSession.$promise.then(function () {
        UserSessionHolder.applySession(currentSession);
      });
    }

    function signOut() {
      var currentSession = UserSessionHolder.getSession();
      currentSession.isAuthenticated = false;
      currentSession.$save();
      UserSessionHolder.clearSession();
    }

    return {
      signIn: signIn,
      signOut: signOut
    };

  }]);
