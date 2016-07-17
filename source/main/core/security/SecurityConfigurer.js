angular.module('orb.core.security').run(function (UserSessionHolder) {
  UserSessionHolder.clearSession();
});
