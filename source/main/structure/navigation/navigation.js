angular.module('orb.structure.navigation', [])
  .controller('NavigationController', function ($scope, NavigationService, _, $modal, UserSessionManager, UserPortfolioService) {
      "use strict";

      function openAddDialog() {
        var modalInstance = $modal.open({
          templateUrl: 'modules/manage_item_dialog/manage-item-dialog.html',
          controller: 'ManageItemDialogController',
          resolve: {
            itemId: function () {
              return null;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        });
      }

      function showSignUpPanel() {
        $scope.isLoginDropdownOpened = false;
        $modal.open({
          templateUrl: 'modules/sign_up_dialog/sign-up-dialog.html',
          controller: 'SignUpDialogController'
        });
      }

      angular.extend($scope, {
        UserSessionManager: UserSessionManager,
        UserPortfolioService: UserPortfolioService,
        showSignUpPanel: showSignUpPanel,
        openAddDialog: openAddDialog
      });

      function init() {
        $scope.isLoginDropdownOpened = false;
      }

      init();

    }).factory('NavigationService', function () {
    return {};
  });
