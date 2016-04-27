/**
 * Created by m2mbob on 16/4/27.
 */
angular.module('yitao')
    .controller('UserDetailController',function($scope, supersonic, Restangular, localStorageService, $cordovaActionSheet, BaseUrl) {
        $scope.userDetail = {};
        $scope.BaseUrl = BaseUrl;

        supersonic.ui.views.current.whenVisible(function(){
            $scope.userDetail = localStorageService.get("userDetail");
            $scope.$apply();
        })

        $scope.save = function(){
            if($scope.userDetail.avatar == null)
                var formData = "nickname="+ $scope.userDetail.nickname + "&email=" + $scope.userDetail.email;
            else
                var formData = "nickname="+ $scope.userDetail.nickname +"&avatar=" + $scope.userDetail.avatar + "&email=" + $scope.userDetail.email;
            Restangular.one('user',$scope.userDetail.id).customPUT(formData, undefined, undefined, {'Content-Type':'application/x-www-form-urlencoded'}).then(function(user){
                localStorageService.set('userDetail',user);
                $scope.userDetail = angular.copy(user);
                supersonic.ui.dialog.alert("修改成功！");
            })
        }

        $scope.changePsd = function(){
            supersonic.ui.layers.push("yitao#modify-password");
        }

        $scope.studentAuth = function(){
            supersonic.ui.layers.push("yitao#student-auth");
        }

        $scope.upload = function (uploadFile) {
            formData = new FormData();
            new File();
            formData.append("file", uploadFile);
            Restangular.all('upload').withHttpConfig({transformRequest: angular.identity})
                .customPOST(formData, undefined, undefined, {'Content-Type': undefined}).then(function (data) {
                $scope.userDetail.avatar = data.url;
            })
        };

        $scope.showAction = function (filename) {
            event.preventDefault();
            $cordovaActionSheet.show({
                buttonLabels: ["拍照", "选取现有的"],
                addCancelButtonWithLabel: "取消",
                androidEnableCancelButton: true,
                winphoneEnableCancelButton: true
            }).then(function (index) {
                var options = {
                    quality: 80,
                    targetWidth: 1200,
                    targetHeight: 1200,
                    destinationType: "dataURL",
                    correctOrientation: true
                };
                if (index == 1) {
                    supersonic.media.camera.takePicture(options).then(function (result) {
                        $scope.upload(dataURLtoBlob("data:image/jpeg;base64," + result));
                    });
                } else if (index == 2) {
                    supersonic.media.camera.getFromPhotoLibrary(options).then(function (result) {
                        $scope.upload(dataURLtoBlob("data:image/jpeg;base64," + result));
                    });
                }
            });
        };

    });