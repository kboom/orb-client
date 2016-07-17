// http://christopherthielen.github.io/ui-router-extras/#/previous
angular.module('orb.partials.exploredItemWall', [])
  .controller('ExploredItemWallController',
  function ($scope, $state, Items, $timeout) {

    var ITEM_COUNT_PER_LOAD = 30;

    $scope.items = [];

    $scope.itemActions = {

      openSettings: function (itemId) {

      },

      openTrade: function (itemId) {

      },

      showDetails: function (itemId) {
        $state.go('dialog.examineItem', {
          itemId: itemId
        });
      },

      openBox: function (itemId) {

      },

      settings: [
        {
          name: 'report',
          onSelect: function () {

          }
        }
      ]

    };

    $scope.loadMoreItems = function () {
      var moreItems = Items.query({
        offset: $scope.items.length,
        limit: ITEM_COUNT_PER_LOAD,
        category: $scope.activeCategoryId
      });
      var promise = moreItems.$promise;
      promise.then(function (items) {
        $scope.items = items;
        $timeout(function () {
          $scope.loading = false;
          $scope.noMoreResults = !!$scope.items.length;
        });
        $scope.$emit('EXPLORED_ITEMS_LOADED');
      });
      $scope.loading = true;
      return promise;
    };


  });
