orb.config(function ($stateProvider, $stickyStateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/explore');
  $stateProvider.state('page', {
    url: '/',
    sticky: true,
    views: {
      navigation: {
        templateUrl: 'structure/navigation/navigation.html',
        controller: 'NavigationController'
      },
      content: {
        templateUrl: 'structure/content/content.html',
        controller: 'ContentController'
      },
      footer: {
        templateUrl: 'structure/footer/footer.html',
        controller: 'FooterController'
      }
    }
  });
  $stateProvider.state('dialog', {
    abstract: true,
    template: '<div ui-view></div>'
  });
});

