angular.module('orb.components.trade', []).directive('trade', ['_', function(_) {

    return {
        restrict: 'E',
        scope: {
            status: '@tradeStatus',
            updateDate: '@tradeUpdateDate',
            onClicked: '&onTradeClicked',
            tradeImageUrl: '@',
            tradeBoxIconUrl: '@',
            settings: '=tradeSettings'
        },
        templateUrl: 'components/trade/trade.html',
        controller: [ '$scope', '$translate', function($scope, $translate) {

            function parseDate() {
                return $scope.updateDate;
            }

            function getStatusName() {
                return $translate.instant('TRADE_STATES.' + $scope.status);
            }

            function getStatusIcon() {
                switch($scope.status) {
                    case 'NOT_RESPONDED':
                        return 'deal-not-responded';
                    case 'ACCEPTED':
                        return 'deal-accepted';
                    case 'NEGOTIATED':
                        return 'deal-negotiated';
                    case 'REJECTED':
                        return 'deal-rejected';
                    case 'AWAITING_RESPONSE':
                        return 'deal-awaiting-response';
                    default:
                        throw "Unknown deal status";
                }
            }

            _.extend($scope, {
                parseDate: parseDate,
                getStatusIcon : getStatusIcon,
                getStatusName : getStatusName
            });
        }]
    };
}]);
