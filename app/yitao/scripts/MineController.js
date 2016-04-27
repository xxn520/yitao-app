/**
 * Created by m2mbob on 16/4/24.
 */
angular
    .module('yitao')
    .controller('MineController', function($scope, supersonic, localStorageService, Restangular, BaseUrl, authStatus, $cordovaSocialSharing) {

        $scope.BaseUrl = BaseUrl;

        supersonic.ui.views.current.whenVisible(function () {
            $scope.userDetail = localStorageService.get('userDetail');
            if (!localStorageService.get('authdata')) {
                supersonic.ui.layers.replace('login');
            }
            $scope.userDetail.student_auth.status_CN = authStatus[$scope.userDetail.student_auth.status];
            $scope.$apply();
        });

        $scope.share = function(){
            $cordovaSocialSharing
            .share("益淘", null, "null", "http://baidu.com") // Share via native share sheet
            .then(function(result) {
                supersonic.ui.dialog.alert("分享成功!");
            }, function(err) {
                supersonic.ui.dialog.alert("分享失败!");
            });
        }

        $scope.logout = function () {
            localStorageService.remove('authdata');
            localStorageService.remove('userDetail');
            var success = localStorageService.get('authdata');
            if(success == null && localStorageService.get('userDetail') == null && localStorageService.get('authdata') == null){
                supersonic.data.channel('auth').publish("logout");
                $scope.userDetail = angular.copy({});
                supersonic.ui.layers.replace('login');
            }else{
                supersonic.ui.dialog.alert("登出失败!");
            }
        };

    });