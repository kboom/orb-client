angular.module('orb.components.imageUploader.imageUploadedList.item', [])
  .directive('uploadedImageItem', function () {
    return {
      restrict: 'E',
      templateUrl: 'components/image_uploader/image_list/image_item/uploaded-image-item.html',
      scope: {
        imageName: '=',
        uploadProgress: '=',
        remove: '&onRemove',
        select: '&onSelect'
      },
      controller: function ($scope) {

      }
    };
  });

