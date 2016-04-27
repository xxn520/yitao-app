/**
 * Created by m2mbob on 16/4/27.
 */
angular
    .module('yitao')
    .controller('ModifyPasswordController', function ($scope, supersonic, Restangular, localStorageService) {

        $scope.username = localStorageService.get('userDetail').username;
        $scope.password = "";
        $scope.oldpassword = "";

        $scope.save = function(){
            if($scope.password.length === 0){
                supersonic.ui.dialog.alert("请输入密码！");
                return;
            }
            if($scope.password !== $scope.repassword){
                supersonic.ui.dialog.alert("两次输入密码不一致！");
                return;
            }
            Restangular.all('account').customPUT("username=" + $scope.username + "&password=" + $scope.password,
                undefined, undefined, {'Content-Type': 'application/x-www-form-urlencoded'}).then(function (userDetail) {
                var authdata = Base64.encode($scope.username + ":" + $scope.password);
                if (authdata) {
                    Restangular.setDefaultHeaders({
                        Authorization: 'Basic ' + authdata
                    });
                }
                localStorageService.set('authdata', authdata);
                localStorageService.set('userDetail', userDetail);
                supersonic.ui.layers.pop();
            });
        }
        
    });

