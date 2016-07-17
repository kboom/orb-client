var orb = angular.module('orb', [
  'ngAnimate',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ngMessages',
  'ngLodash',
  'underscore',
  'infinite-scroll',
  'pascalprecht.translate',
  'ngTagsInput',
  'textAngular',
  'ngImgCrop',
  'wu.masonry',
  'ui.bootstrap',
  'ui.router',
  'ct.ui.router.extras.sticky',
  'ct.ui.router.extras.previous',
  'orb.constants',
  'orb.utils',
  'orb.filters',
  'orb.components',
  'orb.directives',
  'orb.resources',
  'orb.core',
  'orb.commons',
  'orb.structure',
  'orb.partials',
  'orb.modules'
]).controller('PageController', function ($scope) {

}).run(['$state', '$rootScope', 'TemplateResolver', function ($state, $rootScope, TemplateResolver) {
  $state.go('page.explore');
  angular.extend($rootScope, {
    templateResolver: TemplateResolver
  });
}]);
