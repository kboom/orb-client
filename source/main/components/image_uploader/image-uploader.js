angular.module('orb.components.imageUploader', [
    'orb.components.imageUploader.imageUploadedList'
]).directive('imageUploader', function (_, imageUtils, fileUtils, storageUtils, $timeout, lodash) {
    return {
        restrict: 'E',
        templateUrl: 'components/image_uploader/image-uploader.html',
        scope: {
            onImageSaved: '&'
        },
        controller: function ($scope, TrackLoader) {
            var uploadedImages = $scope.uploadedImages = {};
            $scope.listExpanded = true;

      function addImage(image) {
        var imageKey = image.key;
        var progressBroadcastCallOff = null;
        var fileLoading = fileUtils.readAsDataUrl(image.file, $scope);
        var uploadedImage = uploadedImages[imageKey] = {
          key: imageKey,
          name: image.file.name,
          size: image.file.size
        };
        uploadedImage.progress = 0;
        progressBroadcastCallOff = $scope.$on(fileLoading.progressEventName, function (event, data) {
          console.log(data.percentage);
          uploadedImages[imageKey].progress = data.percentage;
        });
        fileLoading.promise.then(function (result) {
          progressBroadcastCallOff();
          uploadedImages[imageKey].progress = 1;
          imageUtils.convertToBase64(result).then(function (processedImage) {
            storageUtils.putItem(imageKey, {
              inputImage: processedImage,
              outputImage: processedImage
            });
          });
        });
      }

      function storeProcessingContextResults() {
        storageUtils.putItem($scope.processingContext.key, {
          inputImage: $scope.processingContext.inputImage,
          outputImage: $scope.processingContext.outputImage
        });
      }

      function destroyProcessingContextResults() {
        storageUtils.removeItem($scope.processingContext.id);
      }

      function clearProcessingContext() {
        delete $scope.processingContext.inputImage;
        delete $scope.processingContext.displayedImage;
        delete $scope.processingContext.outputImage;
        $scope.processingContext = null;
      }

      function processImage(imageId) {
        $scope.listExpanded = false;
        if ($scope.processingContext) {
          clearProcessingContext();
        }
        var imagePair = storageUtils.getItem(imageId);
        $scope.processingContext = lodash.extend({}, uploadedImages[imageId], {
          inputImage: imagePair.inputImage,
          displayedImage: imagePair.outputImage,
          outputImage: imagePair.outputImage
        });
      }

      function getProcessedImageId() {
        return $scope.processingContext ? $scope.processingContext.key : undefined;
      }

      function removeItem(imageId) {
        if (getProcessedImageId() === imageId) {
          clearProcessingContext();
        }
        destroyProcessingContextResults();
      }

      function restoreImage() {
        $scope.processingContext.outputImage = $scope.processingContext.inputImage;
        storeProcessingContextResults();
      }

      function onImageCropped(image) {
        storeProcessingContextResults();
        $scope.processingContext.displayedImage = image;
        $scope.onImageSaved({
          $image: lodash.extend({}, uploadedImages[getProcessedImageId()], {
              data: $scope.processingContext.outputImage
          })
        });
      }

      $scope.$watch('selectedImageKey', function (key) {
        if (key) {
          processImage(key);
        }
      });

      angular.extend($scope, {
        addImage: addImage,
        processImage: processImage,
        removeItem: removeItem,
        imageCropLoader: TrackLoader.create(),
        cropControl: {},
        restoreImage: restoreImage,
        onImageCropped: onImageCropped
      });

    }
  };
});
