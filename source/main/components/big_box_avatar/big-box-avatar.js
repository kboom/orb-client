angular.module('orb.components.bigBoxAvatar', [])
  .directive('bigBoxAvatar', function () {
    return {
      restrict: 'E',
      templateUrl: 'components/big_box_avatar/big-box-avatar.html',
      scope: {
        boxImageSrc: '@'
      }
    };
  });
