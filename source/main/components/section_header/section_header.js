angular.module('orb.components.sectionHeader', [])
    .directive("sectionHeader", [function () {

        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope : {
                sectionImage : '@'
            },
            templateUrl: '/components/section_header/markup/section-header.html',
            link: function ($scope, $element, $attrs, $menuCtrl) {

            }
        };
    }])
    .directive("sectionTitle", function() {

        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: '/components/section_header/markup/section-title.html',
            link: function ($scope, $element, $attrs, $menuCtrl) {

            }
        };
    })
    .directive("sectionDescription", function() {

        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: '/components/section_header/markup/section-description.html',
            link: function ($scope, $element, $attrs, $menuCtrl) {

            }
        };
    })
    .directive("sectionOptions", function() {

        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: '/components/section_header/markup/section-options.html',
            link: function ($scope, $element, $attrs, $menuCtrl) {

            }
        };
    });
