angular.module('orb.components.imageUploader.imageUploadedList', [
  'orb.components.imageUploader.imageUploadedList.item'
]).directive('imageUploadList', function (hashids, $timeout, _) {
  return {
    restrict: 'E',
    templateUrl: 'components/image_uploader/image_list/image-upload-list.html',
    scope: {
      selectedImageKey: '=',
      uploadedImages: '=',
      removeItem: '=onRemoveItem',
      addImage: '=onImageAdded',
      expanded: '=?',
      sortProperty: '@',
      saveChanges: '=onSaveChanges',
      revertChanges: '=onRevertChanges'
    },
    controller: function ($scope) {

      $scope.sortProperty = $scope.sortProperty ? $scope.sortProperty : 'dateAdded';

      function compareItems(firstItem, secondItem) {
        var sortProperty = $scope.sortProperty;
        return firstItem[sortProperty] > secondItem[sortProperty];
      }

      function getOffsetItem(key, offset) {
        var sortedImages = getSortedImages();
        var index = sortedImages.map(function (e) {
          return e.key;
        }).indexOf(key);
        return index < sortedImages.length - offset && index + offset >= 0 ? sortedImages[index + offset] : sortedImages[index];
      }

      function getNextItem(key) {
        return getOffsetItem(key, 1);
      }

      function getPreviousItem(key) {
        return getOffsetItem(key, -1);
      }

      function getSortedImages() {
        var uploadedImages = $scope.uploadedImages;
        return _.sortBy(Object.keys(uploadedImages).map(function (key) {
          return uploadedImages[key];
        }), $scope.sortProperty);
      }

      function getImageIndex(key) {
        var itemsBefore = 0;
        var uploadedImages = $scope.uploadedImages;
        var thisImage = uploadedImages[key];
        angular.forEach(uploadedImages, function (item) {
          if (compareItems(thisImage, item)) {
            itemsBefore++;
          }
        });
        return itemsBefore;
      }

      function imagesSelected(e) {
        var files = e.target.files;
        angular.forEach(files, function (file) {
          var dateAdded = Date.now();
          var key = hashids.encode(dateAdded + file.lastModified);
          $scope.addImage({
            key: key,
            file: file,
            dateAdded: dateAdded
          });
        });
      }

      function selectItem(key) {
        $scope.selectedImageKey = key;
      }

      function toggleList() {
        $scope.expanded = !$scope.expanded;
      }

      function selectPrevImage() {
        $scope.selectedImageKey = getPreviousItem($scope.selectedImageKey).key;
      }

      function selectNextImage() {
        $scope.selectedImageKey = getNextItem($scope.selectedImageKey).key;
      }

      angular.extend($scope, {
        selectItem: selectItem,
        selectPrevImage: selectPrevImage,
        selectNextImage: selectNextImage,
        toggleList: toggleList,
        imagesSelected: imagesSelected,
        orderItems: function (item) {
          return getImageIndex(item.key);
        },
        selectImages: function () {
          $scope.$broadcast('select-images');
        }
      });

    },
    link: function ($scope, $element) {
      var imageSelectInput = $element.find('[image-select-input]');
      imageSelectInput[0].addEventListener('change', function (e) {
        $timeout(function () {
          $scope.$apply($scope.imagesSelected(e));
        });
      }, false);
      $scope.$on('select-images', function () {
        $timeout(function () {
          imageSelectInput.click();
        });
      });
    }
  };
});
