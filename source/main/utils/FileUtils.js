angular.module('orb.utils')
  .factory('fileUtils', function ($q, hashids, $timeout) {

    var onLoad = function (reader, deferred, scope) {
      return function () {
        scope.$apply(function () {
          deferred.resolve(reader.result);
        });
      };
    };

    var onError = function (reader, deferred, scope) {
      return function () {
        scope.$apply(function () {
          deferred.reject(reader.result);
        });
      };
    };

    function createBroadcastKey(key) {
      return key + "-image-uploaded-progress";
    }

    var onProgress = function (key, reader, scope) {
      return function (event) {
        $timeout(function () {
          scope.$broadcast(createBroadcastKey(key),
            {
              total: event.total,
              percentage: event.loaded / event.total
            });
        });
      };
    };

    var getReader = function (key, deferred, scope) {
      var reader = new FileReader();
      reader.onload = onLoad(reader, deferred, scope);
      reader.onerror = onError(reader, deferred, scope);
      reader.onprogress = onProgress(key, reader, scope);
      return reader;
    };

    var readAsDataURL = function (file, scope) {
      var deferred = $q.defer();
      var key = hashids.encode(Date.now());
      var reader = getReader(key, deferred, scope);
      reader.readAsDataURL(file);
      return {
        progressEventName: createBroadcastKey(key),
        promise: deferred.promise
      };
    };

    return {
      readAsDataUrl: readAsDataURL
    };

  });
