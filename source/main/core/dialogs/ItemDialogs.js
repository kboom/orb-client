angular.module('orb.core.dialogs').service('ItemDialogs', function ($modal, ItemManager) {

  var openedModal = null;

  function openManageItemDialog() {
    openedModal = $modal.open({
      templateUrl: 'modules/dialogs/manage_item_dialog/manage-item-dialog.html',
      controller: 'ManageItemDialogController'
    });
    return openedModal;
  }

  function openEditItemDialog(itemId) {
    ItemManager.editItem(itemId);
    return openManageItemDialog();
  }


  function openAddItemDialog() {
    ItemManager.createItem();
    return openManageItemDialog();
  }

  function openExamineItemDialog(itemId) {
    openedModal = $modal.open({
      templateUrl: 'modules/dialogs/examine_item_dialog/examine-item-dialog.html',
      controller: 'ExamineItemDialogController',
      resolve: {
        itemId: function () {
          return itemId;
        }
      }
    });
    return openedModal;
  }

  return {
    openEditItemDialog: openEditItemDialog,
    openAddItemDialog: openAddItemDialog,
    openExamineItemDialog: openExamineItemDialog
  };

});
