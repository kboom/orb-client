angular.module('orb.modules.signUpDialog', [])
  .controller('SignUpDialogController', function ($scope, $modalInstance) {
    angular.extend($scope, {
      close: $modalInstance.dismiss
    });
  });
