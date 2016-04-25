/**
 * Created by m2mbob on 16/4/25.
 */
angular
    .module('yitao')
    .controller('RegisterController', function ($scope, supersonic, Restangular, localStorageService) {
        $scope.username = null;
        $scope.password = null;
        $scope.code = null;

        $scope.register = function () {
            if ($scope.username == null || $scope.password == null || $scope.code == null) {
                supersonic.ui.dialog.alert("用户名、密码以及验证码不能为空");
                return;
            }
            Restangular.one('code', 'checkCode').get({
                mobile: $scope.username,
                ver_code: $scope.code
            }.undefined).then(function (data) {
                if (data.code == 200) {
                    var authdata = Base64.encode($scope.username + ":" + $scope.password);
                    Restangular.all('register').customPOST(
                        "username=" + $scope.username + "&password=" + $scope.password
                        , undefined, undefined, {'Content-Type': 'application/x-www-form-urlencoded'}).then(function (user) {
                        if (authdata) {
                            Restangular.setDefaultHeaders({
                                Authorization: 'Basic ' + authdata
                            });
                        }
                        localStorageService.set('authdata', authdata);
                        localStorageService.set('userDetail', user);
                        supersonic.data.channel('auth').publish("user");
                        supersonic.ui.modal.hide();
                    }, function (err) {
                        supersonic.logger.log(err);
                    });
                } else {
                    supersonic.ui.dialog.alert("验证码错误!");
                }
            }, function (data) {
                supersonic.ui.dialog.alert(data.method_name);
            })
        }

        $scope.sendMsg = function () {
            if ($scope.username == null) {
                supersonic.ui.dialog.alert("请先输入手机号！");
                return;
            } else {
                Restangular.one('code', 'sendCode').get({
                    mobile: $scope.username
                }, undefined).then(function (data) {
                    if (data.code == 200) {
                        supersonic.ui.dialog.alert("发送成功!");
                    } else {
                        supersonic.ui.dialog.alert("发送失败" + data.code);
                    }
                }, function () {
                    supersonic.ui.dialog.alert("发送失败！");
                })
            }
        }
    });