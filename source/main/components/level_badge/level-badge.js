angular.module('orb.components.levelBadge', [])
  .directive('levelBadge', function () {
    return {
      restrict: 'E',
      templateUrl: 'components/level_badge/level-badge.html',
      scope: {
        levelNumber: '@',
        levelName: '@',
        levelDescription: '@'
      }
    };
  });
