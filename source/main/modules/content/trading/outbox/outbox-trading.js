angular.module('orb.modules.trading.outbox', [])
    .controller('OutboxTradingHeaderController', ['$scope', function ($scope) {

    }])
    .controller('OutboxTradingContentController', ['$scope', 'ITEM_GRID_BREAKPOINTS', function ($scope, VIEWPORT_TYPES, ViewportManager, ITEM_GRID_BREAKPOINTS) {
        ViewportManager.setViewport(VIEWPORT_TYPES.DENSITY_LOW);
    }]);
