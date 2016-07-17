angular.module('orb.components.imageCrop', ['orb.components.imageCrop.classes']).directive('imageCrop', ['$timeout', 'cropHost', 'cropPubSub', function ($timeout, CropHost, CropPubSub) {

  return {
    restrict: 'E',
    template: '<div class="image-crop"><canvas></canvas></div>',
    scope: {
      inputImage: '=',
      outputImage: '=',
      resultImageMinHeight: '@',
      resultImageMinWidth: '@',
      resultImageMaxHeight: '@',
      resultImageMaxWidth: '@',
      resultImageFormat: '@',
      resultImageQuality: '@',
      onChange: '&',
      onLoadBegin: '&',
      onLoadDone: '&',
      onLoadError: '&',
      onBusy: '&',
      onReady: '&',
      changeOnFly: '=?',
      changeOnRelease: '=?',
      control: '=?',
      autoUpdate: '='
    },
    controller: function ($scope) {
      $scope.events = new CropPubSub();
    },
    link: function ($scope, $element) {
      var events = $scope.events;
      var $canvasElement = $element.find('canvas');
      var $cropHost = $element.find('.image-crop');
      var cropHost = new CropHost($canvasElement, {
        resImgFormat: 'jpeg'
      }, events);

      function fnSafeApply(fn) {
        return function () {
          $timeout(function () {
            $scope.$apply(function (scope) {
              fn(scope);
            });
          });
        };
      }

      function updateResultImage(scope) {
        var outputImage = cropHost.getResultImageDataURI();
        if (angular.isDefined(scope.outputImage)) {
          scope.outputImage = outputImage;
        }
        fnSafeApply(function(scope) {
          scope.onChange({$dataURI: scope.outputImage});
        })();
      }

      events
        .on('busy', fnSafeApply(function (scope) {
          scope.onBusy();
        }))
        .on('ready', fnSafeApply(function (scope) {
          scope.onReady();
        }))
        .on('load-start', fnSafeApply(function (scope) {
          scope.onLoadBegin({});
        }))
        .on('load-done', fnSafeApply(function (scope) {
          scope.onLoadDone({});
        }))
        .on('load-error', fnSafeApply(function (scope) {
          scope.onLoadError({});
        }))
        .on('area-move area-resize', fnSafeApply(function (scope) {
          if (!!scope.changeOnFly) {
            updateResultImage(scope);
          }
        }))
        .on('area-move-end area-resize-end image-updated', fnSafeApply(function ($scope) {
          if (!!$scope.changeOnRelease) {
            updateResultImage($scope);
          }
        }));

      // Sync CropHost with Directive's options
      $scope.$watch('inputImage', function () {
        cropHost.setNewImageSource($scope.inputImage);
      });

      $scope.$watchCollection('[resultImageMinWidth, resultImageMinHeight]', function (newSize) {
        cropHost.setResultImageMinSize(newSize);
        if ($scope.autoUpdate) {
          updateResultImage($scope);
        }
      });
      $scope.$watchCollection('[resultImageMaxWidth, resultImageMaxHeight]', function (newAttributes) {
        cropHost.setResultImageMaxSize(newAttributes);
        if ($scope.autoUpdate) {
          updateResultImage($scope);
        }
      });
      $scope.$watch('resultImageFormat', function () {
        cropHost.setResultImageFormat($scope.resultImageFormat);
        if ($scope.autoUpdate) {
          updateResultImage($scope);
        }
      });
      $scope.$watch('resultImageQuality', function () {
        cropHost.setResultImageQuality($scope.resultImageQuality);
        if ($scope.autoUpdate) {
          updateResultImage($scope);
        }
      });

      if ($scope.control) {
        $scope.control.cropImage = function () {
          updateResultImage($scope);
        };
      }

      $scope.$watch(
        function () {
          return [$cropHost.width(), $cropHost.height()];
        },
        function (value) {
          if (value[0] * value[1] > 0) {
            cropHost.setMaxDimensions(value[0], value[1]);
            if ($scope.autoUpdate) {
              updateResultImage($scope);
            }
          }
        },
        true
      );

      $scope.$on('$destroy', function () {
        cropHost.destroy();
      });
    }
  };
}]);
