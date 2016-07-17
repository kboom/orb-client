angular.module('orb.utils')
  .factory("imageUtils", function ($q, locationUtils, _) {

    var base64Validator = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

    function fallbackOptions(options) {
      options = options ? options : {};
      options.format = options.format || "image/jpeg";
      options.compressionRate = options.compressionRate || 0.80;
      options.maxWidth = 1600;
      options.maxHeight = 1600;
      return options;
    }

    function calculateNewSize(originalSize, sizeOptions) {
      var remainingWidth = sizeOptions.maxWidth - originalSize.width;
      var remainingHeight = sizeOptions.maxHeight - originalSize.height;
      var newSize = {};
      if (remainingWidth < 0 || remainingHeight < 0) {
        var aspectRatio = originalSize.width / originalSize.height;
        if (remainingWidth < remainingHeight) {
          var newWidth = newSize.width = sizeOptions.maxWidth;
          newSize.height = newWidth / aspectRatio;
        } else {
          var newHeight = newSize.height = sizeOptions.maxHeight;
          newSize.width = newHeight * aspectRatio;
        }
      } else {
        newSize = _.pick(originalSize, 'width', 'height');
      }
      return newSize;
    }

    function getBase64FromImageUrl(url, options) {
      options = fallbackOptions(options);
      var deferred = $q.defer();
      var img = new Image();
      //img.crossOrigin = 'anonymous'; // todo remove this
      img.onerror = function () {
        deferred.reject("Could not load image " + url);
      };
      img.onload = function () {
        var canvas = document.createElement("canvas");
        var newSize = calculateNewSize({
          width: this.width,
          height: this.height
        }, _.pick(options, 'maxWidth', 'maxHeight'));
        canvas.width = newSize.width;
        canvas.height = newSize.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0, newSize.width, newSize.height);
        var base64Image = canvas.toDataURL(options.format, options.compressionRate);
        deferred.resolve(base64Image);
      };
      setTimeout(function () {
        img.src = url;
      });
      return deferred.promise;
    }

    function convertToBase64(image) {
      var deferred = $q.defer();
      setTimeout(function () {
        getBase64FromImageUrl(image).then(function () {
          deferred.resolve.apply(this, arguments);
        });
      }, 10);
      return deferred.promise;
    }

    return {
      convertToBase64: convertToBase64,
      getBase64FromImageUrl: getBase64FromImageUrl
    };
  });
