angular.module('orb.components.actionControl', [])
  .directive('actionControl', function () {

    return {
      restrict: 'E',
      replace: true,
      scope: {
        selectedActionKey: '=?',
        selectLabel: '@',
        actions: '='
      },
      templateUrl: 'components/action_control/action-control.html',
      controller: function ($scope) {
        $scope.selections = $scope.selections || [];

        function selectedAction() {
          return $scope.actions[$scope.selectedActionKey];
        }

        function selectAction(key) {
          if ($scope.actions.hasOwnProperty(key)) {
            $scope.selectedActionKey = key;
          } else {
            throw "Unknown action identified by key: " + key;
          }
          selectedAction().startCallback.call(this, api);
        }

        function executeAction() {
          selectedAction().endCallback.call(this, api);
          $scope.selectedActionKey = null;
        }

        function callOption(index) {
          selectedAction().options[index].callback.call(this, api);
        }

        var api = {
          abandonAction: function() {
            $scope.selectedActionKey = null;
          }
        };

        angular.extend($scope, {
          selectAction: selectAction,
          executeAction: executeAction,
          callOption: callOption
        }, api);

        return api;

      },
      link: function ($scope) {

      }
    };
  });
