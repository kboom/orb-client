angular.module('orb.components.itemImages', [
  'orb.components.itemImages.gallery',
  'orb.components.itemImages.uploader'
]).constant('ATTRIBUTE_NAMES', {
  KEY_ATTRIBUTE: 'section-key',
  NAME_ATTRIBUTE: 'section-name',
  ICON_ATTRIBUTE: 'section-icon',
  TOOLTIP_ATTRIBUTE: 'section-tooltip'
}).constant('ITEM_IMAGE_SECTIONS', {
  ITEM_IMAGES_UPLOADER: {
    KEY: 'item-images-uploader',
    NAME: 'Picture Editor',
    ICON: 'glyphicon glyphicon-camera',
    TOOLTIP: 'Edit your pictures'
  },
  ITEM_IMAGES_GALLERY: {
    KEY: 'item-images-gallery',
    NAME: 'Picture gallery',
    ICON: 'glyphicon glyphicon-th-large',
    TOOLTIP: 'Display your pictures'
  }
}).directive('itemImages', function (_, $compile, stringCaseUtils, ITEM_IMAGE_SECTIONS, ATTRIBUTE_NAMES) {

  var SELECTED_SECTION_KEY = 'selectedSectionKey';

  return {
    restrict: 'E',
    templateUrl: 'components/item_images/item-images.html',
    transclude: true,
    scope: {
      selectedSectionKey: '='
    },
    controller: function ($scope) {
      var sectionContexts = $scope.sectionContexts = [];

      function registerSectionContext(switchElement) {
        sectionContexts.push(switchElement);
      }

      function selectSection(key) {
        $scope[SELECTED_SECTION_KEY] = key;
      }

      function isSectionSelected(key) {
        return $scope[SELECTED_SECTION_KEY] === key;
      }

      $scope.$watch(SELECTED_SECTION_KEY, function (key) {
        $scope.currentContext = _.find(sectionContexts, function (context) {
          return context.key === key;
        });
      });

      angular.extend($scope, {
        isSectionSelected: isSectionSelected,
        selectSection: selectSection
      });

      return {
        registerSectionContext: registerSectionContext
      };
    },
    link: function ($scope, $element, $attributes, $ctrl, $transclude) {

      function constructSectionContext(sectionElement) {
        var elementTagName = stringCaseUtils.snake2constant(sectionElement[0].tagName);
        return {
          key: sectionElement.attr(ATTRIBUTE_NAMES.KEY_ATTRIBUTE) || ITEM_IMAGE_SECTIONS[elementTagName].KEY,
          name: sectionElement.attr(ATTRIBUTE_NAMES.NAME_ATTRIBUTE) || ITEM_IMAGE_SECTIONS[elementTagName].NAME,
          icon: sectionElement.attr(ATTRIBUTE_NAMES.ICON_ATTRIBUTE) || ITEM_IMAGE_SECTIONS[elementTagName].ICON,
          tooltip: sectionElement.attr(ATTRIBUTE_NAMES.TOOLTIP_ATTRIBUTE) || ITEM_IMAGE_SECTIONS[elementTagName].TOOLTIP
        };
      }

      $transclude(function (content) {
        var sections = content.filter(function (index, domElement) {
          return angular.isDefined(domElement.tagName) && _.has(ITEM_IMAGE_SECTIONS, domElement.tagName.replace(/-/g, '_'));
        });
        var sectionPlaceholder = $element.find('.section-placeholder');
        angular.forEach(sections, function (sectionDom) {
          var sectionElement = angular.element(sectionDom);
          var sectionContext = constructSectionContext(sectionElement);
          $ctrl.registerSectionContext(sectionContext);
          if (!$scope[SELECTED_SECTION_KEY]) {
            $scope[SELECTED_SECTION_KEY] = sectionContext.key;
          }
          var visibilityCondition = "";
          if ($scope.$eval(sectionElement.attr('keep-ready')) === false) {
            visibilityCondition = 'ng-if="' + SELECTED_SECTION_KEY + ' == \'' + sectionContext.key + '\'"';
          } else {
            visibilityCondition = 'ng-show="' + SELECTED_SECTION_KEY + ' == \'' + sectionContext.key + '\'"';
          }
          var showWrapper = angular.element('<div ' + visibilityCondition + '></div>');
          showWrapper.append(sectionElement);
          var compiledShowWrapper = $compile(showWrapper)($scope);
          sectionPlaceholder.append(compiledShowWrapper);
        });
      });
    }
  };
});
