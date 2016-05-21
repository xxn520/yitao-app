/**
 * Created by m2mbob on 16/5/21.
 */
angular
    .module('yitao')
    .controller('PublishController', function ($scope, supersonic, Restangular) {

        $scope.announcement = {
            title: "",
            detail: "",
            contact: ""
        };

        $scope.save = function(){
            if(!$scope.announcement.title){
                supersonic.ui.dialog.alert("请输入标题！");
                return;
            }
            if(!$scope.announcement.detail){
                supersonic.ui.dialog.alert("请输入内容！");
                return;
            }
            if(!$scope.announcement.contact){
                supersonic.ui.dialog.alert("请输入联系方式！");
                return;
            }
            Restangular.all('announcement').customPOST("title=" + $scope.announcement.title + "&detail=" + $scope.announcement.detail + "&contact=" + $scope.announcement.contact,
                undefined, undefined, {'Content-Type': 'application/x-www-form-urlencoded'}).then(function (feedback) {
                supersonic.ui.layers.pop();
            });
        }

    });