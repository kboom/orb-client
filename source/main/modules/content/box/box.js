angular.module('orb.modules.box', [
  'orb.modules.box.items',
  'orb.modules.box.wall'
]).constant('BOX_BROWSING_MODE', {
  OWNER: 'OWNER',
  VISITOR: 'VISITOR'
}).config(function ($stateProvider) {
  "use strict";

  $stateProvider.state('page.box', {
    url: 'box/{boxId}/{activeTab}',
    params: {
      boxId: function () {
        return 'mine';
      },
      activeTab: function () {
        return 'items';
      }
    },
    resolve: {
      activeTab: ['$stateParams', function ($stateParams) {
        return $stateParams.activeTab;
      }],
      boxId: ['$stateParams', 'UserSessionHolder', function ($stateParams, UserSessionHolder) {
        return $stateParams.boxId === 'mine' ? UserSessionHolder.getBoxId() : $stateParams.boxId;
      }],
      browsingMode: ['$stateParams', 'UserSessionHolder', 'BOX_BROWSING_MODE',
        function ($stateParams, UserSessionHolder, BOX_BROWSING_MODE) {
        if ($stateParams.boxId === 'mine' || UserSessionHolder.getBoxId() === $stateParams.boxId) {
          return BOX_BROWSING_MODE.OWNER;
        } else {
          return BOX_BROWSING_MODE.VISITOR;
        }
      }]
    },
    views: {
      'box': {
        templateUrl: '/modules/content/box/box.html',
        controller: 'BoxController'
      }
    }
  });

}).controller('BoxController', function ($scope, boxId, activeTab, ParametersProvider, UserSessionHolder, _, browsingMode) {
    "use strict";

    var menuItems = [
      {
        id: 'items',
        title: 'Items',
        headerPath: 'items/items-header.html',
        contentPath: 'items/items-content.html',
        contentActionsPath: 'items/items-actions.html'
      },
      {
        id: 'wall',
        title: 'Wall',
        headerPath: 'wall/wall-header.html',
        contentPath: 'wall/wall-content.html',
        contentActionsPath: 'wall/wall-actions.html'
      }
    ];

    var menu = {
      activeTab: activeTab,
      items: menuItems,
      active: null
    };

    function getContentPath() {
      return '/modules/content/box/' + $scope.menu.active.contentPath;
    }

    function getActionsPath() {
      return '/modules/content/box/' + menu.active.contentActionsPath;
    }

    angular.extend($scope, {
      commands: function (iface) {
        _.extend($scope, iface);
      },
      boxId: boxId,
      browsingMode: browsingMode,
      menu: menu,
      getContentPath: getContentPath,
      getActionsPath: getActionsPath
    });

    $scope.$watch('menu.activeTab', function (newId) {
      $scope.menu.active = _.findWhere(menuItems, {'id': newId});
    });

  }
);
