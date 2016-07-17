angular.module('orb.components.svgControl', [
  'orb.components.svgControl.elements'
])
  .directive('svgControl', function () {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'components/svg_control/svg-control.html',
      scope: {
        triggerOnInit: '@'
      },
      controller: function ($scope) {
        var svg = null;
        var placeholder = null;
        var waitingFns = [];
        var registeredActions = $scope.registeredActions = {};

        function triggerAction(actionId) {
          var action = registeredActions[actionId];
          if (action.whenReady) {
            whenReady(action.actionFn);
          } else {
            action.actionFn();
          }
        }

        function triggerSelectedActions() {
          angular.forEach(arguments, triggerAction);
        }

        function registerAction(action) {
          $scope.registeredActions[action.actionId] = {
            actionId: action.actionId,
            actionFn: action.actionFn,
            whenReady: angular.isDefined(action.whenReady) ? action.whenReady : true
          };
        }

        function resolveElement(selector) {
          var dom = selector ? svg.querySelector(selector) : svg;
          return dom ? angular.element(dom) : null;
        }

        function resolvePlaceholder() {
          return placeholder;
        }

        function elementReady() {
          svg = placeholder[0].getSVGDocument();
          angular.forEach(waitingFns, function(fn) {
            fn();
          });
          waitingFns.length = 0;
        }

        function whenReady(fn) {
          if (svg) {
            fn();
          } else {
            waitingFns.push(fn);
          }
        }

        angular.extend($scope, {});

        return {
          registerAction: registerAction,
          triggerActions: triggerSelectedActions,
          resolveElement: resolveElement,
          resolvePlaceholder: resolvePlaceholder,
          elementReady: elementReady,
          whenReady: whenReady,
          installPlaceholder : function(obj) {
            placeholder = obj;
          }
        };

      },
      link: function ($scope, $element, $attributes, $ctrl) {
        var obj = $element.find('object');
        obj.on('load', function () {
          $ctrl.elementReady();
        });
        $ctrl.installPlaceholder(obj);
        $ctrl.triggerActions.apply(this, $scope.triggerOnInit.split(','));
      }
    };
  });
