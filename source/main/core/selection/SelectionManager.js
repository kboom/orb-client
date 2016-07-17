angular.module('orb.core.selecting').service('selectionManager', function () {

  var state = {
    isSelecting: false,
    selected: []
  };

  function clearSelections() {
    state.selected.length = 0;
  }

  function select(key) {
    if (state.isSelecting) {
      state.selected.push(key);
    } else {
      throw "Cannot select when not selecting";
    }
  }

  function deselect(key) {
    if (state.isSelecting) {
      state.selected.splice(state.selected.indexOf(key), 1);
    } else {
      throw "Cannot deselect when not selecting";
    }
  }

  function getSelected() {
    var selected = state.selected;
    return Object.keys(selected).filter(function (key) {
      return selected[key];
    });
  }

  function startSelecting() {
    state.isSelecting = true;
  }

  function stopSelecting() {
    state.isSelecting = false;
  }

  function getCount() {
    return state.selections.length;
  }

  return {
    clearSelections: clearSelections,
    select: select,
    deselect: deselect,
    getSelected: getSelected,
    state: state,
    getCount: getCount,
    startSelecting: startSelecting,
    stopSelecting: stopSelecting
  };

});
