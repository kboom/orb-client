angular.module('orb.components.signInPanel', [])
  .directive('accountPanel', function ($rootScope, _) {
    return {
      restrict: 'E',
      templateUrl: 'components/account_panel/account-panel.html',
      scope: {
        onNoAccountClicked: '&',
        userPortfolio: '=',
        signIn: '&onSignIn',
        signOut: '&onSignOut'
      },
      controller: function ($scope) {

        function clearForm() {
          delete $scope.credentials.username;
          delete $scope.credentials.password;
        }

        _.extend($scope, {
          credentials: {},
          signInWithCredentials: function (credentialsForm) {
            $scope.signIn({
              $login: $scope.credentials.username,
              $password: $scope.credentials.password,
              $onSuccess: function () {
                credentialsForm.$setValidity('credentials', true);
                clearForm();
              },
              $onFailure: function () {
                credentialsForm.$setValidity('credentials', false);
                clearForm();
              }
            });
          }
        });
      }
    };
  });
