angular.module('orb').config(function ($translateProvider) {
    $translateProvider.translations('en', {
        TRADE_STATES : {
            NOT_RESPONDED : 'Not responded',
            ACCEPTED : 'Accepted',
            NEGOTIATED : 'Negotiated',
            REJECTED : 'Rejected',
            AWAITING_RESPONSE : 'Awaiting response'
        }
    });
});