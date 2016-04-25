/**
 * Created by m2mbob on 16/4/25.
 */
angular
    .module('yitao')
    .controller('LoginController', function ($scope, supersonic, Restangular, localStorageService) {

        $scope.username = null;
        $scope.password = null;

        $scope.login = function () {
            if ($scope.username == null || $scope.password == null) {
                supersonic.ui.dialog.alert("用户名或密码不为空");
                return;
            }
            var authdata = Base64.encode($scope.username + ":" + $scope.password);
            if (authdata) {
                Restangular.setDefaultHeaders({
                    Authorization: 'Basic ' + authdata
                });
            }
            Restangular.one("account").get().then(function (user) {
                supersonic.data.channel('auth').publish("login");
                localStorageService.set("authdata", authdata);
                localStorageService.set("userDetail", user);
                $scope.userDetail = angular.copy(user);
                supersonic.ui.layers.replace('mine');
            }, function () {
                supersonic.ui.dialog.alert("用户名或密码错误！");
            })
        };

    });