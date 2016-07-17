angular.module('orb.components.item.itemDetails', []).directive('itemDetails', function () {
  return {
    restrict: 'E',
    scope: {
      description: '@itemDescription',
      tags: '=itemTags'
    },
    templateUrl: 'components/item/details/item-details.html'
  };
});
