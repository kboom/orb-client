// todo add configuration option to read default messages (for each error code)
angular.module('orb.components.formComponent', []).directive('formComponent', ['_', function (_) {

  function parseViolationMsgAttrName(violation) {
    return violation + 'Message';
  }

  return {
    restrict: 'E',
    transclude: true,
    require: '^form',
    scope: true,
    templateUrl: 'components/form_component/form-component.html',
    controller: function ($scope) {
      $scope.valid = true;

      function parseCommonErrorMessage() {
        var errorMessage = $scope.getErrorMessageFor('error');
        return errorMessage ? errorMessage : ''; // todo load this from the configured properties
      }

      function parseDetailedErrorMessage(errorMessageStack, missingCount) {
        var errorMessage = '';
        if (errorMessageStack.length >= 2) {
          errorMessage += '<ul>';
          $.each(errorMessageStack, function (index, value) {
            errorMessage += '<li>' + value + '</li>';
          });
          errorMessage += '</ul>';
        } else {
          errorMessage += errorMessageStack[0];
        }
        if (missingCount > 0) {
          errorMessage += ' and ' + missingCount + ' more.';
        }
        return errorMessage;
      }

      function filterMessages(errorMessageStack) {
        return _.filter(errorMessageStack, function (item) {
          return item !== undefined;
        });
      }

      function parseErrorMessage(errorMessageStack) {
        var filteredMessages = filterMessages(errorMessageStack);
        if (filteredMessages.length >= 1) {
          return parseDetailedErrorMessage(filteredMessages,
            errorMessageStack.length - filteredMessages.length);
        } else {
          return parseCommonErrorMessage();
        }
      }

      function updateErrorMessage(formName, elementName) {
        var errorMap = $scope.$eval(formName + '.' + elementName + '.$error');
        var errorMessageStack = [];
        $.each(errorMap, function (errorName, error) {
          var violationMessage = $scope.getErrorMessageFor(errorName);
          if (error) {
            errorMessageStack.push(violationMessage);
          }
        });
        $scope.errorMessage = parseErrorMessage(errorMessageStack);
      }

      $scope.watchForValidity = function (formName, elementName) {
        $scope.$watch(formName + '.' + elementName + '.$valid', function (valid) {
          if (valid !== undefined && valid !== $scope.valid && $scope.$eval(formName + '.' + elementName + '.$dirty')) {
            $scope.valid = valid;
            if (!valid) {
              updateErrorMessage(formName, elementName);
            }
          }
        });
      };
    },
    link: function ($scope, $element, $attributes, $formCtrl) {

      function bindAttributeToScope(attributeName) {
        $scope.$watch(function () {
          return $attributes[attributeName];
        }, function (attributeValue) {
          $scope[attributeName] = attributeValue;
        });
      }

      var formName = $formCtrl.$name;
      var namedInput = $element.find('.component-placeholder *[ng-model][name]').first();
      var elementName = $(namedInput).attr('name');

      $scope.getErrorMessageFor = function (errorName) {
        return $attributes[parseViolationMsgAttrName(errorName)];
      };

      $scope.watchForValidity(formName, elementName);
      bindAttributeToScope('infoMessage');
      bindAttributeToScope('label');
    }
  };

}]);
