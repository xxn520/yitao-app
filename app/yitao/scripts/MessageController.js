/**
 * Created by m2mbob on 16/5/21.
 */
angular.module('yitao')
    .controller('MessageController', function(supersonic, $scope, localStorageService, Restangular, msgType){

        $scope.msgType = msgType;
        $scope.tabs = 1;
        $scope.loading1=true;
        $scope.loading2=true;
        var page1=0,
            page2=0;
        $scope.messages=[];
        $scope.announcements=[];
        $scope.getItems = function(tabs, inview) {
            if (!inview) {
                return;
            }
            if(tabs==1){
                Restangular.all("message").getList({
                    uid: localStorageService.get("userDetail").id,
                    page: page1++
                }).then(function(data) {
                    $scope.messages = data.meta.first ? data
                        : $scope.messages.concat(data);
                    $scope.loading = !data.meta.last;
                    $scope.total = data.meta.total_elements;
                }, function(response) {
                    //TODO 这里是加载不成功
                });
            }else{
                Restangular.all("announcement").getList({
                    page: page2++
                }).then(function(data) {
                    $scope.announcements = data.meta.first ? data
                        : $scope.announcements.concat(data);
                    $scope.loading = !data.meta.last;
                    $scope.total = data.meta.total_elements;
                }, function(response) {
                    //TODO 这里是加载不成功
                });
            }

        };

        $scope.refresh = function(tabs) {
            if(tabs===null || typeof(tabs) == "undefined"){
                tabs = $scope.tabs;
            }
            if(tabs == 1){
                page1 = 0;
                $scope.total1 = null;
                $scope.messages=[];
                $scope.loading1 = true;
                $scope.getItems(tabs, true);
            }else{
                page2 = 0;
                $scope.total2 = null;
                $scope.announcements=[];
                $scope.loading2 = true;
                $scope.getItems(tabs, true);
            }
        };

        supersonic.data.channel('auth').subscribe(function(message, reply){
            if(message == "login"){
                Restangular.setDefaultHeaders({
                    Authorization : 'Basic ' + localStorageService.get('authdata')
                });
            }
        });

        supersonic.ui.views.current.whenVisible(function () {
            if(localStorageService.get('authdata') == null || localStorageService.get('authdata') == ''){
                supersonic.ui.dialog.confirm("只有登录了才能查看哦！", {
                    buttonLabels : [ "我要登录", "不查看了，哼" ]
                }).then(function(choose) {
                    if(choose == 0){
                        supersonic.ui.modal.show("yitao#login");
                    }else{
                        return;
                    }
                });
            }else {
                $scope.refresh(1);
                $scope.refresh(2);
            }
        });

    });