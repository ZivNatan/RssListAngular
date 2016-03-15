(function() {
  'use strict';

  angular
    .module('rss')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
