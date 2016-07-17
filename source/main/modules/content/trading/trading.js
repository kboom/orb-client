angular.module('orb.modules.trading', [
  'orb.modules.trading.inbox',
  'orb.modules.trading.outbox'
]).config(function ($stateProvider) {
  "use strict";

  $stateProvider.state('page.trading', {
    url: 'trades/{activeTab}',
    params: {
      activeTab: function () {
        return 'inbox';
      }
    },
    resolve: {
      activeTab: ['$stateParams', function ($stateParams) {
        return $stateParams.activeTab;
      }]
    },
    views: {
      'trading': {
        templateUrl: '/modules/content/trading/trading.html',
        controller: 'TradingController'
      }
    }
  });

}).controller('TradingController', ['$scope', '_', 'activeTab', function ($scope, _, activeTab) {
  "use strict";

  var menuItems = [
    {
      id: 'inbox',
      title: 'Inbox',
      headerPath: 'inbox/inbox-trading-header.html',
      contentPath: 'inbox/inbox-trading-content.html'
    },
    {
      id: 'outbox',
      title: 'Outbox',
      headerPath: 'outbox/outbox-trading-header.html',
      contentPath: 'outbox/outbox-trading-content.html'
    }
  ];

  var menu = $scope.menu = {
    activeTab: activeTab,
    items: menuItems,
    active: null
  };

  $scope.getContentPath = function () {
    return '/modules/content/trading/' + menu.active.contentPath;
  };

  $scope.$watch('menu.activeTab', function (newId) {
    $scope.menu.active = _.findWhere(menuItems, {'id': newId});
  });

  $scope.commands = function (iface) {
    _.extend($scope, iface);
  };

}]);
