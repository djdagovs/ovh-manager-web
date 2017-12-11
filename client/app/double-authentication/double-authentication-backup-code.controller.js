angular.module("App").controller(
    "DoubleAuthBackupCodeCtrl",
    class DoubleAuthBackupCodeCtrl {
        /**
         * Constructor
         * @param $scope
         * @param $timeout
         * @param OvhHttp
         */
        constructor ($scope, $timeout, OvhHttp) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.OvhHttp = OvhHttp;
        }

        $onInit () {
            this.backupCodeStatus = null;

            /**
             * Set Action
             * @param action
             * @param data
             */
            this.$scope.setAction = (action, data) => {
                this.$scope.currentAction = action;
                this.$scope.currentActionData = data;

                if (this.$scope.currentActionData) {
                    this.$scope.stepPath = "double-authentication/double-authentication.html";
                    $("#currentActionDoubleAlert").modal({
                        keyboard: false,
                        backdrop: "static"
                    });
                } else {
                    $("#currentActionDoubleAlert").modal("hide");
                    this.$timeout(() => {
                        this.$scope.stepPath = "";
                    }, 300);
                }
            };

            /**
             * Reset Action
             */
            this.$scope.resetAction = () => this.$scope.setAction(false);

            this.$scope.getDoubleAuthBackupCode = () => this.getDoubleAuthBackupCode();

            this.getDoubleAuthBackupCode();
        }

        /**
        * Get double authentication backup code
        */
        getDoubleAuthBackupCode () {
            this.OvhHttp.get("/me/accessRestriction/backupCode", {
                rootPath: "apiv6",
                returnKey: ""
            }).then((sotpAccount) => {
                this.$scope.backupCodeStatus = sotpAccount;
                if (this.$scope.backupCodeStatus.status === "enabled" && this.$scope.backupCodeStatus.remaining <= 3) {
                    this.$scope.setAction("doubleAuthAlert", this.$scope.backupCodeStatus);
                }
            });
        }
});
