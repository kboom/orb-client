angular.module('orb.components.huntedItem', [])
    .directive('huntedItem', function () {
        return {
            restrict: 'E',
            scope: {
                itemId: '@',
                itemName: '@',
                itemDescription: '@',
                boxName: '@',
                itemImagePath: '@',
                boxImagePath: '@',
                settings: '=',
                onTradeClicked: '&',
                onItemImageClicked: '&',
                onBoxClicked: '&'
            },
            templateUrl: 'components/hunted_item/hunted-item.html'
        };
    });
