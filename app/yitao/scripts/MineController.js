/**
 * Created by m2mbob on 16/4/24.
 */
angular
    .module('yitao')
    .controller('MineController', function($scope, supersonic, localStorageService, Restangular, BaseUrl) {

        $scope.userDetail = localStorageService.get('userDetail');
        
        supersonic.ui.views.current.whenVisible(function () {
            if (!localStorageService.get('authdata')) {
                supersonic.ui.layers.replace('login');
            }
        });

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