angular.module('orb.components.relatedCategories.relatedCategory', [])
  .directive("relatedCategory", function (TemplateResolver) {

    return {
      restrict: 'E',
      scope: {
        title: '@orbTitle',
        thumbnail: '@orbThumbnail',
        click: '&orbOnClick'
      },
      templateUrl: TemplateResolver.resolveBaseDir('COMPONENTS') + '/related_categories/related_category/related-category.html'
    };
  });
