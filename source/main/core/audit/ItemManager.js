angular.module('orb.core.audit').service('ItemManager', [
  'Items',
  function (ItemResource) {

    var managedItem = null;

    function createItem() {
      managedItem = new ItemResource({
        id: null,
        name: null,
        description: null,
        images: {},
        tags: []
      });
    }

    function editItem(itemId) {
      managedItem = ItemResource.$get({itemId: itemId});
    }

    function saveItem() {
      managedItem.$save();
    }

    function deleteItem() {
      managedItem.$delete();
    }

    return {
      createItem: createItem,
      editItem: editItem,
      saveItem: saveItem,
      deleteItem: deleteItem,
      getManagedItem: function () {
        return managedItem;
      }
    };

  }]);
