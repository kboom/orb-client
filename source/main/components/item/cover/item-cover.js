angular.module('orb.components.item.itemCover', []).directive('itemCover', function () {
  return {
    restrict: 'E',
    scope: {
      images: '=itemImages'
    },
    templateUrl: 'components/item/cover/item-cover.html'
  };
});
