angular.module('orb.core.security', []);
angular.module('orb.core.portfolio', ['orb.core.security']);
angular.module('orb.core.trading', []);
angular.module('orb.core.audit', []);
angular.module('orb.core.parameters', []);
angular.module('orb.core.gate', []);
angular.module('orb.core.viewport', []);
angular.module('orb.core.selecting', []);
angular.module('orb.core.dialogs', []);
angular.module('orb.core.templates', []);
angular.module('orb.core.routing', []);
angular.module('orb.core', [
  'orb.core.security',
  'orb.core.portfolio',
  'orb.core.trading',
  'orb.core.audit',
  'orb.core.parameters',
  'orb.core.gate',
  'orb.core.viewport',
  'orb.core.selecting',
  'orb.core.dialogs',
  'orb.core.templates',
  'orb.core.routing'
]);
