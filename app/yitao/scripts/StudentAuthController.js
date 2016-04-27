/**
 * Created by m2mbob on 16/4/27.
 */
angular
    .module('yitao')
    .controller('StudentAuthController', function ($scope, supersonic, Restangular, localStorageService) {

        $scope.student_auth = localStorageService.get('userDetail').student_auth;

        $scope.save = function(){
            if(!$scope.student_auth.sid){
                supersonic.ui.dialog.alert("请输入学号！");
                return;
            }
            if(!$scope.student_auth.name){
                supersonic.ui.dialog.alert("请输入名字！");
                return;
            }
            Restangular.one('user').one('studentAuth', $scope.student_auth.id).customPUT("sid=" + $scope.student_auth.sid + "&name=" + $scope.student_auth.name,
                undefined, undefined, {'Content-Type': 'application/x-www-form-urlencoded'}).then(function (studentAuth) {
                var userDetail = localStorageService.get('userDetail');
                userDetail.student_auth = studentAuth;
                localStorageService.set('userDetail', userDetail);
                supersonic.ui.layers.pop();
            });
        }

    });