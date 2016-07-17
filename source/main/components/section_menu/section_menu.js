angular.module('orb.components.sectionMenu', [])
  .directive('sectionMenu', ['$timeout', function ($timeout) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        activeTab: '=',
        contentBaseUrl: '@',
        receiveCommands: '='
      },
      controller: ['$scope', '_', function ($scope, _) {
        var tabs = [];
        var activeTab = null;
        $scope.toolbar = {};

        function updateContent() {
          $scope.tabContentPath = $scope.contentBaseUrl + '/' + activeTab.url;
        }

        function updateTabs() {
          updateActiveTab();
          updateContent();
        }

        function updateActiveTab() {
          activeTab = _.find(tabs, function (element) {
            return element.id === $scope.activeTab;
          });
        }

        $timeout(function () {
          $scope.$watch('activeTab', updateTabs);
        });

        var exposedMethods = {
          'isFolded': function () {
            return !$scope.unfolded;
          },
          'toggle': function () {
            if (exposedMethods.isFolded()) {
              $scope.unfold();
              $scope.unfolded = false;
            } else {
              $scope.fold();
              $scope.unfolded = true;
            }

          }
        };
        $scope.receiveCommands(exposedMethods);

        return _.extend({
          installTab: function (tab) {
            tabs.push(tab);
          },
          activate: function (tabId) {
            $scope.activeTab = tabId;
          },
          getActive: function () {
            return $scope.activeTab;
          }
        }, exposedMethods);
      }],
      templateUrl: '/components/section_menu/markup/section-menu.html',
      link: function ($scope, $element, $attrs) {
        var bar = $element.find('.section-toolbar');
        $scope.fold = function () {
          $('html, body').animate({scrollTop: $element.height() - bar.height()}, 200, 'swing');
        };
        $scope.unfold = function () {
          $('html, body').animate({scrollTop: bar.height() - $element.height()}, 200, 'swing');
        };
      }
    };
  }])
  .directive("sectionToolbarLeft", [function () {

    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/components/section_menu/markup/section-toolbar-left.html',
      link: function ($scope, $element, $attrs, $menuCtrl) {

      }
    };
  }])
  .directive("sectionToolbarRight", [function () {

    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/components/section_menu/markup/section-toolbar-right.html',
      link: function ($scope, $element, $attrs, $menuCtrl) {

      }
    };
  }])
  .directive("sectionToolbarTabs", [function () {

    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/components/section_menu/markup/section-toolbar-tabs.html',
      link: function ($scope, $element, $attrs, $menuCtrl) {

      }
    };
  }])
  .directive("sectionTab", [function () {

    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      require: '^sectionMenu',
      templateUrl: '/components/section_menu/markup/section-tab.html',
      scope: true,
      controller: function ($scope) {
        return {
          activate: function () {
            $scope.$menuCtrl.activate($scope.tabId);
          },
          isActive: function () {
            return $scope.$menuCtrl.getActive() === $scope.tabId;
          }
        };
      },
      link: function ($scope, $element, $attrs, $menuCtrl) {
        $scope.$menuCtrl = $menuCtrl;
        $menuCtrl.installTab({
          id: $attrs.id,
          url: $attrs.contentUrl
        });
        $scope.tabId = $attrs.id;
      }
    };
  }]);
