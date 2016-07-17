angular.module('orb.components.itemImages.uploader', [])
  .directive('itemImagesUploader', function () {
    return {
      restrict: 'E',
      templateUrl: 'components/item_images/uploader/item-images-uploader.html',
      require: '^itemImages',
      scope: {
        onImageSaved: '='
      },
      controller: function ($scope) {
        $scope.saveImage = function(image) {
          $scope.$parent.$parent.uploadImage(image);
        };
      }
    };
  });
