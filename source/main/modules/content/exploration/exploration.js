angular.module('orb.modules.exploration', [])
  .config(function ($stateProvider) {
    $stateProvider.state('page.explore', {
      url: 'explore',
      views: {
        'exploration': {
          templateUrl: '/modules/content/exploration/exploration.html',
          controller: 'ExplorationController'
        }
      }
    });
  })
  // oversees the communication between templates but does not care how do they get things done
  .controller('ExplorationController', function ($scope, ViewportManager, VIEWPORT_TYPES) {
    "use strict";

    ViewportManager.setViewport(VIEWPORT_TYPES.DENSITY_HIGH);

    $scope.activeCategoryId = 'all';

    $scope.$on('ACTIVE_CATEGORY_CHANGED', function (event, newCategoryId) { // todo make constants out of event names?
      $scope.activeCategoryId = newCategoryId;
    });

  });
