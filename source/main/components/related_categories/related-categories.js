angular.module('orb.components.relatedCategories', [
  'orb.components.relatedCategories.relatedCategory'
]).directive("relatedCategories", function (TemplateResolver) {

  return {
    restrict: 'E',
    transclude: true,
    templateUrl:  TemplateResolver.resolveBaseDir('COMPONENTS') + '/related_categories/related-categories.html'
  };

});
