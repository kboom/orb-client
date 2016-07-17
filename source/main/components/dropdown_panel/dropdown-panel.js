angular.module('orb.components.dropdownPanel', [])
  .constant('dropdownPanelConfig', {
    'openClass': 'open'
  })
  .service('dropdownPanelService', ['$document', function ($document) {
    var openScope = null;

    this.open = function (dropdownScope) {
      if (!openScope) {
        $document.bind('click', closeDropdown);
        $document.bind('keydown', escapeKeyBind);
      }
      if (openScope && openScope !== dropdownScope) {
        openScope.isOpen = false;
      }
      openScope = dropdownScope;
    };

    this.close = function (dropdownScope) {
      if (openScope === dropdownScope) {
        openScope = null;
        $document.unbind('click', closeDropdown);
        $document.unbind('keydown', escapeKeyBind);
      }
    };

    var closeDropdown = function (evt) {
      var toggleElement = openScope.getToggleElement();
      if (evt && toggleElement && toggleElement[0].contains(evt.target)) {
        return;
      }
      openScope.$apply(function () {
        openScope.isOpen = false;
      });
    };

    var escapeKeyBind = function (evt) {
      if (evt.which === 27) {
        openScope.focusToggleElement();
        closeDropdown();
      }
    };
  }])
  .directive('dropdownPanel', ['dropdownPanelConfig', 'dropdownPanelService', '$animate', '$parse',
    function (dropdownPanelConfig, dropdownPanelService, $animate, $parse) {
      return {
        restrict: 'C',
        controller: function ($scope) {
          $scope.$on('$locationChangeSuccess', function () {
            $scope.isOpen = false;
          });

          $scope.updateOpenState = function () {
            if ($scope.isOpen) {
              $scope.focusToggleElement();
              dropdownPanelService.open($scope);
            } else {
              dropdownPanelService.close($scope);
            }
          };

          return {
            toggle: function (open) {
              return ($scope.isOpen = arguments.length ? !!open : !$scope.isOpen);
            }
          };
        },
        link: function ($scope, $element, $attributes) {
          var toggleInvoker = $attributes.onToggle ? $parse($attributes.onToggle) : angular.noop;
          var setIsOpen = angular.noop;

          if ($attributes.isOpen) {
            var getIsOpen = $parse($attributes.isOpen);
            setIsOpen = getIsOpen.assign;
            $scope.$watch(getIsOpen, function (value) {
              $scope.isOpen = !!value;
            });
          }

          $scope.getToggleElement = function () {
            return $element;
          };

          $scope.focusToggleElement = function () {
            $element[0].focus();
          };

          $scope.$watch('isOpen', function (isOpen, wasOpen) {
            $animate[isOpen ? 'addClass' : 'removeClass']($element, dropdownPanelConfig.openClass);
            $scope.updateOpenState();
            setIsOpen($scope, isOpen);
            if (angular.isDefined(isOpen) && isOpen !== wasOpen) {
              toggleInvoker($scope, {open: !!isOpen});
            }
          });
        }
      };
    }])
  .directive('dropdownPanelToggle', function () {
    return {
      restrict: 'EAC',
      require: '^dropdownPanel',
      link: function ($scope, $element, $attr, $dropdownPanel) {
        var toggleDropdown = function (event) {
          event.preventDefault();
          if (!$element.hasClass('disabled') && !$attr.disabled) {
            $scope.$apply(function () {
              $dropdownPanel.toggle();
            });
          }
        };
        $element.bind('click', toggleDropdown);
        $scope.$on('$destroy', function () {
          $element.unbind('click', toggleDropdown);
        });
      }
    };
  })
  .directive('dropdownPanelContent', ['dropdownPanelConfig', function (dropdownPanelConfig) {
    return {
      restrict: 'E',
      transclude: true,
      template: '<div ng-transclude></div>',
      link: function ($scope, $element) {
        $element.addClass('dropdown-panel-content');
      }
    };
  }]);
