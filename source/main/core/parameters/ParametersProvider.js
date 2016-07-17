angular.module('orb.core.parameters').service('ParametersProvider', [
  '$location',
  'UserSessionHolder',
  function ($location, UserSessionHolder) {

    function throwParameterNotFound(parameterName) {
      throw "Could not extract parameter " + parameterName + " from current location URL";
    }

    function getBoxParameter(parameterName) {
      switch (parameterName) {
        case 'BOX_ID':
          return $params.boxId;
        default:
          throwParameterNotFound(parameterName);
      }
    }

    function getMyBoxParameter(parameterName) {
      switch (parameterName) {
        case 'BOX_ID':
          return UserSessionHolder.getBoxId();
        default:
          throwParameterNotFound(parameterName);
      }
    }

    function getParameter(parameterName, params) {
      var locationPath = $location.path();
      if (/\/box\/*./.test(locationPath)) {
        return getBoxParameter(parameterName, params);
      } else if (/\/my-box\/*./.test(locationPath)) {
        return getMyBoxParameter(parameterName, params);
      } else {
        throw "Location " + locationPath + " is not known and parameters cannot be resolved from it.";
      }
    }

    return {
      getParameter: getParameter
    };

  }]);
