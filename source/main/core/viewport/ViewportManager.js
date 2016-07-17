angular.module('orb.core.viewport')
  .constant('VIEWPORT_TYPES', {
    'FULL' : 'viewport-full',
    'CENTERED' : 'viewport-centered',
    'DYNAMIC_DENSITY' : 'viewport-dynamic-density',
    'DENSITY_HIGH' : 'viewport-density-1',
    'DENSITY_LOW' : 'viewport-density-2'
  })
  .service('ViewportManager', function(VIEWPORT_TYPES, $document) {

    var viewportRoot = $document.find('#viewport-root');
    var currentViewport = null;

    function setViewport(type) {
      viewportRoot.removeClass(currentViewport);
      currentViewport = type;
      viewportRoot.addClass(type);
    }

    setViewport(VIEWPORT_TYPES.CENTERED);

    return {
      setViewport : setViewport
    };
  });
