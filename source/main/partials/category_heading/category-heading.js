angular.module('orb.partials.categoryHeading', [])
  .controller('CategoryHeadingController',
  function ($scope, ItemCategory) {

    function fetchCategory(categoryId) {
      ItemCategory.getOne({
        categoryId: categoryId
      }, function (category) {
        $scope.activeCategory = category;
        $scope.$emit('ACTIVE_CATEGORY_CHANGED', category.id);
      });
    }

    function selectCategory(categoryId) {
      fetchCategory(categoryId);
    }

    angular.extend($scope, {
      selectCategory : selectCategory
    });

    $scope.$watch('activeCategoryId', fetchCategory);

  });
