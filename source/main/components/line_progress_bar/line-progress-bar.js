angular.module('orb.components.lineProgressBar', [])
  .directive('lineProgressBar', function () {
    return {
      restrict: 'E',
      templateUrl: 'components/line_progress_bar/line-progress-bar.html',
      scope: {
        percentageBased: '@',
        progressLevel: '='
      },
      controller: function ($scope) {
        $scope.getWidthInPercent = function () {
          var progressLevel = $scope.progressLevel;
          return $scope.percentageBased == 'true' ? progressLevel : progressLevel * 100;
        };
      }
    };
  });

