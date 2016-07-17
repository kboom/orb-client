angular.module('orb.modules.examineItemDialog', [])
  .config(function ($stateProvider) {
    var modalInstance = null;
    $stateProvider.state('dialog.examineItem', {
      url: '/items/:itemId/examine',
      onEnter: function ($stateParams, $state, ItemDialogs, $previousState) {
        $previousState.memo("modalInvoker");
        modalInstance = ItemDialogs.openExamineItemDialog($stateParams.itemId);
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
  .controller('ExamineItemDialogController', [
    '$scope',
    'Items',
    'TradeManager',
    'itemId',
    '$modalInstance',
    function ($scope, Items, TradeManager, itemId, $modalInstance) {

      function selectItem(itemId) {
        Items.get({'itemId': itemId}, function(item) {
            $scope.selectedItem = item;
        });
      }

      function getSelectedItemId() {
        return $scope.selectedItem !== undefined ? $scope.selectedItem.id : -1;
      }

      function notInterested() {
        $modalInstance.dismiss('notInterested');
      }

      function close() {
        $modalInstance.dismiss('cancel');
      }

      function createTrade() {
        var createdTrade = TradeManager.createTrade();
        createdTrade.$promise.then(function () {
          close();
        });
      }

      angular.extend($scope, {
        close: close,
        getSelectedItemId: getSelectedItemId,
        notInterested: notInterested,
        selectItem: selectItem,
        createTrade: createTrade,
        tradeManager: TradeManager
      });

      selectItem(itemId);

    }]);
