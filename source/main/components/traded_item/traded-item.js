angular.module('orb.components.tradedItem', [])
  .constant('TRADED_ITEM_STATUSES', {
    AGREED: 'agreed',
    DISAGREED: 'disagreed',
    NEUTRAL: 'neutral'
  }).directive('tradedItem', ['TRADED_ITEM_STATUSES', function (TRADED_ITEM_STATUSES) {
    return {
      restrict: 'E',
      templateUrl: 'components/traded_item/traded-item.html',
      replace: true,
      scope: {
        image: '@tradedItemImage',
        isSelected: '@tradedItemSelected',
        bidState: '@tradedItemBidState',
        status: '@tradedItemStatus'
      },
      controller: function ($scope) {
        angular.extend($scope, TRADED_ITEM_STATUSES);
      }
    };
  }]);
