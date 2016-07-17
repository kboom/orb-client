angular.module('orb.modules.manageItemDialog', [])
  .config(function ($stateProvider) {
    var modalInstance = null;
    $stateProvider.state('dialog.addItem', {
      url: '/add-item',
      onEnter: function ($stateParams, $state, ItemDialogs, $previousState) {
        $previousState.memo("modalInvoker");
        modalInstance = ItemDialogs.openAddItemDialog();
        modalInstance.result.then(function () {
            $previousState.go("modalInvoker");
          },
          function () {
            $previousState.go("modalInvoker");
          }
        );
      },
      onExit: function () {
        modalInstance.close();
      }
    });

    $stateProvider.state('dialog.manageItem', {
      url: '/items/:itemId/edit',
      onEnter: function ($stateParams, $state, ItemDialogs, $previousState) {
        $previousState.memo("modalInvoker");
        modalInstance = ItemDialogs.openEditItemDialog($stateParams.itemId);
        modalInstance.result.then(function () {
            $previousState.go("modalInvoker");
          },
          function () {
            $previousState.go("modalInvoker");
          }
        );
      },
      onExit: function () {
        modalInstance.close();
      }
    });
  })
  .controller('ManageItemDialogController', function ($scope, ITEM_IMAGE_SECTIONS, ItemManager, $modalInstance, TagResource, Images, _, lodash) {

    var MIN_TAG_COUNT = $scope.minTagCount = 4;
    var MAX_TAG_COUNT = $scope.maxTagCount = 10;

    function loadMatchingTags(query) {
      $scope.matchingTags = [];
      TagResource.findMatching({'like': query}).$promise.then(function(data) {
        console.log(data);
      });
      return TagResource.findMatching({'like': query}).$promise;
    }

    var item = ItemManager.getManagedItem();

    angular.extend($scope, {
      itemManager: ItemManager,
      item: item,
      uploadImage: function(image) {
        var imageResource = new Images(image);
        imageResource.$save(function(result) {
          item.images[result.key] = lodash.pick(result, 'name', 'id');
        });
      },
      loadMatchingTags: loadMatchingTags,
      itemImagesPanel: {
        selectedKey: _.size(item.images) > 0 ? ITEM_IMAGE_SECTIONS.ITEM_IMAGES_GALLERY : ITEM_IMAGE_SECTIONS.ITEM_IMAGES_UPLOADER,
        currentlyEdited: null,
        uploadedPictures: []
      }
    }, ITEM_IMAGE_SECTIONS);


    function init() {
      $scope.$watchCollection('item.tags', function (tags) {
        var tagCount = tags ? tags.length : 0;
        if (tagCount < MIN_TAG_COUNT) {
          $scope.tagPrompt = 'Add ' + (MIN_TAG_COUNT - tagCount) + ' more tags';
        } else if (tagCount < MAX_TAG_COUNT) {
          $scope.tagPrompt = (MAX_TAG_COUNT - tagCount) + ' more tags allowed';
        } else {
          $scope.tagPrompt = 'Max number reached';
        }
      });
    }

    init();
  });
