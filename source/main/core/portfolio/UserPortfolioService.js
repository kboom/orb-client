angular.module('orb.core.portfolio').service('UserPortfolioService',
  function (UserSessionHolder, _, USER_SESSION_HOLDER_EVENTS, $rootScope) {

    /**
     * Guaranteed not to change. Only updated.
     * @type {{}}
     */
    var userPortfolio = {
      active: false
    };

    function fetchPortfolio() {
      _.extend(userPortfolio, {
        active: true,
        username: 'grzes'
      });
    }

    function clearPortfolio() {
      _.extend(userPortfolio, {
        active: false
      });
    }

    $rootScope.$on(USER_SESSION_HOLDER_EVENTS.SESSION_CREATED, fetchPortfolio);
    $rootScope.$on(USER_SESSION_HOLDER_EVENTS.SESSION_DESTROYED, clearPortfolio);

    return {
      getUserPortfolio: function () {
        return userPortfolio;
      }
    };

  });
