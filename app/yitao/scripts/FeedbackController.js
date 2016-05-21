angular
    .module('yitao')
    .controller('FeedbackController', function ($scope, supersonic, Restangular) {

        $scope.feedback = {
            detail: "",
            contact: ""
        };

        $scope.save = function(){
            if(!$scope.feedback.detail){
                supersonic.ui.dialog.alert("请输入反馈内容！");
                return;
            }
            if(!$scope.feedback.contact){
                supersonic.ui.dialog.alert("请输入联系方式！");
                return;
            }
            Restangular.all('feedback').customPOST("detail=" + $scope.feedback.detail + "&contact=" + $scope.feedback.contact,
                undefined, undefined, {'Content-Type': 'application/x-www-form-urlencoded'}).then(function (feedback) {
                supersonic.ui.layers.pop();
            });
        }

    });