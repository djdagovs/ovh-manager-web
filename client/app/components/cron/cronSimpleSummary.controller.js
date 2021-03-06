angular.module("directives").controller("cronSimpleSummaryCtrl", [
    "$scope",
    "$rootScope",
    "CronValidator",
    function ($scope, $rootScope, CronValidator) {
        "use strict";

        // Hack for trads
        $scope.tr = $rootScope.tr;
        $scope.trpl = $rootScope.trpl;
        $scope.i18n = $rootScope.i18n;

        $scope.mode = $scope.crontabObject.getCronMode();
        $scope.cron = $scope.crontabObject.getCronValue();

        // Returns an array of selected items
        $scope.getSimpleModeItems = function (field) {
            return CronValidator.getSimpleModeItems($scope.cron, field);
        };
    }
]);
