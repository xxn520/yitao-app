/**
 * Created by m2mbob on 16/5/20.
 */
angular
    .module("yitao")
    .controller("DetailController",function($scope, supersonic, Restangular, localStorageService, $sce, BaseUrl){

        $scope.BaseUrl = BaseUrl;
        $scope.product = {};
        $scope.tabs = 1;
        $scope.chooseSpe = {};
        $scope.itemComments = [];
        $scope.number = 1;
        $scope.stared = false;
        supersonic.ui.views.current.params.onValue(function(params) {
            Restangular.one("product", params.id).get().then(function(product) {
                $scope.product = product;
                $scope.product.introduce = $sce.trustAsHtml(product.introduce);
                if (angular.isArray(product.detail_photo) && product.detail_photo.length===0) {
                    $scope.product.detail_photo.push(product.cover_photo);
                }else if (!angular.isArray(product.detail_photo)){
                    $scope.product.detail_photo = [].push(product.cover_photo);
                }
            });
            Restangular.one('product','star').get({
                productId:params.id,
                userId:localStorageService.get('userDetail').id
            },undefined).then(function(result){
                $scope.stared = result;
            });
            Restangular.one('category','getSimilar').getList(params.id,undefined,undefined).then(function(similars){
                $scope.similarProduct = similars;
            });
        });

        supersonic.data.channel('auth').subscribe(function(message, reply){
            if(message == "login"){
                Restangular.setDefaultHeaders({
                    Authorization : 'Basic ' + localStorageService.get('authdata')
                });
            }
        });

        $scope.focus = function(){
            if(localStorageService.get('authdata') == null || localStorageService.get('authdata') == ''){
                supersonic.ui.dialog.confirm("只有登录了才能关注哦！", {
                    buttonLabels : [ "我要登录", "不关注了，哼" ]
                }).then(function(choose) {
                    if(choose == 0){
                        supersonic.ui.modal.show("yitao#login");
                    }else{
                        return;
                    }
                });
            }
            supersonic.logger.log("productId=" + $scope.product.id + "&userId=" + localStorageService.get('userDetail').id);
            if($scope.stared === false){
                Restangular.one('product','star').customPOST("productId=" + $scope.product.id + "&userId=" + localStorageService.get('userDetail').id,
                    undefined,undefined,{'Content-Type':'application/x-www-form-urlencoded'}).then(function(data){
                    $scope.stared = true;
                    supersonic.ui.dialog.alert("已关注");
                });
            }else{
                Restangular.one('product','cancelStar').customPOST("productId="+ $scope.product.id + "&userId=" + localStorageService.get('userDetail').id,
                    undefined,undefined,{'Content-Type':'application/x-www-form-urlencoded'}).then(function(data){
                    $scope.stared = false;
                    supersonic.ui.dialog.alert("已取消关注");
                });
            }

        };

    });