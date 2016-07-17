angular.module('orb.components.trackLoader', [])
  .factory('TrackLoader', function () {

    var DEFAULT_TASK_ID = 'generic-task';

    function TrackLoader() {
      this._taskMap = {};
      this._isBusy = false;
      this._onBusyCallbacks = [];
      this._onReadyCallbacks = [];
    }

    function executeCallbacks(callbackList) {
      angular.forEach(callbackList, function (callback) {
        callback();
      });
    }

    angular.extend(TrackLoader.prototype, {
      commitChanges: function () {
        var isNowBusy = Object.keys(this._taskMap).length > 0;
        if (this._isBusy !== isNowBusy) {
          if (!this._isBusy) {
            executeCallbacks(this._onBusyCallbacks);
          } else {
            executeCallbacks(this._onReadyCallbacks);
          }
          this._isBusy = isNowBusy;
        }
      },
      busy: function (taskId) {
        taskId = taskId ? taskId : DEFAULT_TASK_ID;
        this._taskMap[taskId] = createTask();
        this.commitChanges();
        return this;
      },
      ready: function (taskId) {
        taskId = taskId ? taskId : DEFAULT_TASK_ID;
        delete this._taskMap[taskId];
        this.commitChanges();
        return this;
      },
      onBusy: function (callbackFn) {
        this._onBusyCallbacks.push(callbackFn);
        if (this._isBusy) {
          callbackFn();
        }
      },
      onReady: function (callbackFn) {
        this._onReadyCallbacks.push(callbackFn);
        if (!this._isBusy) {
          callbackFn();
        }
      },
      isBusy: function () {
        return this._isBusy;
      },
      isReady: function () {
        return !this._isBusy;
      }
    });

    function create() {
      return new TrackLoader();
    }

    function createTask() {
      return {
        dateStarted: new Date()
      };
    }

    return {
      create: create
    };
  })
  .directive('contentLoader', function () {
    return {
      restrict: 'A',
      scope: false,
      transclude: true,
      template: '<div ng-show="loading" class="content-loader"><div class="loading-animation"></div></div><div class="ready-content" ng-show="!loading" ng-transclude></div>',
      link: function ($scope, $element, $attrs) {
        var trackLoader = $scope.$eval($attrs.contentLoader);
        trackLoader.onReady(function () {
          $scope.loading = false;
        });
        trackLoader.onBusy(function () {
          $scope.loading = true;
        });
      }
    };
  });
