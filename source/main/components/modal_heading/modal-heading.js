angular.module('orb.components.modalHeading', [])
  .directive("modalHeading", function () {

    return {
      restrict: 'E',
      transclude: true,
      scope : {
        headingTitle : '@',
        headingIcon: '@'
      },
      templateUrl: '/components/modal_heading/modal-heading.html',
      link: function ($scope, $element, $attrs, $menuCtrl) {

      }
    };
  });
