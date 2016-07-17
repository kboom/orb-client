angular.module('orb.components.itemImages.gallery', [])
  .directive('itemImagesGallery', function () {
    return {
      restrict: 'E',
      templateUrl: 'components/item_images/gallery/item-images-gallery.html',
      require: '^itemImages',
      scope: {
        images: '='
      }
    };
  });
